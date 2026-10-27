

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


describe('FacetEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when WORKFORCE_INTELLIGENCE_TEST_LIVE=TRUE.
  afterEach(liveDelay('WORKFORCE_INTELLIGENCE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = WorkforceIntelligenceSDK.test()
    const ent = testsdk.Facet()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = WorkforceIntelligenceSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Facet().load({"company":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.WORKFORCE_INTELLIGENCE_TEST_LIVE
    for (const op of []) {
      if (!live && maybeSkipControl(t, 'entityOp', 'facet.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"company":{"a":true,"h":"Company","n":"company","r":false,"t":"`$STRING`","key$":"company","index$":0},"facets":{"a":true,"h":"Facets","n":"facets","r":true,"t":"`$OBJECT`","key$":"facets","index$":1},"meta":{"a":true,"h":"Meta","n":"meta","r":false,"t":"`$OBJECT`","key$":"meta","index$":2}},"name":"facet","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /job-boards/{company}/facets","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"worklittle","k":"param","n":"company","or":"company","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"location","or":"location","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"q","or":"q","r":false,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/job-boards/{company}/facets","q":{"exist":["company"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"job-boards"},{"var":"company"},{"lit":"facets"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"facet","name__orig":"facet","Name":"Facet","name_":"facet","name-":"facet","NAME":"FACET","index$":1}, {"active":true,"entity":"facet","key$":"BasicFacetFlow","kind":"basic","name":"BasicFacetFlow","param":{},"step":[{"a":false,"d":{},"i":{"ref":"facet_ref01","srcdatavar":"facet_ref01_data","suffix":"_dt0"},"m":{"id":"facet01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-facet_ref01"}}],"unreachable":true}]}, 'Facet', {"GET /job-boards/{company}/facets":{"protocol":"http","parameters":[{"name":"company","in":"path","required":true,"description":"Organization slug of a Worklittle job board. 'worklittle' (Worklittle's own board) is the only slug verified live; 'acme', used in the docs, returns 404.","schema":{"type":"string"},"example":"worklittle","index$":0},{"name":"q","in":"query","required":false,"description":"Free-text search.","schema":{"type":"string"},"index$":1},{"name":"location","in":"query","required":false,"description":"Location filter.","schema":{"type":"string"},"index$":2}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let facet_ref01_data = Object.values(setup.data.existing.facet)[0] as any

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
      '../../../../.sdk/test/entity/facet/FacetTestData.json')

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
    ['facet01','facet02','facet03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'WORKFORCE_INTELLIGENCE_TEST_FACET_ENTID': idmap,
    'WORKFORCE_INTELLIGENCE_TEST_LIVE': 'FALSE',
    'WORKFORCE_INTELLIGENCE_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['WORKFORCE_INTELLIGENCE_TEST_FACET_ENTID']

  const live = 'TRUE' === env.WORKFORCE_INTELLIGENCE_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['WORKFORCE_INTELLIGENCE_TEST_FACET_ENTID']
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
  
