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
const job_postingEntityLiveStrict = true


func TestJobPostingEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.JobPosting(nil)
		if ent == nil {
			t.Fatal("expected non-nil JobPostingEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.JobPosting(nil).List(map[string]any{"company": 1, "id_or_slug": "x"}, nil)
		if sdkerr, ok := err.(*core.WorkforceIntelligenceError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := job_postingBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "job_posting." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live {
			for _, _liveKey := range []string{"company01", "id_or_slug01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, job_postingEntityLiveStrict, "Live entity test blocked: needs %s via WORKFORCE_INTELLIGENCE_TEST_JOB_POSTING_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		// Bootstrap entity data from existing test data (no create step in flow).
		jobPostingRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.job_posting")))
		var jobPostingRef01Data map[string]any
		if len(jobPostingRef01DataRaw) > 0 {
			jobPostingRef01Data = core.ToMapAny(jobPostingRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = jobPostingRef01Data

		// LIST
		jobPostingRef01Ent := client.JobPosting(nil)
		jobPostingRef01Match := map[string]any{
			"company": setup.idmap["company01"],
			"id_or_slug": setup.idmap["id_or_slug01"],
		}

		jobPostingRef01ListResult, err := jobPostingRef01Ent.List(jobPostingRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, jobPostingRef01ListOk := jobPostingRef01ListResult.([]any)
		if !jobPostingRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", jobPostingRef01ListResult)
		}

	})
}

func job_postingBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "job_posting", "JobPostingTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read job_posting test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse job_posting test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"job_posting01", "job_posting02", "job_posting03", "job01", "job02", "job03", "company01", "id_or_slug01"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("WORKFORCE_INTELLIGENCE_TEST_JOB_POSTING_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"WORKFORCE_INTELLIGENCE_TEST_JOB_POSTING_ENTID": idmap,
		"WORKFORCE_INTELLIGENCE_TEST_LIVE":      "FALSE",
		"WORKFORCE_INTELLIGENCE_TEST_EXPLAIN":   "FALSE",
	})

	idmapResolved := core.ToMapAny(env["WORKFORCE_INTELLIGENCE_TEST_JOB_POSTING_ENTID"])
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
