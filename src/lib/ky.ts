import ky, { type KyInstance } from 'ky';

const DEFAULT_TIMEOUT_MS = 10000; // 10 seconds
const DEFAULT_JSON_HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

interface KyFetchOptions {
  headers?: HeadersInit;
  revalidate?: number;
  tags?: string[];
  credentials?: RequestCredentials;
  cookieHeader?: string;
  timeout?: number;
  signal?: AbortSignal;
}

const fetchOverride =
  ({
    credentials,
    revalidate,
    tags,
  }: {
    credentials?: RequestCredentials;
    revalidate?: number;
    tags?: string[];
  }): typeof fetch =>
  async (input: RequestInfo | URL, init: RequestInit | undefined): Promise<Response> => {
    const response = await fetch(input, {
      ...init,
      next: {
        ...(credentials ? { credentials } : {}),
        ...(revalidate === undefined ? {} : { revalidate }),
        ...(tags && { tags }),
      },
      keepalive: true,
    });

    return response;
  };

export const kyFetch = (options: KyFetchOptions = {}): KyInstance => {
  const {
    headers,
    revalidate,
    tags,
    credentials = 'same-origin',
    timeout = DEFAULT_TIMEOUT_MS,
    signal,
  } = options;

  return ky.extend({
    headers: {
      ...DEFAULT_JSON_HEADERS,
      ...headers,
    },
    fetch: fetchOverride({ credentials, revalidate, tags }),
    timeout,
    ...(signal ? { signal } : {}),
  });
};
