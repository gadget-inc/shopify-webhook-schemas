const inventoryShipmentsReceiveItemsTopic = "inventory_shipments/receive_items";
const incorrectInventoryShipmentsReceiveItemsScope = "inventory_shipments_received_items";

export const normalizeWebhookAccessScopes = (topic: string, accessScopes: string[] | undefined): string[] | undefined => {
  if (topic !== inventoryShipmentsReceiveItemsTopic || !accessScopes?.includes(incorrectInventoryShipmentsReceiveItemsScope)) {
    return accessScopes;
  }

  return [
    ...new Set(accessScopes.map((scope) => (scope === incorrectInventoryShipmentsReceiveItemsScope ? "inventory_shipments" : scope))),
  ];
};
