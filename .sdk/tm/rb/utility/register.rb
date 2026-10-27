# WorkforceIntelligence SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'graphql'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

WorkforceIntelligenceUtility.registrar = ->(u) {
  u.clean = WorkforceIntelligenceUtilities::Clean
  u.clean_add = WorkforceIntelligenceUtilities::CleanAdd
  u.clean_explain = WorkforceIntelligenceUtilities::CleanExplain
  u.done = WorkforceIntelligenceUtilities::Done
  u.make_error = WorkforceIntelligenceUtilities::MakeError
  u.feature_add = WorkforceIntelligenceUtilities::FeatureAdd
  u.feature_hook = WorkforceIntelligenceUtilities::FeatureHook
  u.feature_init = WorkforceIntelligenceUtilities::FeatureInit
  u.fetcher = WorkforceIntelligenceUtilities::Fetcher
  u.make_fetch_def = WorkforceIntelligenceUtilities::MakeFetchDef
  u.make_context = WorkforceIntelligenceUtilities::MakeContext
  u.make_options = WorkforceIntelligenceUtilities::MakeOptions
  u.make_request = WorkforceIntelligenceUtilities::MakeRequest
  u.make_response = WorkforceIntelligenceUtilities::MakeResponse
  u.make_result = WorkforceIntelligenceUtilities::MakeResult
  u.make_point = WorkforceIntelligenceUtilities::MakePoint
  u.make_spec = WorkforceIntelligenceUtilities::MakeSpec
  u.make_url = WorkforceIntelligenceUtilities::MakeUrl
  u.param = WorkforceIntelligenceUtilities::Param
  u.prepare_auth = WorkforceIntelligenceUtilities::PrepareAuth
  u.prepare_body = WorkforceIntelligenceUtilities::PrepareBody
  u.prepare_headers = WorkforceIntelligenceUtilities::PrepareHeaders
  u.prepare_method = WorkforceIntelligenceUtilities::PrepareMethod
  u.prepare_params = WorkforceIntelligenceUtilities::PrepareParams
  u.prepare_path = WorkforceIntelligenceUtilities::PreparePath
  u.prepare_query = WorkforceIntelligenceUtilities::PrepareQuery
  u.graphql_body = WorkforceIntelligenceUtilities::GraphqlBody
  u.graphql_errors = WorkforceIntelligenceUtilities::GraphqlErrors
  u.result_basic = WorkforceIntelligenceUtilities::ResultBasic
  u.result_body = WorkforceIntelligenceUtilities::ResultBody
  u.result_headers = WorkforceIntelligenceUtilities::ResultHeaders
  u.transform_request = WorkforceIntelligenceUtilities::TransformRequest
  u.transform_response = WorkforceIntelligenceUtilities::TransformResponse
}
