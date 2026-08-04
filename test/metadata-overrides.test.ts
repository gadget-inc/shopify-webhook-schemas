import test from "node:test";
import assert from "node:assert";
import { normalizeWebhookAccessScopes } from "../src/metadata-overrides";

void test("corrects the inventory shipments receive-items scope", () => {
  assert.deepEqual(normalizeWebhookAccessScopes("inventory_shipments/receive_items", ["inventory_shipments_received_items"]), [
    "inventory_shipments",
  ]);
});

void test("leaves scopes for other webhook topics unchanged", () => {
  const accessScopes = ["inventory_shipments_received_items"];

  assert.equal(normalizeWebhookAccessScopes("inventory_shipments/create", accessScopes), accessScopes);
});
