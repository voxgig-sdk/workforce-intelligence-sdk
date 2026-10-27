# Workforce Intelligence API

The keyless part of the Worklittle API (`api.worklittle.com`): the health check and the public careers-board routes an employer&#39;s published jobs are served from. Knowledge source: the docs at https://docs.worklittle.com (pages &#39;Public job board&#39; and &#39;OpenAPI&#39;), the vendor&#39;s own OpenAPI 3.1 files https://docs.worklittle.com/openapi/openapi.yaml and job-boards.yaml (which give paths and parameters but no response schemas), and live GET probes on 2026-10-23, from which every response schema here is taken. Excluded: market-wide job search (/jobs, /companies, /jobs/stats and the rest) returned 401 without a Bearer key, and every business/ATS, apply, resume and webhook route needs a key or is a POST. Unverified: only one board (slug &#39;worklittle&#39;, holding a single job) could be found to probe, so the shapes of salary and `visa_sponsorship` (null in every probe), the nullability of most organization fields, cursor paging, and the filters were not exercised against varied data. The example job will stop working if Worklittle closes that role.

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 6 entities and 7 HTTP routes. There are 6 SDK targets and 2 companion tools.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### Board

Results: Board bundle.

SDK operations: `list`.

Key fields to recognise:

- `id`: Public job id.
- `salary`: Any type; null in every probe, shape unverified.
- `visa_sponsorship`: Any type; null in every probe, shape unverified.

### Facet

Results: Facet counts.

SDK operations: `load`.

### Health

Results: Service status.

SDK operations: `load`.

### Job

Results: One page of job summaries.; Job detail.

SDK operations: `list`, `load`.

Key fields to recognise:

- `company`: Board slug.
- `id`: Public job id.
- `salary`: Any type; null in every probe, shape unverified.
- `visa_sponsorship`: Any type; null in every probe, shape unverified.

### JobPosting

Results: JobPosting JSON-LD plus parsed description sections.

SDK operations: `list`.

### Organization

Results: Organization profile.

SDK operations: `load`.

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| Board | `list` | `GET /job-boards/{company}/board` | See reference |
| Facet | `load` | `GET /job-boards/{company}/facets` | See reference |
| Health | `load` | `GET /health` | See reference |
| Job | `list` | `GET /job-boards/{company}/jobs` | See reference |
| Job | `load` | `GET /job-boards/{company}/jobs/{idOrSlug}` | See reference |
| JobPosting | `list` | `GET /job-boards/{company}/jobs/{idOrSlug}/json-ld` | See reference |
| Organization | `load` | `GET /job-boards/{company}` | See reference |

## Connect to the API

- API server: `https://api.worklittle.com`

Check authentication for the route you plan to call. A route that declares no authentication can be used without credentials; this does not change the requirements of other routes. Keep credentials in environment variables or a configured secret provider, and keep them out of source control and logs.

## Make a first request

1. Choose the API server and an operation that matches your task.
2. Check the operation’s required input and authentication. Use values valid for your account and environment.
3. Send one request and inspect the returned data before adding retries, concurrency, or a larger batch.

For an SDK call, install or build the chosen client, create a client instance with its documented configuration, and call the required entity operation. Language references describe the argument shape, asynchronous behaviour, and returned values.

## Choose an SDK

Choose the language already used by your application or service. The clients represent the same API model, while package setup, naming, and return types follow each language. Check the selected client’s reference and tests before integrating it into an existing application.

| Client | Repository directory | Distribution |
| --- | --- | --- |
| Golang | `go/` | Build from source |
| Lua | `lua/` | Build from source |
| PHP | `php/` | Build from source |
| Python | `py/` | Build from source |
| Ruby | `rb/` | Build from source |
| TypeScript | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Companion tools

These targets provide another way to use the API. Their available commands or tools can cover a smaller set of operations than the client libraries.

### Go CLI

Use the command-line interface for shell-based tasks and scripts.

Repository directory: `go-cli/`. Not published. Build from the go-cli directory.


### Go MCP server

Use the MCP server to expose supported API operations to an MCP client.

Repository directory: `go-mcp/`. Not published. Build from the go-mcp directory.

- `workforce-intelligence_list`: List records for an entity. Supported entities: `board`, `job`, `job_posting`.
- `workforce-intelligence_load`: Load one record for an entity. Supported entities: `facet`, `health`, `job`, `organization`.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- `ratelimit`: Client-side rate limiting via a token bucket
- `retry`: Automatic retry of transient failures with exponential backoff
- `test`: In-memory mock transport for testing without a live server
- `timeout`: Per-request timeout with transport abort

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the first-call guide for the setup sequence.
- Read the authentication guide before using protected routes.
- Use the API reference for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

