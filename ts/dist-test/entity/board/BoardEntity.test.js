"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('BoardEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when WORKFORCE_INTELLIGENCE_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('WORKFORCE_INTELLIGENCE_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.WorkforceIntelligenceSDK.test();
        const ent = testsdk.Board();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.WorkforceIntelligenceSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Board().list({ "company": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.WORKFORCE_INTELLIGENCE_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'board.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "accepting_applicants": { "a": true, "h": "Accepting Applicants", "n": "accepting_applicants", "r": false, "t": "`$BOOLEAN`", "key$": "accepting_applicants", "index$": 0 }, "apply_url": { "a": true, "h": "Apply Url", "n": "apply_url", "r": false, "t": "`$STRING`", "key$": "apply_url", "index$": 1 }, "company": { "a": true, "h": "Company", "n": "company", "r": false, "t": "`$OBJECT`", "key$": "company", "index$": 2 }, "department": { "a": true, "h": "Department", "n": "department", "r": false, "t": "`$STRING`", "key$": "department", "index$": 3 }, "employment_type": { "a": true, "h": "Employment Type", "n": "employment_type", "r": false, "t": "`$STRING`", "key$": "employment_type", "index$": 4 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "sh": "Public job id.", "t": "`$STRING`", "key$": "id", "index$": 5 }, "locations": { "a": true, "h": "Locations", "n": "locations", "r": false, "t": "`$ARRAY`", "key$": "locations", "index$": 6 }, "posted_job_id": { "a": true, "fo": "uuid", "h": "Posted Job Id", "n": "posted_job_id", "r": false, "t": "`$STRING`", "key$": "posted_job_id", "index$": 7 }, "published_at": { "a": true, "fo": "date-time", "h": "Published At", "n": "published_at", "r": false, "t": "`$STRING`", "key$": "published_at", "index$": 8 }, "roles_to_fill": { "a": true, "h": "Roles To Fill", "n": "roles_to_fill", "r": false, "t": "`$INTEGER`", "key$": "roles_to_fill", "index$": 9 }, "salary": { "a": true, "h": "Salary", "n": "salary", "r": false, "sh": "Any type; null in every probe, shape unverified.", "t": "`$ANY`", "key$": "salary", "index$": 10 }, "slug": { "a": true, "h": "Slug", "n": "slug", "r": true, "t": "`$STRING`", "key$": "slug", "index$": 11 }, "source": { "a": true, "h": "Source", "n": "source", "r": false, "t": "`$OBJECT`", "key$": "source", "index$": 12 }, "source_url": { "a": true, "h": "Source Url", "n": "source_url", "r": false, "t": "`$STRING`", "key$": "source_url", "index$": 13 }, "title": { "a": true, "h": "Title", "n": "title", "r": true, "t": "`$STRING`", "key$": "title", "index$": 14 }, "updated_at": { "a": true, "fo": "date-time", "h": "Updated At", "n": "updated_at", "r": false, "t": "`$STRING`", "key$": "updated_at", "index$": 15 }, "url_path": { "a": true, "h": "Url Path", "n": "url_path", "r": false, "t": "`$STRING`", "key$": "url_path", "index$": 16 }, "visa_sponsorship": { "a": true, "h": "Visa Sponsorship", "n": "visa_sponsorship", "r": false, "sh": "Any type; null in every probe, shape unverified.", "t": "`$ANY`", "key$": "visa_sponsorship", "index$": 17 }, "workplace_type": { "a": true, "h": "Workplace Type", "n": "workplace_type", "r": false, "t": "`$STRING`", "key$": "workplace_type", "index$": 18 } }, "id": { "field": "id", "name": "id" }, "name": "board", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /job-boards/{company}/board", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "worklittle", "k": "param", "n": "company", "or": "company", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "k": "query", "n": "cursor", "or": "cursor", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "query", "n": "department", "or": "department", "r": false, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "query", "n": "employment_type", "or": "employment_type", "r": false, "t": "`$STRING`", "index$": 2 }, { "a": true, "ex": "facets", "k": "query", "n": "include", "or": "include", "r": false, "t": "`$STRING`", "index$": 3 }, { "a": true, "ex": 25, "k": "query", "n": "limit", "or": "limit", "r": false, "t": "`$INTEGER`", "index$": 4 }, { "a": true, "k": "query", "n": "location", "or": "location", "r": false, "t": "`$STRING`", "index$": 5 }, { "a": true, "k": "query", "n": "q", "or": "q", "r": false, "t": "`$STRING`", "index$": 6 }, { "a": true, "k": "query", "n": "workplace_type", "or": "workplace_type", "r": false, "t": "`$STRING`", "index$": 7 }] }, "k": "http", "m": "GET", "o": "/job-boards/{company}/board", "q": { "exist": ["company"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "job-boards" }, { "var": "company" }, { "lit": "board" }], "t": { "req": "`reqdata`", "res": "`body.jobs`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "board", "name__orig": "board", "Name": "Board", "name_": "board", "name-": "board", "NAME": "BOARD", "index$": 0 }, { "active": true, "entity": "board", "key$": "BasicBoardFlow", "kind": "basic", "name": "BasicBoardFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": { "company": "company01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "board_ref01" } }], "index$": 0 }] }, 'Board', { "GET /job-boards/{company}/board": { "protocol": "http", "parameters": [{ "name": "company", "in": "path", "required": true, "description": "Organization slug of a Worklittle job board. 'worklittle' (Worklittle's own board) is the only slug verified live; 'acme', used in the docs, returns 404.", "schema": { "type": "string" }, "example": "worklittle", "index$": 0 }, { "name": "limit", "in": "query", "required": false, "description": "Page size.", "schema": { "type": "integer", "minimum": 1, "maximum": 100, "default": 25 }, "example": 25, "index$": 1 }, { "name": "cursor", "in": "query", "required": false, "description": "Opaque cursor from meta.next_cursor of the previous page.", "schema": { "type": "string" }, "index$": 2 }, { "name": "q", "in": "query", "required": false, "description": "Free-text search.", "schema": { "type": "string" }, "index$": 3 }, { "name": "department", "in": "query", "required": false, "description": "Department filter.", "schema": { "type": "string" }, "index$": 4 }, { "name": "workplace_type", "in": "query", "required": false, "description": "Workplace type filter.", "schema": { "type": "string", "enum": ["remote", "hybrid", "on_site"] }, "index$": 5 }, { "name": "employment_type", "in": "query", "required": false, "description": "Employment type filter, e.g. full_time or temporary.", "schema": { "type": "string" }, "index$": 6 }, { "name": "location", "in": "query", "required": false, "description": "Location filter.", "schema": { "type": "string" }, "index$": 7 }, { "name": "include", "in": "query", "required": false, "description": "Set to 'facets' to add facet counts.", "schema": { "type": "string", "enum": ["facets"] }, "example": "facets", "index$": 8 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let board_ref01_data = Object.values(setup.data.existing.board)[0];
        // LIST
        const board_ref01_ent = client.Board();
        const board_ref01_match = {};
        board_ref01_match['company'] = setup.idmap['company01'];
        const board_ref01_list = (await board_ref01_ent.list(board_ref01_match)).map((e) => e.data());
    });
});
// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true;
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/board/BoardTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.WorkforceIntelligenceSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['board01', 'board02', 'board03', 'company01'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'WORKFORCE_INTELLIGENCE_TEST_BOARD_ENTID': idmap,
        'WORKFORCE_INTELLIGENCE_TEST_LIVE': 'FALSE',
        'WORKFORCE_INTELLIGENCE_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['WORKFORCE_INTELLIGENCE_TEST_BOARD_ENTID'];
    const live = 'TRUE' === env.WORKFORCE_INTELLIGENCE_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['WORKFORCE_INTELLIGENCE_TEST_BOARD_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.WorkforceIntelligenceSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.WORKFORCE_INTELLIGENCE_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=BoardEntity.test.js.map