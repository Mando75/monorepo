import { ZodSchema } from "zod";
import pRetry from "p-retry";
import type { Options as PRetryOptions } from "p-retry";

export class FetchClientError extends Error {
  constructor(
    message: string,
    public readonly response: Response,
  ) {
    super(message);
    this.cause = response;
  }
}

export async function fetchClient<TResponse = Response>(
  destination: RequestInfo | URL,
  options?: RequestInit & {
    schema?: ZodSchema<TResponse>;
    retryOptions?: PRetryOptions;
  },
): Promise<TResponse> {
  const exec = async (): Promise<TResponse> => {
    const response = await fetch(destination, options);
    if (!response.ok) {
      throw new FetchClientError(response.statusText, response);
    }
    if (!options?.schema) {
      return response as TResponse;
    }
    return options?.schema?.parseAsync(await response.json());
  };

  return pRetry(exec, {
    retries: 3,
    signal: options?.signal ?? undefined,
    shouldRetry: (error) => {
      if (error instanceof FetchClientError) {
        return error.response.status >= 500;
      }
      return false;
    },
    ...options?.retryOptions,
  });
}

export default fetchClient;
