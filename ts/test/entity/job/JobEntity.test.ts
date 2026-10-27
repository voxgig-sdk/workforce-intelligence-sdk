

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


describe('JobEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when WORKFORCE_INTELLIGENCE_TEST_LIVE=TRUE.
  afterEach(liveDelay('WORKFORCE_INTELLIGENCE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = WorkforceIntelligenceSDK.test()
    const ent = testsdk.Job()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = WorkforceIntelligenceSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Job().list({"company":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.WORKFORCE_INTELLIGENCE_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'job.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"accepting_applicants":{"a":true,"h":"Accepting Applicants","n":"accepting_applicants","r":false,"t":"`$BOOLEAN`","key$":"accepting_applicants","index$":0},"apply_url":{"a":true,"h":"Apply Url","n":"apply_url","r":false,"t":"`$STRING`","key$":"apply_url","index$":1},"company":{"a":true,"h":"Company","n":"company","r":false,"sh":"Board slug.","t":"`$STRING`","key$":"company","index$":2},"department":{"a":true,"h":"Department","n":"department","r":false,"t":"`$STRING`","key$":"department","index$":3},"employment_type":{"a":true,"h":"Employment Type","n":"employment_type","r":false,"t":"`$STRING`","key$":"employment_type","index$":4},"features":{"a":true,"h":"Features","n":"features","r":false,"t":"`$OBJECT`","key$":"features","index$":5},"id":{"a":true,"h":"Id","n":"id","r":true,"sh":"Public job id.","t":"`$STRING`","key$":"id","index$":6},"job":{"a":true,"h":"Job","n":"job","r":true,"t":"`$ANY`","key$":"job","index$":7},"locations":{"a":true,"h":"Locations","n":"locations","r":false,"t":"`$ARRAY`","key$":"locations","index$":8},"meta":{"a":true,"h":"Meta","n":"meta","r":false,"t":"`$OBJECT`","key$":"meta","index$":9},"posted_job_id":{"a":true,"fo":"uuid","h":"Posted Job Id","n":"posted_job_id","r":false,"t":"`$STRING`","key$":"posted_job_id","index$":10},"published_at":{"a":true,"fo":"date-time","h":"Published At","n":"published_at","r":false,"t":"`$STRING`","key$":"published_at","index$":11},"roles_to_fill":{"a":true,"h":"Roles To Fill","n":"roles_to_fill","r":false,"t":"`$INTEGER`","key$":"roles_to_fill","index$":12},"salary":{"a":true,"h":"Salary","n":"salary","r":false,"sh":"Any type; null in every probe, shape unverified.","t":"`$ANY`","key$":"salary","index$":13},"slug":{"a":true,"h":"Slug","n":"slug","r":true,"t":"`$STRING`","key$":"slug","index$":14},"source":{"a":true,"h":"Source","n":"source","r":false,"t":"`$OBJECT`","key$":"source","index$":15},"source_url":{"a":true,"h":"Source Url","n":"source_url","r":false,"t":"`$STRING`","key$":"source_url","index$":16},"title":{"a":true,"h":"Title","n":"title","r":true,"t":"`$STRING`","key$":"title","index$":17},"updated_at":{"a":true,"fo":"date-time","h":"Updated At","n":"updated_at","r":false,"t":"`$STRING`","key$":"updated_at","index$":18},"url_path":{"a":true,"h":"Url Path","n":"url_path","r":false,"t":"`$STRING`","key$":"url_path","index$":19},"visa_sponsorship":{"a":true,"h":"Visa Sponsorship","n":"visa_sponsorship","r":false,"sh":"Any type; null in every probe, shape unverified.","t":"`$ANY`","key$":"visa_sponsorship","index$":20},"workplace_type":{"a":true,"h":"Workplace Type","n":"workplace_type","r":false,"t":"`$STRING`","key$":"workplace_type","index$":21}},"id":{"field":"id","name":"id"},"name":"job","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /job-boards/{company}/jobs","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"worklittle","k":"param","n":"company","or":"company","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"cursor","or":"cursor","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"department","or":"department","r":false,"t":"`$STRING`","index$":1},{"a":true,"k":"query","n":"employment_type","or":"employment_type","r":false,"t":"`$STRING`","index$":2},{"a":true,"ex":25,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":3},{"a":true,"k":"query","n":"location","or":"location","r":false,"t":"`$STRING`","index$":4},{"a":true,"k":"query","n":"q","or":"q","r":false,"t":"`$STRING`","index$":5},{"a":true,"k":"query","n":"workplace_type","or":"workplace_type","r":false,"t":"`$STRING`","index$":6}]},"k":"http","m":"GET","o":"/job-boards/{company}/jobs","q":{"exist":["company"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"job-boards"},{"var":"company"},{"lit":"jobs"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /job-boards/{company}/jobs/{idOrSlug}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"worklittle","k":"param","n":"company","or":"company","r":true,"t":"`$STRING`","index$":0},{"a":true,"ex":"applied-ai-engineer-internship","k":"param","n":"id","or":"idOrSlug","r":true,"t":"`$STRING`","index$":1}],"query":[{"a":true,"k":"query","n":"preview","or":"preview","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/job-boards/{company}/jobs/{idOrSlug}","q":{"exist":["company","id"]},"r":{"param":{"idOrSlug":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"job-boards"},{"var":"company"},{"lit":"jobs"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.job`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"job","name__orig":"job","Name":"Job","name_":"job","name-":"job","NAME":"JOB","index$":3}, {"active":true,"entity":"job","key$":"BasicJobFlow","kind":"basic","name":"BasicJobFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"company":"company01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"job_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"job_ref01","srcdatavar":"job_ref01_data","suffix":"_dt0"},"m":{"company":"company01","id":"job01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-job_ref01"}}],"index$":1,"route":"GET /job-boards/{company}/jobs/{idOrSlug}","record":{"company":"company"}}]}, 'Job', {"GET /job-boards/{company}/jobs":{"protocol":"http","parameters":[{"name":"company","in":"path","required":true,"description":"Organization slug of a Worklittle job board. 'worklittle' (Worklittle's own board) is the only slug verified live; 'acme', used in the docs, returns 404.","schema":{"type":"string"},"example":"worklittle","index$":0},{"name":"limit","in":"query","required":false,"description":"Page size.","schema":{"type":"integer","minimum":1,"maximum":100,"default":25},"example":25,"index$":1},{"name":"cursor","in":"query","required":false,"description":"Opaque cursor from meta.next_cursor of the previous page.","schema":{"type":"string"},"index$":2},{"name":"q","in":"query","required":false,"description":"Free-text search.","schema":{"type":"string"},"index$":3},{"name":"department","in":"query","required":false,"description":"Department filter.","schema":{"type":"string"},"index$":4},{"name":"workplace_type","in":"query","required":false,"description":"Workplace type filter.","schema":{"type":"string","enum":["remote","hybrid","on_site"]},"index$":5},{"name":"employment_type","in":"query","required":false,"description":"Employment type filter, e.g. full_time or temporary.","schema":{"type":"string"},"index$":6},{"name":"location","in":"query","required":false,"description":"Location filter.","schema":{"type":"string"},"index$":7}]},"GET /job-boards/{company}/jobs/{idOrSlug}":{"protocol":"http","parameters":[{"name":"company","in":"path","required":true,"description":"Organization slug of a Worklittle job board. 'worklittle' (Worklittle's own board) is the only slug verified live; 'acme', used in the docs, returns 404.","schema":{"type":"string"},"example":"worklittle","index$":0},{"name":"idOrSlug","in":"path","required":true,"description":"Job public slug, public job id, or posted job id, as returned by listJobs.","schema":{"type":"string"},"example":"applied-ai-engineer-internship","index$":1},{"name":"preview","in":"query","required":false,"description":"Employer preview_key for unpublished jobs (not probed).","schema":{"type":"string"},"index$":2}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let job_ref01_data = Object.values(setup.data.existing.job)[0] as any

    // LIST
    const job_ref01_ent = client.Job()
    const job_ref01_match: any = {}
    job_ref01_match['company'] = setup.idmap['company01']

    const job_ref01_list = (await job_ref01_ent.list(job_ref01_match)).map((e: any) => e.data())


    // LOAD
    const job_ref01_match_dt0: any = {}
    job_ref01_match_dt0.id = job_ref01_data.id
    job_ref01_match_dt0['company'] = ['string', 'number', 'boolean'].includes(typeof job_ref01_data['company']) ?
      job_ref01_data['company'] : setup.idmap['company'] ?? setup.idmap['company01']
    const job_ref01_data_dt0 = (await job_ref01_ent.load(job_ref01_match_dt0)).data()
    assert(job_ref01_data_dt0.id === job_ref01_data.id)


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
      '../../../../.sdk/test/entity/job/JobTestData.json')

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
    ['job01','job02','job03','company01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'WORKFORCE_INTELLIGENCE_TEST_JOB_ENTID': idmap,
    'WORKFORCE_INTELLIGENCE_TEST_LIVE': 'FALSE',
    'WORKFORCE_INTELLIGENCE_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['WORKFORCE_INTELLIGENCE_TEST_JOB_ENTID']

  const live = 'TRUE' === env.WORKFORCE_INTELLIGENCE_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['WORKFORCE_INTELLIGENCE_TEST_JOB_ENTID']
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
  
