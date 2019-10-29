import 'jest-extended'

import { Status } from '../index'

test('should be able to instantiate Status', () => {
  expect(new Status()).not.toBeNil()
})

test('should be able to call checkStatus', () => {
  const checker = new Status()
  expect(checker.checkStatus).toBeFunction()
})

test('should be able to extract status entry from a credential', async () => {
  const checker = new Status()
  //does not return the status result, only forwards the input at this time
  const statusEntry = await checker.checkStatus("eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NkstUiJ9.eyJpYXQiOjE1NzIzNTExNTYsInN0YXR1cyI6eyJpZCI6InJpbmtlYnk6MHhTdGF0dXNSZWdpc3RyeUFkZHJlc3MiLCJ0eXBlIjoiRXRoclN0YXR1c1JlZ2lzdHJ5MjAxOSJ9LCJpc3MiOiJkaWQ6ZXRocjoweGYzYmVhYzMwYzQ5OGQ5ZTI2ODY1ZjM0ZmNhYTU3ZGJiOTM1YjBkNzQifQ.hNFm3JDwoyNX2YHPlioHkR986ETPPWYuBV_9J9HYVaGKUVeKCrrO3a5ZExP3WVPv21P7NlpHeYMipjKQF_G1lAE")
  expect(statusEntry).toStrictEqual({type: "EthrStatusRegistry2019", id: "rinkeby:0xStatusRegistryAddress"})
  console.log(statusEntry)
})
