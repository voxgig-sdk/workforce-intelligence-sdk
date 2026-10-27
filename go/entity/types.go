// Typed models for the WorkforceIntelligence SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/workforce-intelligence-sdk/go/core"
)

// Board is the typed data model for the board entity.
type Board struct {
}

// BoardListMatch is the typed request payload for Board.ListTyped.
type BoardListMatch struct {
	Company string `json:"company"`
	Cursor *string `json:"cursor,omitempty"`
	Department *string `json:"department,omitempty"`
	EmploymentType *string `json:"employment_type,omitempty"`
	Include *string `json:"include,omitempty"`
	Limit *int `json:"limit,omitempty"`
	Location *string `json:"location,omitempty"`
	Q *string `json:"q,omitempty"`
	WorkplaceType *string `json:"workplace_type,omitempty"`
}

// Facet is the typed data model for the facet entity.
type Facet struct {
}

// FacetLoadMatch is the typed request payload for Facet.LoadTyped.
type FacetLoadMatch struct {
	Company string `json:"company"`
	Location *string `json:"location,omitempty"`
	Q *string `json:"q,omitempty"`
}

// Health is the typed data model for the health entity.
type Health struct {
}

// HealthLoadMatch is the typed request payload for Health.LoadTyped.
type HealthLoadMatch struct {
	Status *string `json:"status,omitempty"`
	Version *string `json:"version,omitempty"`
}

// Job is the typed data model for the job entity.
type Job struct {
}

// JobLoadMatch is the typed request payload for Job.LoadTyped.
type JobLoadMatch struct {
	Company string `json:"company"`
	Id string `json:"id"`
	Preview *string `json:"preview,omitempty"`
}

// JobListMatch is the typed request payload for Job.ListTyped.
type JobListMatch struct {
	Company string `json:"company"`
	Cursor *string `json:"cursor,omitempty"`
	Department *string `json:"department,omitempty"`
	EmploymentType *string `json:"employment_type,omitempty"`
	Limit *int `json:"limit,omitempty"`
	Location *string `json:"location,omitempty"`
	Q *string `json:"q,omitempty"`
	WorkplaceType *string `json:"workplace_type,omitempty"`
}

// JobPosting is the typed data model for the job_posting entity.
type JobPosting struct {
}

// JobPostingListMatch is the typed request payload for JobPosting.ListTyped.
type JobPostingListMatch struct {
	Company string `json:"company"`
	IdOrSlug string `json:"id_or_slug"`
	CanonicalUrl *string `json:"canonical_url,omitempty"`
}

// Organization is the typed data model for the organization entity.
type Organization struct {
}

// OrganizationLoadMatch is the typed request payload for Organization.LoadTyped.
type OrganizationLoadMatch struct {
	Company string `json:"company"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
