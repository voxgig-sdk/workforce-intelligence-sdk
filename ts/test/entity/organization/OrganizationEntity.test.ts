

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


describe('OrganizationEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when WORKFORCE_INTELLIGENCE_TEST_LIVE=TRUE.
  afterEach(liveDelay('WORKFORCE_INTELLIGENCE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = WorkforceIntelligenceSDK.test()
    const ent = testsdk.Organization()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = WorkforceIntelligenceSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Organization().load({"company":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.WORKFORCE_INTELLIGENCE_TEST_LIVE
    for (const op of []) {
      if (!live && maybeSkipControl(t, 'entityOp', 'organization.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"banner_url":{"a":true,"h":"Banner Url","n":"banner_url","r":false,"t":"`$STRING`","key$":"banner_url","index$":0},"brand_color":{"a":true,"h":"Brand Color","n":"brand_color","r":false,"t":"`$STRING`","key$":"brand_color","index$":1},"company_type":{"a":true,"h":"Company Type","n":"company_type","r":false,"t":"`$STRING`","key$":"company_type","index$":2},"contact_email":{"a":true,"h":"Contact Email","n":"contact_email","r":false,"t":"`$STRING`","key$":"contact_email","index$":3},"description":{"a":true,"h":"Description","n":"description","r":false,"t":"`$STRING`","key$":"description","index$":4},"employee_count_range":{"a":true,"h":"Employee Count Range","n":"employee_count_range","r":false,"t":"`$STRING`","key$":"employee_count_range","index$":5},"features":{"a":true,"h":"Features","n":"features","r":false,"t":"`$OBJECT`","key$":"features","index$":6},"founded_year":{"a":true,"h":"Founded Year","n":"founded_year","r":false,"t":"`$INTEGER`","key$":"founded_year","index$":7},"headquarters":{"a":true,"h":"Headquarters","n":"headquarters","r":false,"t":"`$STRING`","key$":"headquarters","index$":8},"headquarters_city":{"a":true,"h":"Headquarters City","n":"headquarters_city","r":false,"t":"`$STRING`","key$":"headquarters_city","index$":9},"headquarters_country":{"a":true,"h":"Headquarters Country","n":"headquarters_country","r":false,"t":"`$STRING`","key$":"headquarters_country","index$":10},"id":{"a":true,"fo":"uuid","h":"Id","n":"id","r":true,"t":"`$STRING`","key$":"id","index$":11},"industry":{"a":true,"h":"Industry","n":"industry","r":false,"t":"`$STRING`","key$":"industry","index$":12},"job_count":{"a":true,"h":"Job Count","n":"job_count","r":false,"t":"`$INTEGER`","key$":"job_count","index$":13},"linkedin_url":{"a":true,"h":"Linkedin Url","n":"linkedin_url","r":false,"t":"`$STRING`","key$":"linkedin_url","index$":14},"logo_url":{"a":true,"h":"Logo Url","n":"logo_url","r":false,"t":"`$STRING`","key$":"logo_url","index$":15},"name":{"a":true,"h":"Name","n":"name","r":true,"t":"`$STRING`","key$":"name","index$":16},"slug":{"a":true,"h":"Slug","n":"slug","r":true,"t":"`$STRING`","key$":"slug","index$":17},"updated_at":{"a":true,"fo":"date-time","h":"Updated At","n":"updated_at","r":false,"t":"`$STRING`","key$":"updated_at","index$":18},"website_url":{"a":true,"h":"Website Url","n":"website_url","r":false,"t":"`$STRING`","key$":"website_url","index$":19}},"id":{"field":"id","name":"id"},"name":"organization","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /job-boards/{company}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"worklittle","k":"param","n":"company","or":"company","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/job-boards/{company}","q":{"exist":["company"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"job-boards"},{"var":"company"}],"t":{"req":"`reqdata`","res":"`body.organization`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"organization","name__orig":"organization","Name":"Organization","name_":"organization","name-":"organization","NAME":"ORGANIZATION","index$":5}, {"active":true,"entity":"organization","key$":"BasicOrganizationFlow","kind":"basic","name":"BasicOrganizationFlow","param":{},"step":[{"a":false,"d":{},"i":{"ref":"organization_ref01","srcdatavar":"organization_ref01_data","suffix":"_dt0"},"m":{"id":"organization01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-organization_ref01"}}],"unreachable":true}]}, 'Organization', {"GET /job-boards/{company}":{"protocol":"http","parameters":[{"name":"company","in":"path","required":true,"description":"Organization slug of a Worklittle job board. 'worklittle' (Worklittle's own board) is the only slug verified live; 'acme', used in the docs, returns 404.","schema":{"type":"string"},"example":"worklittle","index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let organization_ref01_data = Object.values(setup.data.existing.organization)[0] as any

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
      '../../../../.sdk/test/entity/organization/OrganizationTestData.json')

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
    ['organization01','organization02','organization03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'WORKFORCE_INTELLIGENCE_TEST_ORGANIZATION_ENTID': idmap,
    'WORKFORCE_INTELLIGENCE_TEST_LIVE': 'FALSE',
    'WORKFORCE_INTELLIGENCE_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['WORKFORCE_INTELLIGENCE_TEST_ORGANIZATION_ENTID']

  const live = 'TRUE' === env.WORKFORCE_INTELLIGENCE_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['WORKFORCE_INTELLIGENCE_TEST_ORGANIZATION_ENTID']
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
  
