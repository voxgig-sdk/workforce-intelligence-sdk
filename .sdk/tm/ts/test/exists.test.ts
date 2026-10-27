
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { WorkforceIntelligenceSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = WorkforceIntelligenceSDK.test()
    equal(testsdk instanceof WorkforceIntelligenceSDK, true,
      'WorkforceIntelligenceSDK.test() must return a client synchronously')
  })

})
