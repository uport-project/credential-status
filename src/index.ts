import { decodeJWT } from 'did-jwt'
import { DIDDocument } from 'did-resolver'

/**
 * Represents the result of a status check
 */
export interface CredentialStatus {
  revoked?: boolean

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
 */
export interface StatusEntry {
  type: string
  id: string

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any
}

/**
 * [draft] The interface expected for status resolvers.
 * `checkStatus` should be called with a raw credential and it should Promise a [[CredentialStatus]] result.
 * It is advisable that classes that implement this interface also provide a way to easily register the correct
 * Status method type.
 *
 * Example:
 * ```typescript
 *  class CredentialStatusList2017 implements StatusResolver {
 *    checkStatus: StatusMethod = async (credential: string) => {
 *      // ...your implementation here
 *    }
 *    asStatusMethod = {"CredentialStatusList2017" : this.checkStatus}
 *  }
 * ```
 */
export interface StatusResolver {
  checkStatus: StatusMethod
}

/**
 * The method signature expected to be implemented by credential status resolvers
 */
export type StatusMethod = (credential: string, didDoc: DIDDocument) => Promise<null | CredentialStatus>

interface JWTPayloadWithStatus {
  credentialStatus?: StatusEntry

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any
}

interface StatusMethodRegistry {
  [type: string]: StatusMethod
}

/**
 * [draft] An implementation of a StatusMethod that can aggregate multiple other methods.
 * It calls the appropriate method based on the `status.type` specified in the credential.
 */
export class Status implements StatusResolver {
  private registry: StatusMethodRegistry

  /**
   * All the expected StatusMethods should be registered during construction.
   * Example:
   * ```typescript
   * const status = new Status({
   *   ...new EthrStatusRegistry(config).asStatusMethod,                       //using convenience method
   *   "CredentialStatusList2017": new CredentialStatusList2017().checkStatus, //referencing a checkStatus
   * implementation
   *   "CustomStatusChecker": customStatusCheckerMethod                        //directly referencing an independent
   * method
   * })
   * ```
   */
  constructor(registry: StatusMethodRegistry = {}) {
    this.registry = registry
  }

  async checkStatus(credential: string, didDoc: DIDDocument): Promise<null | CredentialStatus> {
    // TODO: validate the credential to be VerifiableCredential or VerifiablePresentation
    const decoded = decodeJWT(credential)
    const statusEntry = (decoded.payload as JWTPayloadWithStatus).credentialStatus

    if (typeof statusEntry === 'undefined') {
      return {}
    }

    const method = this.registry[statusEntry.type]

    if (typeof method !== 'undefined' && method != null) {
      return method(credential, didDoc)
    } else {
      return {
        // Once the credential status mechanisms in W3C get more stable, perhaps this can become a `reject`
        error: `Credential status method ${statusEntry.type} unknown. Validity can not be determined.`,
      }
    }
  }
}
