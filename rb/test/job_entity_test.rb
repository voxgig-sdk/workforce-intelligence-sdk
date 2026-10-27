# Job entity test

require "minitest/autorun"
require "json"
require_relative "../WorkforceIntelligence_sdk"
require_relative "runner"

class JobEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = WorkforceIntelligenceSDK.test(nil, nil)
    ent = testsdk.Job(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = WorkforceIntelligenceConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = WorkforceIntelligenceSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.Job(nil).list({ "company" => 1 }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = job_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["list", "load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "job." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    if setup[:live]
      ["company01"].each do |_live_key|
        if setup[:synthetic_only] || setup[:idmap][_live_key].nil?
          Runner.live_miss(LIVE_STRICT, "Live entity test blocked: needs #{_live_key} via WORKFORCE_INTELLIGENCE_TEST_JOB_ENTID")
        end
      end
    end
    client = setup[:client]
    if setup[:live]
      Runner.live_existing(setup, LIVE_STRICT, "job") do
        client.Job(nil).list({"company" => setup[:idmap]["company01"]}, nil)
      end
    end

    # Bootstrap entity data from existing test data.
    job_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.job")))
    job_ref01_data = nil
    if job_ref01_data_raw.length > 0
      job_ref01_data = Helpers.to_map(job_ref01_data_raw[0][1])
    end

    # LIST
    job_ref01_ent = client.Job(nil)
    job_ref01_match = {
      "company" => setup[:idmap]["company01"],
    }

    job_ref01_list_result = job_ref01_ent.list(job_ref01_match, nil)
    assert job_ref01_list_result.is_a?(Array)

    # LOAD
    job_ref01_match_dt0 = {
      "id" => job_ref01_data["id"],
    }
    job_ref01_match_dt0["company"] = [String, Numeric, TrueClass, FalseClass].any? { |c| job_ref01_data["company"].is_a?(c) } ? job_ref01_data["company"] : (setup[:idmap]["company"] || setup[:idmap]["company01"])
    job_ref01_data_dt0_loaded = job_ref01_ent.load(job_ref01_match_dt0, nil)
    job_ref01_data_dt0_load_result = Helpers.to_map(job_ref01_data_dt0_loaded.respond_to?(:data_get) ? job_ref01_data_dt0_loaded.data_get : job_ref01_data_dt0_loaded)
    assert !job_ref01_data_dt0_load_result.nil?
    assert_equal job_ref01_data_dt0_load_result["id"], job_ref01_data["id"]

  end
end

def job_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "job", "JobTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = WorkforceIntelligenceSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["job01", "job02", "job03", "company01"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["WORKFORCE_INTELLIGENCE_TEST_JOB_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "WORKFORCE_INTELLIGENCE_TEST_JOB_ENTID" => idmap,
    "WORKFORCE_INTELLIGENCE_TEST_LIVE" => "FALSE",
    "WORKFORCE_INTELLIGENCE_TEST_EXPLAIN" => "FALSE",
  })

  idmap_resolved = Helpers.to_map(
    env["WORKFORCE_INTELLIGENCE_TEST_JOB_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["WORKFORCE_INTELLIGENCE_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      # FIRST, so the generated fields below win: sdk-test-control.json's
      # test.client.options adds to the live client, it does not redirect it.
      Runner.live_client_options,
      {
      },
      extra || {},
    ])
    client = WorkforceIntelligenceSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["WORKFORCE_INTELLIGENCE_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["WORKFORCE_INTELLIGENCE_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
