# 配置数据模拟函数

> 此

## 直接使用 Client 接口查询

> 用户 id 为 1
>
> 对应 HTTP 操作: GET /api/v1/user/{id}/profile

```typescript
import createClient from "@ruff-web/http/src/clients";
import resources from "../../configs/test-user-svc";

/* 创建客户端 */
const client = createClient("https://test-user-svc.ruffcorp.com", {
  resources,
});

// 查询用户信息
const res = await client.user(1).profile.get();
// or
const res = await client.user(1).profile();
// print res.$raw;
```

## 通过 HttpPackagedResource 获取用户信息

> 查询第 3 个用户 (每页 1 个，第 3 页)
>
> 对应 HTTP 操作:
>
> GET /api/v1/user?pageSize=1&pageIndex=3
>
> GET /api/v1/user/{id}/profile

```typescript
for (const user of await client.user.list(1, 3)) {
  // user instanceof IHttpPackagedResource
  const res = await user.profile();
  // print res.$raw;
}
```

## 演示
