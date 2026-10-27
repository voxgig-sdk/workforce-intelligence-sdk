package voxgigworkforceintelligencesdk

import (
	"github.com/voxgig-sdk/workforce-intelligence-sdk/go/core"
	"github.com/voxgig-sdk/workforce-intelligence-sdk/go/entity"
	"github.com/voxgig-sdk/workforce-intelligence-sdk/go/feature"
	_ "github.com/voxgig-sdk/workforce-intelligence-sdk/go/utility"
)

// Type aliases preserve external API.
type WorkforceIntelligenceSDK = core.WorkforceIntelligenceSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type WorkforceIntelligenceEntity = core.WorkforceIntelligenceEntity
type StreamItem = core.StreamItem
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type WorkforceIntelligenceError = core.WorkforceIntelligenceError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewRatelimitFeatureFunc = func() core.Feature {
		return feature.NewRatelimitFeature()
	}
	core.NewRetryFeatureFunc = func() core.Feature {
		return feature.NewRetryFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewTimeoutFeatureFunc = func() core.Feature {
		return feature.NewTimeoutFeature()
	}
	core.NewBoardEntityFunc = func(client *core.WorkforceIntelligenceSDK, entopts map[string]any) core.WorkforceIntelligenceEntity {
		return entity.NewBoardEntity(client, entopts)
	}
	core.NewFacetEntityFunc = func(client *core.WorkforceIntelligenceSDK, entopts map[string]any) core.WorkforceIntelligenceEntity {
		return entity.NewFacetEntity(client, entopts)
	}
	core.NewHealthEntityFunc = func(client *core.WorkforceIntelligenceSDK, entopts map[string]any) core.WorkforceIntelligenceEntity {
		return entity.NewHealthEntity(client, entopts)
	}
	core.NewJobEntityFunc = func(client *core.WorkforceIntelligenceSDK, entopts map[string]any) core.WorkforceIntelligenceEntity {
		return entity.NewJobEntity(client, entopts)
	}
	core.NewJobPostingEntityFunc = func(client *core.WorkforceIntelligenceSDK, entopts map[string]any) core.WorkforceIntelligenceEntity {
		return entity.NewJobPostingEntity(client, entopts)
	}
	core.NewOrganizationEntityFunc = func(client *core.WorkforceIntelligenceSDK, entopts map[string]any) core.WorkforceIntelligenceEntity {
		return entity.NewOrganizationEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewWorkforceIntelligenceSDK = core.NewWorkforceIntelligenceSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var SharedConfig = core.SharedConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewWorkforceIntelligenceSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *WorkforceIntelligenceSDK  { return NewWorkforceIntelligenceSDK(nil) }
func Test() *WorkforceIntelligenceSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewRatelimitFeature = feature.NewRatelimitFeature
var NewRetryFeature = feature.NewRetryFeature
var NewTestFeature = feature.NewTestFeature
var NewTimeoutFeature = feature.NewTimeoutFeature
