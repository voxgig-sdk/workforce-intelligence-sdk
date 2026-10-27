

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { WorkforceIntelligenceSDK, BaseFeature, config, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('JobPostingEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when WORKFORCE_INTELLIGENCE_TEST_LIVE=TRUE.
  afterEach(liveDelay('WORKFORCE_INTELLIGENCE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = WorkforceIntelligenceSDK.test()
    const ent = testsdk.JobPosting()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = WorkforceIntelligenceSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.JobPosting().list({"company":1,"id_or_slug":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.WORKFORCE_INTELLIGENCE_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'job_posting.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"bullets":{"a":true,"h":"Bullets","n":"bullets","r":false,"t":"`$ARRAY`","key$":"bullets","index$":0},"paragraphs":{"a":true,"h":"Paragraphs","n":"paragraphs","r":false,"t":"`$ARRAY`","key$":"paragraphs","index$":1},"title":{"a":true,"h":"Title","n":"title","r":false,"t":"`$STRING`","key$":"title","index$":2}},"name":"job_posting","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /job-boards/{company}/jobs/{idOrSlug}/json-ld","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"worklittle","k":"param","n":"company","or":"company","r":true,"t":"`$STRING`","index$":0},{"a":true,"ex":"applied-ai-engineer-internship","k":"param","n":"id_or_slug","or":"idOrSlug","r":true,"t":"`$STRING`","index$":1}],"query":[{"a":true,"k":"query","n":"canonical_url","or":"canonical_url","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/job-boards/{company}/jobs/{idOrSlug}/json-ld","q":{"exist":["company","id_or_slug"]},"r":{"param":{"idOrSlug":"id_or_slug"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"job-boards"},{"var":"company"},{"lit":"jobs"},{"var":"id_or_slug"},{"lit":"json-ld"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[["$.main.kit.entity.job"]]},"key$":"job_posting","name__orig":"job_posting","Name":"JobPosting","name_":"job_posting","name-":"job-posting","NAME":"JOB_POSTING","index$":4}, {"active":true,"entity":"job_posting","key$":"BasicJobPostingFlow","kind":"basic","name":"BasicJobPostingFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"company":"company01","id_or_slug":"id_or_slug01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"job_posting_ref01"}}],"index$":0}]}, 'JobPosting', {"GET /job-boards/{company}/jobs/{idOrSlug}/json-ld":{"protocol":"http","parameters":[{"name":"company","in":"path","required":true,"description":"Organization slug of a Worklittle job board. 'worklittle' (Worklittle's own board) is the only slug verified live; 'acme', used in the docs, returns 404.","schema":{"type":"string"},"example":"worklittle","index$":0},{"name":"idOrSlug","in":"path","required":true,"description":"Job public slug, public job id, or posted job id, as returned by listJobs.","schema":{"type":"string"},"example":"applied-ai-engineer-internship","index$":1},{"name":"canonical_url","in":"query","required":false,"description":"Canonical URL to put in the markup (not probed).","schema":{"type":"string","format":"uri"},"index$":2}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let job_posting_ref01_data = Object.values(setup.data.existing.job_posting)[0] as any

    // LIST
    const job_posting_ref01_ent = client.JobPosting()
    const job_posting_ref01_match: any = {}
    job_posting_ref01_match['company'] = setup.idmap['company01']
    job_posting_ref01_match['id_or_slug'] = setup.idmap['id_or_slug01']

    const job_posting_ref01_list = (await job_posting_ref01_ent.list(job_posting_ref01_match)).map((e: any) => e.data())


  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/job_posting/JobPostingTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = WorkforceIntelligenceSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['job_posting01','job_posting02','job_posting03','job01','job02','job03','company01','id_or_slug01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'WORKFORCE_INTELLIGENCE_TEST_JOB_POSTING_ENTID': idmap,
    'WORKFORCE_INTELLIGENCE_TEST_LIVE': 'FALSE',
    'WORKFORCE_INTELLIGENCE_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['WORKFORCE_INTELLIGENCE_TEST_JOB_POSTING_ENTID']

  const live = 'TRUE' === env.WORKFORCE_INTELLIGENCE_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['WORKFORCE_INTELLIGENCE_TEST_JOB_POSTING_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new WorkforceIntelligenceSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
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
  }

  return setup
}
  
