# WorkforceIntelligence TypeScript SDK



The TypeScript SDK for the WorkforceIntelligence API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.Board()` — each with a small set of operations (`list`, `load`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Also generated from this model: `go`, `go-cli`, `go-mcp`, `lua`, `php`, `py`, `rb` — see
> the [top-level README](../README.md).


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`, see [Tags](https://github.com/voxgig-sdk/workforce-intelligence-sdk/tags)), or from a
clone, which carries the compiled `dist/`:

```bash
git clone https://github.com/voxgig-sdk/workforce-intelligence-sdk
npm install ./workforce-intelligence-sdk/ts
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { WorkforceIntelligenceSDK } from '@voxgig-sdk/workforce-intelligence-sdk'

const client = new WorkforceIntelligenceSDK()
```

### 2. List board records

`list()` resolves to an array of Board ENTITIES — every operation
resolves to entities, not raw records. Iterate them directly, and call
`.data()` on one for the record it holds:

```ts
const boards = await client.Board().list({ company: "example" })

for (const board of boards) {
  console.log(board.data())
}
```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const facet = await client.Facet().load({ company: "example" })
  console.log(facet.data())
} catch (err) {
  console.error('load failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
result envelope. Branch on `ok`; on failure `status` holds the HTTP status
(for error responses) and `err` holds the error:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (!result.ok) {
  console.error('request failed:', result.status, result.err)
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = WorkforceIntelligenceSDK.test()

const facet = await client.Facet().load({ company: 'example_company' })
// facet is the Facet entity; .data() reads its mock record
console.log(facet.data())
```

You can also use the instance method:

```ts
const client = new WorkforceIntelligenceSDK()
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.Facet()

// First call runs the operation and stores its result
await entity.load({ company: 'example_company' })

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data)
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new WorkforceIntelligenceSDK({
  extend: [logger],
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
WORKFORCE_INTELLIGENCE_TEST_LIVE=TRUE
```

Then run:

```bash
cd ts && npm test
```

Live entity tests continue independent operations after errors and attempt
supported cleanup. Their final result reports failures and missing prerequisites
after the remaining work completes. The model and test inputs determine which
API operations the generated scenarios cover.


## Reference

### WorkforceIntelligenceSDK

#### Constructor

```ts
new WorkforceIntelligenceSDK(options?: {
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `Board(data?)` | `BoardEntity` | Create a Board entity instance. |
| `Facet(data?)` | `FacetEntity` | Create a Facet entity instance. |
| `Health(data?)` | `HealthEntity` | Create a Health entity instance. |
| `Job(data?)` | `JobEntity` | Create a Job entity instance. |
| `JobPosting(data?)` | `JobPostingEntity` | Create a JobPosting entity instance. |
| `Organization(data?)` | `OrganizationEntity` | Create an Organization entity instance. |
| `tester(testopts?, sdkopts?)` | `WorkforceIntelligenceSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `WorkforceIntelligenceSDK.test(testopts?, sdkopts?)` | `WorkforceIntelligenceSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Entity>` | Load a single entity by match criteria, and return it. |
| `list` | `list(reqmatch?, ctrl?): Promise<Entity[]>` | List entities matching the criteria, one per record. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): WorkforceIntelligenceSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity itself — there is no result
envelope, and an entity's `data()` reads its record:

- `load` resolves to a single entity object.
- `list` resolves to an **array** of entity objects (iterate it directly;
  there is no `.data` and no `.ok`).

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

### Entities

#### Board

| Field | Description |
| --- | --- |
| `accepting_applicants` |  |
| `apply_url` |  |
| `company` |  |
| `department` |  |
| `employment_type` |  |
| `id` | Public job id. |
| `locations` |  |
| `posted_job_id` |  |
| `published_at` |  |
| `roles_to_fill` |  |
| `salary` | Any type; null in every probe, shape unverified. |
| `slug` |  |
| `source` |  |
| `source_url` |  |
| `title` |  |
| `updated_at` |  |
| `url_path` |  |
| `visa_sponsorship` | Any type; null in every probe, shape unverified. |
| `workplace_type` |  |

Operations: list.

API path: `/job-boards/{company}/board`

#### Facet

| Field | Description |
| --- | --- |
| `company` |  |
| `facets` |  |
| `meta` |  |

Operations: load.

API path: `/job-boards/{company}/facets`

#### Health

| Field | Description |
| --- | --- |
| `status` |  |
| `version` |  |

Operations: load.

API path: `/health`

#### Job

| Field | Description |
| --- | --- |
| `accepting_applicants` |  |
| `apply_url` |  |
| `company` | Board slug. |
| `department` |  |
| `employment_type` |  |
| `features` |  |
| `id` | Public job id. |
| `job` |  |
| `locations` |  |
| `meta` |  |
| `posted_job_id` |  |
| `published_at` |  |
| `roles_to_fill` |  |
| `salary` | Any type; null in every probe, shape unverified. |
| `slug` |  |
| `source` |  |
| `source_url` |  |
| `title` |  |
| `updated_at` |  |
| `url_path` |  |
| `visa_sponsorship` | Any type; null in every probe, shape unverified. |
| `workplace_type` |  |

Operations: list, load.

API path: `/job-boards/{company}/jobs`

#### JobPosting

| Field | Description |
| --- | --- |
| `bullets` |  |
| `paragraphs` |  |
| `title` |  |

Operations: list.

API path: `/job-boards/{company}/jobs/{idOrSlug}/json-ld`

#### Organization

| Field | Description |
| --- | --- |
| `banner_url` |  |
| `brand_color` |  |
| `company_type` |  |
| `contact_email` |  |
| `description` |  |
| `employee_count_range` |  |
| `features` |  |
| `founded_year` |  |
| `headquarters` |  |
| `headquarters_city` |  |
| `headquarters_country` |  |
| `id` |  |
| `industry` |  |
| `job_count` |  |
| `linkedin_url` |  |
| `logo_url` |  |
| `name` |  |
| `slug` |  |
| `updated_at` |  |
| `website_url` |  |

Operations: load.

API path: `/job-boards/{company}`



## Entities


### Board

Create an instance: `const board = client.Board()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `accepting_applicants` | `boolean` |  |
| `apply_url` | `string` |  |
| `company` | `Record<string, any>` |  |
| `department` | `string` |  |
| `employment_type` | `string` |  |
| `id` | `string` | Public job id. |
| `locations` | `any[]` |  |
| `posted_job_id` | `string` |  |
| `published_at` | `string` |  |
| `roles_to_fill` | `number` |  |
| `salary` | `any` | Any type; null in every probe, shape unverified. |
| `slug` | `string` |  |
| `source` | `Record<string, any>` |  |
| `source_url` | `string` |  |
| `title` | `string` |  |
| `updated_at` | `string` |  |
| `url_path` | `string` |  |
| `visa_sponsorship` | `any` | Any type; null in every probe, shape unverified. |
| `workplace_type` | `string` |  |

#### Example: List

```ts
const boards = await client.Board().list({ company: "example" })
```


### Facet

Create an instance: `const facet = client.Facet()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `company` | `string` |  |
| `facets` | `Record<string, any>` |  |
| `meta` | `Record<string, any>` |  |

#### Example: Load

```ts
const facet = await client.Facet().load({ company: 'company' })
```


### Health

Create an instance: `const health = client.Health()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `status` | `string` |  |
| `version` | `string` |  |

#### Example: Load

```ts
const health = await client.Health().load()
```


### Job

Create an instance: `const job = client.Job()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `accepting_applicants` | `boolean` |  |
| `apply_url` | `string` |  |
| `company` | `string` | Board slug. |
| `department` | `string` |  |
| `employment_type` | `string` |  |
| `features` | `Record<string, any>` |  |
| `id` | `string` | Public job id. |
| `job` | `any` |  |
| `locations` | `any[]` |  |
| `meta` | `Record<string, any>` |  |
| `posted_job_id` | `string` |  |
| `published_at` | `string` |  |
| `roles_to_fill` | `number` |  |
| `salary` | `any` | Any type; null in every probe, shape unverified. |
| `slug` | `string` |  |
| `source` | `Record<string, any>` |  |
| `source_url` | `string` |  |
| `title` | `string` |  |
| `updated_at` | `string` |  |
| `url_path` | `string` |  |
| `visa_sponsorship` | `any` | Any type; null in every probe, shape unverified. |
| `workplace_type` | `string` |  |

#### Example: Load

```ts
const job = await client.Job().load({ id: 'job_id', company: 'company' })
```

#### Example: List

```ts
const jobs = await client.Job().list({ company: "example" })
```


### JobPosting

Create an instance: `const job_posting = client.JobPosting()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `bullets` | `any[]` |  |
| `paragraphs` | `any[]` |  |
| `title` | `string` |  |

#### Example: List

```ts
const job_postings = await client.JobPosting().list({ company: "example", id_or_slug: "example" })
```


### Organization

Create an instance: `const organization = client.Organization()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `banner_url` | `string` |  |
| `brand_color` | `string` |  |
| `company_type` | `string` |  |
| `contact_email` | `string` |  |
| `description` | `string` |  |
| `employee_count_range` | `string` |  |
| `features` | `Record<string, any>` |  |
| `founded_year` | `number` |  |
| `headquarters` | `string` |  |
| `headquarters_city` | `string` |  |
| `headquarters_country` | `string` |  |
| `id` | `string` |  |
| `industry` | `string` |  |
| `job_count` | `number` |  |
| `linkedin_url` | `string` |  |
| `logo_url` | `string` |  |
| `name` | `string` |  |
| `slug` | `string` |  |
| `updated_at` | `string` |  |
| `website_url` | `string` |  |

#### Example: Load

```ts
const organization = await client.Organization().load({ company: 'company' })
```

## Features

This SDK ships 4 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`ratelimit`](#ratelimit) | Rate limiting |
| [`retry`](#retry) | Retry |
| [`test`](#test) | Test transport |
| [`timeout`](#timeout) | Timeout |

> **Order matters for `ratelimit`, `retry`, `timeout`.** These wrap the
> transport, so each one wraps whatever is already installed: the order you
> activate them in IS the nesting order. Activating them as an ordered list
> rather than a map is what fixes that order.

### ratelimit

Rate limiting.

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

Set `feature.ratelimit.active` to enable it, then override any of the options above.

`ratelimit` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### retry

Retry.

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

Set `feature.retry.active` to enable it, then override any of the options above.

`retry` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### test

Test transport.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.

### timeout

Timeout.

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

Set `feature.timeout.active` to enable it, then override any of the options above.

`timeout` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **RatelimitFeature**: Rate limiting
- **RetryFeature**: Retry
- **TestFeature**: Test transport
- **TimeoutFeature**: Timeout

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
workforce-intelligence/
├── src/
│   ├── WorkforceIntelligenceSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { WorkforceIntelligenceSDK } from '@voxgig-sdk/workforce-intelligence-sdk'
```

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const facet = client.Facet()
await facet.load({ company: "example" })

// facet.data() now returns the facet data from the last `load`
// facet.match() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
