"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.supplementalWebhookTopics = exports.normalizeWebhookAccessScopes = void 0;
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
// The 2026-10 webhook landing page omits these topics, although the API enum and
// subscription guide document them. Keep this fallback until the landing page catches up.
// https://shopify.dev/docs/apps/build/purchase-options/subscriptions/contracts/build-a-subscription-contract#use-webhooks-instead-of-polling
const supplementalWebhookTopics = (version) => {
    if (version !== "2026-10")
        return [];
    return ["succeed", "fail"].map((event) => ({
        name: `subscription_contract_calculations/${event}`,
        accessScopes: ["own_subscription_contracts"],
        availableOn: ["graphql", "toml"],
        description: event === "succeed"
            ? "A subscription contract calculation succeeded and can be reviewed and committed."
            : "A subscription contract calculation failed or was voided.",
        relatedResource: "SubscriptionContractCalculation",
        examples: [
            {
                tabs: [
                    {
                        code: JSON.stringify({
                            id: 789,
                            admin_graphql_api_id: "gid://shopify/SubscriptionContractCalculation/789",
                            state: event === "succeed" ? "succeeded" : "failed",
                        }),
                    },
                ],
            },
        ],
    }));
};
exports.supplementalWebhookTopics = supplementalWebhookTopics;
