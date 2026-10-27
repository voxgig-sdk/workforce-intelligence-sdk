<?php
declare(strict_types=1);

// Job entity test

require_once __DIR__ . '/../workforceintelligence_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class JobEntityTest extends TestCase
{
    // main.kit.test.live.strict is true (the default is true): a live
    // request that fails, or a live test missing an input it needs,
    // fails the test.
    // An account with no record for a test to read skips it either way.
    private const LIVE_STRICT = true;

    public function test_create_instance(): void
    {
        $testsdk = WorkforceIntelligenceSDK::test(null, null);
        $ent = $testsdk->Job(null);
        $this->assertNotNull($ent);
    }

    public function test_validate(): void
    {
        $cfg = WorkforceIntelligenceConfig::shared_config();
        if (!isset($cfg["feature"]["validate"])) {
            $this->markTestSkipped('feature not present in this SDK: validate');
        }
        $client = WorkforceIntelligenceSDK::test(null, ["feature" => ["validate" => ["active" => true]]]);
        $err = null;
        try {
            $client->Job(null)->list(["company" => 1], null);
        } catch (\Throwable $e) {
            $err = $e;
        }
        $this->assertSame('validate_failed', $err->sdk_code ?? null);
    }

    public function test_basic_flow(): void
    {
        $setup = job_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["list", "load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "job." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        if (!empty($setup["live"])) {
            foreach (["company01"] as $_liveKey) {
                if (!empty($setup["synthetic_only"]) || null === ($setup["idmap"][$_liveKey] ?? null)) {
                    Runner::live_miss(self::LIVE_STRICT, "Live entity test blocked: needs " . $_liveKey . " via WORKFORCE_INTELLIGENCE_TEST_JOB_ENTID");
                }
            }
        }
        $client = $setup["client"];
        if (!empty($setup["live"])) {
            Runner::live_existing($setup, self::LIVE_STRICT, "job",
                fn() => $client->Job(null)->list(["company" => $setup["idmap"]["company01"] ?? null], null));
        }

        // Bootstrap entity data from existing test data.
        $job_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.job")));
        $job_ref01_data = null;
        if (count($job_ref01_data_raw) > 0) {
            $job_ref01_data = Helpers::to_map($job_ref01_data_raw[0][1]);
        }

        // LIST
        $job_ref01_ent = $client->Job(null);
        $job_ref01_match = [
            "company" => $setup["idmap"]["company01"],
        ];

        $job_ref01_list_result = $job_ref01_ent->list($job_ref01_match, null);
        $this->assertIsArray($job_ref01_list_result);

        // LOAD
        $job_ref01_match_dt0 = [
            "id" => $job_ref01_data["id"],
        ];
        $job_ref01_match_dt0["company"] = is_scalar($job_ref01_data["company"] ?? null) ? $job_ref01_data["company"] : ($setup["idmap"]["company"] ?? $setup["idmap"]["company01"] ?? null);
        $job_ref01_data_dt0_loaded = $job_ref01_ent->load($job_ref01_match_dt0, null);
        $job_ref01_data_dt0_load_result = Helpers::to_map(is_object($job_ref01_data_dt0_loaded) && method_exists($job_ref01_data_dt0_loaded, 'data_get') ? $job_ref01_data_dt0_loaded->data_get() : $job_ref01_data_dt0_loaded);
        $this->assertNotNull($job_ref01_data_dt0_load_result);
        $this->assertEquals($job_ref01_data_dt0_load_result["id"], $job_ref01_data["id"]);

    }
}

function job_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/job/JobTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = WorkforceIntelligenceSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["job01", "job02", "job03", "company01"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Whether *_ENTID supplied the idmap, read before env_override consumes
    // it: without it, the ids a live flow binds are the fixture's synthetic ones.
    $entid_env_raw = getenv("WORKFORCE_INTELLIGENCE_TEST_JOB_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "WORKFORCE_INTELLIGENCE_TEST_JOB_ENTID" => $idmap,
        "WORKFORCE_INTELLIGENCE_TEST_LIVE" => "FALSE",
        "WORKFORCE_INTELLIGENCE_TEST_EXPLAIN" => "FALSE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["WORKFORCE_INTELLIGENCE_TEST_JOB_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["WORKFORCE_INTELLIGENCE_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            Runner::live_client_options(),
            [
            ],
            // ismap, not a plain "?? []" default: an empty PHP array is a
            // LIST, and a non-map later entry REPLACES the accumulated map in
            // merge - so the no-extras call discarded live_client_options()
            // and the apikey/server map above it.
            Vs::ismap($extra) ? $extra : new \stdClass(),
        ]);
        // "?? []" because merge legitimately answers with a stdClass when every
        // contributing entry is an EMPTY map - an SDK with no apikey and no
        // server variables generates an empty middle entry, so that is the
        // common case, not the edge one. to_map returns null for a non-array by
        // design, and the constructor takes a non-nullable array, so without the
        // fallback every such SDK died on "must be of type array, null given"
        // the moment live mode was switched on. Offline mode never reaches this
        // branch, which is why the offline suite stayed green.
        $client = new WorkforceIntelligenceSDK(Helpers::to_map($merged_opts) ?? []);
    }

    $live = $env["WORKFORCE_INTELLIGENCE_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["WORKFORCE_INTELLIGENCE_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
