"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.inferSchemaFromExamplePayload = void 0;
exports.getPackageRootDir = getPackageRootDir;
exports.metadataForWebhook = metadataForWebhook;
exports.schemaForWebhook = schemaForWebhook;
exports.allTopicsForVersion = allTopicsForVersion;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const fast_glob_1 = __importDefault(require("fast-glob"));
const infer_schema_1 = require("./infer-schema");
Object.defineProperty(exports, "inferSchemaFromExamplePayload", { enumerable: true, get: function () { return infer_schema_1.inferSchemaFromExamplePayload; } });
const loaded = { metadatas: {}, schemas: {} };
function getPackageRootDir() {
    let currentDir = __dirname;
    while (!fs_1.default.existsSync(path_1.default.join(currentDir, "package.json"))) {
        currentDir = path_1.default.join(currentDir, "..");
    }
    return currentDir;
}
const rootDir = getPackageRootDir();
for (const kind of ["metadatas", "schemas"]) {
    const dir = `${rootDir}/${kind}`;
    for (const version of fs_1.default.readdirSync(dir)) {
        const root = {};
        loaded[kind][version] = root;
        const searchPath = `${dir}/${version}/`;
        for (const file of fast_glob_1.default.sync(`${searchPath}**/*.json`)) {
            const topic = file.replace(searchPath, "").replace(/\.json$/, "");
            root[topic] = JSON.parse(fs_1.default.readFileSync(file, "utf-8"));
        }
    }
}
const getVersion = (obj, version) => {
    const value = obj[version];
    if (value)
        return value;
    throw new Error(`Unknown shopify api version ${version} in shopify-webhook-schemas package -- please pass a real version or regenerate the metadata`);
};
/** Return a metadata blob from Shopify's docs describing a webhook topic */
function metadataForWebhook(apiVersion, topic) {
    return getVersion(loaded.metadatas, apiVersion)[topic];
}
/** Return the inferred JSON schema describing a webhook payload */
function schemaForWebhook(apiVersion, topic) {
    return getVersion(loaded.schemas, apiVersion)[topic];
}
/** Return all the known webhook topics */
function allTopicsForVersion(apiVersion) {
    return Object.keys(getVersion(loaded.schemas, apiVersion));
}
