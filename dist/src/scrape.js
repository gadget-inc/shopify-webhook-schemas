"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = __importDefault(require("fs-extra"));
const globby_1 = require("globby");
const chalk_1 = __importDefault(require("chalk"));
const path_1 = __importDefault(require("path"));
const src_1 = require("src");
const infer_schema_1 = require("./infer-schema");
const metadata_overrides_1 = require("./metadata-overrides");
function assert(value, message) {
    if (!value) {
        throw new Error(message ?? "value is not truthy");
    }
    return value;
}
const dataUrl = "https://shopify.dev/docs/api/webhooks.data";
const dataUrlForVersion = (version) => `https://shopify.dev/docs/api/webhooks/${version}.data`;
let warnings = 0;
let errors = 0;
const loadExemplars = async () => {
    const files = await (0, globby_1.globby)(path_1.default.join(__dirname, "../exemplars/**/*.json"));
    for (const file of files) {
        const segments = file.split(path_1.default.sep);
        const _filename = segments.pop();
        const topicPattern = new RegExp(`${segments.pop()}.+`);
        const _version = segments.pop();
        const exemplar = await fs_extra_1.default.readJSON(file);
        infer_schema_1.manualExamples.push([topicPattern, exemplar]);
    }
    console.log(`loaded ${files.length} exemplars`);
};
const loadDataFromUrl = async (url) => {
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
const inflateShopifyData = (flat) => {
    const cache = new Map();
    const fromIndex = (i) => {
        if (!Number.isInteger(i)) {
            return i;
        }
        if (cache.has(i))
            return cache.get(i);
        const val = flat[i];
        const out = deref(val);
        cache.set(i, out);
        return out;
    };
    const deref = (x) => {
        if (typeof x === "number") {
            return fromIndex(x);
        }
        if (Array.isArray(x)) {
            return x.map(deref);
        }
        if (x && typeof x === "object") {
            const out = {};
            for (const [k, v] of Object.entries(x)) {
                if (k.startsWith("_")) {
                    const keyIdx = Number(k.slice(1));
                    const key = fromIndex(keyIdx);
                    out[key] = deref(v);
                }
                else {
                    out[k] = deref(v);
                }
            }
            return out;
        }
        return x;
    };
    return fromIndex(0);
};
const findFirstByPredicate = (node, predicate) => {
    if (node && typeof node === "object") {
        if (Array.isArray(node)) {
            for (const child of node) {
                const result = findFirstByPredicate(child, predicate);
                if (result !== null)
                    return result;
            }
        }
        else {
            if (predicate(node)) {
                return node;
            }
            for (const value of Object.values(node)) {
                const result = findFirstByPredicate(value, predicate);
                if (result !== null)
                    return result;
            }
        }
    }
    return null;
};
const findFirstByKey = (node, keyName) => {
    return findFirstByPredicate(node, (node) => Object.prototype.hasOwnProperty.call(node, keyName))?.[keyName];
};
const getAllVersions = async () => {
    const data = await loadDataFromUrl(dataUrl);
    const selectableVersions = findFirstByKey(data, "selectableVersions");
    if (!selectableVersions || !Array.isArray(selectableVersions.default.values)) {
        throw new Error("selectableVersions not found or is not an array");
    }
    return selectableVersions.default.values.filter((v) => v != "unstable");
};
const main = async () => {
    await loadExemplars();
    const rootDir = (0, src_1.getPackageRootDir)();
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
        const webhookTopics = assert(findFirstByPredicate(data, (node) => node.name === "WebhookTopics" && Array.isArray(node.members)), `WebhookTopics not found for version ${version}`);
        const webhookContent = [...assert(webhookTopics.members)];
        for (const topic of (0, metadata_overrides_1.supplementalWebhookTopics)(version)) {
            if (!webhookContent.some((entry) => entry.name === topic.name))
                webhookContent.push(topic);
        }
        for (const webhookNode of webhookContent) {
            const examplePayload = webhookNode.examples?.[0]?.tabs?.[0]?.code;
            let response = {};
            if (!examplePayload) {
                console.warn(`${webhookNode.name} has no payload`);
                warnings += 1;
            }
            else {
                const parsedPayload = JSON.parse(examplePayload);
                if (!parsedPayload) {
                    console.warn(`${webhookNode.name} has a null payload`);
                    warnings += 1;
                }
                else {
                    response = parsedPayload;
                }
            }
            const notices = webhookNode.webhooksNotices ?? webhookNode.webhookNotices ?? [];
            const webhook = {
                access_scopes: (0, metadata_overrides_1.normalizeWebhookAccessScopes)(webhookNode.name, webhookNode.accessScopes),
                available_on: webhookNode.availableOn,
                deprecated: !!webhookNode.isDeprecated || !!notices.find((notice) => notice.type === "deprecated"),
                description: webhookNode.description,
                name: webhookNode.name,
                pii: webhookNode.pii,
                related_resource: webhookNode.relatedResource,
                response,
                shop_feature: !!notices.find((notice) => notice.type === "shopFeature" || notice.type === "shop_feature"),
            };
            const metadataFile = path_1.default.join(rootDir, "metadatas", version, webhook.name + ".json");
            await fs_extra_1.default.mkdir(path_1.default.dirname(metadataFile), { recursive: true });
            await fs_extra_1.default.writeFile(metadataFile, JSON.stringify(webhook, null, 2), "utf-8");
            const { schema, warnings: warningCount, errors: errorMessages } = (0, infer_schema_1.inferSchemaFromExamplePayload)(version, webhook.response, webhook);
            warnings += warningCount;
            for (const error of errorMessages) {
                console.error(`${chalk_1.default.red("schema error")}: ${error.message} for version ${chalk_1.default.blue(version)} for ${chalk_1.default.blue(webhook.name)} at path ${chalk_1.default.green(error.path)}`);
                errors += 1;
            }
            const schemaFile = path_1.default.join(rootDir, "schemas", version, webhook.name + ".json");
            await fs_extra_1.default.mkdir(path_1.default.dirname(schemaFile), { recursive: true });
            await fs_extra_1.default.writeFile(schemaFile, JSON.stringify(schema, null, 2), "utf-8");
        }
    }
    if (warnings > 0 || errors > 0) {
        console.log(`Done with ${warnings} warnings and ${errors} errors`);
        process.exitCode = 1;
    }
    else {
        console.log(`Done`);
    }
};
void main();
