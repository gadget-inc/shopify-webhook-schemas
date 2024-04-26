import test from 'node:test';
import assert from 'node:assert';
import { metadataForWebhook, schemaForWebhook } from '../src/index';

test('can get the schema for an example topic', (t) => {
  assert.ok(schemaForWebhook("2024-04", "products/create"));
});

test('can get the metadata for an example topic', (t) => {
  assert.ok(metadataForWebhook("2024-04", "products/create"));
});
