export declare const getStartVersion: (date?: Date) => string;
export type Error = {
    message: string;
    path: string;
};
export declare const inferSchemaFromExamplePayload: (version: string, examplePayload: Record<string, any>, metadata: {
    name: string;
}) => {
    schema: any;
    warnings: number;
    errors: Error[];
};
export declare const manualExamples: [RegExp, Record<string, any>][];
export declare const overrides: {
    topics: string[];
    schema: any;
    required?: string[];
    versions?: string[];
}[];
