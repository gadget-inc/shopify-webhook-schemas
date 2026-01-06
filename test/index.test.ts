import test from "node:test";
import assert from "node:assert";
import { allTopicsForVersion, metadataForWebhook, schemaForWebhook, inferSchemaFromExamplePayload } from "../src/index";
import { getStartVersion } from "../src/infer-schema";

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
    "2024-04",
    { id: 1, variants: [{ id: 2, title: "test" }], options: { name: "color", value: "red" } },
    { name: "test" }
  );

  assert.deepEqual(result.schema, EXPECTED_SCHEMA);
  assert.equal(result.warnings, 0);
  assert.equal(result.errors.length, 0);
});

void test("can infer the schema from an example payload with a null value", () => {
  const result = inferSchemaFromExamplePayload("2024-04", { id: null, variants: [] }, { name: "test" });

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
  const result = inferSchemaFromExamplePayload("2024-04", { created_at: null, billing_address: null }, { name: "orders/updated" });

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
      company: {
        properties: {
          id: {
            type: "integer",
          },
          location_id: {
            type: "integer",
          },
        },
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
  const result = inferSchemaFromExamplePayload("2024-04", { created_at: null, billing_address: null }, { name: "products/updated" });

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
  const result = inferSchemaFromExamplePayload("2024-04", { receipt: { id: 1 } }, { name: "order_transactions/update" });

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
  const result = inferSchemaFromExamplePayload("2024-04", { receipt: { id: 1 } }, { name: "products/updated" });

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

void test("getStartVersion - Q1 (January) goes back to previous year Q2", () => {
  const result = getStartVersion(new Date("2025-01-15"));
  assert.equal(result, "2024-04");
});

void test("getStartVersion - Q1 (February) goes back to previous year Q2", () => {
  const result = getStartVersion(new Date("2025-02-15"));
  assert.equal(result, "2024-04");
});

void test("getStartVersion - Q1 (March) goes back to previous year Q2", () => {
  const result = getStartVersion(new Date("2025-03-15"));
  assert.equal(result, "2024-04");
});

void test("getStartVersion - Q2 (April) goes back to previous year Q3", () => {
  const result = getStartVersion(new Date("2025-04-15"));
  assert.equal(result, "2024-07");
});

void test("getStartVersion - Q2 (May) goes back to previous year Q3", () => {
  const result = getStartVersion(new Date("2025-05-15"));
  assert.equal(result, "2024-07");
});

void test("getStartVersion - Q2 (June) goes back to previous year Q3", () => {
  const result = getStartVersion(new Date("2025-06-15"));
  assert.equal(result, "2024-07");
});

void test("getStartVersion - Q3 (July) goes back to previous year Q4", () => {
  const result = getStartVersion(new Date("2025-07-02"));
  assert.equal(result, "2024-10");
});

void test("getStartVersion - Q3 (August) goes back to previous year Q4", () => {
  const result = getStartVersion(new Date("2025-08-15"));
  assert.equal(result, "2024-10");
});

void test("getStartVersion - Q3 (September) goes back to previous year Q4", () => {
  const result = getStartVersion(new Date("2025-09-15"));
  assert.equal(result, "2024-10");
});

void test("getStartVersion - Q4 (October) goes back to current year Q1", () => {
  const result = getStartVersion(new Date("2025-10-15"));
  assert.equal(result, "2025-01");
});

void test("getStartVersion - Q4 (November) goes back to current year Q1", () => {
  const result = getStartVersion(new Date("2025-11-15"));
  assert.equal(result, "2025-01");
});

void test("getStartVersion - Q4 (December) goes back to current year Q1", () => {
  const result = getStartVersion(new Date("2025-12-15"));
  assert.equal(result, "2025-01");
});

void test("getStartVersion - handles year boundary correctly", () => {
  const result = getStartVersion(new Date("2024-01-01"));
  assert.equal(result, "2023-04");
});

void test("getStartVersion - handles leap year", () => {
  const result = getStartVersion(new Date("2024-02-29"));
  assert.equal(result, "2023-04");
});

void test("getStartVersion - edge case: beginning of year", () => {
  const result = getStartVersion(new Date("2023-01-01"));
  assert.equal(result, "2022-04");
});

void test("getStartVersion - edge case: end of year", () => {
  const result = getStartVersion(new Date("2023-12-31"));
  assert.equal(result, "2023-01");
});
