import test from "node:test";
import assert from "node:assert";
import { allTopicsForVersion, metadataForWebhook, schemaForWebhook, inferSchemaFromExamplePayload } from "../src/index";

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

const EXPECTED_SCHEMA = {
  $schema: "https://json-schema.org/draft/2020-12/schema",
  properties: {
    id: { type: "integer" },
    options: {
      type: "object",
      properties: {
        name: { type: "string" },
        value: { type: "string" },
      },
      required: ["name", "value"],
    },
    variants: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "integer" },
          title: { type: "string" },
        },
        required: ["id", "title"],
      },
    },
  },
  required: ["id", "options", "variants"],
  type: "object",
};

void test("can infer the schema from an example payload", () => {
  const result = inferSchemaFromExamplePayload(
    { id: 1, variants: [{ id: 2, title: "test" }], options: { name: "color", value: "red" } },
    { name: "test" }
  );

  assert.deepEqual(result.schema, EXPECTED_SCHEMA);
  assert.equal(result.warnings, 0);
  assert.equal(result.errors.length, 0);
});

void test("can infer the schema from an example payload with a null value", () => {
  const result = inferSchemaFromExamplePayload({ id: null, variants: [] }, { name: "test" });

  assert.deepEqual(result.schema, {
    $schema: "https://json-schema.org/draft/2020-12/schema",
    properties: {
      id: {
        type: "null",
      },
      variants: {
        items: false,
        type: "array",
      },
    },
    required: ["id", "variants"],
    type: "object",
  });
  assert.equal(result.warnings, 1);
  assert.equal(result.errors.length, 1);
  assert.equal(result.errors[0].message, "null type found in final schema");
  assert.equal(result.errors[0].path, "properties.id");
});

void test("infer schema uses payload overrides", () => {
  const result = inferSchemaFromExamplePayload({ created_at: null, billing_address: null }, { name: "orders/updated" });

  assert.deepEqual(result.schema, {
    $schema: "https://json-schema.org/draft/2020-12/schema",
    properties: {
      billing_address: {
        properties: {
          address2: {
            type: "string",
          },
          latitude: {
            type: "number",
          },
          longitude: {
            type: "number",
          },
        },
        required: ["address2", "latitude", "longitude"],
        type: ["null", "object"],
      },
      created_at: {
        format: "date-time",
        type: ["null", "string"],
      },
    },
    required: ["billing_address", "created_at"],
    type: "object",
  });
  assert.equal(result.warnings, 0);
  assert.equal(result.errors.length, 0);
});

void test("infer schema does not apply payload overrides if the topic doesn't match", () => {
  const result = inferSchemaFromExamplePayload({ created_at: null, billing_address: null }, { name: "products/updated" });

  assert.deepEqual(result.schema, {
    $schema: "https://json-schema.org/draft/2020-12/schema",
    properties: {
      billing_address: {
        type: "null",
      },
      created_at: {
        format: "date-time",
        type: ["null", "string"],
      },
    },
    required: ["billing_address", "created_at"],
    type: "object",
  });
  assert.equal(result.warnings, 1);
  assert.equal(result.errors.length, 1);
  assert.equal(result.errors[0].message, "null type found in final schema");
  assert.equal(result.errors[0].path, "properties.billing_address");
});

void test("infer schema uses schema overrides", () => {
  const result = inferSchemaFromExamplePayload({ receipt: { id: 1 } }, { name: "order_transactions/update" });

  assert.deepEqual(result.schema, {
    $schema: "https://json-schema.org/draft/2020-12/schema",
    properties: {
      receipt: {
        type: "object",
        additionalProperties: true,
      },
    },
    required: ["receipt"],
    type: "object",
  });
  assert.equal(result.warnings, 0);
  assert.equal(result.errors.length, 0);
});

void test("infer schema does not apply schema overrides if the topic doesn't match", () => {
  const result = inferSchemaFromExamplePayload({ receipt: { id: 1 } }, { name: "products/updated" });

  assert.deepEqual(result.schema, {
    $schema: "https://json-schema.org/draft/2020-12/schema",
    properties: {
      receipt: {
        type: "object",
        properties: {
          id: {
            type: "integer",
          },
        },
        required: ["id"],
      },
    },
    required: ["receipt"],
    type: "object",
  });
  assert.equal(result.warnings, 0);
  assert.equal(result.errors.length, 0);
});
