import fs from "fs";
import fastGlob from "fast-glob"

const loaded: { [kind in "metadata" | "schema"]: { [apiVersion: string]: { [topic: string]: any } } } = { metadata: {}, schema: {} }

for (const kind of ["metadata", "schema"] as const) {
  const dir = `${__dirname}/${kind}`
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
  return loaded.metadata[apiVersion][topic];
}

/** Return the inferred JSON schema describing a webhook payload */
export function schemaForWebhook(apiVersion: string, topic: string) {
  return loaded.schema[apiVersion][topic];
}