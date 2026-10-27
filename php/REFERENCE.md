# WorkforceIntelligence PHP SDK Reference

Complete API reference for the WorkforceIntelligence PHP SDK.


## WorkforceIntelligenceSDK

### Constructor

```php
require_once __DIR__ . '/workforceintelligence_sdk.php';

$client = new WorkforceIntelligenceSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `WorkforceIntelligenceSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = WorkforceIntelligenceSDK::test();
```


### Instance Methods

#### `Board($data = null)`

Create a new `BoardEntity` instance. Pass `null` for no initial data.

#### `Facet($data = null)`

Create a new `FacetEntity` instance. Pass `null` for no initial data.

#### `Health($data = null)`

Create a new `HealthEntity` instance. Pass `null` for no initial data.

#### `Job($data = null)`

Create a new `JobEntity` instance. Pass `null` for no initial data.

#### `JobPosting($data = null)`

Create a new `JobPostingEntity` instance. Pass `null` for no initial data.

#### `Organization($data = null)`

Create a new `OrganizationEntity` instance. Pass `null` for no initial data.

#### `options_map(): array`

Return a deep copy of the current SDK options.

#### `get_utility(): WorkforceIntelligenceUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## BoardEntity

```php
$board = $client->Board();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accepting_applicants` | `bool` | No |  |
| `apply_url` | `string` | No |  |
| `company` | `array` | No |  |
| `department` | `string` | No |  |
| `employment_type` | `string` | No |  |
| `id` | `string` | Yes | Public job id. |
| `locations` | `array` | No |  |
| `posted_job_id` | `string` | No |  |
| `published_at` | `string` | No |  |
| `roles_to_fill` | `int` | No |  |
| `salary` | `mixed` | No | Any type; null in every probe, shape unverified. |
| `slug` | `string` | Yes |  |
| `source` | `array` | No |  |
| `source_url` | `string` | No |  |
| `title` | `string` | Yes |  |
| `updated_at` | `string` | No |  |
| `url_path` | `string` | No |  |
| `visa_sponsorship` | `mixed` | No | Any type; null in every probe, shape unverified. |
| `workplace_type` | `string` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->Board()->list(["company" => "example"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): BoardEntity`

Create a new `BoardEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## FacetEntity

```php
$facet = $client->Facet();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `company` | `string` | No |  |
| `facets` | `array` | Yes |  |
| `meta` | `array` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->Facet()->load(["company" => "company"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): FacetEntity`

Create a new `FacetEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## HealthEntity

```php
$health = $client->Health();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `status` | `string` | Yes |  |
| `version` | `string` | Yes |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->Health()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): HealthEntity`

Create a new `HealthEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## JobEntity

```php
$job = $client->Job();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accepting_applicants` | `bool` | No |  |
| `apply_url` | `string` | No |  |
| `company` | `string` | No | Board slug. |
| `department` | `string` | No |  |
| `employment_type` | `string` | No |  |
| `features` | `array` | No |  |
| `id` | `string` | Yes | Public job id. |
| `job` | `mixed` | Yes |  |
| `locations` | `array` | No |  |
| `meta` | `array` | No |  |
| `posted_job_id` | `string` | No |  |
| `published_at` | `string` | No |  |
| `roles_to_fill` | `int` | No |  |
| `salary` | `mixed` | No | Any type; null in every probe, shape unverified. |
| `slug` | `string` | Yes |  |
| `source` | `array` | No |  |
| `source_url` | `string` | No |  |
| `title` | `string` | Yes |  |
| `updated_at` | `string` | No |  |
| `url_path` | `string` | No |  |
| `visa_sponsorship` | `mixed` | No | Any type; null in every probe, shape unverified. |
| `workplace_type` | `string` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->Job()->list(["company" => "example"]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->Job()->load(["id" => "job_id", "company" => "company"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): JobEntity`

Create a new `JobEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## JobPostingEntity

```php
$job_posting = $client->JobPosting();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bullets` | `array` | No |  |
| `paragraphs` | `array` | No |  |
| `title` | `string` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->JobPosting()->list(["company" => "example", "id_or_slug" => "example"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): JobPostingEntity`

Create a new `JobPostingEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## OrganizationEntity

```php
$organization = $client->Organization();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `banner_url` | `string` | No |  |
| `brand_color` | `string` | No |  |
| `company_type` | `string` | No |  |
| `contact_email` | `string` | No |  |
| `description` | `string` | No |  |
| `employee_count_range` | `string` | No |  |
| `features` | `array` | No |  |
| `founded_year` | `int` | No |  |
| `headquarters` | `string` | No |  |
| `headquarters_city` | `string` | No |  |
| `headquarters_country` | `string` | No |  |
| `id` | `string` | Yes |  |
| `industry` | `string` | No |  |
| `job_count` | `int` | No |  |
| `linkedin_url` | `string` | No |  |
| `logo_url` | `string` | No |  |
| `name` | `string` | Yes |  |
| `slug` | `string` | Yes |  |
| `updated_at` | `string` | No |  |
| `website_url` | `string` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->Organization()->load(["company" => "company"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): OrganizationEntity`

Create a new `OrganizationEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `ratelimit` | 0.0.1 | Rate limiting |
| `retry` | 0.0.1 | Retry |
| `test` | 0.0.1 | Test transport |
| `timeout` | 0.0.1 | Timeout |


Features are activated via the `feature` option:

```php
$client = new WorkforceIntelligenceSDK([
  "feature" => [
    "ratelimit" => ["active" => true],
    "retry" => ["active" => true],
    "test" => ["active" => true],
    "timeout" => ["active" => true],
  ],
]);
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### Ordering

`ratelimit`, `retry`, `timeout` wrap the transport. Each
wraps whatever is already installed, so **activation order is nesting order**:
a feature activated later sits OUTSIDE one activated earlier, and sees the call
first.

That decides behaviour, not just sequence: a feature that short-circuits the
call, such as a cache serving a hit, stops every feature nested inside it from
ever seeing that call.

`test` attach to pipeline hooks
rather than the transport, so their order does not affect what they observe.

#### `ratelimit`

Rate limiting.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

| Option | Type |
|---|---|
| `now` | function |
| `sleep` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.ratelimit.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `retry`

Retry.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

| Option | Type |
|---|---|
| `jitter` | boolean |
| `sleep` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.retry.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `test`

Test transport.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

| Option | Type |
|---|---|
| `entity` | map |
| `net` | map |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

#### `timeout`

Timeout.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

| Option | Type |
|---|---|
| `clearTimer` | function |
| `now` | function |
| `setTimer` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.timeout.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

