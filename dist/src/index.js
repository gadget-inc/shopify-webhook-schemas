"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPackageRootDir = getPackageRootDir;
exports.metadataForWebhook = metadataForWebhook;
exports.schemaForWebhook = schemaForWebhook;
exports.allTopicsForVersion = allTopicsForVersion;
const fast_glob_1 = __importDefault(require("fast-glob"));
const fs = __importStar(require("fs"));
const path_1 = __importDefault(require("path"));
const loaded = { metadatas: {}, schemas: {} };
function getPackageRootDir() {
    let currentDir = __dirname;
    while (!fs.existsSync(path_1.default.join(currentDir, "package.json"))) {
        currentDir = path_1.default.join(currentDir, "..");
    }
    return currentDir;
}
const rootDir = getPackageRootDir();
for (const kind of ["metadatas", "schemas"]) {
    const dir = `${rootDir}/${kind}`;
    for (const version of fs.readdirSync(dir)) {
        const root = {};
        loaded[kind][version] = root;
        const searchPath = `${dir}/${version}/`;
        for (const file of fast_glob_1.default.sync(`${searchPath}**/*.json`)) {
            const topic = file.replace(searchPath, "").replace(/\.json$/, "");
            root[topic] = JSON.parse(fs.readFileSync(file, "utf-8"));
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
