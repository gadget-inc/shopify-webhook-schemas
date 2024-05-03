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

test('throws an error if passed an invalid version', (t) => {
  let threw = false;
  try {
    allTopicsForVersion("1990-01")
  } catch (error: any) {
    assert.ok(error.message);
    threw = true
  }
  assert.ok(threw)
});