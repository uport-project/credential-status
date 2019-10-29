import { decodeJWT } from 'did-jwt'
/**
 * represents the result of a status check
 */
export interface CredentialStatus {
  revoked: boolean | null
  [x: string]: any
}

export interface StatusMethod {
  checkStatus(credential : string) : Promise<CredentialStatus>
}

export class Status implements StatusMethod {
  checkStatus(credential: string) : Promise<CredentialStatus> {
    //TODO: validate the credential to be VerifiableCredential or VerifiablePresentation
    //~~TODO: extract the status property~~
    const decoded = decodeJWT(credential)
    const statusEntry = (decoded.payload as any).status
    //TODO: get the type of the status property

    //TODO: call the statusMethod type from the statusMethodRegistry
    //TODO: return the result of the call or an error? if the method was not registered


    return new Promise((resolve, reject) => { resolve( statusEntry ) })
  }
}
