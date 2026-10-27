-- WorkforceIntelligence SDK exists test

local sdk = require("workforce-intelligence_sdk")

describe("WorkforceIntelligenceSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
