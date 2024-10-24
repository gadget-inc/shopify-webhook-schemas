export declare function startDecoding(
  stream: ReadableStream<Uint8Array>,
  context: {
    __reactRouterContext: {
      streamController: ReadableStreamController<Uint8Array> | undefined;
    };
  }
): Promise<any>;
