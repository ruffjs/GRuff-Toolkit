import { ResourceMethod as M } from "@ruff-web/http/src/apis/ResourceMethod";

export default {
  methods: [M.POST, M.LIST, M.PUT, M.DELETE],
  [M.POST]: () => {
    console.log("11111");
  },
  [M.LIST]: () => {
    console.log("22222");
  },
  [M.PUT]: () => {
    console.log("33333");
  },
  [M.DELETE]: true,

  children: {
    loginLog: {
      methods: [M.LIST],
      [M.LIST]: () => {
        console.log("44444");
      },
      children: {
        loginLog2: {
          methods: [M.LIST],
          [M.LIST]: () => {
            console.log("55555");
          },
        },
      },
    },
    token: {
      methods: [M.POST],
      [M.LIST]: () => {
        console.log("66666");
      },
    },
  },
  commands: {
    login: {
      method: M.POST,
      random: () => {
        console.log("77777");
      },
    },
    loginBySmsCode: {
      method: M.POST,
      random: () => {
        console.log("88888");
      },
    },
  },
  attrs: {
    profile: {
      methods: [M.READ, M.PUT],
      [M.READ]: () => {
        console.log("eeeee");
      },
      [M.PUT]: () => {
        console.log("eeeee");
      },
    },
    password: {
      methods: [M.MOD],
      [M.MOD]: () => {
        console.log("eeeee");
      },
    },
    bindPhone: {
      methods: [M.WRITE, M.DROP],
      [M.WRITE]: () => {
        console.log("eeeee");
      },
      [M.DROP]: () => {
        console.log("eeeee");
      },
    },
  },
  acts: {
    doSth: {
      method: M.POST,
      dirname: "fetch404",
      random: () => {
        console.log("eeeee");
      },
    },
  },
};
