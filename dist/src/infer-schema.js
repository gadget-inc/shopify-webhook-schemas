"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.overrides = exports.manualExamples = exports.inferSchemaFromExamplePayload = exports.getStartVersion = void 0;
const json_schema_walker_1 = require("@cloudflare/json-schema-walker");
const schema_infer_1 = require("@jsonhero/schema-infer");
const lodash_1 = require("lodash");
const safe_stable_stringify_1 = require("safe-stable-stringify");
const stringify = (0, safe_stable_stringify_1.configure)({ deterministic: true });
const getStartVersion = (date = new Date()) => {
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1; // 1-12
    // Map month to quarter
    let quarter;
    if (month <= 3)
        quarter = 1; // Jan-Mar -> Q1 (01)
    else if (month <= 6)
        quarter = 2; // Apr-Jun -> Q2 (04)
    else if (month <= 9)
        quarter = 3; // Jul-Sep -> Q3 (07)
    else
        quarter = 4; // Oct-Dec -> Q4 (10)
    // Go back 3 quarters (4 quarters including current)
    let targetYear = year;
    let targetQuarter = quarter - 3;
    // Handle year wraparound
    while (targetQuarter <= 0) {
        targetQuarter += 4;
        targetYear -= 1;
    }
    // Map quarter to month string
    const quarterToMonth = { 1: "01", 2: "04", 3: "07", 4: "10" };
    return `${targetYear}-${quarterToMonth[targetQuarter]}`;
};
exports.getStartVersion = getStartVersion;
const inferSchemaFromExamplePayload = (version, examplePayload, metadata) => {
    const inference = (0, schema_infer_1.inferSchema)(examplePayload);
    // build a copy of the payload and apply overrides based on the webhook name
    for (const [matcher, override] of exports.manualExamples) {
        if (matcher.test(metadata.name)) {
            const overridesPayload = (0, lodash_1.cloneDeep)(examplePayload);
            const maskedOverride = (0, lodash_1.pick)(override, Object.keys(examplePayload));
            (0, lodash_1.merge)(overridesPayload, maskedOverride);
            inference.infer(overridesPayload);
        }
    }
    const schema = {
        $schema: "https://json-schema.org/draft/2020-12/schema",
        ...inference.toJSONSchema(),
    };
    for (const override of exports.overrides) {
        if (override.topics.includes(metadata.name) && (!override.versions || override.versions.includes(version))) {
            for (const [key, schemaOverride] of Object.entries(override.schema)) {
                schema.properties ?? (schema.properties = {});
                schema.properties[key] = schemaOverride;
            }
            if (override.required) {
                schema.required = override.required;
            }
        }
    }
    const sortedSchema = getDeterministicObject(schema);
    let warnings = 0;
    const errors = [];
    (0, json_schema_walker_1.schemaWalk)(sortedSchema, (subschema, path, _parent, parentPath) => {
        if ((0, lodash_1.isEqual)(subschema, { type: "null" })) {
            warnings += 1;
            const fullPath = [...parentPath, ...path].join(".");
            if (unknownPaths.some(([pattern, paths]) => pattern.test(metadata.name) && paths.includes(fullPath))) {
                // we know this path is always null, so don't error
            }
            else {
                errors.push({
                    message: "null type found in final schema",
                    path: fullPath,
                });
            }
        }
    }, () => { }, (0, json_schema_walker_1.getVocabulary)(sortedSchema));
    return { schema: sortedSchema, warnings, errors };
};
exports.inferSchemaFromExamplePayload = inferSchemaFromExamplePayload;
const getDeterministicObject = (obj) => {
    const stableString = stringify(sortStringArrays(obj));
    return JSON.parse(stableString);
};
const sortStringArrays = (obj) => {
    return (0, lodash_1.cloneDeepWith)(obj, (value) => {
        if (Array.isArray(value) && value.every((item) => typeof item === "string")) {
            return value.sort();
        }
    });
};
// paths that we can't find any source data for at all, so we don't know what type they should be
const unknownPaths = [
    [
        /checkouts\/.+/,
        [
            "properties.line_items.items.properties.unit_price_measurement.properties.measured_type",
            "properties.line_items.items.properties.unit_price_measurement.properties.quantity_value",
            "properties.line_items.items.properties.unit_price_measurement.properties.quantity_unit",
            "properties.line_items.items.properties.unit_price_measurement.properties.reference_value",
            "properties.line_items.items.properties.unit_price_measurement.properties.reference_unit",
            "properties.line_items.items.properties.tax_lines.items.properties.reporting_jurisdiction_name",
            "properties.line_items.items.properties.tax_lines.items.properties.reporting_jurisdiction_type",
            "properties.line_items.items.properties.tax_lines.items.properties.reporting_jurisdiction_code",
            "properties.line_items.items.properties.user_id",
            "properties.line_items.items.properties.compare_at_price",
            "properties.gateway",
            "properties.shipping_lines.items.properties.delivery_category",
            "properties.shipping_lines.items.properties.validation_context",
            "properties.shipping_lines.items.properties.requested_fulfillment_service_id",
            "properties.shipping_lines.items.properties.tax_lines.items.properties.identifier",
            "properties.shipping_lines.items.properties.tax_lines.items.properties.reporting_jurisdiction_name",
            "properties.shipping_lines.items.properties.tax_lines.items.properties.tax_api_client_id",
            "properties.shipping_lines.items.properties.tax_lines.items.properties.reporting_exempt_amount",
            "properties.shipping_lines.items.properties.tax_lines.items.properties.jurisdiction_source",
            "properties.shipping_lines.items.properties.tax_lines.items.properties.reporting_jurisdiction_code",
            "properties.shipping_lines.items.properties.tax_lines.items.properties.reporting_jurisdiction_type",
            "properties.shipping_lines.items.properties.tax_lines.items.properties.reporting_taxable_amount",
            "properties.shipping_lines.items.properties.tax_lines.items.properties.jurisdiction_type",
            "properties.shipping_lines.items.properties.tax_lines.items.properties.tax_type",
            "properties.shipping_lines.items.properties.tax_lines.items.properties.jurisdiction_id",
            "properties.shipping_lines.items.properties.tax_lines.items.properties.reporting_non_taxable_amount",
            "properties.shipping_lines.items.properties.custom_tax_lines",
            "properties.shipping_lines.items.properties.estimated_delivery_time_range",
            "properties.line_items.items.properties.tax_lines.items.properties.tax_type",
            "properties.line_items.items.properties.tax_lines.items.properties.identifier",
            "properties.line_items.items.properties.discount_allocations.items.properties.id",
            "properties.line_items.items.properties.discount_allocations.items.properties.created_at",
        ],
    ],
    [
        /collection_listings\/.+/,
        ["properties.collection_listing.properties.default_product_image", "properties.collection_listing.properties.image"],
    ],
    [/domains\/.+/, ["properties.localization.properties.country"]],
    [/orders\/.+/, ["properties.client_details.properties.session_hash"]],
];
// example data we feed the schema infer-er for each topic to allow it to discover real types
exports.manualExamples = [
    [
        /.+/,
        {
            admin_graphql_api_id: "gid://shopify/Something/1234567890",
            admin_graphql_api_job_id: "gid://shopify/Job/1234567890",
            created_at: "2021-12-30T19:00:00-05:00",
            updated_at: "2021-12-30T19:00:00-05:00",
            address2: "Apt 123",
            latitude: 10.1,
            longitude: 10.1,
            location_id: 111111,
        },
    ],
    [
        /(app|shop)\/.+/,
        {
            domain: "example.com",
            source: "example source",
            myshopify_domain: "example.myshopify.com",
            google_apps_domain: "example.com",
            google_apps_login_enabled: true,
            password_enabled: true,
            taxes_included: true,
            tax_shipping: true,
            iana_timezone: "America/New_York",
            auto_configure_tax_inclusivity: true,
            county_taxes: true,
        },
    ],
    [
        /bulk_operations\/.+/,
        {
            error_code: "SOME_ERROR_ENUM",
        },
    ],
    [
        /carts\/.+/,
        {
            note: "some cart note string",
        },
    ],
    [
        /(checkouts|orders)\/.+/,
        {
            gateway: "shopify_payments",
            landing_site: "https://example.com",
            note: "some order note",
            referring_site: "https://example.com",
            completed_at: "2021-12-30T19:00:00-05:00",
            closed_at: "2021-12-30T19:00:00-05:00",
            user_id: 11111111,
            location_id: 22222222,
            source_identifier: "some_source_identifier",
            source_url: "https://example.com",
            device_id: "some_device_id",
            phone: "+1 (123) 456 7890",
            sms_marketing_phone: "+1 (123) 456 7890",
            customer_locale: "en",
            source: "some_source",
            total_duties: 10.11,
            app_id: 12345,
            browser_ip: "10.0.0.1",
            cart_token: "some_cart_token",
            checkout_id: 12345,
            client_details: {
                accept_language: "en-US,en;q=0.9",
                browser_height: 800,
            },
            confirmation_number: "some_confirmation_number",
            current_total_additional_fees_set: {
                shop_money: {
                    amount: "0.00",
                    currency_code: "USD",
                },
                presentment_money: {
                    amount: "0.00",
                    currency_code: "USD",
                },
            },
            current_total_duties_set: {
                shop_money: {
                    amount: "0.00",
                    currency_code: "USD",
                },
                presentment_money: {
                    amount: "0.00",
                    currency_code: "USD",
                },
            },
            original_total_additional_fees_set: {
                shop_money: {
                    amount: "0.00",
                    currency_code: "USD",
                },
                presentment_money: {
                    amount: "0.00",
                    currency_code: "USD",
                },
            },
            original_total_duties_set: {
                shop_money: {
                    amount: "0.00",
                    currency_code: "USD",
                },
                presentment_money: {
                    amount: "0.00",
                    currency_code: "USD",
                },
            },
            checkout_token: "some_checkout_token",
            landing_site_ref: "https://example.com",
            merchant_of_record_app_id: 12345,
            po_number: "some_po_number",
            processed_at: "2021-12-30T19:00:00-05:00",
            reference: "some_reference",
            payment_terms: "some_payment_terms",
            reservation_token: "some_reservation_token",
            billing_address: {
                address2: "suite 101",
                latitude: 34.1,
                longitude: 34.1,
            },
            shipping_address: {
                address2: "suite 101",
                latitude: 34.1,
                longitude: 34.1,
            },
            customer: {
                created_at: "2024-05-05T02:42:32+08:00",
                marketing_opt_in_level: "single_opt_in",
                note: "some string",
                multipass_identifier: "hello",
            },
        },
    ],
    [
        /checkouts\/.+/,
        {
            line_items: [
                {
                    presentment_variant_title: "51 x 76 / Blanc / 1",
                    taxable: true,
                    variant_price: "69.00",
                    presentment_title: "Taie d'oreiller Pure Soie de Mûrier",
                    requires_shipping: true,
                    unit_price_measurement: {
                        measured_type: null,
                        quantity_unit: null,
                        quantity_value: null,
                        reference_unit: null,
                        reference_value: null,
                    },
                    variant_title: "51 x 76 / Blanc / 1",
                    title: "Taie d'oreiller Pure Soie de Mûrier",
                    gift_card: false,
                    destination_location_id: 4042942054746,
                    compare_at_price: null,
                    key: "e0105d4efb1970501cf831566fa79752",
                    line_price: "69.00",
                    vendor: "Emily's pillow",
                    quantity: 1,
                    applied_discounts: [],
                    grams: 110,
                    properties: [
                        {
                            name: "_isJust",
                            value: "true",
                        },
                    ],
                    tax_lines: [
                        {
                            reporting_jurisdiction_type: null,
                            reporting_non_taxable_amount: "0.00",
                            zone: null,
                            compare_at: 0.2,
                            reporting_taxable_amount: "57.50",
                            tax_api_client_id: null,
                            jurisdiction_source: "ActiveTax",
                            title: "FR TVA",
                            identifier: null,
                            jurisdiction_type: "COUNTRY",
                            reporting_jurisdiction_code: null,
                            source: "MerchantActiveTax",
                            reporting_exempt_amount: "0.00",
                            reporting_jurisdiction_name: null,
                            jurisdiction_id: "FR",
                            tax_type: null,
                            channel_liable: false,
                            price: "11.50",
                            rate: 0.2,
                            position: 1,
                            tax_calculation_price: "11.50",
                        },
                    ],
                    sku: "EMIL-TO5176-22WH",
                    rank: 0,
                    user_id: null,
                    product_id: 4610455470216,
                    discount_allocations: [],
                    origin_location_id: 1743669821576,
                    fulfillment_service: "manual",
                    variant_id: 32516187029640,
                    price: "69.00",
                },
            ],
        },
    ],
    [
        /collections\/.+/,
        {
            sort_order: "manual",
            template_suffix: "some_template_suffix",
        },
    ],
    [
        /collection_listings\/.+/,
        {
            collection_listing: {
                updated_at: "2021-12-30T19:00:00-05:00",
                sort_order: 1,
            },
        },
    ],
    [
        /company_locations\/.+/,
        {
            buyer_experience_configuration: { pay_now_only: true },
            billing_address: {
                address2: "suite 101",
            },
            shipping_address: {
                address2: "suite 101",
            },
        },
    ],
    [
        /customers\/.+/,
        {
            last_order_id: 12345,
            multipass_identifier: "some_multipass_identifier",
            last_order_name: "Foobar",
            phone: "+1 (123) 456 7890",
            sms_marketing_consent: false,
            email_marketing_consent: false,
            accepts_marketing_updated_at: "2021-12-30T19:00:00-05:00",
            marketing_opt_in_level: "single_opt_in",
        },
    ],
    [
        /customer_account_settings\/.+/,
        {
            url: "https://example.com",
        },
    ],
    [
        /customer.+consent\/.+/,
        {
            phone: "+1 (123) 456 7890",
            email_address: "test@test.com",
        },
    ],
    [
        /disputes\/.+/,
        {
            evidence_sent_on: "2021-12-30T19:00:00-05:00",
            finalized_on: "2021-12-30T19:00:00-05:00",
        },
    ],
    [
        /draft_orders\/.+/,
        {
            invoice_sent_at: "2021-12-30T19:00:00-05:00",
            order_id: 12345,
        },
    ],
    [
        /fulfillment_events\/.+/,
        {
            city: "Ottawa",
            province: "ON",
            zip: "K1P1J1",
            address1: "150 Elgin St",
            estimated_delivery_at: "2021-12-30T19:00:00-05:00",
        },
    ],
    [
        /fulfillment_orders\/.+/,
        {
            remaining_fulfillment_order: {
                id: 5859333242902,
                shop_id: 20978040854,
                order_id: 4804938989590,
                assigned_location_id: 67794436118,
                request_status: "unsubmitted",
                status: "open",
                supported_actions: ["request_fulfillment", "hold", "move"],
                destination: {
                    id: 5479404371990,
                    address1: "23 Hassall Street",
                    address2: "",
                    city: "Parramatta",
                    company: null,
                    country: "Australia",
                    email: "",
                    first_name: "Tyler",
                    last_name: "Kelleher",
                    phone: null,
                    province: "New South Wales",
                    zip: "2150",
                },
                line_items: [
                    {
                        id: 12675478814742,
                        shop_id: 20978040854,
                        fulfillment_order_id: 5859333242902,
                        quantity: 1,
                        line_item_id: 12553770336278,
                        inventory_item_id: 44276125368342,
                        fulfillable_quantity: 1,
                        variant_id: 42182036422678,
                    },
                ],
                fulfill_at: "2022-10-13T13:00:00-04:00",
                fulfill_by: null,
                international_duties: {
                    incoterm: "DAP",
                },
                fulfillment_holds: [],
                delivery_method: {
                    id: 140816351254,
                    method_type: "shipping",
                    min_delivery_date_time: null,
                    max_delivery_date_time: null,
                },
                assigned_location: {
                    address1: null,
                    address2: null,
                    city: null,
                    country_code: "CA",
                    location_id: 67794436118,
                    name: "test-created-via-api-2",
                    phone: null,
                    province: null,
                    zip: null,
                },
            },
        },
    ],
    [
        /fulfillments\/.+/,
        {
            service: "manual",
            shipment_status: "confirmed",
            origin_address: {
                first_name: "Steve",
                address1: "123 Shipping Street",
                phone: "555-555-SHIP",
                city: "Shippington",
                zip: "40003",
                province: "Kentucky",
                country: "United States",
                last_name: "Shipper",
                address2: null,
                company: "Shipping Company",
                latitude: null,
                longitude: null,
                name: "Steve Shipper",
                country_code: "US",
                province_code: "KY",
            },
        },
    ],
    [
        /inventory_items\/.+/,
        {
            cost: 10.11,
            country_code_of_origin: "CA",
            province_code_of_origin: "CA",
            harmonized_system_code: "1234567890",
        },
    ],
    [
        /inventory_levels\/.+/,
        {
            available: 10,
        },
    ],
    [
        /order_transactions\/.+/,
        {
            message: "some message from the gateway",
            user_id: 12345,
            parent_id: 12345,
            processed_at: "2021-12-30T19:00:00-05:00",
            device_id: "some_device_id",
            error_code: "SOME_ERROR_ENUM",
        },
    ],
    [
        /orders\/risk_assessment.+/,
        {
            provider_id: 12345,
            provider_title: "whatever",
        },
    ],
    [
        /products\/.+/,
        {
            template_suffix: "something",
            image: "gid://shopify/ProductImage/1234567890",
        },
    ],
    [
        /refunds\/.+/,
        {
            return: "unknown",
        },
    ],
    [
        /selling_plan_groups\/.+/,
        {
            app_id: 12345,
            description: "some description",
            position: 1,
        },
    ],
    [
        /subscription_billing_attempts\/.+/,
        {
            id: 12345,
            error_message: "some error message",
            error_code: "some error copde",
        },
    ],
    [
        /subscription_billing_cycle.+/,
        {
            contract_edit: "some contract edit",
        },
    ],
    [
        /tender_transactions\/.+/,
        {
            user_id: 12345,
            processed_at: "2021-12-30T19:00:00-05:00",
            payment_details: { something: "true" },
        },
    ],
];
const shippingAddress = {
    type: "object",
    properties: {
        first_name: {
            type: "string",
        },
        address1: {
            type: "string",
        },
        phone: {
            type: "string",
        },
        city: {
            type: "string",
        },
        zip: {
            type: "string",
        },
        province: {
            type: "string",
        },
        country: {
            type: "string",
        },
        last_name: {
            type: "string",
        },
        address2: {
            type: ["string", "null"],
        },
        company: {
            type: ["string", "null"],
        },
        latitude: {
            type: ["number", "null"],
        },
        longitude: {
            type: ["number", "null"],
        },
        name: {
            type: "string",
        },
        country_code: {
            type: "string",
        },
        province_code: {
            type: "string",
        },
    },
};
exports.overrides = [
    {
        topics: ["checkouts/create", "checkouts/update"],
        schema: {
            shipping_address: shippingAddress,
        },
    },
    {
        topics: ["order_transactions/create", "order_transactions/update"],
        schema: {
            receipt: {
                type: "object",
                additionalProperties: true,
            },
        },
    },
    {
        topics: ["collections/create", "collections/update"],
        schema: {
            image: {
                type: "object",
                properties: {
                    alt: { type: "string" },
                    created_at: { type: "string" },
                    height: { type: "number" },
                    src: { type: "string" },
                    width: { type: "number" },
                },
            },
        },
    },
    {
        topics: ["fulfillments/create", "fulfillments/update"],
        schema: {
            origin_address: {
                address1: { type: "string" },
                city: { type: "string" },
                country_code: { type: "string" },
                province_code: { type: "string" },
                zip: { type: "string" },
            },
        },
    },
    {
        topics: ["products/create", "products/update"],
        schema: {
            image: {
                properties: {
                    admin_graphql_api_id: {
                        format: "uri",
                        type: "string",
                    },
                    alt: {
                        type: ["string", "null"],
                    },
                    created_at: {
                        format: "date-time",
                        type: "string",
                    },
                    height: {
                        type: "integer",
                    },
                    id: {
                        type: "integer",
                    },
                    position: {
                        type: "integer",
                    },
                    product_id: {
                        type: "integer",
                    },
                    src: {
                        format: "uri",
                        type: "string",
                    },
                    updated_at: {
                        format: "date-time",
                        type: "string",
                    },
                    variant_ids: {
                        items: {
                            type: "integer",
                        },
                        type: "array",
                    },
                    width: {
                        type: "integer",
                    },
                },
                required: [
                    "admin_graphql_api_id",
                    "alt",
                    "created_at",
                    "height",
                    "id",
                    "position",
                    "product_id",
                    "src",
                    "updated_at",
                    "variant_ids",
                    "width",
                ],
                type: "object",
            },
        },
    },
    {
        topics: ["inventory_levels/connect", "inventory_levels/update"],
        schema: {
            admin_graphql_api_id: {
                format: "uri",
                type: "string",
            },
            available: {
                type: ["integer", "null"],
            },
            inventory_item_id: {
                type: "integer",
            },
            location_id: {
                type: "integer",
            },
            updated_at: {
                format: "date-time",
                type: "string",
            },
        },
        required: ["admin_graphql_api_id", "available", "inventory_item_id", "location_id", "updated_at"],
    },
    {
        topics: ["shipping_addresses/create", "shipping_addresses/update"],
        schema: {
            ...shippingAddress.properties,
        },
    },
    {
        topics: ["refunds/create"],
        schema: {
            return: {
                anyOf: [
                    {
                        type: "null",
                    },
                    {
                        properties: {
                            admin_graphql_api_id: {
                                format: "uri",
                                type: "string",
                            },
                            id: {
                                type: "integer",
                            },
                        },
                        required: ["admin_graphql_api_id", "id"],
                        type: "object",
                    },
                ],
            },
        },
    },
];
