import test from "node:test";
import assert from "node:assert";
import { allTopicsForVersion, metadataForWebhook, schemaForWebhook } from "../src/index";

void test("can get the schema for an example topic", () => {
  assert.ok(schemaForWebhook("2024-04", "products/create"));
});

void test("can get the metadata for an example topic", () => {
  assert.ok(metadataForWebhook("2024-04", "products/create"));
});

void test("can get all the topics for a version", () => {
  assert.ok(allTopicsForVersion("2024-04").length > 50);
});

void test("throws an error if passed an invalid version", () => {
  let threw = false;
  try {
    allTopicsForVersion("1990-01");
  } catch (error: any) {
    assert.ok(error.message);
    threw = true;
  }
  assert.ok(threw);
});
