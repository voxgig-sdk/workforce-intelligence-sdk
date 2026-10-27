# WorkforceIntelligence SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module WorkforceIntelligenceFeatures
  def self.make_feature(name)
    case name
    when "base"
      WorkforceIntelligenceBaseFeature.new
    when "ratelimit"
      WorkforceIntelligenceRatelimitFeature.new
    when "retry"
      WorkforceIntelligenceRetryFeature.new
    when "test"
      WorkforceIntelligenceTestFeature.new
    when "timeout"
      WorkforceIntelligenceTimeoutFeature.new
    else
      WorkforceIntelligenceBaseFeature.new
    end
  end
end
