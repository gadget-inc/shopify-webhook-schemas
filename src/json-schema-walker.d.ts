declare module "@cloudflare/json-schema-walker" {
  export type Walker = (schema: any, path: string[], parent: any, parentPath: string[]) => void;
  export function schemaWalk(schema: any, preFunc: Walker | null, postFunc: Walker | null, vocabulary: string): void;
  export function getVocabulary(schema: any): string;
}
