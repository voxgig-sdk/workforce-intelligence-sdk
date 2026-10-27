package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "WorkforceIntelligence",
			"slug": "workforce-intelligence",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"now": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
		},
		"options": map[string]any{
			"base": "https://api.worklittle.com",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"board": map[string]any{},
				"facet": map[string]any{},
				"health": map[string]any{},
				"job": map[string]any{},
				"job_posting": map[string]any{},
				"organization": map[string]any{},
			},
		},
		"entity": map[string]any{
			"board": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "accepting_applicants",
						"title": "Accepting Applicants",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "apply_url",
						"title": "Apply Url",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "company",
						"title": "Company",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "department",
						"title": "Department",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "employment_type",
						"title": "Employment Type",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
						"short": "Public job id.",
					},
					map[string]any{
						"name": "locations",
						"title": "Locations",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "posted_job_id",
						"title": "Posted Job Id",
						"type": "`$STRING`",
						"format": "uuid",
					},
					map[string]any{
						"name": "published_at",
						"title": "Published At",
						"type": "`$STRING`",
						"format": "date-time",
					},
					map[string]any{
						"name": "roles_to_fill",
						"title": "Roles To Fill",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "salary",
						"title": "Salary",
						"type": "`$ANY`",
						"short": "Any type; null in every probe, shape unverified.",
					},
					map[string]any{
						"name": "slug",
						"title": "Slug",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "source",
						"title": "Source",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "source_url",
						"title": "Source Url",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "title",
						"title": "Title",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "updated_at",
						"title": "Updated At",
						"type": "`$STRING`",
						"format": "date-time",
					},
					map[string]any{
						"name": "url_path",
						"title": "Url Path",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "visa_sponsorship",
						"title": "Visa Sponsorship",
						"type": "`$ANY`",
						"short": "Any type; null in every probe, shape unverified.",
					},
					map[string]any{
						"name": "workplace_type",
						"title": "Workplace Type",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "board",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/job-boards/{company}/board",
								"segments": []any{
									map[string]any{
										"lit": "job-boards",
									},
									map[string]any{
										"var": "company",
									},
									map[string]any{
										"lit": "board",
									},
								},
								"parts": []any{
									"job-boards",
									"{company}",
									"board",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.jobs`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "company",
											"orig": "company",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "worklittle",
										},
									},
									"query": []any{
										map[string]any{
											"name": "cursor",
											"orig": "cursor",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "department",
											"orig": "department",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
										map[string]any{
											"name": "employment_type",
											"orig": "employment_type",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
										map[string]any{
											"name": "include",
											"orig": "include",
											"type": "`$STRING`",
											"kind": "query",
											"example": "facets",
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 25,
										},
										map[string]any{
											"name": "location",
											"orig": "location",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "q",
											"orig": "q",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "workplace_type",
											"orig": "workplace_type",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"company",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"facet": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "company",
						"title": "Company",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "facets",
						"title": "Facets",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "meta",
						"title": "Meta",
						"type": "`$OBJECT`",
					},
				},
				"name": "facet",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/job-boards/{company}/facets",
								"segments": []any{
									map[string]any{
										"lit": "job-boards",
									},
									map[string]any{
										"var": "company",
									},
									map[string]any{
										"lit": "facets",
									},
								},
								"parts": []any{
									"job-boards",
									"{company}",
									"facets",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "company",
											"orig": "company",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "worklittle",
										},
									},
									"query": []any{
										map[string]any{
											"name": "location",
											"orig": "location",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "q",
											"orig": "q",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"company",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"health": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "status",
						"title": "Status",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "version",
						"title": "Version",
						"type": "`$STRING`",
						"req": true,
					},
				},
				"name": "health",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/health",
								"segments": []any{
									map[string]any{
										"lit": "health",
									},
								},
								"parts": []any{
									"health",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"job": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "accepting_applicants",
						"title": "Accepting Applicants",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "apply_url",
						"title": "Apply Url",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "company",
						"title": "Company",
						"type": "`$STRING`",
						"short": "Board slug.",
					},
					map[string]any{
						"name": "department",
						"title": "Department",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "employment_type",
						"title": "Employment Type",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "features",
						"title": "Features",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
						"short": "Public job id.",
					},
					map[string]any{
						"name": "job",
						"title": "Job",
						"type": "`$ANY`",
						"req": true,
					},
					map[string]any{
						"name": "locations",
						"title": "Locations",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "meta",
						"title": "Meta",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "posted_job_id",
						"title": "Posted Job Id",
						"type": "`$STRING`",
						"format": "uuid",
					},
					map[string]any{
						"name": "published_at",
						"title": "Published At",
						"type": "`$STRING`",
						"format": "date-time",
					},
					map[string]any{
						"name": "roles_to_fill",
						"title": "Roles To Fill",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "salary",
						"title": "Salary",
						"type": "`$ANY`",
						"short": "Any type; null in every probe, shape unverified.",
					},
					map[string]any{
						"name": "slug",
						"title": "Slug",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "source",
						"title": "Source",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "source_url",
						"title": "Source Url",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "title",
						"title": "Title",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "updated_at",
						"title": "Updated At",
						"type": "`$STRING`",
						"format": "date-time",
					},
					map[string]any{
						"name": "url_path",
						"title": "Url Path",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "visa_sponsorship",
						"title": "Visa Sponsorship",
						"type": "`$ANY`",
						"short": "Any type; null in every probe, shape unverified.",
					},
					map[string]any{
						"name": "workplace_type",
						"title": "Workplace Type",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "job",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/job-boards/{company}/jobs",
								"segments": []any{
									map[string]any{
										"lit": "job-boards",
									},
									map[string]any{
										"var": "company",
									},
									map[string]any{
										"lit": "jobs",
									},
								},
								"parts": []any{
									"job-boards",
									"{company}",
									"jobs",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "company",
											"orig": "company",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "worklittle",
										},
									},
									"query": []any{
										map[string]any{
											"name": "cursor",
											"orig": "cursor",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "department",
											"orig": "department",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
										map[string]any{
											"name": "employment_type",
											"orig": "employment_type",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 25,
										},
										map[string]any{
											"name": "location",
											"orig": "location",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "q",
											"orig": "q",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "workplace_type",
											"orig": "workplace_type",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"company",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/job-boards/{company}/jobs/{idOrSlug}",
								"segments": []any{
									map[string]any{
										"lit": "job-boards",
									},
									map[string]any{
										"var": "company",
									},
									map[string]any{
										"lit": "jobs",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"job-boards",
									"{company}",
									"jobs",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"idOrSlug": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.job`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "company",
											"orig": "company",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "worklittle",
										},
										map[string]any{
											"name": "id",
											"orig": "idOrSlug",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "applied-ai-engineer-internship",
										},
									},
									"query": []any{
										map[string]any{
											"name": "preview",
											"orig": "preview",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"company",
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"job_posting": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "bullets",
						"title": "Bullets",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "paragraphs",
						"title": "Paragraphs",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "title",
						"title": "Title",
						"type": "`$STRING`",
					},
				},
				"name": "job_posting",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/job-boards/{company}/jobs/{idOrSlug}/json-ld",
								"segments": []any{
									map[string]any{
										"lit": "job-boards",
									},
									map[string]any{
										"var": "company",
									},
									map[string]any{
										"lit": "jobs",
									},
									map[string]any{
										"var": "id_or_slug",
									},
									map[string]any{
										"lit": "json-ld",
									},
								},
								"parts": []any{
									"job-boards",
									"{company}",
									"jobs",
									"{id_or_slug}",
									"json-ld",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"idOrSlug": "id_or_slug",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "company",
											"orig": "company",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "worklittle",
										},
										map[string]any{
											"name": "id_or_slug",
											"orig": "idOrSlug",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "applied-ai-engineer-internship",
										},
									},
									"query": []any{
										map[string]any{
											"name": "canonical_url",
											"orig": "canonical_url",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"company",
										"id_or_slug",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.job",
						},
					},
				},
			},
			"organization": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "banner_url",
						"title": "Banner Url",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "brand_color",
						"title": "Brand Color",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "company_type",
						"title": "Company Type",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "contact_email",
						"title": "Contact Email",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "description",
						"title": "Description",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "employee_count_range",
						"title": "Employee Count Range",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "features",
						"title": "Features",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "founded_year",
						"title": "Founded Year",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "headquarters",
						"title": "Headquarters",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "headquarters_city",
						"title": "Headquarters City",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "headquarters_country",
						"title": "Headquarters Country",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
						"format": "uuid",
					},
					map[string]any{
						"name": "industry",
						"title": "Industry",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "job_count",
						"title": "Job Count",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "linkedin_url",
						"title": "Linkedin Url",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "logo_url",
						"title": "Logo Url",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "slug",
						"title": "Slug",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "updated_at",
						"title": "Updated At",
						"type": "`$STRING`",
						"format": "date-time",
					},
					map[string]any{
						"name": "website_url",
						"title": "Website Url",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "organization",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/job-boards/{company}",
								"segments": []any{
									map[string]any{
										"lit": "job-boards",
									},
									map[string]any{
										"var": "company",
									},
								},
								"parts": []any{
									"job-boards",
									"{company}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.organization`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "company",
											"orig": "company",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "worklittle",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"company",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
