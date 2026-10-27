# WorkforceIntelligence SDK configuration

module WorkforceIntelligenceConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "WorkforceIntelligence",
        "slug" => "workforce-intelligence",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "ratelimit" => {
          "options" => {
            "active" => false,
            "burst" => 5,
            "rate" => 5,
          },
          "optspec" => {
            "now" => "`$FUNCTION`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "retry" => {
          "options" => {
            "active" => false,
            "factor" => 2,
            "maxDelay" => 2000,
            "minDelay" => 50,
            "retries" => 2,
            "statuses" => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          },
          "optspec" => {
            "jitter" => "`$BOOLEAN`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "test" => {
          "options" => {
            "active" => false,
          },
          "optspec" => {
            "entity" => "`$MAP`",
            "net" => "`$MAP`",
          },
          "strict" => false,
          "transport" => "base",
        },
        "timeout" => {
          "options" => {
            "active" => false,
            "ms" => 30000,
          },
          "optspec" => {
            "clearTimer" => "`$FUNCTION`",
            "now" => "`$FUNCTION`",
            "setTimer" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
      },
      "options" => {
        "base" => "https://api.worklittle.com",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "board" => {},
          "facet" => {},
          "health" => {},
          "job" => {},
          "job_posting" => {},
          "organization" => {},
        },
      },
      "entity" => {
        "board" => {
          "fields" => [
            {
              "name" => "accepting_applicants",
              "title" => "Accepting Applicants",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "apply_url",
              "title" => "Apply Url",
              "type" => "`$STRING`",
            },
            {
              "name" => "company",
              "title" => "Company",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "department",
              "title" => "Department",
              "type" => "`$STRING`",
            },
            {
              "name" => "employment_type",
              "title" => "Employment Type",
              "type" => "`$STRING`",
            },
            {
              "name" => "id",
              "title" => "Id",
              "type" => "`$STRING`",
              "req" => true,
              "short" => "Public job id.",
            },
            {
              "name" => "locations",
              "title" => "Locations",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "posted_job_id",
              "title" => "Posted Job Id",
              "type" => "`$STRING`",
              "format" => "uuid",
            },
            {
              "name" => "published_at",
              "title" => "Published At",
              "type" => "`$STRING`",
              "format" => "date-time",
            },
            {
              "name" => "roles_to_fill",
              "title" => "Roles To Fill",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "salary",
              "title" => "Salary",
              "type" => "`$ANY`",
              "short" => "Any type; null in every probe, shape unverified.",
            },
            {
              "name" => "slug",
              "title" => "Slug",
              "type" => "`$STRING`",
              "req" => true,
            },
            {
              "name" => "source",
              "title" => "Source",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "source_url",
              "title" => "Source Url",
              "type" => "`$STRING`",
            },
            {
              "name" => "title",
              "title" => "Title",
              "type" => "`$STRING`",
              "req" => true,
            },
            {
              "name" => "updated_at",
              "title" => "Updated At",
              "type" => "`$STRING`",
              "format" => "date-time",
            },
            {
              "name" => "url_path",
              "title" => "Url Path",
              "type" => "`$STRING`",
            },
            {
              "name" => "visa_sponsorship",
              "title" => "Visa Sponsorship",
              "type" => "`$ANY`",
              "short" => "Any type; null in every probe, shape unverified.",
            },
            {
              "name" => "workplace_type",
              "title" => "Workplace Type",
              "type" => "`$STRING`",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "board",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/job-boards/{company}/board",
                  "segments" => [
                    {
                      "lit" => "job-boards",
                    },
                    {
                      "var" => "company",
                    },
                    {
                      "lit" => "board",
                    },
                  ],
                  "parts" => [
                    "job-boards",
                    "{company}",
                    "board",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.jobs`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "company",
                        "orig" => "company",
                        "type" => "`$STRING`",
                        "kind" => "param",
                        "reqd" => true,
                        "example" => "worklittle",
                      },
                    ],
                    "query" => [
                      {
                        "name" => "cursor",
                        "orig" => "cursor",
                        "type" => "`$STRING`",
                        "kind" => "query",
                      },
                      {
                        "name" => "department",
                        "orig" => "department",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "field" => true,
                      },
                      {
                        "name" => "employment_type",
                        "orig" => "employment_type",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "field" => true,
                      },
                      {
                        "name" => "include",
                        "orig" => "include",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "facets",
                      },
                      {
                        "name" => "limit",
                        "orig" => "limit",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                        "example" => 25,
                      },
                      {
                        "name" => "location",
                        "orig" => "location",
                        "type" => "`$STRING`",
                        "kind" => "query",
                      },
                      {
                        "name" => "q",
                        "orig" => "q",
                        "type" => "`$STRING`",
                        "kind" => "query",
                      },
                      {
                        "name" => "workplace_type",
                        "orig" => "workplace_type",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "field" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "company",
                    ],
                  },
                  "response" => {
                    "kind" => "json",
                    "media" => "application/json",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "facet" => {
          "fields" => [
            {
              "name" => "company",
              "title" => "Company",
              "type" => "`$STRING`",
            },
            {
              "name" => "facets",
              "title" => "Facets",
              "type" => "`$OBJECT`",
              "req" => true,
            },
            {
              "name" => "meta",
              "title" => "Meta",
              "type" => "`$OBJECT`",
            },
          ],
          "name" => "facet",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/job-boards/{company}/facets",
                  "segments" => [
                    {
                      "lit" => "job-boards",
                    },
                    {
                      "var" => "company",
                    },
                    {
                      "lit" => "facets",
                    },
                  ],
                  "parts" => [
                    "job-boards",
                    "{company}",
                    "facets",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "company",
                        "orig" => "company",
                        "type" => "`$STRING`",
                        "kind" => "param",
                        "reqd" => true,
                        "example" => "worklittle",
                      },
                    ],
                    "query" => [
                      {
                        "name" => "location",
                        "orig" => "location",
                        "type" => "`$STRING`",
                        "kind" => "query",
                      },
                      {
                        "name" => "q",
                        "orig" => "q",
                        "type" => "`$STRING`",
                        "kind" => "query",
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "company",
                    ],
                  },
                  "response" => {
                    "kind" => "json",
                    "media" => "application/json",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "health" => {
          "fields" => [
            {
              "name" => "status",
              "title" => "Status",
              "type" => "`$STRING`",
              "req" => true,
            },
            {
              "name" => "version",
              "title" => "Version",
              "type" => "`$STRING`",
              "req" => true,
            },
          ],
          "name" => "health",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/health",
                  "segments" => [
                    {
                      "lit" => "health",
                    },
                  ],
                  "parts" => [
                    "health",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {},
                  "select" => {},
                  "response" => {
                    "kind" => "json",
                    "media" => "application/json",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "job" => {
          "fields" => [
            {
              "name" => "accepting_applicants",
              "title" => "Accepting Applicants",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "apply_url",
              "title" => "Apply Url",
              "type" => "`$STRING`",
            },
            {
              "name" => "company",
              "title" => "Company",
              "type" => "`$STRING`",
              "short" => "Board slug.",
            },
            {
              "name" => "department",
              "title" => "Department",
              "type" => "`$STRING`",
            },
            {
              "name" => "employment_type",
              "title" => "Employment Type",
              "type" => "`$STRING`",
            },
            {
              "name" => "features",
              "title" => "Features",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "id",
              "title" => "Id",
              "type" => "`$STRING`",
              "req" => true,
              "short" => "Public job id.",
            },
            {
              "name" => "job",
              "title" => "Job",
              "type" => "`$ANY`",
              "req" => true,
            },
            {
              "name" => "locations",
              "title" => "Locations",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "meta",
              "title" => "Meta",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "posted_job_id",
              "title" => "Posted Job Id",
              "type" => "`$STRING`",
              "format" => "uuid",
            },
            {
              "name" => "published_at",
              "title" => "Published At",
              "type" => "`$STRING`",
              "format" => "date-time",
            },
            {
              "name" => "roles_to_fill",
              "title" => "Roles To Fill",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "salary",
              "title" => "Salary",
              "type" => "`$ANY`",
              "short" => "Any type; null in every probe, shape unverified.",
            },
            {
              "name" => "slug",
              "title" => "Slug",
              "type" => "`$STRING`",
              "req" => true,
            },
            {
              "name" => "source",
              "title" => "Source",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "source_url",
              "title" => "Source Url",
              "type" => "`$STRING`",
            },
            {
              "name" => "title",
              "title" => "Title",
              "type" => "`$STRING`",
              "req" => true,
            },
            {
              "name" => "updated_at",
              "title" => "Updated At",
              "type" => "`$STRING`",
              "format" => "date-time",
            },
            {
              "name" => "url_path",
              "title" => "Url Path",
              "type" => "`$STRING`",
            },
            {
              "name" => "visa_sponsorship",
              "title" => "Visa Sponsorship",
              "type" => "`$ANY`",
              "short" => "Any type; null in every probe, shape unverified.",
            },
            {
              "name" => "workplace_type",
              "title" => "Workplace Type",
              "type" => "`$STRING`",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "job",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/job-boards/{company}/jobs",
                  "segments" => [
                    {
                      "lit" => "job-boards",
                    },
                    {
                      "var" => "company",
                    },
                    {
                      "lit" => "jobs",
                    },
                  ],
                  "parts" => [
                    "job-boards",
                    "{company}",
                    "jobs",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.data`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "company",
                        "orig" => "company",
                        "type" => "`$STRING`",
                        "kind" => "param",
                        "reqd" => true,
                        "example" => "worklittle",
                      },
                    ],
                    "query" => [
                      {
                        "name" => "cursor",
                        "orig" => "cursor",
                        "type" => "`$STRING`",
                        "kind" => "query",
                      },
                      {
                        "name" => "department",
                        "orig" => "department",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "field" => true,
                      },
                      {
                        "name" => "employment_type",
                        "orig" => "employment_type",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "field" => true,
                      },
                      {
                        "name" => "limit",
                        "orig" => "limit",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                        "example" => 25,
                      },
                      {
                        "name" => "location",
                        "orig" => "location",
                        "type" => "`$STRING`",
                        "kind" => "query",
                      },
                      {
                        "name" => "q",
                        "orig" => "q",
                        "type" => "`$STRING`",
                        "kind" => "query",
                      },
                      {
                        "name" => "workplace_type",
                        "orig" => "workplace_type",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "field" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "company",
                    ],
                  },
                  "response" => {
                    "kind" => "json",
                    "media" => "application/json",
                  },
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/job-boards/{company}/jobs/{idOrSlug}",
                  "segments" => [
                    {
                      "lit" => "job-boards",
                    },
                    {
                      "var" => "company",
                    },
                    {
                      "lit" => "jobs",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "parts" => [
                    "job-boards",
                    "{company}",
                    "jobs",
                    "{id}",
                  ],
                  "rename" => {
                    "param" => {
                      "idOrSlug" => "id",
                    },
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.job`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "company",
                        "orig" => "company",
                        "type" => "`$STRING`",
                        "kind" => "param",
                        "reqd" => true,
                        "example" => "worklittle",
                      },
                      {
                        "name" => "id",
                        "orig" => "idOrSlug",
                        "type" => "`$STRING`",
                        "kind" => "param",
                        "reqd" => true,
                        "example" => "applied-ai-engineer-internship",
                      },
                    ],
                    "query" => [
                      {
                        "name" => "preview",
                        "orig" => "preview",
                        "type" => "`$STRING`",
                        "kind" => "query",
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "company",
                      "id",
                    ],
                  },
                  "response" => {
                    "kind" => "json",
                    "media" => "application/json",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "job_posting" => {
          "fields" => [
            {
              "name" => "bullets",
              "title" => "Bullets",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "paragraphs",
              "title" => "Paragraphs",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "title",
              "title" => "Title",
              "type" => "`$STRING`",
            },
          ],
          "name" => "job_posting",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/job-boards/{company}/jobs/{idOrSlug}/json-ld",
                  "segments" => [
                    {
                      "lit" => "job-boards",
                    },
                    {
                      "var" => "company",
                    },
                    {
                      "lit" => "jobs",
                    },
                    {
                      "var" => "id_or_slug",
                    },
                    {
                      "lit" => "json-ld",
                    },
                  ],
                  "parts" => [
                    "job-boards",
                    "{company}",
                    "jobs",
                    "{id_or_slug}",
                    "json-ld",
                  ],
                  "rename" => {
                    "param" => {
                      "idOrSlug" => "id_or_slug",
                    },
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "company",
                        "orig" => "company",
                        "type" => "`$STRING`",
                        "kind" => "param",
                        "reqd" => true,
                        "example" => "worklittle",
                      },
                      {
                        "name" => "id_or_slug",
                        "orig" => "idOrSlug",
                        "type" => "`$STRING`",
                        "kind" => "param",
                        "reqd" => true,
                        "example" => "applied-ai-engineer-internship",
                      },
                    ],
                    "query" => [
                      {
                        "name" => "canonical_url",
                        "orig" => "canonical_url",
                        "type" => "`$STRING`",
                        "kind" => "query",
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "company",
                      "id_or_slug",
                    ],
                  },
                  "response" => {
                    "kind" => "json",
                    "media" => "application/json",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "$.main.kit.entity.job",
              ],
            ],
          },
        },
        "organization" => {
          "fields" => [
            {
              "name" => "banner_url",
              "title" => "Banner Url",
              "type" => "`$STRING`",
            },
            {
              "name" => "brand_color",
              "title" => "Brand Color",
              "type" => "`$STRING`",
            },
            {
              "name" => "company_type",
              "title" => "Company Type",
              "type" => "`$STRING`",
            },
            {
              "name" => "contact_email",
              "title" => "Contact Email",
              "type" => "`$STRING`",
            },
            {
              "name" => "description",
              "title" => "Description",
              "type" => "`$STRING`",
            },
            {
              "name" => "employee_count_range",
              "title" => "Employee Count Range",
              "type" => "`$STRING`",
            },
            {
              "name" => "features",
              "title" => "Features",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "founded_year",
              "title" => "Founded Year",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "headquarters",
              "title" => "Headquarters",
              "type" => "`$STRING`",
            },
            {
              "name" => "headquarters_city",
              "title" => "Headquarters City",
              "type" => "`$STRING`",
            },
            {
              "name" => "headquarters_country",
              "title" => "Headquarters Country",
              "type" => "`$STRING`",
            },
            {
              "name" => "id",
              "title" => "Id",
              "type" => "`$STRING`",
              "req" => true,
              "format" => "uuid",
            },
            {
              "name" => "industry",
              "title" => "Industry",
              "type" => "`$STRING`",
            },
            {
              "name" => "job_count",
              "title" => "Job Count",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "linkedin_url",
              "title" => "Linkedin Url",
              "type" => "`$STRING`",
            },
            {
              "name" => "logo_url",
              "title" => "Logo Url",
              "type" => "`$STRING`",
            },
            {
              "name" => "name",
              "title" => "Name",
              "type" => "`$STRING`",
              "req" => true,
            },
            {
              "name" => "slug",
              "title" => "Slug",
              "type" => "`$STRING`",
              "req" => true,
            },
            {
              "name" => "updated_at",
              "title" => "Updated At",
              "type" => "`$STRING`",
              "format" => "date-time",
            },
            {
              "name" => "website_url",
              "title" => "Website Url",
              "type" => "`$STRING`",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "organization",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/job-boards/{company}",
                  "segments" => [
                    {
                      "lit" => "job-boards",
                    },
                    {
                      "var" => "company",
                    },
                  ],
                  "parts" => [
                    "job-boards",
                    "{company}",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.organization`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "company",
                        "orig" => "company",
                        "type" => "`$STRING`",
                        "kind" => "param",
                        "reqd" => true,
                        "example" => "worklittle",
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "company",
                    ],
                  },
                  "response" => {
                    "kind" => "json",
                    "media" => "application/json",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    WorkforceIntelligenceFeatures.make_feature(name)
  end
end
