"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeWebhookAccessScopes = void 0;
const inventoryShipmentsReceiveItemsTopic = "inventory_shipments/receive_items";
const incorrectInventoryShipmentsReceiveItemsScope = "inventory_shipments_received_items";
const normalizeWebhookAccessScopes = (topic, accessScopes) => {
    if (topic !== inventoryShipmentsReceiveItemsTopic || !accessScopes?.includes(incorrectInventoryShipmentsReceiveItemsScope)) {
        return accessScopes;
    }
    return [
        ...new Set(accessScopes.map((scope) => (scope === incorrectInventoryShipmentsReceiveItemsScope ? "inventory_shipments" : scope))),
    ];
};
exports.normalizeWebhookAccessScopes = normalizeWebhookAccessScopes;
