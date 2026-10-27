# WorkforceIntelligence Python SDK Reference

Complete API reference for the WorkforceIntelligence Python SDK.


## WorkforceIntelligenceSDK

### Constructor

```python
from workforceintelligence_sdk import WorkforceIntelligenceSDK

client = WorkforceIntelligenceSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `WorkforceIntelligenceSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = WorkforceIntelligenceSDK.test()
```


### Instance Methods

#### `Board(data=None)`

Create a new `BoardEntity` instance. Pass `None` for no initial data.

#### `Facet(data=None)`

Create a new `FacetEntity` instance. Pass `None` for no initial data.

#### `Health(data=None)`

Create a new `HealthEntity` instance. Pass `None` for no initial data.

#### `Job(data=None)`

Create a new `JobEntity` instance. Pass `None` for no initial data.

#### `JobPosting(data=None)`

Create a new `JobPostingEntity` instance. Pass `None` for no initial data.

#### `Organization(data=None)`

Create a new `OrganizationEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## BoardEntity

```python
board = client.Board()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accepting_applicants` | `bool` | No |  |
| `apply_url` | `str` | No |  |
| `company` | `dict` | No |  |
| `department` | `str` | No |  |
| `employment_type` | `str` | No |  |
| `id` | `str` | Yes | Public job id. |
| `locations` | `list` | No |  |
| `posted_job_id` | `str` | No |  |
| `published_at` | `str` | No |  |
| `roles_to_fill` | `int` | No |  |
| `salary` | `Any` | No | Any type; null in every probe, shape unverified. |
| `slug` | `str` | Yes |  |
| `source` | `dict` | No |  |
| `source_url` | `str` | No |  |
| `title` | `str` | Yes |  |
| `updated_at` | `str` | No |  |
| `url_path` | `str` | No |  |
| `visa_sponsorship` | `Any` | No | Any type; null in every probe, shape unverified. |
| `workplace_type` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[BoardEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Board().list({"company": "example"})
for board in results:
    print(board.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BoardEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## FacetEntity

```python
facet = client.Facet()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `company` | `str` | No |  |
| `facets` | `dict` | Yes |  |
| `meta` | `dict` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> FacetEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Facet().load({"company": "company"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `FacetEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## HealthEntity

```python
health = client.Health()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `status` | `str` | Yes |  |
| `version` | `str` | Yes |  |

### Operations

#### `load(reqmatch, ctrl=None) -> HealthEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Health().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `HealthEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## JobEntity

```python
job = client.Job()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accepting_applicants` | `bool` | No |  |
| `apply_url` | `str` | No |  |
| `company` | `str` | No | Board slug. |
| `department` | `str` | No |  |
| `employment_type` | `str` | No |  |
| `features` | `dict` | No |  |
| `id` | `str` | Yes | Public job id. |
| `job` | `Any` | Yes |  |
| `locations` | `list` | No |  |
| `meta` | `dict` | No |  |
| `posted_job_id` | `str` | No |  |
| `published_at` | `str` | No |  |
| `roles_to_fill` | `int` | No |  |
| `salary` | `Any` | No | Any type; null in every probe, shape unverified. |
| `slug` | `str` | Yes |  |
| `source` | `dict` | No |  |
| `source_url` | `str` | No |  |
| `title` | `str` | Yes |  |
| `updated_at` | `str` | No |  |
| `url_path` | `str` | No |  |
| `visa_sponsorship` | `Any` | No | Any type; null in every probe, shape unverified. |
| `workplace_type` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[JobEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Job().list({"company": "example"})
for job in results:
    print(job.data_get())
```

#### `load(reqmatch, ctrl=None) -> JobEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Job().load({"id": "job_id", "company": "company"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `JobEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## JobPostingEntity

```python
job_posting = client.JobPosting()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bullets` | `list` | No |  |
| `paragraphs` | `list` | No |  |
| `title` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[JobPostingEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.JobPosting().list({"company": "example", "id_or_slug": "example"})
for job_posting in results:
    print(job_posting.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `JobPostingEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## OrganizationEntity

```python
organization = client.Organization()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `banner_url` | `str` | No |  |
| `brand_color` | `str` | No |  |
| `company_type` | `str` | No |  |
| `contact_email` | `str` | No |  |
| `description` | `str` | No |  |
| `employee_count_range` | `str` | No |  |
| `features` | `dict` | No |  |
| `founded_year` | `int` | No |  |
| `headquarters` | `str` | No |  |
| `headquarters_city` | `str` | No |  |
| `headquarters_country` | `str` | No |  |
| `id` | `str` | Yes |  |
| `industry` | `str` | No |  |
| `job_count` | `int` | No |  |
| `linkedin_url` | `str` | No |  |
| `logo_url` | `str` | No |  |
| `name` | `str` | Yes |  |
| `slug` | `str` | Yes |  |
| `updated_at` | `str` | No |  |
| `website_url` | `str` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> OrganizationEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Organization().load({"company": "company"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `OrganizationEntity` instance with the same options.

#### `get_name() -> str`

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

```python
client = WorkforceIntelligenceSDK({
    "feature": {
        "ratelimit": {"active": True},
        "retry": {"active": True},
        "test": {"active": True},
        "timeout": {"active": True},
    },
})
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

