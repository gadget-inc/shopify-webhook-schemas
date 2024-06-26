export declare function getPackageRootDir(): string;
/** Return a metadata blob from Shopify's docs describing a webhook topic */
export declare function metadataForWebhook(apiVersion: string, topic: string): any;
/** Return the inferred JSON schema describing a webhook payload */
export declare function schemaForWebhook(apiVersion: string, topic: string): any;
/** Return all the known webhook topics */
export declare function allTopicsForVersion(apiVersion: string): string[];
