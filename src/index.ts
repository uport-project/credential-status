/**
* represents the result of a status check
*/
export interface CredentialStatus {
    [x: string]: any
}

export interface StatusMethod {
    checkStatus(credential : String) : CredentialStatus
}

export class Status implements StatusMethod {
    checkStatus(credential: String) : CredentialStatus {
        return {revoked : false}
    }
}