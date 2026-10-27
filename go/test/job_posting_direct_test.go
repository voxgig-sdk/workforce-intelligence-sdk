package sdktest

import (
	"encoding/json"
	"os"
	"strings"
	"testing"

	sdk "github.com/voxgig-sdk/workforce-intelligence-sdk/go"
	"github.com/voxgig-sdk/workforce-intelligence-sdk/go/core"
)

// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const job_postingDirectLiveStrict = true

func TestJobPostingDirect(t *testing.T) {
	t.Run("direct-list-job_posting", func(t *testing.T) {
		setup := job_postingDirectSetup([]any{
			map[string]any{"id": "direct01"},
			map[string]any{"id": "direct02"},
		})
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		if _shouldSkip, _reason := isControlSkipped("direct", "direct-list-job_posting", _mode); _shouldSkip {
			if _reason == "" {
				_reason = "skipped via sdk-test-control.json"
			}
			t.Skip(_reason)
			return
		}
		if setup.live {
			for _, _liveKey := range []string{"company01", "id_or_slug01"} {
				if v := setup.idmap[_liveKey]; v == nil {
					liveMiss(t, job_postingDirectLiveStrict, "Live test blocked: needs %s via WORKFORCE_INTELLIGENCE_TEST_JOB_POSTING_ENTID", _liveKey)
					return
				}
			}
		}
		client := setup.client

		params := map[string]any{}
		query := map[string]any{}
		if setup.live {
			params["company"] = setup.idmap["company01"]
		} else {
			params["company"] = "direct01"
		}
		if setup.live {
			params["id_or_slug"] = setup.idmap["id_or_slug01"]
		} else {
			params["id_or_slug"] = "direct02"
		}

		result, err := client.Direct(map[string]any{
			"path":   "job-boards/{company}/jobs/{id_or_slug}/json-ld",
			"method": "GET",
			"params": params,
			"query":  query,
		})
		if setup.live {
			if err != nil {
				liveMiss(t, job_postingDirectLiveStrict, "Live list failed: %v", err)
			}
			if status := core.ToInt(result["status"]); result["ok"] != true || status < 200 || status >= 300 {
				liveMiss(t, job_postingDirectLiveStrict, "Live list failed: %s", liveDescribe(result))
			}
			if _, ok := liveList(result["data"]); !ok {
				liveMiss(t, job_postingDirectLiveStrict, "Live list returned no list: %s", liveDescribe(result))
			}
		} else {
			if err != nil {
				t.Fatalf("direct failed: %v", err)
			}
			if result["ok"] != true {
				t.Fatalf("expected ok to be true, got %v", result["ok"])
			}
			if core.ToInt(result["status"]) != 200 {
				t.Fatalf("expected status 200, got %v", result["status"])
			}
		}

		if !setup.live {
			if dataList, ok := result["data"].([]any); ok {
				if len(dataList) != 2 {
					t.Fatalf("expected 2 items, got %d", len(dataList))
				}
			} else {
				t.Fatalf("expected data to be an array, got %T", result["data"])
			}

			if len(*setup.calls) != 1 {
				t.Fatalf("expected 1 call, got %d", len(*setup.calls))
			}
			call := (*setup.calls)[0]
			if initMap, ok := call["init"].(map[string]any); ok {
				if initMap["method"] != "GET" {
					t.Fatalf("expected method GET, got %v", initMap["method"])
				}
			}
			if url, ok := call["url"].(string); ok {
				if !strings.Contains(url, "direct01") {
					t.Fatalf("expected url to contain direct01, got %v", url)
				}
				if !strings.Contains(url, "direct02") {
					t.Fatalf("expected url to contain direct02, got %v", url)
				}
			}
		}
	})

}

type job_postingDirectSetupResult struct {
	client *sdk.WorkforceIntelligenceSDK
	calls  *[]map[string]any
	live   bool
	idmap  map[string]any
}

func job_postingDirectSetup(mockres any) *job_postingDirectSetupResult {
	loadEnvLocal()

	calls := &[]map[string]any{}

	env := envOverride(map[string]any{
		"WORKFORCE_INTELLIGENCE_TEST_JOB_POSTING_ENTID": map[string]any{},
		"WORKFORCE_INTELLIGENCE_TEST_LIVE":    "FALSE",
	})

	live := env["WORKFORCE_INTELLIGENCE_TEST_LIVE"] == "TRUE"

	if live {
		// sdk-test-control.json's test.client.options seeds the live
		// client; the generated fields below overwrite anything they name.
		mergedOpts := map[string]any{}
		for k, v := range liveClientOptions() {
			mergedOpts[k] = v
		}
		for k, v := range map[string]any{
		} {
			mergedOpts[k] = v
		}
		client := sdk.NewWorkforceIntelligenceSDK(mergedOpts)

		idmap := map[string]any{}
		if entidRaw, ok := env["WORKFORCE_INTELLIGENCE_TEST_JOB_POSTING_ENTID"]; ok {
			if entidStr, ok := entidRaw.(string); ok && strings.HasPrefix(entidStr, "{") {
				json.Unmarshal([]byte(entidStr), &idmap)
			} else if entidMap, ok := entidRaw.(map[string]any); ok {
				idmap = entidMap
			}
		}
		// A path parameter's example stands in for an id *_ENTID does not give.
		for k, v := range map[string]any{"company01": "worklittle", "id_or_slug01": "applied-ai-engineer-internship"} {
			if idmap[k] == nil {
				idmap[k] = v
			}
		}

		return &job_postingDirectSetupResult{client: client, calls: calls, live: true, idmap: idmap}
	}

	mockFetch := func(url string, init map[string]any) (map[string]any, error) {
		*calls = append(*calls, map[string]any{"url": url, "init": init})
		return map[string]any{
			"status":     200,
			"statusText": "OK",
			"headers":    map[string]any{},
			"json": (func() any)(func() any {
				if mockres != nil {
					return mockres
				}
				return map[string]any{"id": "direct01"}
			}),
		}, nil
	}

	client := sdk.NewWorkforceIntelligenceSDK(map[string]any{
		"base": "http://localhost:8080",
		"system": map[string]any{
			"fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
		},
	})

	return &job_postingDirectSetupResult{client: client, calls: calls, live: false, idmap: map[string]any{}}
}

var _ = os.Getenv
var _ = json.Unmarshal
