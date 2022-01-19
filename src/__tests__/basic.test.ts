import 'jest-extended'

import { Status, StatusMethod, StatusResolver } from '../index'

import { DIDDocument } from 'did-resolver'
import { SimpleSigner, createJWT } from 'did-jwt'

const privateKey = 'a285ab66393c5fdda46d6fbad9e27fafd438254ab72ad5acb681a0e9f20f5d7b'
const signerAddress = '0x2036c6cd85692f0fb2c26e6c6b2eced9e4478dfd'
const issuer = `did:ethr:${signerAddress}`
const signer = SimpleSigner(privateKey)

const referenceDoc = {
  '@context': 'https://w3id.org/did/v1',
  id: issuer,
  publicKey: [
    {
      id: `${issuer}#owner`,
      type: 'Secp256k1VerificationKey2018',
      ethereumAddress: signerAddress,
    },
  ],
} as DIDDocument

test('should be able to instantiate Status', () => {
  expect(new Status()).not.toBeNil()
})

test('should be able to call checkStatus', () => {
  const checker = new Status()
  expect(checker.checkStatus).toBeFunction()
})

test('should reject unknown status method', async () => {
  const checker = new Status()
  const token = await createJWT(
    { credentialStatus: { type: 'UnknownMethod', id: 'something something' } },
    { issuer, signer }
  )
  const statusEntry = await checker.checkStatus(token, referenceDoc)
  expect(statusEntry).toStrictEqual({
    error: 'Credential status method UnknownMethod unknown. Validity can not be determined.',
  })
})

test('should pass through credential with no status requirement', async () => {
  const token = await createJWT({}, { issuer, signer })
  const checker = new Status()
  const statusEntry = await checker.checkStatus(token, referenceDoc)
  expect(statusEntry).toStrictEqual({})
})

test('should check status according to registered method', async () => {
  const checkStatus: StatusMethod = async () => {
    return { 'custom method works': true }
  }
  const checker = new Status({ CustomStatusChecker: checkStatus })
  const token = await createJWT(
    { credentialStatus: { type: 'CustomStatusChecker', id: 'something something' } },
    { issuer, signer }
  )
  const statusEntry = await checker.checkStatus(token, referenceDoc)
  expect(statusEntry).toStrictEqual({ 'custom method works': true })
})

test('sample StatusResolver with easy registration', async () => {
  class CustomStatusChecker implements StatusResolver {
    checkStatus: StatusMethod = async (credential: string, doc: DIDDocument) => {
      return { revoked: false }
    }
    asStatusMethod = { CustomStatusChecker: this.checkStatus }
  }

  const checker = new Status({
    ...new CustomStatusChecker().asStatusMethod,
  })

  const token = await createJWT(
    { credentialStatus: { type: 'CustomStatusChecker', id: 'something something' } },
    { issuer, signer }
  )
  const statusEntry = await checker.checkStatus(token, referenceDoc)
  expect(statusEntry).toStrictEqual({ revoked: false })
})
