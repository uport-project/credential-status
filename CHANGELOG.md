# [3.0.0](https://github.com/uport-project/credential-status/compare/2.0.6...3.0.0) (2024-01-26)


### chore

* **deps:** update tooling and export types ([#59](https://github.com/uport-project/credential-status/issues/59)) ([7235052](https://github.com/uport-project/credential-status/commit/72350521a019703536a4a063ff83d73d573a4ca6))


### BREAKING CHANGES

* **deps:** the exports have changed, bumping major version for safety

## [2.0.6](https://github.com/uport-project/credential-status/compare/2.0.5...2.0.6) (2023-08-09)


### Bug Fixes

* **deps:** Update did-dependencies ([e7fae5f](https://github.com/uport-project/credential-status/commit/e7fae5f3e5e664ee87d8e3b56e067aaa7e103bc3))

## [2.0.5](https://github.com/uport-project/credential-status/compare/2.0.4...2.0.5) (2022-08-10)


### Bug Fixes

* **deps:** include did-jwt@6.3.0 in release ([2de28e7](https://github.com/uport-project/credential-status/commit/2de28e72a239b4e2a585f3bf6f33f6154a9dac12))

## [2.0.4](https://github.com/uport-project/credential-status/compare/2.0.3...2.0.4) (2022-08-02)


### Bug Fixes

* **deps:** Update dependency did-resolver to v4 ([0e0884a](https://github.com/uport-project/credential-status/commit/0e0884ad36d4bef6b4f62e8e7dcaf1fa8ba1acf1))

## [2.0.3](https://github.com/uport-project/credential-status/compare/2.0.2...2.0.3) (2022-06-08)


### Bug Fixes

* **deps:** bump did-jwt to v6 & did-resolver to 3.2.2 ([#50](https://github.com/uport-project/credential-status/issues/50)) ([4c10524](https://github.com/uport-project/credential-status/commit/4c105249a4a9b1a59c1617d561ab31f0177ec25d))

## [2.0.2](https://github.com/uport-project/credential-status/compare/2.0.1...2.0.2) (2022-05-12)


### Bug Fixes

* **ci:** add multiple build targets ([#47](https://github.com/uport-project/credential-status/issues/47)) ([daa5baa](https://github.com/uport-project/credential-status/commit/daa5baaa7a1a0fe689c622cb891fc03d6803d2e5))

## [2.0.1](https://github.com/uport-project/credential-status/compare/2.0.0...2.0.1) (2022-05-11)


### Bug Fixes

* **ci:** run build before release ([#46](https://github.com/uport-project/credential-status/issues/46)) ([50c58da](https://github.com/uport-project/credential-status/commit/50c58da94f4e6d2be88f911d448807d398bc6a83)), closes [#45](https://github.com/uport-project/credential-status/issues/45)

# [2.0.0](https://github.com/uport-project/credential-status/compare/1.2.4...2.0.0) (2022-02-16)


### Features

* add support for more credential formats ([#39](https://github.com/uport-project/credential-status/issues/39)) ([52f68fa](https://github.com/uport-project/credential-status/commit/52f68fa84f53a53b2f23ae1d628f6c727a56cbfe)), closes [#38](https://github.com/uport-project/credential-status/issues/38)


### BREAKING CHANGES

* The method signature for `StatusMethod` requires support for both credential formats
* The return type of `StatusMethod`  is `Promise<CredentialStatus>` with the expectation to reject if there is a problem resolving the status.

## [1.2.4](https://github.com/uport-project/credential-status/compare/1.2.3...1.2.4) (2022-01-19)


### Bug Fixes

* **deps:** upgrade DID dependencies ([ec5cd9f](https://github.com/uport-project/credential-status/commit/ec5cd9f284adf3029e221960af34dab08dd3b366))

## [1.2.3](https://github.com/uport-project/credential-status/compare/1.2.2...1.2.3) (2022-01-19)


### Bug Fixes

* **ci:** upgrade CI/CD to gh workflows ([f4e8e26](https://github.com/uport-project/credential-status/commit/f4e8e26893d33022ed6b1f9cb28bcb457c15f858))

## [1.2.2](https://github.com/uport-project/credential-status/compare/1.2.1...1.2.2) (2021-01-20)


### Bug Fixes

* **deps:** bump dependencies and schedule autoupdates ([#25](https://github.com/uport-project/credential-status/issues/25)) ([7046e8c](https://github.com/uport-project/credential-status/commit/7046e8c74eea2ad24a3096d87908174e4081026d))

## [1.2.1](https://github.com/uport-project/credential-status/compare/1.2.0...1.2.1) (2020-04-29)


### Bug Fixes

* **deps:** re-set `did-jwt` as a direct dependency ([5fbfd4e](https://github.com/uport-project/credential-status/commit/5fbfd4e78599d8c46e18152b4ad287b37ee7c9a1))

# [1.2.0](https://github.com/uport-project/credential-status/compare/1.1.1...1.2.0) (2020-04-29)


### Features

* rename `status` to `crdentialStatus` for credentials & presentations ([be0b90d](https://github.com/uport-project/credential-status/commit/be0b90db1e12f34016261a195aab55545ff8851f)), closes [#13](https://github.com/uport-project/credential-status/issues/13)

## [1.1.1](https://github.com/uport-project/credential-status/compare/1.1.0...1.1.1) (2020-04-22)


### Bug Fixes

* **build:** fix path in package.json main attribute ([ddc7c67](https://github.com/uport-project/credential-status/commit/ddc7c67261a06930f75802367fef85d4128ca48f))

# [1.1.0](https://github.com/uport-project/credential-status/compare/1.0.1...1.1.0) (2020-01-16)


### Bug Fixes

* data type bug caused by json-ld ([67c8a6d](https://github.com/uport-project/credential-status/commit/67c8a6d8d12e0836899dacf391a5ef393f2c2849))
* remove DIDDocument type redeclaration ([e8abd40](https://github.com/uport-project/credential-status/commit/e8abd40d673d7bafa650cf590bbccc72b04731a1))


### Features

* require a DID document for status checks ([4ba5e7b](https://github.com/uport-project/credential-status/commit/4ba5e7b3b07ba8455c30f29796dbb79e426462a6))

## [1.0.1](https://github.com/uport-project/credential-status/compare/1.0.0...1.0.1) (2019-10-31)


### Bug Fixes

* declare ts types in package.json ([9c4dba9](https://github.com/uport-project/credential-status/commit/9c4dba97f845893b59c124eb3e4fafd56acc2e26))

# 1.0.0 (2019-10-31)


### Features

* implement basic status registry ([bb8a3db](https://github.com/uport-project/credential-status/commit/bb8a3db48872048d88c87e1d6c7fc97f32c984eb))
