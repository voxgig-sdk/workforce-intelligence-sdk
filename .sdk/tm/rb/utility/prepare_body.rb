# WorkforceIntelligence SDK utility: prepare_body
require_relative 'media'
module WorkforceIntelligenceUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return WorkforceIntelligenceUtilities.raw_body(ctx.reqdata) if WorkforceIntelligenceUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
