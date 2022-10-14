# 使用RDO描述对象来配置随机规则

## 创建用户

> 对应 HTTP 操作: POST /api/v1/user

```typescript
import createClient from "@ruff-web/http/src/clients";
import resources from "../../configs/test-user-svc";

/* 创建客户端 */
const client = createClient("https://test-user-svc.ruffcorp.com", {
  resources,
});
// 定义用户ID
let uid: number

// 查询用户信息
client.user
    .post({
      name: "Test User",
      phone: "18620881237",
      password: "string123",
      remark: "string",
      roleIds: [1],
      allProject: true,
    })
    .then(async (res) => {
      // uid = res.id
      // print res.$raw;
    })
    .catch((err) => {
      // Handling
    });
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
