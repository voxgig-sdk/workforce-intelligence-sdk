# WorkforceIntelligence SDK utility: make_context
require_relative '../core/context'
module WorkforceIntelligenceUtilities
  MakeContext = ->(ctxmap, basectx) {
    WorkforceIntelligenceContext.new(ctxmap, basectx)
  }
end
