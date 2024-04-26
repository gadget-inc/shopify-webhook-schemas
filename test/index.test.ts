import test from 'node:test';
import assert from 'node:assert';
import { allTopicsForVersion, metadataForWebhook, schemaForWebhook } from '../src/index';

test('can get the schema for an example topic', (t) => {
  assert.ok(schemaForWebhook("2024-04", "products/create"));
});

test('can get the metadata for an example topic', (t) => {
  assert.ok(metadataForWebhook("2024-04", "products/create"));
});

test('can get all the topics for a version', (t) => {
  assert.ok(allTopicsForVersion("2024-04").length > 50);
});