# 使用编辑器友好的 API

> 此功能仅为了增强开发体验，不提供业务支持

## 使用 @ruff-web/entities 提供的标准 clients

> Gruff Entities 在提供实体配置的同时，会同时提供相应接口的定义描述，封装为开箱即用的 HttpClient 和 MockClient，直接使用即可获得类型提示和检查
>
> Entities 库有待整理

## 使用 $getFriendlyProvider 方法获得一个带有细节描述的 ResourceProvider 对象

```typescript
import createClient from "@ruff-web/http/src/clients";
import resources from "../../configs/test-user-svc";

/* 创建客户端 */
const client = createClient("https://test-user-svc.ruffcorp.com", {
  resources,
});

/* 定义一个 User 模型 */
class User {
  id!: number;
  name!: string;
}

/* 为userProvider重新赋予类型 */
const userProvider = client.user.$getFriendlyProvider<
  "loginLog" | "token",
  "login" | "loginBySmsCode",
  "profile" | "password" | "bindPhone",
  "doSth1" | "doSth2",
  User
>();
```

```ts
/* 在业务代码中使用 userProvider */

userProvider.loginLog;
// (property) loginLog: IExtendedResourceProvider<any, any, any>

userProvider.login;
// (property) login: RuffResourceCaller<any, any>

userProvider(1).profile;
// (property) profile: RuffFeatureResourceGetter<any> & FeatureResourceProvider<any>

userProvider(1).doSth1;
// (property) doSth1: RuffResourceCaller<any, any>

const user = await userProvider.get(1);
// const user: IHttpPackagedResource<User, "profile" | "password" | "bindPhone", "doSth">

user.id;
// (property) User.id: number

user.name;
// (property) User.name: string

user.password;
// (property) password: RuffFeatureResourceGetter<any> & FeatureResourceProvider<any>

user.doSth2;
// (property) doSth2: RuffResourceCaller<any, any>
```

## 在终端接口上重新指定资源模型

```ts
import createClient from "@ruff-web/http/src/clients";
import resources from "../../configs/test-dev-svc";

const client = createClient("https://test-dev-svc.ruffcorp.com", {
  resources,
});

/* 定义一个 Device 模型 */
class Device {
  id!: number;
  name!: string;
}
const device = await client.device(2153).get<Device>();
// const device: IHttpPackagedResource<Device, any, any>

device.name;
// (property) Device.name: string
```
