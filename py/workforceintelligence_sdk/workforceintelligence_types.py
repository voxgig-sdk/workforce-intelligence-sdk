# Typed models for the WorkforceIntelligence SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class BoardRequired(TypedDict):
    id: str
    slug: str
    title: str


class Board(BoardRequired, total=False):
    accepting_applicants: bool
    apply_url: str
    company: dict
    department: str
    employment_type: str
    locations: list
    posted_job_id: str
    published_at: str
    roles_to_fill: int
    salary: Any
    source: dict
    source_url: str
    updated_at: str
    url_path: str
    visa_sponsorship: Any
    workplace_type: str


class BoardListMatchRequired(TypedDict):
    company: str


class BoardListMatch(BoardListMatchRequired, total=False):
    cursor: str
    department: str
    employment_type: str
    include: str
    limit: int
    location: str
    q: str
    workplace_type: str


class FacetRequired(TypedDict):
    facets: dict


class Facet(FacetRequired, total=False):
    company: str
    meta: dict


class FacetLoadMatchRequired(TypedDict):
    company: str


class FacetLoadMatch(FacetLoadMatchRequired, total=False):
    location: str
    q: str


class Health(TypedDict):
    status: str
    version: str


class HealthLoadMatch(TypedDict, total=False):
    status: str
    version: str


class JobRequired(TypedDict):
    id: str
    job: Any
    slug: str
    title: str


class Job(JobRequired, total=False):
    accepting_applicants: bool
    apply_url: str
    company: str
    department: str
    employment_type: str
    features: dict
    locations: list
    meta: dict
    posted_job_id: str
    published_at: str
    roles_to_fill: int
    salary: Any
    source: dict
    source_url: str
    updated_at: str
    url_path: str
    visa_sponsorship: Any
    workplace_type: str


class JobLoadMatchRequired(TypedDict):
    company: str
    id: str


class JobLoadMatch(JobLoadMatchRequired, total=False):
    preview: str


class JobListMatchRequired(TypedDict):
    company: str


class JobListMatch(JobListMatchRequired, total=False):
    cursor: str
    department: str
    employment_type: str
    limit: int
    location: str
    q: str
    workplace_type: str


class JobPosting(TypedDict, total=False):
    bullets: list
    paragraphs: list
    title: str


class JobPostingListMatchRequired(TypedDict):
    company: str
    id_or_slug: str


class JobPostingListMatch(JobPostingListMatchRequired, total=False):
    canonical_url: str


class OrganizationRequired(TypedDict):
    id: str
    name: str
    slug: str


class Organization(OrganizationRequired, total=False):
    banner_url: str
    brand_color: str
    company_type: str
    contact_email: str
    description: str
    employee_count_range: str
    features: dict
    founded_year: int
    headquarters: str
    headquarters_city: str
    headquarters_country: str
    industry: str
    job_count: int
    linkedin_url: str
    logo_url: str
    updated_at: str
    website_url: str


class OrganizationLoadMatch(TypedDict):
    company: str
