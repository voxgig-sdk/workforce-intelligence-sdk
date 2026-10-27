package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewBoardEntityFunc func(client *WorkforceIntelligenceSDK, entopts map[string]any) WorkforceIntelligenceEntity

var NewFacetEntityFunc func(client *WorkforceIntelligenceSDK, entopts map[string]any) WorkforceIntelligenceEntity

var NewHealthEntityFunc func(client *WorkforceIntelligenceSDK, entopts map[string]any) WorkforceIntelligenceEntity

var NewJobEntityFunc func(client *WorkforceIntelligenceSDK, entopts map[string]any) WorkforceIntelligenceEntity

var NewJobPostingEntityFunc func(client *WorkforceIntelligenceSDK, entopts map[string]any) WorkforceIntelligenceEntity

var NewOrganizationEntityFunc func(client *WorkforceIntelligenceSDK, entopts map[string]any) WorkforceIntelligenceEntity

