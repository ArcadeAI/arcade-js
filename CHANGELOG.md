# Changelog

## 1.3.0 (2025-05-01)

Full Changelog: [v1.2.1...v1.3.0](https://github.com/ArcadeAI/arcade-js/compare/v1.2.1...v1.3.0)

### Features

* add SKIP_BREW env var to ./scripts/bootstrap ([#106](https://github.com/ArcadeAI/arcade-js/issues/106)) ([8408484](https://github.com/ArcadeAI/arcade-js/commit/8408484d003847040cd7390a8c1bdbd960b2497f))
* **api:** api update ([97d7417](https://github.com/ArcadeAI/arcade-js/commit/97d74176b43d3503e2a80126713004ad29e5d939))
* **api:** api update ([e57023e](https://github.com/ArcadeAI/arcade-js/commit/e57023e410e285cb1350bc161120427240fab4dd))
* **api:** api update ([3031941](https://github.com/ArcadeAI/arcade-js/commit/303194184bbe8811a4dcbb3cc8b3840bdd52de00))
* **api:** api update ([1deb7aa](https://github.com/ArcadeAI/arcade-js/commit/1deb7aa04c4ec7b6bf58c963aa3e689fe745c9d0))
* **api:** api update ([f29e388](https://github.com/ArcadeAI/arcade-js/commit/f29e38854280f5d6f1b7179bb13576ca28518576))
* **api:** api update ([#100](https://github.com/ArcadeAI/arcade-js/issues/100)) ([bc80e2f](https://github.com/ArcadeAI/arcade-js/commit/bc80e2f846e72ddb3993108916f0edcd88bd1a13))
* **api:** api update ([#101](https://github.com/ArcadeAI/arcade-js/issues/101)) ([067e889](https://github.com/ArcadeAI/arcade-js/commit/067e889bbeefdc7c93c65029efd500178e9b81fc))
* **api:** api update ([#102](https://github.com/ArcadeAI/arcade-js/issues/102)) ([0e3d5c2](https://github.com/ArcadeAI/arcade-js/commit/0e3d5c2af39df68e622de0ce23b2e28db4918191))
* **api:** api update ([#104](https://github.com/ArcadeAI/arcade-js/issues/104)) ([2b8e7a5](https://github.com/ArcadeAI/arcade-js/commit/2b8e7a55b6eacb93561c122e2b209fb23d9582a3))
* **api:** api update ([#105](https://github.com/ArcadeAI/arcade-js/issues/105)) ([a29a9f7](https://github.com/ArcadeAI/arcade-js/commit/a29a9f7777bdb9b927c31bf05966443cd11d8327))
* **api:** api update ([#113](https://github.com/ArcadeAI/arcade-js/issues/113)) ([58096c8](https://github.com/ArcadeAI/arcade-js/commit/58096c82c805a806cfa78985a4bf8ceae466aa7d))
* **api:** api update ([#114](https://github.com/ArcadeAI/arcade-js/issues/114)) ([4af38e9](https://github.com/ArcadeAI/arcade-js/commit/4af38e9f92a283aa91916ae794a57b05e5f1158c))
* **api:** api update ([#116](https://github.com/ArcadeAI/arcade-js/issues/116)) ([90b1bb7](https://github.com/ArcadeAI/arcade-js/commit/90b1bb71049e5dcef8824344e9ee39adc90e3ea5))
* **api:** api update ([#98](https://github.com/ArcadeAI/arcade-js/issues/98)) ([81244e2](https://github.com/ArcadeAI/arcade-js/commit/81244e2dba7ed8804108e14eb00a6a96744c69af))
* **client:** accept RFC6838 JSON content types ([#107](https://github.com/ArcadeAI/arcade-js/issues/107)) ([5025b73](https://github.com/ArcadeAI/arcade-js/commit/5025b739c10596ef726f9d03ecbcbffe8f20f70d))


### Bug Fixes

* **api:** improve type resolution when importing as a package ([#119](https://github.com/ArcadeAI/arcade-js/issues/119)) ([449cc3a](https://github.com/ArcadeAI/arcade-js/commit/449cc3ad69a0a6405d9b1a977303f34faaa95a61))
* avoid type error in certain environments ([#112](https://github.com/ArcadeAI/arcade-js/issues/112)) ([2efcf33](https://github.com/ArcadeAI/arcade-js/commit/2efcf3343edab6ce0075af85721832305b7d0c80))
* **client:** send `X-Stainless-Timeout` in seconds ([#117](https://github.com/ArcadeAI/arcade-js/issues/117)) ([5a18a9a](https://github.com/ArcadeAI/arcade-js/commit/5a18a9abf85592da7529c1261610bacc3fa67a90))
* **exports:** ensure resource imports don't require /index ([#109](https://github.com/ArcadeAI/arcade-js/issues/109)) ([3ebaa3e](https://github.com/ArcadeAI/arcade-js/commit/3ebaa3e430bb67213e45fdf215a6c9c2532074f8))
* **internal:** work around https://github.com/vercel/next.js/issues/76881 ([#115](https://github.com/ArcadeAI/arcade-js/issues/115)) ([814331b](https://github.com/ArcadeAI/arcade-js/commit/814331b7c34c7679094e4254783aa4c3447c8d15))
* **mcp:** remove unused tools.ts ([#120](https://github.com/ArcadeAI/arcade-js/issues/120)) ([efa23b2](https://github.com/ArcadeAI/arcade-js/commit/efa23b2d05e0ba05eb55147fbbe9e58ba2d74dcd))


### Chores

* **ci:** add timeout thresholds for CI jobs ([8f22405](https://github.com/ArcadeAI/arcade-js/commit/8f22405c49d1163a8efa97ca2739c9b7ab8f44c5))
* **ci:** only use depot for staging repos ([6075f2b](https://github.com/ArcadeAI/arcade-js/commit/6075f2b5d81899cffc54d02cbc07689726af1cbe))
* **client:** minor internal fixes ([8bebc61](https://github.com/ArcadeAI/arcade-js/commit/8bebc61f77736a032b04726ef35d35b9263d715d))
* **exports:** cleaner resource index imports ([#110](https://github.com/ArcadeAI/arcade-js/issues/110)) ([fccbf01](https://github.com/ArcadeAI/arcade-js/commit/fccbf0177357a9c3bc44ec7c4c27e2d8d9aaafd2))
* **exports:** stop using path fallbacks ([#111](https://github.com/ArcadeAI/arcade-js/issues/111)) ([b70e188](https://github.com/ArcadeAI/arcade-js/commit/b70e188460248542fc669c23c76d75280fa797c0))
* **internal:** add aliases for Record and Array ([#118](https://github.com/ArcadeAI/arcade-js/issues/118)) ([1bab334](https://github.com/ArcadeAI/arcade-js/commit/1bab3341a189bef28e204fca70458b924af87807))
* **internal:** codegen related update ([a1a28da](https://github.com/ArcadeAI/arcade-js/commit/a1a28da6f0f6d454eb4331cfdda6ccf0bb3ad5c4))
* **internal:** reduce CI branch coverage ([a660f12](https://github.com/ArcadeAI/arcade-js/commit/a660f12624aa0de6ada936787a073ef4473ef7a1))
* **internal:** remove extra empty newlines ([#108](https://github.com/ArcadeAI/arcade-js/issues/108)) ([26b8e56](https://github.com/ArcadeAI/arcade-js/commit/26b8e56639264804ee7657edfe07cf5b58d7019a))
* **internal:** upload builds and expand CI branch coverage ([6508a13](https://github.com/ArcadeAI/arcade-js/commit/6508a133171dbc081367a1a175b0e5bbc5c7f611))


### Documentation

* **readme:** fix typo ([f4cc3b1](https://github.com/ArcadeAI/arcade-js/commit/f4cc3b1b5d905275265940e40c03ff3048a301f6))
* update URLs from stainlessapi.com to stainless.com ([#103](https://github.com/ArcadeAI/arcade-js/issues/103)) ([5d4780c](https://github.com/ArcadeAI/arcade-js/commit/5d4780c8c84bb4773309af802857bbd34cddc193))

## 1.2.1 (2025-02-22)

Full Changelog: [v1.2.0...v1.2.1](https://github.com/ArcadeAI/arcade-js/compare/v1.2.0...v1.2.1)

### Chores

* **internal:** fix devcontainers setup ([#95](https://github.com/ArcadeAI/arcade-js/issues/95)) ([76d0811](https://github.com/ArcadeAI/arcade-js/commit/76d0811d34d4e3b2f9c1ad0de95841f495cd6c60))

## 1.2.0 (2025-02-18)

Full Changelog: [v1.1.0...v1.2.0](https://github.com/ArcadeAI/arcade-js/compare/v1.1.0...v1.2.0)

### Features

* **api:** api update ([#90](https://github.com/ArcadeAI/arcade-js/issues/90)) ([d68c23e](https://github.com/ArcadeAI/arcade-js/commit/d68c23ee6cea57c41e896e0d4699c4928cefc085))
* **api:** api update ([#93](https://github.com/ArcadeAI/arcade-js/issues/93)) ([0f897db](https://github.com/ArcadeAI/arcade-js/commit/0f897db50dfc7a8942b634f354c00486d80b2c39))


### Bug Fixes

* **client:** fix export map for index exports ([#92](https://github.com/ArcadeAI/arcade-js/issues/92)) ([088dca1](https://github.com/ArcadeAI/arcade-js/commit/088dca1f8d4ee3637de469c93f2041dc97ab393a))

## 1.1.0 (2025-02-05)

Full Changelog: [v1.0.0...v1.1.0](https://github.com/ArcadeAI/arcade-js/compare/v1.0.0...v1.1.0)

### Features

* **client:** send `X-Stainless-Timeout` header ([#87](https://github.com/ArcadeAI/arcade-js/issues/87)) ([c6331c3](https://github.com/ArcadeAI/arcade-js/commit/c6331c3ab890be4557ff6a1c77edfc4b230f91c3))

## 1.0.0 (2025-01-24)

Full Changelog: [v0.2.2...v1.0.0](https://github.com/ArcadeAI/arcade-js/compare/v0.2.2...v1.0.0)

### Features

* **api:** api update ([#75](https://github.com/ArcadeAI/arcade-js/issues/75)) ([36eb88d](https://github.com/ArcadeAI/arcade-js/commit/36eb88ddefc2abfb9d8f550efa20cdacdaf8f283))
* **api:** api update ([#76](https://github.com/ArcadeAI/arcade-js/issues/76)) ([2f699c1](https://github.com/ArcadeAI/arcade-js/commit/2f699c1ea33aac5bd168a9bafd8924f0185de3d3))
* **api:** api update ([#78](https://github.com/ArcadeAI/arcade-js/issues/78)) ([1fae253](https://github.com/ArcadeAI/arcade-js/commit/1fae253828f24462b3b327d03b71df0ef157efc5))
* **api:** api update ([#79](https://github.com/ArcadeAI/arcade-js/issues/79)) ([168b1f5](https://github.com/ArcadeAI/arcade-js/commit/168b1f550f966e6dd6d9d0870f1df32bb4d0eb9a))
* **api:** api update ([#83](https://github.com/ArcadeAI/arcade-js/issues/83)) ([8b701be](https://github.com/ArcadeAI/arcade-js/commit/8b701be8dc3a2ff9e623b83a601e0c3beb35889e))
* **api:** api update ([#84](https://github.com/ArcadeAI/arcade-js/issues/84)) ([801c58d](https://github.com/ArcadeAI/arcade-js/commit/801c58da6b947ecd5995740d8bf8afb74c527dd9))


### Bug Fixes

* **client:** normalize method ([#61](https://github.com/ArcadeAI/arcade-js/issues/61)) ([7f729f2](https://github.com/ArcadeAI/arcade-js/commit/7f729f27460aa59a4cc3b19c893062fcc4ca7198))
* **client:** normalize method ([#70](https://github.com/ArcadeAI/arcade-js/issues/70)) ([346cc8a](https://github.com/ArcadeAI/arcade-js/commit/346cc8a5054e6120c1d8e320c98e72e9cd07ccb6))


### Chores

* **internal:** codegen related update ([#63](https://github.com/ArcadeAI/arcade-js/issues/63)) ([0b6a70b](https://github.com/ArcadeAI/arcade-js/commit/0b6a70b4882c5b70ee0f1ee4cff5621263576e11))
* **internal:** codegen related update ([#64](https://github.com/ArcadeAI/arcade-js/issues/64)) ([4e9b37b](https://github.com/ArcadeAI/arcade-js/commit/4e9b37bb9615b1ee869c4d7116978be04bf27650))
* **internal:** codegen related update ([#65](https://github.com/ArcadeAI/arcade-js/issues/65)) ([ec268d8](https://github.com/ArcadeAI/arcade-js/commit/ec268d8b98c6a2dbf35a5ffc4006abbec2850fce))
* **internal:** codegen related update ([#66](https://github.com/ArcadeAI/arcade-js/issues/66)) ([e2944f0](https://github.com/ArcadeAI/arcade-js/commit/e2944f04cff49300381faa8a06a53fd9be23a83d))
* **internal:** codegen related update ([#67](https://github.com/ArcadeAI/arcade-js/issues/67)) ([0f7971e](https://github.com/ArcadeAI/arcade-js/commit/0f7971eff276dc2b564db624340908036fba9892))
* **internal:** codegen related update ([#68](https://github.com/ArcadeAI/arcade-js/issues/68)) ([82e6e41](https://github.com/ArcadeAI/arcade-js/commit/82e6e41b778470ce34953905c6c6b669a4ba423e))
* **internal:** codegen related update ([#69](https://github.com/ArcadeAI/arcade-js/issues/69)) ([1315d00](https://github.com/ArcadeAI/arcade-js/commit/1315d00b4573c6ba6fada3cf71df1d32b11b2ce2))
* **internal:** codegen related update ([#72](https://github.com/ArcadeAI/arcade-js/issues/72)) ([46e5837](https://github.com/ArcadeAI/arcade-js/commit/46e58375269048cf1a58445b0fe1e266d3416402))
* **internal:** codegen related update ([#74](https://github.com/ArcadeAI/arcade-js/issues/74)) ([fc4035d](https://github.com/ArcadeAI/arcade-js/commit/fc4035d1067bb9d47bcf3f018d24d1f7bb878a2e))
* **internal:** codegen related update ([#80](https://github.com/ArcadeAI/arcade-js/issues/80)) ([42ea2ed](https://github.com/ArcadeAI/arcade-js/commit/42ea2ededb9302fba24e48f7787682a7883140f3))
* **internal:** codegen related update ([#82](https://github.com/ArcadeAI/arcade-js/issues/82)) ([aa80c39](https://github.com/ArcadeAI/arcade-js/commit/aa80c39657c3cec4818f626a22a4266af1f54e94))


### Documentation

* minor formatting changes ([#71](https://github.com/ArcadeAI/arcade-js/issues/71)) ([0801644](https://github.com/ArcadeAI/arcade-js/commit/0801644c04394818799450624e5afd4ae10feff6))

## 0.2.2 (2024-12-19)

Full Changelog: [v0.2.1...v0.2.2](https://github.com/ArcadeAI/arcade-js/compare/v0.2.1...v0.2.2)

### Chores

* **internal:** version bump ([#57](https://github.com/ArcadeAI/arcade-js/issues/57)) ([cb0999e](https://github.com/ArcadeAI/arcade-js/commit/cb0999e9fcc375d85c08acc21a4e43e95322df0e))

## 0.2.1 (2024-12-18)

Full Changelog: [v0.2.0...v0.2.1](https://github.com/ArcadeAI/arcade-js/compare/v0.2.0...v0.2.1)

### Chores

* **internal:** bump cross-spawn to v7.0.6 ([#53](https://github.com/ArcadeAI/arcade-js/issues/53)) ([b4efb29](https://github.com/ArcadeAI/arcade-js/commit/b4efb29c33c1d86c867e8b0e6db90c6bcea93d92))
* **internal:** codegen related update ([#55](https://github.com/ArcadeAI/arcade-js/issues/55)) ([bdaa2c3](https://github.com/ArcadeAI/arcade-js/commit/bdaa2c373df19e60586305062c96ffc1b147522f))
* **internal:** fix some typos ([#56](https://github.com/ArcadeAI/arcade-js/issues/56)) ([d1cdc96](https://github.com/ArcadeAI/arcade-js/commit/d1cdc961e30550f7ab4098c462b214415afd982a))
* **internal:** remove unnecessary getRequestClient function ([#51](https://github.com/ArcadeAI/arcade-js/issues/51)) ([e0483f1](https://github.com/ArcadeAI/arcade-js/commit/e0483f1ac4d031c295c11c4f8870db245dd6364e))
* **types:** nicer error class types + jsdocs ([#54](https://github.com/ArcadeAI/arcade-js/issues/54)) ([e65e8cf](https://github.com/ArcadeAI/arcade-js/commit/e65e8cfd9cf4ee9cf1b36892f37981583b562b52))

## 0.2.0 (2024-12-02)

Full Changelog: [v0.1.2...v0.2.0](https://github.com/ArcadeAI/arcade-js/compare/v0.1.2...v0.2.0)

### Features

* **api:** api update ([#38](https://github.com/ArcadeAI/arcade-js/issues/38)) ([e14e823](https://github.com/ArcadeAI/arcade-js/commit/e14e82341f54796e78e301b3746aea80c83d4247))
* **internal:** make git install file structure match npm ([#48](https://github.com/ArcadeAI/arcade-js/issues/48)) ([e06c1f4](https://github.com/ArcadeAI/arcade-js/commit/e06c1f4b72c748ad63c06e7ae61139936f680c2a))


### Chores

* **internal:** codegen related update ([#46](https://github.com/ArcadeAI/arcade-js/issues/46)) ([51e5698](https://github.com/ArcadeAI/arcade-js/commit/51e569849ce471c7faf8750e4443def7bc5248c1))
* **internal:** codegen related update ([#47](https://github.com/ArcadeAI/arcade-js/issues/47)) ([66148da](https://github.com/ArcadeAI/arcade-js/commit/66148daa96b7e449f815a597c68afc699cf7ddf6))
* rebuild project due to codegen change ([#40](https://github.com/ArcadeAI/arcade-js/issues/40)) ([369f85c](https://github.com/ArcadeAI/arcade-js/commit/369f85cede6cba170eb62280dd351de2880bf4cf))
* rebuild project due to codegen change ([#41](https://github.com/ArcadeAI/arcade-js/issues/41)) ([dcf41bd](https://github.com/ArcadeAI/arcade-js/commit/dcf41bd1a68afaa51d2e8bede13303846397a810))
* rebuild project due to codegen change ([#42](https://github.com/ArcadeAI/arcade-js/issues/42)) ([d1dc349](https://github.com/ArcadeAI/arcade-js/commit/d1dc349ff31f008d44164f8bd4283237c998350d))
* rebuild project due to codegen change ([#43](https://github.com/ArcadeAI/arcade-js/issues/43)) ([bec9cb7](https://github.com/ArcadeAI/arcade-js/commit/bec9cb7f32745c81b144c0b5b5c87efeed3512fb))
* remove redundant word in comment ([#45](https://github.com/ArcadeAI/arcade-js/issues/45)) ([4e716fd](https://github.com/ArcadeAI/arcade-js/commit/4e716fd2e6fba76736e0cbb55887ec15c79551ae))


### Documentation

* remove suggestion to use `npm` call out ([#44](https://github.com/ArcadeAI/arcade-js/issues/44)) ([acbcf85](https://github.com/ArcadeAI/arcade-js/commit/acbcf85f3eb7fcb254f92289316c33b011814240))

## 0.1.2 (2024-10-28)

Full Changelog: [v0.1.1...v0.1.2](https://github.com/ArcadeAI/arcade-js/compare/v0.1.1...v0.1.2)

### Chores

* update SDK settings ([#35](https://github.com/ArcadeAI/arcade-js/issues/35)) ([895f495](https://github.com/ArcadeAI/arcade-js/commit/895f4950481a6a4d6ba01c1a8c81e46426dcd97f))

## 0.1.1 (2024-10-24)

Full Changelog: [v0.1.0...v0.1.1](https://github.com/ArcadeAI/arcade-js/compare/v0.1.0...v0.1.1)

### Features

* **api:** api update ([#29](https://github.com/ArcadeAI/arcade-js/issues/29)) ([b035a96](https://github.com/ArcadeAI/arcade-js/commit/b035a96079c2a87d14c385e255ab111802ed01af))
* **api:** api update ([#31](https://github.com/ArcadeAI/arcade-js/issues/31)) ([02095c5](https://github.com/ArcadeAI/arcade-js/commit/02095c580199a92737a8fd7cf9b23e3220ce151b))
* **api:** api update ([#32](https://github.com/ArcadeAI/arcade-js/issues/32)) ([766bb2b](https://github.com/ArcadeAI/arcade-js/commit/766bb2b8b98edeed761e70ed791a56f7ed5373b4))
* **api:** api update ([#33](https://github.com/ArcadeAI/arcade-js/issues/33)) ([a2f8a47](https://github.com/ArcadeAI/arcade-js/commit/a2f8a470d13f52d1907ac982a11103f8bfd7948c))

## 0.1.0 (2024-10-22)

Full Changelog: [v0.0.11...v0.1.0](https://github.com/ArcadeAI/arcade-js/compare/v0.0.11...v0.1.0)

### Features

* **api:** api update ([#24](https://github.com/ArcadeAI/arcade-js/issues/24)) ([7204854](https://github.com/ArcadeAI/arcade-js/commit/720485450968daaa3bc4341d5f1b11664a41aa69))
* **api:** api update ([#26](https://github.com/ArcadeAI/arcade-js/issues/26)) ([c0f7481](https://github.com/ArcadeAI/arcade-js/commit/c0f7481e9015179d44d502b86c7cb7d8cf770715))
* **api:** api update ([#27](https://github.com/ArcadeAI/arcade-js/issues/27)) ([ffad85d](https://github.com/ArcadeAI/arcade-js/commit/ffad85d96124bc9513ad1e4f046934b828269a44))

## 0.0.11 (2024-10-15)

Full Changelog: [v0.1.0-alpha.2...v0.0.11](https://github.com/ArcadeAI/arcade-js/compare/v0.1.0-alpha.2...v0.0.11)

### Features

* **api:** api update ([#21](https://github.com/ArcadeAI/arcade-js/issues/21)) ([1ca22e2](https://github.com/ArcadeAI/arcade-js/commit/1ca22e29808cf2fa8d4a864c74e84d37baa09f79))

## 0.1.0-alpha.2 (2024-10-14)

Full Changelog: [v0.1.0-alpha.1...v0.1.0-alpha.2](https://github.com/ArcadeAI/arcade-js/compare/v0.1.0-alpha.1...v0.1.0-alpha.2)

### Features

* **api:** api update ([#14](https://github.com/ArcadeAI/arcade-js/issues/14)) ([1151f08](https://github.com/ArcadeAI/arcade-js/commit/1151f0877fc108e73fe905b293e40ae51d3c4742))
* **api:** api update ([#16](https://github.com/ArcadeAI/arcade-js/issues/16)) ([6a914f3](https://github.com/ArcadeAI/arcade-js/commit/6a914f3ad24f0a794faee60ed67759ef4448178e))
* **api:** api update ([#17](https://github.com/ArcadeAI/arcade-js/issues/17)) ([4875282](https://github.com/ArcadeAI/arcade-js/commit/4875282c44ab8fe24b72e2bf43e6b7b28c211d48))

## 0.1.0-alpha.1 (2024-10-13)

Full Changelog: [v0.0.1-alpha.0...v0.1.0-alpha.1](https://github.com/ArcadeAI/arcade-js/compare/v0.0.1-alpha.0...v0.1.0-alpha.1)

### Features

* **api:** api update ([75a3e4b](https://github.com/ArcadeAI/arcade-js/commit/75a3e4b87368a6099aaa3747a258c4779a620eb9))
* **api:** api update ([9859d40](https://github.com/ArcadeAI/arcade-js/commit/9859d40462aef973df0fc322c90b190076a599af))
* **api:** api update ([#1](https://github.com/ArcadeAI/arcade-js/issues/1)) ([e7968d9](https://github.com/ArcadeAI/arcade-js/commit/e7968d9935a392a108736acfc5ea0e8816b00fc6))
* **api:** api update ([#10](https://github.com/ArcadeAI/arcade-js/issues/10)) ([1e47656](https://github.com/ArcadeAI/arcade-js/commit/1e476560fd08870d335d574397ab21c0b1de83e5))
* **api:** api update ([#11](https://github.com/ArcadeAI/arcade-js/issues/11)) ([563e94c](https://github.com/ArcadeAI/arcade-js/commit/563e94cb69fe2282f327dafa3b4011c46fae25de))
* **api:** api update ([#12](https://github.com/ArcadeAI/arcade-js/issues/12)) ([897472b](https://github.com/ArcadeAI/arcade-js/commit/897472be2a59a5af6f31b51c24558e67b095daaa))
* **api:** api update ([#4](https://github.com/ArcadeAI/arcade-js/issues/4)) ([1b690a3](https://github.com/ArcadeAI/arcade-js/commit/1b690a31872df1a5426f5b7532908cf0a63dd862))
* **api:** api update ([#5](https://github.com/ArcadeAI/arcade-js/issues/5)) ([10be6fd](https://github.com/ArcadeAI/arcade-js/commit/10be6fd731c5e171d2a897f181500e934c71528c))
* **api:** api update ([#7](https://github.com/ArcadeAI/arcade-js/issues/7)) ([2bef6fc](https://github.com/ArcadeAI/arcade-js/commit/2bef6fc7ce18294dada955a2b80a62d8c0f3e8ec))
