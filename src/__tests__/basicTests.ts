import 'jest-extended'

import { Status, StatusMethod, CredentialStatus } from '../index'

test('should be able to instantiate Status', () => {
  expect(new Status()).not.toBeNil()
})

test('should be able to call checkStatus', () => {
  const checker = new Status()
  expect(checker.checkStatus).toBeFunction()
})

test('should reject unknown status method', async () => {
  const checker = new Status()
  //does not return the status result, only forwards the input at this time
  const statusEntry = await checker.checkStatus(
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NkstUiJ9.eyJpYXQiOjE1NzIzNTExNTYsInN0YXR1cyI6eyJpZCI6InJpbmtlYnk6MHhTdGF0dXNSZWdpc3RyeUFkZHJlc3MiLCJ0eXBlIjoiRXRoclN0YXR1c1JlZ2lzdHJ5MjAxOSJ9LCJpc3MiOiJkaWQ6ZXRocjoweGYzYmVhYzMwYzQ5OGQ5ZTI2ODY1ZjM0ZmNhYTU3ZGJiOTM1YjBkNzQifQ.hNFm3JDwoyNX2YHPlioHkR986ETPPWYuBV_9J9HYVaGKUVeKCrrO3a5ZExP3WVPv21P7NlpHeYMipjKQF_G1lAE'
  )
  expect(statusEntry).toStrictEqual({
    error:
      'Credential status method EthrStatusRegistry2019 unknown. Validity can not be determined.'
  })
})

test('should pass through credential with no status requirement', async () => {
  const checker = new Status()
  //does not return the status result, only forwards the input at this time
  const statusEntry = await checker.checkStatus(
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NkstUiJ9.eyJpYXQiOjE1NzIzNjI4NzUsIm5hbWUiOiJ1UG9ydCBEZXZlbG9wZXIiLCJpc3MiOiJkaWQ6ZXRocjoweGYzYmVhYzMwYzQ5OGQ5ZTI2ODY1ZjM0ZmNhYTU3ZGJiOTM1YjBkNzQifQ.dTkC_-pLizlz2LkwZBIVPLiFJBGI51urLB2sPgivemf78u3RpB2gJG7Xd4BGUFA3kjOoujAMFNKX4MakoskU3gA'
  )
  expect(statusEntry).toStrictEqual({})
})

test('should check status according to registered method', async () => {
  const customMethod = <StatusMethod>{
    checkStatus(credential: string): Promise<CredentialStatus> {
      return new Promise((resolve, reject) => {
        resolve({ 'custom method works': true })
      })
    }
  }

  const checker = new Status({ CustomStatusChecker: customMethod })
  //does not return the status result, only forwards the input at this time
  const statusEntry = await checker.checkStatus(
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NkstUiJ9.eyJpYXQiOjE1NzIzNjM1NjQsInN0YXR1cyI6eyJ0eXBlIjoiQ3VzdG9tU3RhdHVzQ2hlY2tlciIsImlkIjoiZG9uJ3QgY2FyZSJ9LCJpc3MiOiJkaWQ6ZXRocjoweGYzYmVhYzMwYzQ5OGQ5ZTI2ODY1ZjM0ZmNhYTU3ZGJiOTM1YjBkNzQifQ.zJmp94s0yq7HYHhVT1A0GFD4-51vwpsc7JPn35mMgZJ7WVVQmlp07u13Uu0vqsFprixHL3zRfd9z-yWKUMTyWQA'
  )
  expect(statusEntry).toStrictEqual({ 'custom method works': true })
})
