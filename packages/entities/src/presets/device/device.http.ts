import { ResourceMethod as M } from "@ruff-web/http/src/resource/ResourceMethod";

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
      methods: [M.READ, M.PUT],
    },
    password: {
      methods: [M.MOD],
    },
    bindPhone: {
      methods: [M.WRITE, M.DROP],
    },
  },
  acts: {},
};
