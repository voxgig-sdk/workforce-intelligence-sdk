# WorkforceIntelligence PHP SDK



The PHP SDK for the WorkforceIntelligence API — an entity-oriented client using PHP conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `$client->Board()` — with named operations (`list`/`load`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to Packagist. Install it from the
GitHub release tag (`php/vX.Y.Z`, see [Tags](https://github.com/voxgig-sdk/workforce-intelligence-sdk/tags)), or
from a clone as a Composer path repository:

```bash
git clone https://github.com/voxgig-sdk/workforce-intelligence-sdk
composer config repositories.workforce-intelligence-sdk path ./workforce-intelligence-sdk/php
composer require voxgig-sdk/workforce-intelligence-sdk:@dev
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```php
<?php
require_once 'workforceintelligence_sdk.php';

$client = new WorkforceIntelligenceSDK();
```

### 2. List board records

```php
try {
    // list() returns entity instances; data_get() reads each record.
    $boards = $client->Board()->list(["company" => "example"]);
    foreach ($boards as $record) {
        $item = $record->data_get();
        echo $item["id"] . " " . $item["accepting_applicants"] . "\n";
    }
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```


## Error handling

Entity operations throw a `\Throwable` on failure, so wrap them in
`try` / `catch`:

```php
try {
    $facet = $client->Facet()->load(["company" => "example"]);
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

`direct()` does **not** throw — it returns the result array. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```php
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example_id"],
]);

if (! $result["ok"]) {
    $err = $result["err"] ?? null;
    echo "request failed: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```php
// direct() is the raw-HTTP escape hatch: it returns a result array
// (it does not throw). Branch on $result["ok"].
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);

if ($result["ok"]) {
    echo $result["status"];  // 200
    print_r($result["data"]);  // response body
} else {
    // On an HTTP error status there is no err (only a transport failure sets
    // it), so fall back to the status code.
    $err = $result["err"] ?? null;
    echo "Error: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```

### Prepare a request without sending it

```php
// prepare() throws on error and returns the fetch definition.
$fetchdef = $client->prepare([
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => ["id" => "example"],
]);

echo $fetchdef["url"];
echo $fetchdef["method"];
print_r($fetchdef["headers"]);
```

### Use test mode

Create a mock client for unit testing — no server required. Seed fixture
data via the `entity` option so offline calls resolve without a live server:

```php
$client = WorkforceIntelligenceSDK::test([
    "entity" => ["job" => ["test01" => ["id" => "test01", "company" => "example"]]],
]);

// list() returns entity instances (throws on error);
// call data_get() for the mock record.
$job = $client->Job()->list(["company" => "example"]);
print_r(array_map(fn($item) => $item->data_get(), $job));
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```php
$mock_fetch = function ($url, $init) {
    return [
        [
            "status" => 200,
            "statusText" => "OK",
            "headers" => [],
            "json" => function () { return ["id" => "mock01"]; },
        ],
        null,
    ];
};

$client = new WorkforceIntelligenceSDK([
    "base" => "http://localhost:8080",
    "system" => [
        "fetch" => $mock_fetch,
    ],
]);
```

### Run live tests

Create a `.env.local` file at the project root:

```
WORKFORCE_INTELLIGENCE_TEST_LIVE=TRUE
```

Then run:

```bash
cd php && ./vendor/bin/phpunit test/
```


## Reference

### WorkforceIntelligenceSDK

```php
require_once 'workforceintelligence_sdk.php';
$client = new WorkforceIntelligenceSDK($options);
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `array` | Feature activation flags. |
| `extend` | `array` | Additional Feature instances to load. |
| `system` | `array` | System overrides (e.g. custom `fetch` callable). |

### test

```php
$client = WorkforceIntelligenceSDK::test($testopts, $sdkopts);
```

Creates a test-mode client with mock transport. Both arguments may be `null`.

### WorkforceIntelligenceSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `(): array` | Deep copy of current SDK options. |
| `get_utility` | `(): Utility` | Copy of the SDK utility object. |
| `prepare` | `(array $fetchargs): array` | Build an HTTP request definition without sending. |
| `direct` | `(array $fetchargs): array` | Build and send an HTTP request. |
| `Board` | `($data): BoardEntity` | Create a Board entity instance. |
| `Facet` | `($data): FacetEntity` | Create a Facet entity instance. |
| `Health` | `($data): HealthEntity` | Create a Health entity instance. |
| `Job` | `($data): JobEntity` | Create a Job entity instance. |
| `JobPosting` | `($data): JobPostingEntity` | Create a JobPosting entity instance. |
| `Organization` | `($data): OrganizationEntity` | Create an Organization entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `($reqmatch, $ctrl): mixed` | Load a single entity by match criteria, and return it. |
| `list` | `(?array $reqmatch = null, $ctrl): mixed` | List entities matching the criteria (call with no argument to list all), one per record. |
| `data_get` | `(): array` | Get entity data. |
| `data_set` | `($data): void` | Set entity data. |
| `match_get` | `(): array` | Get entity match criteria. |
| `match_set` | `($match): void` | Set entity match criteria. |
| `make` | `(): Entity` | Create a new instance with the same options. |
| `get_name` | `(): string` | Return the entity name. |

### Result shape

Entity operations return the entity, and `list` an `array` of entities, one
per record; an entity's `data_get()` reads its record (an `array`). They
throw on error, so wrap calls in `try`/`catch` to handle failures.

The `direct()` escape hatch never throws — it returns a result `array`
you branch on via `$result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `true` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `array` | Response headers. |
| `data` | `mixed` | Parsed JSON response body. |

On error, `ok` is `false` and `$err` contains the error value.

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

Operations: List.

API path: `/job-boards/{company}/board`

#### Facet

| Field | Description |
| --- | --- |
| `company` |  |
| `facets` |  |
| `meta` |  |

Operations: Load.

API path: `/job-boards/{company}/facets`

#### Health

| Field | Description |
| --- | --- |
| `status` |  |
| `version` |  |

Operations: Load.

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

Operations: List, Load.

API path: `/job-boards/{company}/jobs`

#### JobPosting

| Field | Description |
| --- | --- |
| `bullets` |  |
| `paragraphs` |  |
| `title` |  |

Operations: List.

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

Operations: Load.

API path: `/job-boards/{company}`



## Entities


### Board

Create an instance: `$board = $client->Board();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `accepting_applicants` | `bool` |  |
| `apply_url` | `string` |  |
| `company` | `array` |  |
| `department` | `string` |  |
| `employment_type` | `string` |  |
| `id` | `string` | Public job id. |
| `locations` | `array` |  |
| `posted_job_id` | `string` |  |
| `published_at` | `string` |  |
| `roles_to_fill` | `int` |  |
| `salary` | `mixed` | Any type; null in every probe, shape unverified. |
| `slug` | `string` |  |
| `source` | `array` |  |
| `source_url` | `string` |  |
| `title` | `string` |  |
| `updated_at` | `string` |  |
| `url_path` | `string` |  |
| `visa_sponsorship` | `mixed` | Any type; null in every probe, shape unverified. |
| `workplace_type` | `string` |  |

#### Example: List

```php
// list() returns an array of Board entities, one per record (throws on error).
$boards = $client->Board()->list(["company" => "example"]);
```


### Facet

Create an instance: `$facet = $client->Facet();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `company` | `string` |  |
| `facets` | `array` |  |
| `meta` | `array` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Facet record (throws on error).
$facet = $client->Facet()->load(["company" => "company"]);
```


### Health

Create an instance: `$health = $client->Health();`

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

```php
// load() returns the ENTITY — call data_get() for the Health record (throws on error).
$health = $client->Health()->load();
```


### Job

Create an instance: `$job = $client->Job();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `accepting_applicants` | `bool` |  |
| `apply_url` | `string` |  |
| `company` | `string` | Board slug. |
| `department` | `string` |  |
| `employment_type` | `string` |  |
| `features` | `array` |  |
| `id` | `string` | Public job id. |
| `job` | `mixed` |  |
| `locations` | `array` |  |
| `meta` | `array` |  |
| `posted_job_id` | `string` |  |
| `published_at` | `string` |  |
| `roles_to_fill` | `int` |  |
| `salary` | `mixed` | Any type; null in every probe, shape unverified. |
| `slug` | `string` |  |
| `source` | `array` |  |
| `source_url` | `string` |  |
| `title` | `string` |  |
| `updated_at` | `string` |  |
| `url_path` | `string` |  |
| `visa_sponsorship` | `mixed` | Any type; null in every probe, shape unverified. |
| `workplace_type` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Job record (throws on error).
$job = $client->Job()->load(["id" => "job_id", "company" => "company"]);
```

#### Example: List

```php
// list() returns an array of Job entities, one per record (throws on error).
$jobs = $client->Job()->list(["company" => "example"]);
```


### JobPosting

Create an instance: `$job_posting = $client->JobPosting();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `bullets` | `array` |  |
| `paragraphs` | `array` |  |
| `title` | `string` |  |

#### Example: List

```php
// list() returns an array of JobPosting entities, one per record (throws on error).
$job_postings = $client->JobPosting()->list(["company" => "example", "id_or_slug" => "example"]);
```


### Organization

Create an instance: `$organization = $client->Organization();`

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
| `features` | `array` |  |
| `founded_year` | `int` |  |
| `headquarters` | `string` |  |
| `headquarters_city` | `string` |  |
| `headquarters_country` | `string` |  |
| `id` | `string` |  |
| `industry` | `string` |  |
| `job_count` | `int` |  |
| `linkedin_url` | `string` |  |
| `logo_url` | `string` |  |
| `name` | `string` |  |
| `slug` | `string` |  |
| `updated_at` | `string` |  |
| `website_url` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Organization record (throws on error).
$organization = $client->Organization()->load(["company" => "company"]);
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

Features are the extension mechanism. A feature is a PHP class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **RatelimitFeature**: Rate limiting
- **RetryFeature**: Retry
- **TestFeature**: Test transport
- **TimeoutFeature**: Timeout

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as arrays

The PHP SDK uses plain PHP associative arrays throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers::to_map()` to safely validate that a value is an array.

### Directory structure

```
php/
├── workforceintelligence_sdk.php          -- Main SDK class
├── config.php                     -- Configuration
├── schema.php                     -- Generated option + entity specs
├── features.php                   -- Feature factory
├── core/                          -- Core types and context
├── entity/                        -- Entity implementations
├── feature/                       -- Built-in features (Base, Test, Log)
├── utility/                       -- Utility functions and struct library
└── test/                          -- Test suites
```

The main class (`workforceintelligence_sdk.php`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```php
$facet = $client->Facet();
$facet->load(["company" => "example"]);

// $facet->data_get() now returns the facet data from the last load
// $facet->match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
