# 基本配置

```typescript
import { ResourceMethod as M } from "@ruff-web/http/src/utils/resource-methods";

export default {
    user: {
        prefix: "api/v1",
        methods: [M.POST, M.LIST, M.PUT, M.DELETE],
        pickable: false,
        pk: 'id',
        listKeys: ["content", "totalCount"],
        "/": {
            loginLog: {
                methods: [M.LIST],
                "/": {
                    loginLog2: {
                        methods: [M.LIST],
                    },
                },
            },
            token: {
                methods: [M.POST],
            },
            login: {
                method: M.POST,
            },
            loginBySmsCode: {
                method: M.POST,
            },
        },
        "/**/": {
            profile: {
                methods: [M.GET, M.PUT],
            },
            password: {
                methods: [M.PUT],
            },
            bindPhone: {
                methods: [M.POST, M.DELETE],
            },
            doSth: {
                method: M.POST,
                path: "fetch404",
            },
        },
    },
};
```
