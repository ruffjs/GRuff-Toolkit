# 快速上手

## 创建客户端实例

```ts
import createClient from "@ruff-web/http/src/clients";
import resources from "../../configs/test-dev-svc";

const client = createClient("https://test-dev-svc.ruffcorp.com", {
  resources,
});
```

## 获取设备列表

> 对应 HTTP 操作: GET /api/v1/device?pageSize=10&pageIndex=1

```ts
const res: HttpResourcesList<Device, any> = await client.device.list();
// print res.$raw;
```

## 获取设备2153的信息

> 对应 HTTP 操作: GET /api/v1/device/2153

```ts
const res: IHttpPackagedResource<Device, any> = await client.device.get(2153);
// or
const res = await client.device(2153).get();
// print res.$raw;
```

## 演示
