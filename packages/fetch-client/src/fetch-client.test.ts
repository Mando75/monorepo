import { describe, afterEach, it, expect, vi } from "vitest";
import { z } from "zod";
import { fetchClient } from "./fetch-client.js";

describe("fetch-client", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.clearAllMocks();
  });

  it("should return a raw response if no schema is provided", async () => {
    vi.stubGlobal("fetch", () =>
      Promise.resolve(new Response('{"foo": "bar"}')),
    );

    const response = await fetchClient("/foo");
    expect(response instanceof Response).toBe(true);
    expect(await response.json()).toEqual({ foo: "bar" });
  });

  it("should parse a response using a schema if provided", async () => {
    vi.stubGlobal("fetch", () =>
      Promise.resolve(new Response('{"foo": "bar"}')),
    );

    await expect(
      fetchClient("/foo", {
        schema: z.object({ foo: z.string() }),
      }),
    ).resolves.toEqual({ foo: "bar" });
  });

  it("should retry if a 5xx status code is returned", async () => {
    const fetchStub = vi.fn(() =>
      Promise.resolve(
        new Response("Internal Server Error", {
          status: 500,
          statusText: "Internal Server Error",
        }),
      ),
    );
    vi.stubGlobal("fetch", fetchStub);

    await expect(
      fetchClient("/foo", { retryOptions: { minTimeout: 0 } }),
    ).rejects.toThrow("Internal Server Error");
    expect(fetchStub).toHaveBeenCalledTimes(4);
  });

  it("should throw a FetchClientError if the response is a client error", async () => {
    vi.stubGlobal("fetch", () =>
      Promise.resolve(
        new Response("Not Found", {
          status: 404,
          statusText: "Not Found",
        }),
      ),
    );

    await expect(fetchClient("/foo")).rejects.toThrow("Not Found");
  });
});
