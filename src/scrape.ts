import cheerio from "cheerio";
import fs from "fs-extra";
import { globby } from "globby";
import got from "got";
import { uniq } from "lodash";
import chalk from "chalk";
import path from "path";
import { getPackageRootDir } from "src";
import { startDecoding } from "./shopify.js";
import { inferSchemaFromExamplePayload, manualExamples, getStartVersion } from "./infer-schema";

function assert<T>(value: T | false | undefined | null, message?: string): T {
  if (!value) {
    throw new Error(message ?? "value is not truthy");
  }
  return value;
}

/**
 * This script fetches shopify's docs for all their webhook topics, and dumps json schemas for each topic inferred from the example payloads
 */
const loadRailsData = async (url: string) => {
  const shopifyDocsSource = await got(url);
  const $ = cheerio.load(shopifyDocsSource.body);
  const jsonScriptTag = $("script")
    .toArray()
    .find((script) => $(script).html()?.includes("window.RailsData"));
  const compressedScriptTag = $("script")
    .toArray()
    .find((script) => $(script).html()?.includes("rails_data"));

  if (jsonScriptTag) {
    const scriptText = $(jsonScriptTag).html()!;
    const jsonMatch = scriptText.match(/window\.RailsData = (\{[\s\S]*?\}\s*)\/\/\]\]/m);

    if (!jsonMatch) {
      throw new Error("RailsData object literal is in an unexpected format");
    }

    return JSON.parse(jsonMatch[1]);
  } else if (compressedScriptTag) {
    const scriptText = $(compressedScriptTag).html()!;
    const jsonMatch = scriptText.match(/window.__reactRouterContext.streamController.enqueue\(([\s\S]*)\)/);
    if (!jsonMatch) {
      throw new Error("RailsData object literal not found in script tag or is in an unexpected format");
    }
    const data = jsonMatch[1].replace("\\\n", "");

    const encoder = new TextEncoderStream();
    const readableStream = new ReadableStream({
      start(c) {
        c.enqueue(JSON.parse(data));
        c.close();
      },
    }).pipeThrough(encoder);

    const result = await startDecoding(readableStream);
    return result.value.loaderData["./routes/rest"].rails_data;
  } else {
    throw new Error("expected to find rails_data or window.RailsData script in shopify source but couldn't");
  }
};

const docsWebhooksPageForVersion = (version: string) => `https://shopify.dev/docs/api/admin-rest/${version}/resources/webhook#event-topics`;

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

const getAllVersions = async () => {
  const startVersion = getStartVersion(); 
  const rootPage = await loadRailsData(docsWebhooksPageForVersion(startVersion));
  return uniq([startVersion, ...rootPage.api.selectable_versions]).filter((version) => version != "unstable");
};

const main = async () => {
  await loadExemplars();
  const rootDir = getPackageRootDir();
  const versions = process.env.VERSION ? [process.env.VERSION] : await getAllVersions();

  for (const version of versions) {
    const page = await loadRailsData(docsWebhooksPageForVersion(version));
    const webhooks = assert(page.api.rest_resource.info["x-description-list"]["items"]);
    console.log(`Loaded ${webhooks.length} webhooks for version ${version}`);

    for (const webhook of webhooks) {
      if (webhook.response === "") {
        console.warn(`${webhook.name} has an empty response`);
        warnings += 1;
        webhook.response = {};
      } else {
        webhook.response = JSON.parse(webhook.response);
      }

      if (webhook.response === undefined || webhook.response === null) {
        console.warn(`${webhook.name} has an empty response`);
        warnings += 1;
        webhook.response = {};
      }

      const metadataFile = path.join(rootDir, "metadatas", version, webhook.name + ".json");
      await fs.mkdir(path.dirname(metadataFile), { recursive: true });
      await fs.writeFile(metadataFile, JSON.stringify(webhook, null, 2), "utf-8");

      const { schema, warnings: warningCount, errors: errorMessages } = inferSchemaFromExamplePayload(webhook.response, webhook);
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
