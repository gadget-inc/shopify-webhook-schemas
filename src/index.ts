import fs from "fs";
import path from "path"
import fastGlob from "fast-glob"

const loaded: { [kind in "metadatas" | "schemas"]: { [apiVersion: string]: { [topic: string]: any } } } = { metadatas: {}, schemas: {} }

function getAppRootDir() {
  let currentDir = __dirname
  while (!fs.existsSync(path.join(currentDir, 'package.json'))) {
    currentDir = path.join(currentDir, '..')
  }
  return currentDir
}

const rootDir = getAppRootDir()


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

/** Return a metadata blob from Shopify's docs describing a webhook topic */
export function metadataForWebhook(apiVersion: string, topic: string) {
  return loaded.metadatas[apiVersion][topic];
}

/** Return the inferred JSON schema describing a webhook payload */
export function schemaForWebhook(apiVersion: string, topic: string) {
  return loaded.schemas[apiVersion][topic];
}