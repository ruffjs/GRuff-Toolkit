# 一些概念

## HttpClient 和 MockClient

## ResourceProvider

- StatelessResourceProvider             /api/v1/user
- StatefulResourceProvider              /api/v1/user?foo=bar
- IdentifiedResourceProvider            /api/v1/user/1
- FeatureResourceProvider               /api/v1/user/1/profile
- CallableResourceProvider              /api/v1/user/login

## ResourceId

- api/v1/user/**/profile:4
-
- datapool.ts:25 api/v1/user:3
