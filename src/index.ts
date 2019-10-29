import { decodeJWT } from 'did-jwt'

/**
 * Represents the result of a status check
 */
export interface CredentialStatus {
  revoked?: boolean
  [x: string]: any
}

/**
 * Represents a status method entry that could be embedded in a W3C Verifiable Credential.
 * Normally, only credentials that list a status method would need to be verified by it.
 *
 * ex:
 * ```json
 * status : { type: "EthrStatusRegistry2019", id: "rinkeby:0xregistryAddress" }
 * ```
 *
 */
export interface StatusEntry {
  type: string
  id: string
  [x: string]: any
}

/**
 * [draft] The interface used by status methods.
 * `checkStatus` should be called with a raw credential and it should produce a status result.
 */
export interface StatusMethod {
  checkStatus(credential: string): Promise<CredentialStatus>
}

interface JWTPayloadWithStatus {
  status?: StatusEntry
  [x: string]: any
}

interface StatusMethodRegistry {
  [type: string]: StatusMethod
}

/**
 * [draft] An implementation of a StatusMethod that can aggregate multiple other methods.
 * It calls the appropriate method based on the `status.type` specified in the credential.
 */
export class Status implements StatusMethod {
  private registry: StatusMethodRegistry
  constructor(registry: StatusMethodRegistry = {}) {
    this.registry = registry
  }

  checkStatus(credential: string): Promise<CredentialStatus> {
    // TODO: validate the credential to be VerifiableCredential or VerifiablePresentation
    const decoded = decodeJWT(credential)
    const statusEntry = (decoded.payload as JWTPayloadWithStatus).status

    if (typeof statusEntry === 'undefined') {
      return new Promise((resolve, reject) => {
        resolve({})
      })
    }

    const method = this.registry[statusEntry.type]

    if (typeof method !== 'undefined' && method != null) {
      return method.checkStatus(credential)
    } else {
      return new Promise((resolve, reject) => {
        resolve({
          error: `Credential status method ${statusEntry.type} unknown. Validity can not be determined.`
        })
      })
    }
  }
}
