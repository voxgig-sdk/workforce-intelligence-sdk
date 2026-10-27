import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "board",
    "accessor": "Board",
    "op": "list",
    "method": "GET",
    "path": "/job-boards/{company}/board",
    "args": [
      {
        "name": "company",
        "wire": "company",
        "value": "worklittle"
      }
    ],
    "select": {
      "cursor": "v1",
      "department": "v1",
      "employment_type": "v1",
      "include": "facets",
      "limit": 25,
      "location": "v1",
      "q": "v1",
      "workplace_type": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "limit",
      "cursor",
      "q",
      "department",
      "workplace_type",
      "employment_type",
      "location",
      "include"
    ],
    "queryArgs": [
      {
        "name": "cursor",
        "wire": "cursor"
      },
      {
        "name": "department",
        "wire": "department"
      },
      {
        "name": "employment_type",
        "wire": "employment_type"
      },
      {
        "name": "include",
        "wire": "include"
      },
      {
        "name": "limit",
        "wire": "limit"
      },
      {
        "name": "location",
        "wire": "location"
      },
      {
        "name": "q",
        "wire": "q"
      },
      {
        "name": "workplace_type",
        "wire": "workplace_type"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "organization": {
        "id": "x",
        "name": "Worklittle",
        "slug": "worklittle",
        "logo_url": "x",
        "banner_url": "x",
        "website_url": "x",
        "description": "x",
        "brand_color": "#0099FF",
        "headquarters": "x",
        "contact_email": "x",
        "industry": "x",
        "company_type": "nonprofit",
        "employee_count_range": "11-50",
        "linkedin_url": "x",
        "founded_year": 2025,
        "headquarters_city": "x",
        "headquarters_country": "US",
        "features": {
          "resume_autofill": true,
          "similar_job_alerts": true
        },
        "updated_at": "2026-01-01T00:00:00Z",
        "job_count": 1
      },
      "brand": {
        "id": "x",
        "name": "Worklittle",
        "slug": "worklittle",
        "logo_url": "x",
        "banner_url": "x",
        "website_url": "x",
        "description": "x",
        "brand_color": "#0099FF",
        "headquarters": "x",
        "contact_email": "x",
        "industry": "x",
        "company_type": "nonprofit",
        "employee_count_range": "11-50",
        "linkedin_url": "x",
        "founded_year": 2025,
        "headquarters_city": "x",
        "headquarters_country": "US",
        "features": {
          "resume_autofill": true,
          "similar_job_alerts": true
        },
        "updated_at": "2026-01-01T00:00:00Z",
        "job_count": 1
      },
      "jobs": [
        {
          "id": "4955852915",
          "posted_job_id": "x",
          "slug": "applied-ai-engineer-internship",
          "url_path": "/job-boards/worklittle/jobs/applied-ai-engineer-internship",
          "title": "x",
          "department": "x",
          "apply_url": "x",
          "source_url": "x",
          "locations": [
            "x"
          ],
          "employment_type": "temporary",
          "workplace_type": "remote",
          "accepting_applicants": true,
          "roles_to_fill": 1,
          "published_at": "2026-01-01T00:00:00Z",
          "updated_at": "2026-01-01T00:00:00Z",
          "company": {
            "id": "x",
            "name": "x",
            "slug": "x",
            "logo_url": "x",
            "website_url": "x"
          },
          "source": {
            "type": "worklittle_posted",
            "name": "Worklittle"
          }
        }
      ],
      "facets": {
        "department": [
          {
            "value": "x",
            "count": 1
          }
        ],
        "workplace_type": [
          {
            "value": "x",
            "count": 1
          }
        ],
        "employment_type": [
          {
            "value": "x",
            "count": 1
          }
        ]
      },
      "meta": {
        "next_cursor": "x",
        "total": 1,
        "rate_limit": {
          "limit_per_minute": 120,
          "remaining": -1
        }
      }
    },
    "idField": "id"
  },
  {
    "entity": "facet",
    "accessor": "Facet",
    "op": "load",
    "method": "GET",
    "path": "/job-boards/{company}/facets",
    "args": [
      {
        "name": "company",
        "wire": "company",
        "value": "worklittle"
      }
    ],
    "select": {
      "location": "v1",
      "q": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "q",
      "location"
    ],
    "queryArgs": [
      {
        "name": "location",
        "wire": "location"
      },
      {
        "name": "q",
        "wire": "q"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "company": "worklittle",
      "facets": {
        "department": [
          {
            "value": "x",
            "count": 1
          }
        ],
        "workplace_type": [
          {
            "value": "x",
            "count": 1
          }
        ],
        "employment_type": [
          {
            "value": "x",
            "count": 1
          }
        ]
      },
      "meta": {
        "next_cursor": "x",
        "total": 1,
        "rate_limit": {
          "limit_per_minute": 120,
          "remaining": -1
        }
      }
    },
    "idField": "id"
  },
  {
    "entity": "health",
    "accessor": "Health",
    "op": "load",
    "method": "GET",
    "path": "/health",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "status": "ok",
      "version": "1.0.0"
    },
    "idField": "id"
  },
  {
    "entity": "job",
    "accessor": "Job",
    "op": "list",
    "method": "GET",
    "path": "/job-boards/{company}/jobs",
    "args": [
      {
        "name": "company",
        "wire": "company",
        "value": "worklittle"
      }
    ],
    "select": {
      "cursor": "v1",
      "department": "v1",
      "employment_type": "v1",
      "limit": 25,
      "location": "v1",
      "q": "v1",
      "workplace_type": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "limit",
      "cursor",
      "q",
      "department",
      "workplace_type",
      "employment_type",
      "location"
    ],
    "queryArgs": [
      {
        "name": "cursor",
        "wire": "cursor"
      },
      {
        "name": "department",
        "wire": "department"
      },
      {
        "name": "employment_type",
        "wire": "employment_type"
      },
      {
        "name": "limit",
        "wire": "limit"
      },
      {
        "name": "location",
        "wire": "location"
      },
      {
        "name": "q",
        "wire": "q"
      },
      {
        "name": "workplace_type",
        "wire": "workplace_type"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "company": "worklittle",
      "data": [
        {
          "id": "4955852915",
          "posted_job_id": "x",
          "slug": "applied-ai-engineer-internship",
          "url_path": "/job-boards/worklittle/jobs/applied-ai-engineer-internship",
          "title": "x",
          "department": "x",
          "apply_url": "x",
          "source_url": "x",
          "locations": [
            "x"
          ],
          "employment_type": "temporary",
          "workplace_type": "remote",
          "accepting_applicants": true,
          "roles_to_fill": 1,
          "published_at": "2026-01-01T00:00:00Z",
          "updated_at": "2026-01-01T00:00:00Z",
          "company": {
            "id": "x",
            "name": "x",
            "slug": "x",
            "logo_url": "x",
            "website_url": "x"
          },
          "source": {
            "type": "worklittle_posted",
            "name": "Worklittle"
          }
        }
      ],
      "meta": {
        "next_cursor": "x",
        "total": 1,
        "rate_limit": {
          "limit_per_minute": 120,
          "remaining": -1
        }
      }
    },
    "idField": "id"
  },
  {
    "entity": "job",
    "accessor": "Job",
    "op": "load",
    "method": "GET",
    "path": "/job-boards/{company}/jobs/{idOrSlug}",
    "args": [
      {
        "name": "company",
        "wire": "company",
        "value": "worklittle"
      },
      {
        "name": "id",
        "wire": "idOrSlug",
        "value": "applied-ai-engineer-internship"
      }
    ],
    "select": {
      "preview": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "preview"
    ],
    "queryArgs": [
      {
        "name": "preview",
        "wire": "preview"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "company": "worklittle",
      "job": {
        "id": "4955852915",
        "posted_job_id": "x",
        "slug": "applied-ai-engineer-internship",
        "url_path": "/job-boards/worklittle/jobs/applied-ai-engineer-internship",
        "title": "x",
        "department": "x",
        "apply_url": "x",
        "source_url": "x",
        "locations": [
          "x"
        ],
        "employment_type": "temporary",
        "workplace_type": "remote",
        "accepting_applicants": true,
        "roles_to_fill": 1,
        "published_at": "2026-01-01T00:00:00Z",
        "updated_at": "2026-01-01T00:00:00Z",
        "company": {
          "id": "x",
          "name": "x",
          "slug": "x",
          "logo_url": "x",
          "website_url": "x"
        },
        "source": {
          "type": "worklittle_posted",
          "name": "Worklittle"
        },
        "description": "x",
        "description_html": "x",
        "summary": "x",
        "application_fields": [
          {
            "kind": "builtin",
            "id": "email",
            "builtin": "x",
            "type": "x",
            "label": {
              "lines": []
            },
            "required": true,
            "locked": true
          }
        ],
        "description_sections": [
          {
            "title": "x",
            "paragraphs": [
              "x"
            ],
            "bullets": [
              "x"
            ]
          }
        ],
        "description_sections_meta": {
          "status": "ok",
          "source": "heuristic",
          "reason": "x"
        },
        "features": {
          "resume_autofill": true,
          "similar_job_alerts": true
        }
      },
      "features": {
        "resume_autofill": true,
        "similar_job_alerts": true
      },
      "meta": {
        "next_cursor": "x",
        "total": 1,
        "rate_limit": {
          "limit_per_minute": 120,
          "remaining": -1
        }
      }
    },
    "idField": "id"
  },
  {
    "entity": "job_posting",
    "accessor": "JobPosting",
    "op": "list",
    "method": "GET",
    "path": "/job-boards/{company}/jobs/{idOrSlug}/json-ld",
    "args": [
      {
        "name": "company",
        "wire": "company",
        "value": "worklittle"
      },
      {
        "name": "id_or_slug",
        "wire": "idOrSlug",
        "value": "applied-ai-engineer-internship"
      }
    ],
    "select": {
      "canonical_url": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "canonical_url"
    ],
    "queryArgs": [
      {
        "name": "canonical_url",
        "wire": "canonical_url"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "company": "worklittle",
      "json_ld": {
        "@context": "https://schema.org/",
        "@type": "JobPosting",
        "title": "x",
        "description": "x",
        "datePosted": "2026-01-01T00:00:00Z",
        "employmentType": "TEMPORARY",
        "hiringOrganization": {
          "@type": "x",
          "name": "x",
          "sameAs": "x",
          "logo": "x"
        },
        "jobLocation": {
          "@type": "x",
          "address": {
            "@type": "x",
            "addressLocality": "x",
            "addressRegion": "x",
            "addressCountry": "x"
          }
        },
        "directApply": true,
        "url": "x"
      },
      "description_sections": [
        {
          "title": "x",
          "paragraphs": [
            "x"
          ],
          "bullets": [
            "x"
          ]
        }
      ],
      "description_sections_meta": {
        "status": "ok",
        "source": "heuristic",
        "reason": "x"
      }
    },
    "idField": "id"
  },
  {
    "entity": "organization",
    "accessor": "Organization",
    "op": "load",
    "method": "GET",
    "path": "/job-boards/{company}",
    "args": [
      {
        "name": "company",
        "wire": "company",
        "value": "worklittle"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "organization": {
        "id": "x",
        "name": "Worklittle",
        "slug": "worklittle",
        "logo_url": "x",
        "banner_url": "x",
        "website_url": "x",
        "description": "x",
        "brand_color": "#0099FF",
        "headquarters": "x",
        "contact_email": "x",
        "industry": "x",
        "company_type": "nonprofit",
        "employee_count_range": "11-50",
        "linkedin_url": "x",
        "founded_year": 2025,
        "headquarters_city": "x",
        "headquarters_country": "US",
        "features": {
          "resume_autofill": true,
          "similar_job_alerts": true
        },
        "updated_at": "2026-01-01T00:00:00Z",
        "job_count": 1
      },
      "meta": {
        "next_cursor": "x",
        "total": 1,
        "rate_limit": {
          "limit_per_minute": 120,
          "remaining": -1
        }
      }
    },
    "idField": "id"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
