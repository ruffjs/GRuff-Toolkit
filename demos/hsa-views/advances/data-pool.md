# 使用数据池对象

> `数据池对象`是对 ResourceProvider 的进一步封装，去掉灵活性而成为专门用途对象，主要表现在
>
> 1. 数据池仅针对单一标准资源，不支持 CallableResource，不支持从 IdentifiedResource 访问 FeatureResource
> 2. 数据池无状态，理论上同样的输入总是得到同样的结果（实际上只保证最终请求的URL一致，而 Response 是否一致取决于 服务器）
> 同时`数据池对象`提供基于`data-mapping`实现的数据映射，自动对读写数据进行转换，以支持 UI数据 与 Server数据 的非一致性

> 数据池分为指定资源读取池和批量资源读取池
> 指定资源读取池每次可获取一个特定资源，关联一个ResourceProvider的get接口，多用于关联于详情组件、编辑组件等
> 批量资源读取池每次可获取多个符合条件的资源，关联一个ResourceProvider的list接口，多用于关联与列表组件
> 对于同一个资源，两类数据池在增删改等写操作上表现一致（目前尚未实现写操作）

## 创建单设备数据池

> 对应 HTTP 操作: POST /api/v1/user

```typescript
import createClient from "@ruff-web/http/src/clients";
import resources from "../../configs/test-user-svc";

/* 创建客户端 */
const client = createClient("https://test-user-svc.ruffcorp.com", {
  resources,
});

/* 创建客户端 */
const userPool = new DataPool({
  apiId: DataPool.formatApiId("api/v1/user", "profile", DataPool.S),
  client,
  rules: {},
});

/* 读取用户(uid: 1)信息 */
const profile = await userPool.read(1);
// profile
```

## 修改用户信息

> 对应 HTTP 操作: PUT /api/v1/user/{id}

```typescript
client
    .user(uid)
    .set({
      name: "Modified User",
      remark: "has been modified",
    })
    .then(async (res) => {
      // print res.$raw;
    })
    .catch((err) => {
      // Handling
    });
```

## 删除用户

> 对应 HTTP 操作: DELETE /api/v1/user/{id}

```typescript
client
    .user(uid)
    .drop()
    .then(async (res) => {
      // print res.$raw;
    })
    .catch((err) => {
      // Handling
    });
```

## 演示
