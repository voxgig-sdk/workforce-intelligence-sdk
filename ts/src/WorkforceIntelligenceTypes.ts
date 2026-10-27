// Typed models for the WorkforceIntelligence SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Board {
  accepting_applicants?: boolean
  apply_url?: string
  company?: Record<string, any>
  department?: string
  employment_type?: string
  id: string
  locations?: any[]
  posted_job_id?: string
  published_at?: string
  roles_to_fill?: number
  salary?: any
  slug: string
  source?: Record<string, any>
  source_url?: string
  title: string
  updated_at?: string
  url_path?: string
  visa_sponsorship?: any
  workplace_type?: string
}

export interface BoardListMatch {
  company: string
  cursor?: string
  department?: string
  employment_type?: string
  include?: string
  limit?: number
  location?: string
  q?: string
  workplace_type?: string
}

export interface Facet {
  company?: string
  facets: Record<string, any>
  meta?: Record<string, any>
}

export interface FacetLoadMatch {
  company: string
  location?: string
  q?: string
}

export interface Health {
  status: string
  version: string
}

export interface HealthLoadMatch {
  status?: string
  version?: string
}

export interface Job {
  accepting_applicants?: boolean
  apply_url?: string
  company?: string
  department?: string
  employment_type?: string
  features?: Record<string, any>
  id: string
  job: any
  locations?: any[]
  meta?: Record<string, any>
  posted_job_id?: string
  published_at?: string
  roles_to_fill?: number
  salary?: any
  slug: string
  source?: Record<string, any>
  source_url?: string
  title: string
  updated_at?: string
  url_path?: string
  visa_sponsorship?: any
  workplace_type?: string
}

export interface JobLoadMatch {
  company: string
  id: string
  preview?: string
}

export interface JobListMatch {
  company: string
  cursor?: string
  department?: string
  employment_type?: string
  limit?: number
  location?: string
  q?: string
  workplace_type?: string
}

export interface JobPosting {
  bullets?: any[]
  paragraphs?: any[]
  title?: string
}

export interface JobPostingListMatch {
  company: string
  id_or_slug: string
  canonical_url?: string
}

export interface Organization {
  banner_url?: string
  brand_color?: string
  company_type?: string
  contact_email?: string
  description?: string
  employee_count_range?: string
  features?: Record<string, any>
  founded_year?: number
  headquarters?: string
  headquarters_city?: string
  headquarters_country?: string
  id: string
  industry?: string
  job_count?: number
  linkedin_url?: string
  logo_url?: string
  name: string
  slug: string
  updated_at?: string
  website_url?: string
}

export interface OrganizationLoadMatch {
  company: string
}

