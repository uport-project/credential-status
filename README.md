# credential-status

[![codecov](https://codecov.io/gh/uport-project/credential-status/branch/develop/graph/badge.svg)](https://codecov.io/gh/uport-project/credential-status)
[![CircleCI](https://circleci.com/gh/uport-project/credential-status.svg?style=svg)](https://circleci.com/gh/uport-project/credential-status)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/eb3f6debcbf84860a6630acb2630eef2)](https://www.codacy.com/manual/uport-project/credential-status?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=uport-project/credential-status&amp;utm_campaign=Badge_Grade)

A credential status aggregator for did-jwt.
A credential status method aggregator for did-jwt.

## Usage

Given a JWT credential that contains a `status` property, it should call the appropriate status checking method and
return its result.
This library is meant to be used with `did-jwt`, as a status method aggregator called during the verification step.

Example:

A JWT with a status field in the payload:
```json
{
  "status": {
    "id": "mainnet:0xStatusRegistryAddress",
    "type": "EthrStatusRegistry2019"
  },
  "iss": "did:ethr:0x...",
  "vc": {
    //...
  }
  //...
}
```

```ts
import { EthrStatusRegistry } from ethr-status-registry
import { Status } from 'credential-status'

const status = new Status({
    ...new EthrStatusRegistry(config).asStatusMethod,
})

val result = await status.checkStatus(token)

// { "revokedAt": "0x5348684" }
  
```

Note: only issuer revocations are considered for now
