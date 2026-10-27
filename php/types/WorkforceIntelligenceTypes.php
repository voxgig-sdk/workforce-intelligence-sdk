<?php
declare(strict_types=1);

// Typed models for the WorkforceIntelligence SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Board entity data model. */
class Board
{
    public ?bool $accepting_applicants = null;
    public ?string $apply_url = null;
    public ?array $company = null;
    public ?string $department = null;
    public ?string $employment_type = null;
    public string $id;
    public ?array $locations = null;
    public ?string $posted_job_id = null;
    public ?string $published_at = null;
    public ?int $roles_to_fill = null;
    public mixed $salary = null;
    public string $slug;
    public ?array $source = null;
    public ?string $source_url = null;
    public string $title;
    public ?string $updated_at = null;
    public ?string $url_path = null;
    public mixed $visa_sponsorship = null;
    public ?string $workplace_type = null;
}

/** Request payload for Board#list. */
class BoardListMatch
{
    public string $company;
    public ?string $cursor = null;
    public ?string $department = null;
    public ?string $employment_type = null;
    public ?string $include = null;
    public ?int $limit = null;
    public ?string $location = null;
    public ?string $q = null;
    public ?string $workplace_type = null;
}

/** Facet entity data model. */
class Facet
{
    public ?string $company = null;
    public array $facets;
    public ?array $meta = null;
}

/** Request payload for Facet#load. */
class FacetLoadMatch
{
    public string $company;
    public ?string $location = null;
    public ?string $q = null;
}

/** Health entity data model. */
class Health
{
    public string $status;
    public string $version;
}

/** Request payload for Health#load. */
class HealthLoadMatch
{
    public ?string $status = null;
    public ?string $version = null;
}

/** Job entity data model. */
class Job
{
    public ?bool $accepting_applicants = null;
    public ?string $apply_url = null;
    public ?string $company = null;
    public ?string $department = null;
    public ?string $employment_type = null;
    public ?array $features = null;
    public string $id;
    public mixed $job;
    public ?array $locations = null;
    public ?array $meta = null;
    public ?string $posted_job_id = null;
    public ?string $published_at = null;
    public ?int $roles_to_fill = null;
    public mixed $salary = null;
    public string $slug;
    public ?array $source = null;
    public ?string $source_url = null;
    public string $title;
    public ?string $updated_at = null;
    public ?string $url_path = null;
    public mixed $visa_sponsorship = null;
    public ?string $workplace_type = null;
}

/** Request payload for Job#load. */
class JobLoadMatch
{
    public string $company;
    public string $id;
    public ?string $preview = null;
}

/** Request payload for Job#list. */
class JobListMatch
{
    public string $company;
    public ?string $cursor = null;
    public ?string $department = null;
    public ?string $employment_type = null;
    public ?int $limit = null;
    public ?string $location = null;
    public ?string $q = null;
    public ?string $workplace_type = null;
}

/** JobPosting entity data model. */
class JobPosting
{
    public ?array $bullets = null;
    public ?array $paragraphs = null;
    public ?string $title = null;
}

/** Request payload for JobPosting#list. */
class JobPostingListMatch
{
    public string $company;
    public string $id_or_slug;
    public ?string $canonical_url = null;
}

/** Organization entity data model. */
class Organization
{
    public ?string $banner_url = null;
    public ?string $brand_color = null;
    public ?string $company_type = null;
    public ?string $contact_email = null;
    public ?string $description = null;
    public ?string $employee_count_range = null;
    public ?array $features = null;
    public ?int $founded_year = null;
    public ?string $headquarters = null;
    public ?string $headquarters_city = null;
    public ?string $headquarters_country = null;
    public string $id;
    public ?string $industry = null;
    public ?int $job_count = null;
    public ?string $linkedin_url = null;
    public ?string $logo_url = null;
    public string $name;
    public string $slug;
    public ?string $updated_at = null;
    public ?string $website_url = null;
}

/** Request payload for Organization#load. */
class OrganizationLoadMatch
{
    public string $company;
}

