import { ResourceMethod as M } from "@ruff-web/http/src/utils/resource-methods";

export default {
  methods: [M.POST, M.LIST, M.PUT, M.DELETE],
  children: {
    loginLog: {
      methods: [M.LIST],
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
  acts: {},
};
