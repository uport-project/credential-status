/**
 * represents the result of a status check
 */
export interface CredentialStatus {
    [x: string]: any
}

export interface StatusMethod {
    checkStatus(credential : string) : CredentialStatus
}

export class Status implements StatusMethod {
    checkStatus(credential: string) : CredentialStatus {
        return {revoked : false}
    }
}