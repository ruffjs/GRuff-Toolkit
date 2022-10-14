# 使用MockClient替换HttpClient开发

> MockClient 和 HttpClient 都实现了 RuffClient 接口，它们通过挂载相同的 ResourceProvider，而保证两个 client 保持一致的体验，进而实现相互替代、切换

## 创建一个 MockClient 并获取设备信息

> MockClient的使用和HttpClient一致，只是配置参数不同

```ts
import createClient from "@ruff-web/http/src/clients";
import resources from "../../configs/mock-user-svc";

const client = createClient("ruffmock://", {
  resources,
});

// 模拟单个设备
const res = await client.device.get(444);
// print res.$raw;

// 模拟设备列表
const res = await client.device.list(10);
// print res.$raw;
```

## 演示
