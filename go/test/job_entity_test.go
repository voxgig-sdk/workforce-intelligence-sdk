package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/workforce-intelligence-sdk/go"
	"github.com/voxgig-sdk/workforce-intelligence-sdk/go/core"

	vs "github.com/voxgig-sdk/workforce-intelligence-sdk/go/utility/struct"
)

// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const jobEntityLiveStrict = true


func TestJobEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Job(nil)
		if ent == nil {
			t.Fatal("expected non-nil JobEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.Job(nil).List(map[string]any{"company": 1}, nil)
		if sdkerr, ok := err.(*core.WorkforceIntelligenceError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := jobBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "job." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live {
			for _, _liveKey := range []string{"company01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, jobEntityLiveStrict, "Live entity test blocked: needs %s via WORKFORCE_INTELLIGENCE_TEST_JOB_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client
		if setup.live {
			liveExisting(t, jobEntityLiveStrict, setup.data, "job", func() (any, error) {
				return client.Job(nil).List(map[string]any{"company": setup.idmap["company01"]}, nil)
			})
		}

		// Bootstrap entity data from existing test data (no create step in flow).
		jobRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.job")))
		var jobRef01Data map[string]any
		if len(jobRef01DataRaw) > 0 {
			jobRef01Data = core.ToMapAny(jobRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = jobRef01Data

		// LIST
		jobRef01Ent := client.Job(nil)
		jobRef01Match := map[string]any{
			"company": setup.idmap["company01"],
		}

		jobRef01ListResult, err := jobRef01Ent.List(jobRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, jobRef01ListOk := jobRef01ListResult.([]any)
		if !jobRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", jobRef01ListResult)
		}

		// LOAD
		jobRef01MatchDt0 := map[string]any{
			"id": jobRef01Data["id"],
		}
		switch v := jobRef01Data["company"].(type) {
		case string, bool, float64, int, int64:
			jobRef01MatchDt0["company"] = v
		default:
			if v := setup.idmap["company"]; v != nil {
				jobRef01MatchDt0["company"] = v
			} else {
				jobRef01MatchDt0["company"] = setup.idmap["company01"]
			}
		}
		jobRef01DataDt0Loaded, err := jobRef01Ent.Load(jobRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		jobRef01DataDt0LoadResult := core.ToMapAny(entityData(jobRef01DataDt0Loaded))
		if jobRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if jobRef01DataDt0LoadResult["id"] != jobRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

	})
}

func jobBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "job", "JobTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read job test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse job test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"job01", "job02", "job03", "company01"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("WORKFORCE_INTELLIGENCE_TEST_JOB_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"WORKFORCE_INTELLIGENCE_TEST_JOB_ENTID": idmap,
		"WORKFORCE_INTELLIGENCE_TEST_LIVE":      "FALSE",
		"WORKFORCE_INTELLIGENCE_TEST_EXPLAIN":   "FALSE",
	})

	idmapResolved := core.ToMapAny(env["WORKFORCE_INTELLIGENCE_TEST_JOB_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["WORKFORCE_INTELLIGENCE_TEST_LIVE"] == "TRUE" {
		// An empty map, not a nil one: Merge returns nil when its last entry
		// is nil, and BasicSetup is normally called with no extras - so a
		// bare nil silently discarded the apikey and server values below.
		extraOpts := extra
		if extraOpts == nil {
			extraOpts = map[string]any{}
		}

		mergedOpts := vs.Merge([]any{
			// liveClientOptions() FIRST, so the generated fields below win:
			// sdk-test-control.json's test.client.options adds to the live
			// client, it does not redirect it.
			liveClientOptions(),
			map[string]any{
			},
			extraOpts,
		})
		client = sdk.NewWorkforceIntelligenceSDK(core.ToMapAny(mergedOpts))
	}

	live := env["WORKFORCE_INTELLIGENCE_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["WORKFORCE_INTELLIGENCE_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
