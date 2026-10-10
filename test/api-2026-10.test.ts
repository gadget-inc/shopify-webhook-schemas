import test from "node:test";
import assert from "node:assert/strict";
import { allTopicsForVersion, metadataForWebhook, schemaForWebhook } from "../src/index";

const topics = ["requested_order_edit/created", "requested_order_edit/resolved", "requested_order_edit/declined"];

for (const topic of topics) {
  void test(`${topic} has the 2026-10 order relationship and removal payload types`, () => {
    assert.ok(allTopicsForVersion("2026-10").includes(topic));
    assert.ok(!allTopicsForVersion("2026-07").includes(topic));
    const metadata = metadataForWebhook("2026-10", topic);
    assert.deepEqual(metadata.access_scopes, ["orders", "marketplace_orders", "buyer_membership_orders"]);
    const schema = schemaForWebhook("2026-10", topic);
    assert.equal(schema.properties.order_id.type, "integer");
    const removal = schema.properties.line_items.properties.removals.items;
    assert.equal(removal.properties.line_item_id.type, "integer");
    assert.equal(removal.properties.quantity.type, "integer");
    assert.equal(removal.properties.resolved_quantity.type, "integer");
    assert.equal(schema.properties.requested_at.format, "date-time");
  });
}

void test("rollout timestamps accept both pending nulls and completed dates", () => {
  for (const topic of ["rollouts/create", "rollouts/update"]) {
    const schema = schemaForWebhook("2026-10", topic);
    assert.deepEqual(schema.properties.archived_at.type, ["null", "string"]);
    assert.equal(schema.properties.archived_at.format, "date-time");
    assert.deepEqual(schema.properties.schedule.properties.conclude_at.type, ["null", "string"]);
  }
});

void test("calculation lifecycle webhooks are available without pretending they are persisted resources", () => {
  for (const topic of ["subscription_contract_calculations/succeed", "subscription_contract_calculations/fail"]) {
    assert.ok(allTopicsForVersion("2026-10").includes(topic));
    assert.deepEqual(metadataForWebhook("2026-10", topic).access_scopes, ["own_subscription_contracts"]);
    assert.ok(schemaForWebhook("2026-10", topic));
  }
});
