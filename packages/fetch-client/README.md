# Fetch Client

A minimal `fetch` client for the browser that includes response validation via [Zod](https://www.npmjs.com/package/zod),
and retrying on network failures via [p-retry](https://www.npmjs.com/package/p-retry).

## Installation

```sh
npm install @mando75/fetch-client
pnpm install @mando75/fetch-client
yarn add @mando75/fetch-client
```

## Usage

Fetch Client provides a simple way to make requests to an API and validate the response using Zod.
It accepts the same arguments as `fetch` but with some additional properties in the `options` argument.

* `schema` - A [Zod](https://www.npmjs.com/package/zod) schema to validate the response. If no schema is provided,
  fetchClient will return the full response object.
* `retryOptions` - Arguments to configure [p-retry](https://www.npmjs.com/package/p-retry). Defaults to 3 retries.

```ts
import {fetchClient} from '@mando75/fetch-client';
import {z} from 'zod';

const responseSchema = z.object({
    id: z.number(),
    name: z.string(),
});

// Pass a zod schema to fetchClient to validate the response automatically
const parsedResponse = await fetchClient('https://your-api.example', {method: 'GET', schema: responseSchema});

console.log(parsedResponse.id);
console.log(parsedResponse.name);

// Omit the schema parameter to get the full response object
const unparsedResponse = await fetchClient('https://your-api.example', {
    method: 'POST',
    body: JSON.stringify({foo: 'bar'})
});
if (unparsedResponse.ok) {
    const json = await unparsedResponse.json();
}

```




    