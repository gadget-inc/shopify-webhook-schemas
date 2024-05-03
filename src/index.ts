import fs from "fs";
import path from "path"
import fastGlob from "fast-glob"

const loaded: { [kind in "metadatas" | "schemas"]: { [apiVersion: string]: { [topic: string]: any } } } = { metadatas: {}, schemas: {} }

export function getPackageRootDir() {
  let currentDir = __dirname
  while (!fs.existsSync(path.join(currentDir, 'package.json'))) {
    currentDir = path.join(currentDir, '..')
  }
  return currentDir
}

const rootDir = getPackageRootDir()


for (const kind of ["metadatas", "schemas"] as const) {
  const dir = `${rootDir}/${kind}`
  for (const version of fs.readdirSync(dir)) {
    const root: Record<string, any> = {}
    loaded[kind][version] = root
    const searchPath = `${dir}/${version}/`
    for (const file of fastGlob.sync(`${searchPath}**/*.json`)) {

      const topic = file.replace(searchPath, "").replace(/\.json$/, "")
      root[topic] = JSON.parse(fs.readFileSync(file, "utf-8"))
    }
  }
}

const getVersion = <T>(obj: Record<string, T>, version: string): T => {
  const value = obj[version];
  if (value) return value;
  throw new Error(`Unknown shopify api version ${version} in shopify-webhook-schemas package -- please pass a real version or regenerate the metadata`);
}

/** Return a metadata blob from Shopify's docs describing a webhook topic */
export function metadataForWebhook(apiVersion: string, topic: string) {
  return getVersion(loaded.metadatas, apiVersion)[topic];
}

/** Return the inferred JSON schema describing a webhook payload */
export function schemaForWebhook(apiVersion: string, topic: string) {
  return getVersion(loaded.schemas, apiVersion)[topic];
}

/** Return all the known webhook topics */
export function allTopicsForVersion(apiVersion: string) {
  return Object.keys(getVersion(loaded.schemas, apiVersion));
}