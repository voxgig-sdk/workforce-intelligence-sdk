-- Typed models for the WorkforceIntelligence SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
-- params (op.<name>.points[].g.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Board
---@field accepting_applicants? boolean
---@field apply_url? string
---@field company? table
---@field department? string
---@field employment_type? string
---@field id string
---@field locations? table
---@field posted_job_id? string
---@field published_at? string
---@field roles_to_fill? number
---@field salary? any
---@field slug string
---@field source? table
---@field source_url? string
---@field title string
---@field updated_at? string
---@field url_path? string
---@field visa_sponsorship? any
---@field workplace_type? string

---@class BoardListMatch
---@field company string
---@field cursor? string
---@field department? string
---@field employment_type? string
---@field include? string
---@field limit? number
---@field location? string
---@field q? string
---@field workplace_type? string

---@class Facet
---@field company? string
---@field facets table
---@field meta? table

---@class FacetLoadMatch
---@field company string
---@field location? string
---@field q? string

---@class Health
---@field status string
---@field version string

---@class HealthLoadMatch
---@field status? string
---@field version? string

---@class Job
---@field accepting_applicants? boolean
---@field apply_url? string
---@field company? string
---@field department? string
---@field employment_type? string
---@field features? table
---@field id string
---@field job any
---@field locations? table
---@field meta? table
---@field posted_job_id? string
---@field published_at? string
---@field roles_to_fill? number
---@field salary? any
---@field slug string
---@field source? table
---@field source_url? string
---@field title string
---@field updated_at? string
---@field url_path? string
---@field visa_sponsorship? any
---@field workplace_type? string

---@class JobLoadMatch
---@field company string
---@field id string
---@field preview? string

---@class JobListMatch
---@field company string
---@field cursor? string
---@field department? string
---@field employment_type? string
---@field limit? number
---@field location? string
---@field q? string
---@field workplace_type? string

---@class JobPosting
---@field bullets? table
---@field paragraphs? table
---@field title? string

---@class JobPostingListMatch
---@field company string
---@field id_or_slug string
---@field canonical_url? string

---@class Organization
---@field banner_url? string
---@field brand_color? string
---@field company_type? string
---@field contact_email? string
---@field description? string
---@field employee_count_range? string
---@field features? table
---@field founded_year? number
---@field headquarters? string
---@field headquarters_city? string
---@field headquarters_country? string
---@field id string
---@field industry? string
---@field job_count? number
---@field linkedin_url? string
---@field logo_url? string
---@field name string
---@field slug string
---@field updated_at? string
---@field website_url? string

---@class OrganizationLoadMatch
---@field company string

local M = {}

return M
