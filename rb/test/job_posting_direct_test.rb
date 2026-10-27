# JobPosting direct test

require "minitest/autorun"
require "json"
require_relative "../WorkforceIntelligence_sdk"
require_relative "runner"

class JobPostingDirectTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def live_ok(result)
    status = Helpers.to_int(result["status"])
    result["err"].nil? && result["ok"] && status >= 200 && status < 300
  end

  def test_direct_list_job_posting
    setup = job_posting_direct_setup([
      { "id" => "direct01" },
      { "id" => "direct02" },
    ])
    _should_skip, _reason = Runner.is_control_skipped("direct", "direct-list-job_posting", setup[:live] ? "live" : "unit")
    if _should_skip
      skip(_reason || "skipped via sdk-test-control.json")
      return
    end
    if setup[:live]
      ["company01", "id_or_slug01"].each do |_live_key|
        if setup[:idmap][_live_key].nil?
          Runner.live_miss(LIVE_STRICT, "Live test blocked: needs #{_live_key} via WORKFORCE_INTELLIGENCE_TEST_JOB_POSTING_ENTID")
        end
      end
    end
    client = setup[:client]

    params = {}
    query = {}
    params["company"] = setup[:live] ? setup[:idmap]["company01"] : "direct01"
    params["id_or_slug"] = setup[:live] ? setup[:idmap]["id_or_slug01"] : "direct02"

    result = client.direct({
      "path" => "job-boards/{company}/jobs/{id_or_slug}/json-ld",
      "method" => "GET",
      "params" => params,
      "query" => query,
    })
    if setup[:live]
      unless live_ok(result)
        Runner.live_miss(LIVE_STRICT, "Live list failed: " + Runner.live_describe(result))
      end
      if Runner.live_list(result["data"]).nil?
        Runner.live_miss(LIVE_STRICT, "Live list returned no list: " + Runner.live_describe(result))
      end
      assert Runner.live_list(result["data"]).is_a?(Array)
    else
      assert_nil result["err"]
      assert result["ok"]
      assert_equal 200, Helpers.to_int(result["status"])
      assert result["data"].is_a?(Array)
      assert_equal 2, result["data"].length
      assert_equal 1, setup[:calls].length
    end
  end

end


def job_posting_direct_setup(mockres)
  Runner.load_env_local

  calls = []

  env = Runner.env_override({
    "WORKFORCE_INTELLIGENCE_TEST_JOB_POSTING_ENTID" => {},
    "WORKFORCE_INTELLIGENCE_TEST_LIVE" => "FALSE",
  })

  live = env["WORKFORCE_INTELLIGENCE_TEST_LIVE"] == "TRUE"

  if live
    # Merged so the generated fields win: sdk-test-control.json's
    # test.client.options adds to the live client, it does not redirect it.
    merged_opts = Runner.live_client_options.merge({
    })
    client = WorkforceIntelligenceSDK.new(merged_opts)
    idmap = env["WORKFORCE_INTELLIGENCE_TEST_JOB_POSTING_ENTID"]
    # A path parameter's example stands in for an id *_ENTID does not give.
    idmap = { "company01" => "worklittle", "id_or_slug01" => "applied-ai-engineer-internship" }
      .merge(idmap.is_a?(Hash) ? idmap : {})
    return {
      client: client,
      calls: calls,
      live: true,
      idmap: idmap.is_a?(Hash) ? idmap : {},
    }
  end

  mock_fetch = ->(url, init) {
    calls.push({ "url" => url, "init" => init })
    return {
      "status" => 200,
      "statusText" => "OK",
      "headers" => {},
      "json" => ->() {
        if !mockres.nil?
          return mockres
        end
        return { "id" => "direct01" }
      },
      "body" => "mock",
    }, nil
  }

  client = WorkforceIntelligenceSDK.new({
    "base" => "http://localhost:8080",
    "system" => {
      "fetch" => mock_fetch,
    },
  })

  {
    client: client,
    calls: calls,
    live: false,
    idmap: {},
  }
end
