import { promises as fs } from "fs";
import { inferSchema } from "@jsonhero/schema-infer";
import cheerio from "cheerio";
import got from "got";
import { cloneDeep, isEqual, isNull, template, uniq } from "lodash";
import path from "path";
import { getPackageRootDir } from "src";

const startVersion = "2024-04";

function assert<T>(value: T | false | undefined | null, message?: string): T {
  if (!value) {
    throw new Error(message ?? "value is not truthy");
  }
  return value;
}

/**
 * This script fetches shopify's docs for all their webhook topics, and dumps json schemas for each topic inferred from the example payloads
 */
const loadRailsData = async (url: string) => {
  const shopifyDocsSource = await got(url);
  const $ = cheerio.load(shopifyDocsSource.body);
  const scriptTag = assert(
    $("script")
      .toArray()
      .find((script) => $(script).html()?.includes("window.RailsData")),
    "expected to find window.RailsData script tag in shopify source but couldn't"
  );

  const scriptText = $(scriptTag).html()!;
  const jsonMatch = scriptText.match(/window\.RailsData = (\{[\s\S]*?\}\s*)\/\/\]\]/m);
  if (!jsonMatch) {
    throw new Error("RailsData object literal not found in script tag or is in an unexpected format");
  }
  return JSON.parse(jsonMatch[1]);
};

const docsWebhooksPageForVersion = (version: string) => `https://shopify.dev/docs/api/admin-rest/${version}/resources/webhook#event-topics`;

let warnings = 0;

const inferSchemaFromExamplePayload = (examplePayload: Record<string, any>, metadata: { name: string }) => {
  const inference = inferSchema(examplePayload)

  // build a copy of the payload and apply overrides based on the webhook name
  const overridesPayload = cloneDeep(examplePayload)
  for (const [matcher, override] of overrides) {
    if (matcher.test(metadata.name)) {
      for (const [key, value] of Object.entries(override)) {
        if (key in overridesPayload && isNull(overridesPayload[key])) {
          overridesPayload[key] = value
        }
      }
    }
  }
  inference.infer(overridesPayload)

  const schema = {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    ...(inference.toJSONSchema() as any)
  }

  for (const [key, value] of Object.entries(schema.properties)) {
    if (isEqual(value, { type: "null" })) {
      warnings += 1
      console.log(`schema warning: null value found in example payload for ${metadata.name} at key ${key}`)
    }
  }

  return schema;
}

const main = async () => {
  const rootDir = getPackageRootDir();
  const rootPage = await loadRailsData(docsWebhooksPageForVersion(startVersion));
  const versions = uniq([startVersion, ...rootPage.api.selectable_versions]).filter((version) => version != "unstable");

  for (const version of versions) {
    const page = await loadRailsData(docsWebhooksPageForVersion(version));
    const webhooks = assert(page.api.rest_resource.info["x-description-list"]["items"]);
    console.log(`Loaded ${webhooks.length} webhooks for version ${version}`)

    for (const webhook of webhooks) {
      webhook.response = JSON.parse(webhook.response);
      const metadataFile = path.join(rootDir, 'metadatas', version, webhook.name + ".json");
      await fs.mkdir(path.dirname(metadataFile), { recursive: true });
      await fs.writeFile(metadataFile, JSON.stringify(webhook, null, 2), "utf-8");

      const schema = inferSchemaFromExamplePayload(webhook.response, webhook);

      const schemaFile = path.join(rootDir, 'schemas', version, webhook.name + ".json");
      await fs.mkdir(path.dirname(schemaFile), { recursive: true });
      await fs.writeFile(schemaFile, JSON.stringify(schema, null, 2), "utf-8");
    }
  }

  if (warnings > 0) {
    console.log(`Done with ${warnings} warnings`);
    process.exitCode = 1;
  } else {
    console.log(`Done`);
  }
};

void main();


const overrides: [RegExp, Record<string, any>][] = [
  [/.+/, {
    admin_graphql_api_id: "gid://shopify/Something/1234567890",
    admin_graphql_api_job_id: "gid://shopify/Job/1234567890",
    created_at: "2021-12-30T19:00:00-05:00",
    updated_at: "2021-12-30T19:00:00-05:00",
    address2: "Apt 123",
    latitude: 10.1,
    longitude: 10.1,
    location_id: 111111,
  }],
  [/(app|shop)\/.+/, {
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
  }],
  [/bulk_operations\/.+/, {
    error_code: "SOME_ERROR_ENUM"
  }],
  [/carts\/.+/, {
    note: "some cart note string"
  }],
  [/(checkouts|orders)\/.+/, {
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
      "accept_language": "en-US,en;q=0.9",
      "browser_height": 800,
    },
    confirmation_number: "some_confirmation_number",
    current_total_additional_fees_set: {
      "shop_money": {
        "amount": "0.00",
        "currency_code": "USD"
      },
      "presentment_money": {
        "amount": "0.00",
        "currency_code": "USD"
      }
    },
    current_total_duties_set: {
      "shop_money": {
        "amount": "0.00",
        "currency_code": "USD"
      },
      "presentment_money": {
        "amount": "0.00",
        "currency_code": "USD"
      }
    },
    original_total_additional_fees_set: {
      "shop_money": {
        "amount": "0.00",
        "currency_code": "USD"
      },
      "presentment_money": {
        "amount": "0.00",
        "currency_code": "USD"
      }
    },
    original_total_duties_set: {
      "shop_money": {
        "amount": "0.00",
        "currency_code": "USD"
      },
      "presentment_money": {
        "amount": "0.00",
        "currency_code": "USD"
      }
    },
    checkout_token: "some_checkout_token",
    landing_site_ref: "https://example.com",
    merchant_of_record_app_id: 12345,
    po_number: "some_po_number",
    processed_at: "2021-12-30T19:00:00-05:00",
    reference: "some_reference",
    payment_terms: "some_payment_terms",
    reservation_token: "some_reservation_token",
  }],
  [/collections\/.+/, {
    sort_order: "manual",
    template_suffix: "some_template_suffix",
  }],
  [/company_locations\/.+/, {
    buyer_experience_configuration: { pay_now_only: true }
  }],
  [/customers\/.+/, {
    last_order_id: 12345,
    multipass_identifier: "some_multipass_identifier",
    last_order_name: "Foobar",
    phone: "+1 (123) 456 7890",
    sms_marketing_consent: false,
    email_marketing_consent: false,
    accepts_marketing_updated_at: "2021-12-30T19:00:00-05:00",
    marketing_opt_in_level: "single_opt_in",
  }],
  [/customer_account_settings\/.+/, {
    url: "https://example.com",
  }],
  [/customer.+consent\/.+/, {
    phone: "+1 (123) 456 7890",
    email_address: "test@test.com"
  }],
  [/disputes\/.+/, {
    evidence_sent_on: "2021-12-30T19:00:00-05:00",
    finalized_on: "2021-12-30T19:00:00-05:00",
  }],
  [/draft_orders\/.+/, {
    invoice_sent_at: "2021-12-30T19:00:00-05:00",
    order_id: 12345,
  }],
  [/fulfillment_events\/.+/, {
    city: "Ottawa",
    province: "ON",
    zip: "K1P1J1",
    address1: "150 Elgin St",
    estimated_delivery_at: "2021-12-30T19:00:00-05:00",
  }],
  [/fulfillment_orders\/.+/, {
    remaining_fulfillment_order: {
      "id": 5859333242902,
      "shop_id": 20978040854,
      "order_id": 4804938989590,
      "assigned_location_id": 67794436118,
      "request_status": "unsubmitted",
      "status": "open",
      "supported_actions": [
        "request_fulfillment",
        "hold",
        "move"
      ],
      "destination": {
        "id": 5479404371990,
        "address1": "23 Hassall Street",
        "address2": "",
        "city": "Parramatta",
        "company": null,
        "country": "Australia",
        "email": "",
        "first_name": "Tyler",
        "last_name": "Kelleher",
        "phone": null,
        "province": "New South Wales",
        "zip": "2150"
      },
      "line_items": [
        {
          "id": 12675478814742,
          "shop_id": 20978040854,
          "fulfillment_order_id": 5859333242902,
          "quantity": 1,
          "line_item_id": 12553770336278,
          "inventory_item_id": 44276125368342,
          "fulfillable_quantity": 1,
          "variant_id": 42182036422678
        }
      ],
      "fulfill_at": "2022-10-13T13:00:00-04:00",
      "fulfill_by": null,
      "international_duties": {
        "incoterm": "DAP"
      },
      "fulfillment_holds": [

      ],
      "delivery_method": {
        "id": 140816351254,
        "method_type": "shipping",
        "min_delivery_date_time": null,
        "max_delivery_date_time": null
      },
      "assigned_location": {
        "address1": null,
        "address2": null,
        "city": null,
        "country_code": "CA",
        "location_id": 67794436118,
        "name": "test-created-via-api-2",
        "phone": null,
        "province": null,
        "zip": null
      },
    }
  }],
  [/fulfillments\/.+/, {
    service: "manual",
    shipment_status: "confirmed",

    origin_address: {
      "first_name": "Steve",
      "address1": "123 Shipping Street",
      "phone": "555-555-SHIP",
      "city": "Shippington",
      "zip": "40003",
      "province": "Kentucky",
      "country": "United States",
      "last_name": "Shipper",
      "address2": null,
      "company": "Shipping Company",
      "latitude": null,
      "longitude": null,
      "name": "Steve Shipper",
      "country_code": "US",
      "province_code": "KY"
    }
  }],
  [/inventory_items\/.+/, {
    cost: 10.11,
    country_code_of_origin: "CA",
    province_code_of_origin: "CA",
    harmonized_system_code: "1234567890",
  }],
  [/inventory_levels\/.+/, {
    available: 10,
  }],
  [/order_transactions\/.+/, {
    message: "some message from the gateway",
    user_id: 12345,
    parent_id: 12345,
    processed_at: "2021-12-30T19:00:00-05:00",
    device_id: "some_device_id",
    error_code: "SOME_ERROR_ENUM",
  }],
  [/orders\/risk_assessment.+/, {
    provider_id: 12345,
    provider_title: "whatever",
  }],
  [/products\/.+/, {
    template_suffix: "something",
    image: "gid://shopify/ProductImage/1234567890",
  }],
  [/refunds\/.+/, {
    return: "unknown",
  }],
  [/selling_plan_groups\/.+/, {
    app_id: 12345,
    description: "some description",
    position: 1
  }],
  [/subscription_billing_attempts\/.+/, {
    id: 12345,
    error_message: "some error message",
    error_code: "some error copde",
  }],
  [/subscription_billing_cycle.+/, {
    contract_edit: "some contract edit",
  }],
  [/tender_transactions\/.+/, {
    user_id: 12345,
    processed_at: "2021-12-30T19:00:00-05:00",
    payment_details: { something: "true" },
  }],
]