import fs from "fs-extra";
import { globby } from "globby";
import chalk from "chalk";
import path from "path";
import { getPackageRootDir } from "src";
import { inferSchemaFromExamplePayload, manualExamples } from "./infer-schema";
import { normalizeWebhookAccessScopes, supplementalWebhookTopics } from "./metadata-overrides";

function assert<T>(value: T | false | undefined | null, message?: string): T {
  if (!value) {
    throw new Error(message ?? "value is not truthy");
  }
  return value;
}

const dataUrl = "https://shopify.dev/docs/api/webhooks.data";
const dataUrlForVersion = (version: string) => `https://shopify.dev/docs/api/webhooks/${version}.data`;

let warnings = 0;
let errors = 0;

const loadExemplars = async () => {
  const files = await globby(path.join(__dirname, "../exemplars/**/*.json"));
  for (const file of files) {
    const segments = file.split(path.sep);
    const _filename = segments.pop();
    const topicPattern = new RegExp(`${segments.pop()}.+`);
    const _version = segments.pop();

    const exemplar = await fs.readJSON(file);
    manualExamples.push([topicPattern, exemplar]);
  }
  console.log(`loaded ${files.length} exemplars`);
};

const loadDataFromUrl = async (url: string): Promise<Record<string, any>> => {
  const res = await fetch(url, { headers: { accept: "application/json" } });
  if (!res.ok) {
    console.error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
    process.exit(1);
  }

  const flat = await res.json();

  // Handle redirect responses (e.g., 2026-01 redirects to /latest)
  if (Array.isArray(flat) && flat[0]?.[0] === "SingleFetchRedirect") {
    console.log(`URL redirected, trying /latest endpoint...`);
    const latestUrl = url.replace(/\/[^/]+\.data$/, "/latest.data");
    return await loadDataFromUrl(latestUrl);
  }

  return inflateShopifyData(flat);
};

const inflateShopifyData = (flat: any) => {
  const cache = new Map();

  const fromIndex = (i: number) => {
    if (!Number.isInteger(i)) {
      return i;
    }
    if (cache.has(i)) return cache.get(i);
    const val = flat[i];
    const out = deref(val);
    cache.set(i, out);
    return out;
  };

  const deref = (x: any): any => {
    if (typeof x === "number") {
      return fromIndex(x);
    }
    if (Array.isArray(x)) {
      return x.map(deref);
    }
    if (x && typeof x === "object") {
      const out: any = {};
      for (const [k, v] of Object.entries(x)) {
        if (k.startsWith("_")) {
          const keyIdx = Number(k.slice(1));
          const key = fromIndex(keyIdx);
          out[key] = deref(v);
        } else {
          out[k] = deref(v);
        }
      }
      return out;
    }

    return x;
  };

  return fromIndex(0);
};

const findFirstByPredicate = (node: any, predicate: (node: any) => boolean): any => {
  if (node && typeof node === "object") {
    if (Array.isArray(node)) {
      for (const child of node) {
        const result = findFirstByPredicate(child, predicate);
        if (result !== null) return result;
      }
    } else {
      if (predicate(node)) {
        return node;
      }
      for (const value of Object.values(node)) {
        const result = findFirstByPredicate(value, predicate);
        if (result !== null) return result;
      }
    }
  }
  return null;
};

const findFirstByKey = (node: any, keyName: string): any => {
  return findFirstByPredicate(node, (node) => Object.prototype.hasOwnProperty.call(node, keyName))?.[keyName];
};

const getAllVersions = async (): Promise<string[]> => {
  const data = await loadDataFromUrl(dataUrl);

  const selectableVersions: any = findFirstByKey(data, "selectableVersions");

  if (!selectableVersions || !Array.isArray(selectableVersions.default.values)) {
    throw new Error("selectableVersions not found or is not an array");
  }

  return selectableVersions.default.values.filter((v: any) => v != "unstable");
};

const main = async () => {
  await loadExemplars();
  const rootDir = getPackageRootDir();
  const versions = process.env.VERSION ? [process.env.VERSION] : await getAllVersions();

  for (const version of versions) {
    console.log(`Loading webhooks for version ${version}`);

    const data = await loadDataFromUrl(dataUrlForVersion(version));

    const servedVersion = data?.["templated-landing-webhooks"]?.data?.apiVersion;
    if (servedVersion && servedVersion !== version) {
      console.warn(`Skipping ${version}: Shopify served data for ${servedVersion} instead (version not yet published).`);
      warnings += 1;
      continue;
    }

    const webhookTopics = assert(
      findFirstByPredicate(data, (node) => node.name === "WebhookTopics" && Array.isArray(node.members)),
      `WebhookTopics not found for version ${version}`
    );
    const webhookContent = [...assert(webhookTopics.members)];
    for (const topic of supplementalWebhookTopics(version)) {
      if (!webhookContent.some((entry) => entry.name === topic.name)) webhookContent.push(topic);
    }

    for (const webhookNode of webhookContent) {
      const examplePayload = webhookNode.examples?.[0]?.tabs?.[0]?.code;
      let response: Record<string, any> = {};

      if (!examplePayload) {
        console.warn(`${webhookNode.name} has no payload`);
        warnings += 1;
      } else {
        const parsedPayload = JSON.parse(examplePayload);
        if (!parsedPayload) {
          console.warn(`${webhookNode.name} has a null payload`);
          warnings += 1;
        } else {
          response = parsedPayload;
        }
      }

      const notices: any[] = webhookNode.webhooksNotices ?? webhookNode.webhookNotices ?? [];
      const webhook = {
        access_scopes: normalizeWebhookAccessScopes(webhookNode.name, webhookNode.accessScopes),
        available_on: webhookNode.availableOn,
        deprecated: !!webhookNode.isDeprecated || !!notices.find((notice: any) => notice.type === "deprecated"),
        description: webhookNode.description,
        name: webhookNode.name,
        pii: webhookNode.pii,
        related_resource: webhookNode.relatedResource,
        response,
        shop_feature: !!notices.find((notice: any) => notice.type === "shopFeature" || notice.type === "shop_feature"),
      };

      const metadataFile = path.join(rootDir, "metadatas", version, webhook.name + ".json");
      await fs.mkdir(path.dirname(metadataFile), { recursive: true });
      await fs.writeFile(metadataFile, JSON.stringify(webhook, null, 2), "utf-8");

      const { schema, warnings: warningCount, errors: errorMessages } = inferSchemaFromExamplePayload(version, webhook.response, webhook);
      warnings += warningCount;
      for (const error of errorMessages) {
        console.error(
          `${chalk.red("schema error")}: ${error.message} for version ${chalk.blue(version)} for ${chalk.blue(
            webhook.name
          )} at path ${chalk.green(error.path)}`
        );
        errors += 1;
      }

      const schemaFile = path.join(rootDir, "schemas", version, webhook.name + ".json");
      await fs.mkdir(path.dirname(schemaFile), { recursive: true });
      await fs.writeFile(schemaFile, JSON.stringify(schema, null, 2), "utf-8");
    }
  }

  if (warnings > 0 || errors > 0) {
    console.log(`Done with ${warnings} warnings and ${errors} errors`);
    process.exitCode = 1;
  } else {
    console.log(`Done`);
  }
};

void main();
