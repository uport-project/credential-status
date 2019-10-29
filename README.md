# credential-status

A credential status aggregator for did-jwt.

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
    EthrStatusRegistry2019 : new EthrStatusRegistry(config)
})

val result = await status.checkStatus(token)
// { "revoked": false }
  
```
