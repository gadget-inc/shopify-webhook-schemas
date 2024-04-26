# Shopify webhook JSON schemas

This repo contains inferred JSONSchemas for each Shopify webhook topic payload. Find them all in the `schemas` directory.

### Usage from JavaScript

If you want to load the metadata or the json schemas programmatically from JS, you can do so with the exported functions from this library.

```typescript
import { metadataForWebhook, schemaForWebhook } from "shopify-webhook-schemas";

// get the JSONSchema for a webhook payload
const schema = schemaForWebhook("2024-04", "products/update");
// returns {
//   "$schema": "https://json-schema.org/draft/2020-12/schema",
//   "type": "object",
//   "properties": {
//     "admin_graphql_api_id": {
//       "type": "string",
//       "format": "uri"
//     },
//     "body_html": {
//       "type": "string"
//     },
// ...

// get the metadata blob with an description and example payload that shopify puts in their docs
const metadata = metadataForWebhook("2024-04", "products/update");
// returns {
// "access_scopes": [
//   "products"
// ],
// "available_on": [
//   "graphql",
//   "rest"
// ],
// "description": "Occurs whenever a product is updated, or whenever a product is ordered, or whenever a variant is added, removed, or updated. Product webhooks will return a full variants payload for the first 100 records.For variants 101+, the payload won't include the full variant details,but the variant_gids field will still be included for these variants.",
// "name": "products/update",
// "related_resource": "Product",
// "response": {
//   "admin_graphql_api_id": "gid://shopify/Product/788032119674292922",
//   "body_html": "An example T-Shirt",
//   "created_at": null,
// ...
```

### Refreshing

Run `pnpm x src/scrape.ts` to re-scrape Shopify's docs. See `src/scrape.ts` for the logic and the overrides.
