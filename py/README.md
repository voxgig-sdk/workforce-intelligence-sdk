# WorkforceIntelligence Python SDK



The Python SDK for the WorkforceIntelligence API — an entity-oriented client following Pythonic conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Board()` — each
carrying a small, uniform set of operations (`list`, `load`) instead of raw URL
paths and query strings. You work with named resources and verbs, which
keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to PyPI. Install it from the GitHub
release tag (`py/vX.Y.Z`, see [Tags](https://github.com/voxgig-sdk/workforce-intelligence-sdk/tags)) or
from a source checkout:

```bash
pip install -e .
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```python
from workforceintelligence_sdk import WorkforceIntelligenceSDK

client = WorkforceIntelligenceSDK()
```

### 2. List board records

`list()` returns a `list` of entities, one per record, and raises on
error; an entity's `data_get()` reads its record (a `dict`).

```python
try:
    boards = client.Board().list({"company": "example"})
    for board in boards:
        print(board.data_get())
except Exception as err:
    print(f"list failed: {err}")
```


## Error handling

Entity operations raise on failure, so wrap them in `try` / `except`:

```python
try:
    facet = client.Facet().load({"company": "example"})
    print(facet.data_get())
except Exception as err:
    print(f"load failed: {err}")
```

`direct()` does **not** raise — it returns the result envelope. Branch
on `ok`; on failure `status` holds the HTTP status (for error responses)
and `err` holds a transport error, so read both defensively:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example_id"},
})

if not result["ok"]:
    print("request failed:", result.get("status"), result.get("err"))
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})

if result["ok"]:
    print(result["status"])  # 200
    print(result["data"])    # response body
else:
    # A non-2xx response carries status + data (the error body); a
    # transport-level failure carries err instead. Only one is present, so
    # read both with .get() rather than indexing a key that may be absent.
    print(result.get("status"), result.get("err"))
```

### Prepare a request without sending it

```python
# prepare() returns the fetch definition and raises on error.
fetchdef = client.prepare({
    "path": "/api/resource/{id}",
    "method": "DELETE",
    "params": {"id": "example"},
})

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```python
client = WorkforceIntelligenceSDK.test()

# Entity ops return the entity, and list one per record; they raise on error.
facet = client.Facet().load({"company": "example"})
# data_get() on an entity reads its mock response record
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```python
def mock_fetch(url, init):
    return {
        "status": 200,
        "statusText": "OK",
        "headers": {},
        "json": lambda: {"id": "mock01"},
    }, None

client = WorkforceIntelligenceSDK({
    "base": "http://localhost:8080",
    "system": {
        "fetch": mock_fetch,
    },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
WORKFORCE_INTELLIGENCE_TEST_LIVE=TRUE
```

Then run:

```bash
cd py && pytest test/
```


## Reference

### WorkforceIntelligenceSDK

```python
from workforceintelligence_sdk import WorkforceIntelligenceSDK

client = WorkforceIntelligenceSDK(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `str` | Base URL of the API server. |
| `prefix` | `str` | URL path prefix prepended to all requests. |
| `suffix` | `str` | URL path suffix appended to all requests. |
| `feature` | `dict` | Feature activation flags. |
| `extend` | `list` | Additional Feature instances to load. |
| `system` | `dict` | System overrides (e.g. custom `fetch` function). |

### test

```python
client = WorkforceIntelligenceSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `None`.

### WorkforceIntelligenceSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> dict` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> dict` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> dict` | Build and send an HTTP request. Returns a result dict (branch on `ok`). |
| `Board` | `(data) -> BoardEntity` | Create a Board entity instance. |
| `Facet` | `(data) -> FacetEntity` | Create a Facet entity instance. |
| `Health` | `(data) -> HealthEntity` | Create a Health entity instance. |
| `Job` | `(data) -> JobEntity` | Create a Job entity instance. |
| `JobPosting` | `(data) -> JobPostingEntity` | Create a JobPosting entity instance. |
| `Organization` | `(data) -> OrganizationEntity` | Create an Organization entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria, and return it. Raises on error. |
| `list` | `(reqmatch, ctrl) -> list` | List entities matching the criteria, one per record. Raises on error. |
| `data_get` | `() -> dict` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> dict` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> str` | Return the entity name. |

### Result shape

Entity operations return the entity, and `list` a `list` of entities, one
per record; an entity's `data_get()` reads its record (a `dict`). They raise
on error, so wrap calls in `try`/`except` to handle failures.

The `direct()` escape hatch never raises — it returns a result `dict`
you branch on via `result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `True` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `dict` | Response headers. |
| `data` | `any` | Parsed JSON response body. |

On error, `ok` is `False` and `err` contains the error value.

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

Create an instance: `board = client.Board()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `accepting_applicants` | `bool` |  |
| `apply_url` | `str` |  |
| `company` | `dict` |  |
| `department` | `str` |  |
| `employment_type` | `str` |  |
| `id` | `str` | Public job id. |
| `locations` | `list` |  |
| `posted_job_id` | `str` |  |
| `published_at` | `str` |  |
| `roles_to_fill` | `int` |  |
| `salary` | `Any` | Any type; null in every probe, shape unverified. |
| `slug` | `str` |  |
| `source` | `dict` |  |
| `source_url` | `str` |  |
| `title` | `str` |  |
| `updated_at` | `str` |  |
| `url_path` | `str` |  |
| `visa_sponsorship` | `Any` | Any type; null in every probe, shape unverified. |
| `workplace_type` | `str` |  |

#### Example: List

```python
boards = client.Board().list({"company": "example"})
```


### Facet

Create an instance: `facet = client.Facet()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `company` | `str` |  |
| `facets` | `dict` |  |
| `meta` | `dict` |  |

#### Example: Load

```python
facet = client.Facet().load({"company": "company"})
```


### Health

Create an instance: `health = client.Health()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `status` | `str` |  |
| `version` | `str` |  |

#### Example: Load

```python
health = client.Health().load()
```


### Job

Create an instance: `job = client.Job()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `accepting_applicants` | `bool` |  |
| `apply_url` | `str` |  |
| `company` | `str` | Board slug. |
| `department` | `str` |  |
| `employment_type` | `str` |  |
| `features` | `dict` |  |
| `id` | `str` | Public job id. |
| `job` | `Any` |  |
| `locations` | `list` |  |
| `meta` | `dict` |  |
| `posted_job_id` | `str` |  |
| `published_at` | `str` |  |
| `roles_to_fill` | `int` |  |
| `salary` | `Any` | Any type; null in every probe, shape unverified. |
| `slug` | `str` |  |
| `source` | `dict` |  |
| `source_url` | `str` |  |
| `title` | `str` |  |
| `updated_at` | `str` |  |
| `url_path` | `str` |  |
| `visa_sponsorship` | `Any` | Any type; null in every probe, shape unverified. |
| `workplace_type` | `str` |  |

#### Example: Load

```python
job = client.Job().load({"id": "job_id", "company": "company"})
```

#### Example: List

```python
jobs = client.Job().list({"company": "example"})
```


### JobPosting

Create an instance: `job_posting = client.JobPosting()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `bullets` | `list` |  |
| `paragraphs` | `list` |  |
| `title` | `str` |  |

#### Example: List

```python
job_postings = client.JobPosting().list({"company": "example", "id_or_slug": "example"})
```


### Organization

Create an instance: `organization = client.Organization()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `banner_url` | `str` |  |
| `brand_color` | `str` |  |
| `company_type` | `str` |  |
| `contact_email` | `str` |  |
| `description` | `str` |  |
| `employee_count_range` | `str` |  |
| `features` | `dict` |  |
| `founded_year` | `int` |  |
| `headquarters` | `str` |  |
| `headquarters_city` | `str` |  |
| `headquarters_country` | `str` |  |
| `id` | `str` |  |
| `industry` | `str` |  |
| `job_count` | `int` |  |
| `linkedin_url` | `str` |  |
| `logo_url` | `str` |  |
| `name` | `str` |  |
| `slug` | `str` |  |
| `updated_at` | `str` |  |
| `website_url` | `str` |  |

#### Example: Load

```python
organization = client.Organization().load({"company": "company"})
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

Features are the extension mechanism. A feature is a Python class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **RatelimitFeature**: Rate limiting
- **RetryFeature**: Retry
- **TestFeature**: Test transport
- **TimeoutFeature**: Timeout

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as dicts

The Python SDK uses plain dicts throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a dict.

### Module structure

```
py/
├── workforceintelligence_sdk.py         -- Main SDK module
├── config.py                    -- Configuration
├── schema.py                    -- Generated option + entity specs
├── features.py                  -- Feature factory
├── core/                        -- Core types and context
├── entity/                      -- Entity implementations
├── feature/                     -- Built-in features (Base, Test, Log)
├── utility/                     -- Utility functions and struct library
└── test/                        -- Test suites
```

The main module (`workforceintelligence_sdk`) exports the SDK class.
Import entity or utility modules directly only when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```python
facet = client.Facet()
facet.load({"company": "example"})

# facet.data_get() now returns the facet data from the last load
# facet.match_get() returns the last match criteria
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
