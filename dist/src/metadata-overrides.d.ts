export declare const normalizeWebhookAccessScopes: (topic: string, accessScopes: string[] | undefined) => string[] | undefined;
export declare const supplementalWebhookTopics: (version: string) => {
    name: string;
    accessScopes: string[];
    availableOn: string[];
    description: string;
    relatedResource: string;
    examples: {
        tabs: {
            code: string;
        }[];
    }[];
}[];
