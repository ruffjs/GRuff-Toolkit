import { ResourceMethod as M } from "@ruff-web/http/src/utils/resource-methods";

export default {
  prefix: 'api/v1',
  methods: [M.POST, M.LIST, M.PUT, M.DELETE],
  children: {
    loginLog: {
      methods: [M.LIST],
      children: {
        loginLog2: {
          methods: [M.LIST],
        },
      },
    },
    token: {
      methods: [M.POST],
    },
  },
  commands: {
    login: {
      method: M.POST,
    },
    loginBySmsCode: {
      method: M.POST,
    },
  },
  attrs: {
    profile: {
      methods: [M.GET, M.PUT],
    },
    password: {
      methods: [M.PUT],
    },
    bindPhone: {
      methods: [M.POST, M.DELETE],
    },
  },
  acts: {
    doSth: {
      method: M.POST,
      path: "fetch404",
    },
  },
};
