# frozen_string_literal: true

# Typed models for the WorkforceIntelligence SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Board entity data model.
#
# @!attribute [rw] accepting_applicants
#   @return [Boolean, nil]
#
# @!attribute [rw] apply_url
#   @return [String, nil]
#
# @!attribute [rw] company
#   @return [Hash, nil]
#
# @!attribute [rw] department
#   @return [String, nil]
#
# @!attribute [rw] employment_type
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] locations
#   @return [Array, nil]
#
# @!attribute [rw] posted_job_id
#   @return [String, nil]
#
# @!attribute [rw] published_at
#   @return [String, nil]
#
# @!attribute [rw] roles_to_fill
#   @return [Integer, nil]
#
# @!attribute [rw] salary
#   @return [Object, nil]
#
# @!attribute [rw] slug
#   @return [String]
#
# @!attribute [rw] source
#   @return [Hash, nil]
#
# @!attribute [rw] source_url
#   @return [String, nil]
#
# @!attribute [rw] title
#   @return [String]
#
# @!attribute [rw] updated_at
#   @return [String, nil]
#
# @!attribute [rw] url_path
#   @return [String, nil]
#
# @!attribute [rw] visa_sponsorship
#   @return [Object, nil]
#
# @!attribute [rw] workplace_type
#   @return [String, nil]
Board = Struct.new(
  :accepting_applicants,
  :apply_url,
  :company,
  :department,
  :employment_type,
  :id,
  :locations,
  :posted_job_id,
  :published_at,
  :roles_to_fill,
  :salary,
  :slug,
  :source,
  :source_url,
  :title,
  :updated_at,
  :url_path,
  :visa_sponsorship,
  :workplace_type,
  keyword_init: true
)

# Request payload for Board#list.
#
# @!attribute [rw] company
#   @return [String]
#
# @!attribute [rw] cursor
#   @return [String, nil]
#
# @!attribute [rw] department
#   @return [String, nil]
#
# @!attribute [rw] employment_type
#   @return [String, nil]
#
# @!attribute [rw] include
#   @return [String, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] location
#   @return [String, nil]
#
# @!attribute [rw] q
#   @return [String, nil]
#
# @!attribute [rw] workplace_type
#   @return [String, nil]
BoardListMatch = Struct.new(
  :company,
  :cursor,
  :department,
  :employment_type,
  :include,
  :limit,
  :location,
  :q,
  :workplace_type,
  keyword_init: true
)

# Facet entity data model.
#
# @!attribute [rw] company
#   @return [String, nil]
#
# @!attribute [rw] facets
#   @return [Hash]
#
# @!attribute [rw] meta
#   @return [Hash, nil]
Facet = Struct.new(
  :company,
  :facets,
  :meta,
  keyword_init: true
)

# Request payload for Facet#load.
#
# @!attribute [rw] company
#   @return [String]
#
# @!attribute [rw] location
#   @return [String, nil]
#
# @!attribute [rw] q
#   @return [String, nil]
FacetLoadMatch = Struct.new(
  :company,
  :location,
  :q,
  keyword_init: true
)

# Health entity data model.
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] version
#   @return [String]
Health = Struct.new(
  :status,
  :version,
  keyword_init: true
)

# Request payload for Health#load.
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] version
#   @return [String, nil]
HealthLoadMatch = Struct.new(
  :status,
  :version,
  keyword_init: true
)

# Job entity data model.
#
# @!attribute [rw] accepting_applicants
#   @return [Boolean, nil]
#
# @!attribute [rw] apply_url
#   @return [String, nil]
#
# @!attribute [rw] company
#   @return [String, nil]
#
# @!attribute [rw] department
#   @return [String, nil]
#
# @!attribute [rw] employment_type
#   @return [String, nil]
#
# @!attribute [rw] features
#   @return [Hash, nil]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] job
#   @return [Object]
#
# @!attribute [rw] locations
#   @return [Array, nil]
#
# @!attribute [rw] meta
#   @return [Hash, nil]
#
# @!attribute [rw] posted_job_id
#   @return [String, nil]
#
# @!attribute [rw] published_at
#   @return [String, nil]
#
# @!attribute [rw] roles_to_fill
#   @return [Integer, nil]
#
# @!attribute [rw] salary
#   @return [Object, nil]
#
# @!attribute [rw] slug
#   @return [String]
#
# @!attribute [rw] source
#   @return [Hash, nil]
#
# @!attribute [rw] source_url
#   @return [String, nil]
#
# @!attribute [rw] title
#   @return [String]
#
# @!attribute [rw] updated_at
#   @return [String, nil]
#
# @!attribute [rw] url_path
#   @return [String, nil]
#
# @!attribute [rw] visa_sponsorship
#   @return [Object, nil]
#
# @!attribute [rw] workplace_type
#   @return [String, nil]
Job = Struct.new(
  :accepting_applicants,
  :apply_url,
  :company,
  :department,
  :employment_type,
  :features,
  :id,
  :job,
  :locations,
  :meta,
  :posted_job_id,
  :published_at,
  :roles_to_fill,
  :salary,
  :slug,
  :source,
  :source_url,
  :title,
  :updated_at,
  :url_path,
  :visa_sponsorship,
  :workplace_type,
  keyword_init: true
)

# Request payload for Job#load.
#
# @!attribute [rw] company
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] preview
#   @return [String, nil]
JobLoadMatch = Struct.new(
  :company,
  :id,
  :preview,
  keyword_init: true
)

# Request payload for Job#list.
#
# @!attribute [rw] company
#   @return [String]
#
# @!attribute [rw] cursor
#   @return [String, nil]
#
# @!attribute [rw] department
#   @return [String, nil]
#
# @!attribute [rw] employment_type
#   @return [String, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] location
#   @return [String, nil]
#
# @!attribute [rw] q
#   @return [String, nil]
#
# @!attribute [rw] workplace_type
#   @return [String, nil]
JobListMatch = Struct.new(
  :company,
  :cursor,
  :department,
  :employment_type,
  :limit,
  :location,
  :q,
  :workplace_type,
  keyword_init: true
)

# JobPosting entity data model.
#
# @!attribute [rw] bullets
#   @return [Array, nil]
#
# @!attribute [rw] paragraphs
#   @return [Array, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
JobPosting = Struct.new(
  :bullets,
  :paragraphs,
  :title,
  keyword_init: true
)

# Request payload for JobPosting#list.
#
# @!attribute [rw] company
#   @return [String]
#
# @!attribute [rw] id_or_slug
#   @return [String]
#
# @!attribute [rw] canonical_url
#   @return [String, nil]
JobPostingListMatch = Struct.new(
  :company,
  :id_or_slug,
  :canonical_url,
  keyword_init: true
)

# Organization entity data model.
#
# @!attribute [rw] banner_url
#   @return [String, nil]
#
# @!attribute [rw] brand_color
#   @return [String, nil]
#
# @!attribute [rw] company_type
#   @return [String, nil]
#
# @!attribute [rw] contact_email
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] employee_count_range
#   @return [String, nil]
#
# @!attribute [rw] features
#   @return [Hash, nil]
#
# @!attribute [rw] founded_year
#   @return [Integer, nil]
#
# @!attribute [rw] headquarters
#   @return [String, nil]
#
# @!attribute [rw] headquarters_city
#   @return [String, nil]
#
# @!attribute [rw] headquarters_country
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] industry
#   @return [String, nil]
#
# @!attribute [rw] job_count
#   @return [Integer, nil]
#
# @!attribute [rw] linkedin_url
#   @return [String, nil]
#
# @!attribute [rw] logo_url
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] slug
#   @return [String]
#
# @!attribute [rw] updated_at
#   @return [String, nil]
#
# @!attribute [rw] website_url
#   @return [String, nil]
Organization = Struct.new(
  :banner_url,
  :brand_color,
  :company_type,
  :contact_email,
  :description,
  :employee_count_range,
  :features,
  :founded_year,
  :headquarters,
  :headquarters_city,
  :headquarters_country,
  :id,
  :industry,
  :job_count,
  :linkedin_url,
  :logo_url,
  :name,
  :slug,
  :updated_at,
  :website_url,
  keyword_init: true
)

# Request payload for Organization#load.
#
# @!attribute [rw] company
#   @return [String]
OrganizationLoadMatch = Struct.new(
  :company,
  keyword_init: true
)

