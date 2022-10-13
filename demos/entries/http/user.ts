import { injectToken } from "@ruff-web/http/src/utils/formatters";
import clients from "./clients";

// console.log(clients, clients.user.network);

clients.user.beforeRequest = injectToken(() =>
  "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJ0eXBlIjoiUGxhdGZvcm0iLCJsZXZlbCI6IkFkbWluIiwidGVuYW50SWQiOjEsImVtYWlsIjoiZGVtbyIsInBob25lIjoiMTgyMTczOTQwNjUiLCJuYW1lIjoi5Y2X5r2uIiwicm9sZXMiOltdLCJwcm9qZWN0cyI6Wy0xXX0sImV4cGlyZUF0IjoxNjU1NzgzMDc5LCJpc3N1ZUF0IjoxNjU1Njk2Njc5LCJpYXQiOjE2NTU2OTY2NzksImlzcyI6InJ1ZmYifQ._g_W-IX97Rqwplaz5zOB1ctodtO2Nh7hDUbRVKS25n9edBS7K5HkhZeFdz5S2UDr5i7uvVdgVZDCQ-Mm0SRtNQ");

type User = {
  id?: number
  name: string
  email?: string
  phone: string
  password: string
  remark: string
  roleIds: number[]
  projectIds?: number[]
  allProject: boolean
}

type Profile = {
  id?: number
  name: string
  email?: string
  phone: string
  password: string
  remark: string
  roleIds: number[]
  projectIds?: number[]
  allProject: boolean
}

const userHttp = clients.user.user.$beFriendly<
  "loginLog" | "token",
  "login" | "loginBySmsCode",
  "profile" | "password" | "bindPhone",
  "doSth",
  User
>();

userHttp.login({
  payload: {
    loginName: "demo",
    password: "123456",
    clientType: "Web",
  },
}).then(async (resp) => {
  // console.log('userHttp.login resp:', resp)
  const { token } = resp.data
  // console.log('userHttp.login token:', token)
  clients.user.beforeRequest = injectToken((req) => token)

  for (const user of await userHttp.list(3)) {
    console.log(user.name, user, user.$raw);

    user.profile.query({ a: 'foo' })
    console.log(user.profile.getFullPath(), await user.profile());
    const friendlyProfile = await user.profile.get<Profile>()
    console.log('friendlyProfile', friendlyProfile);
  }

  console.log(await userHttp.loginLog.query({ a: 'foo' }).list());

  console.log(
    await userHttp.query({ role: "Admin" })
      .query({ role: "PM" })
      .query("type=Gateway&type=Device", "nodeType=composite")
      .query({
        online: true,
      })
      .list()
  );

  // console.log(await userHttp.pick([1, 10]))

  const $beFriendlydUserLoginLogResource = userHttp.loginLog.$beFriendly();

  console.log(await $beFriendlydUserLoginLogResource.list());

  userHttp.post({
    "name": "Test User",
    "phone": "18620881237",
    "password": "string123",
    "remark": "string",
    "roleIds": [1],
    "allProject": true
  }).then(
    async (res) => {
      console.log("userHttp.post resp", res)
      console.log(await res.profile())
      console.log(await userHttp(res.id as number).drop() + "");
    }
  ).catch(err => {
    console.log("userHttp.post err", err)
  })

  // clients
  userHttp(1).doSth().then(res => {
    console.log('userHttp(1).doSth res:', res)
  }).catch(err => {
    console.log('userHttp(1).doSth err:', err, err.toJSON())
  });
}).catch(err => {
  console.log('userHttp.login err:', err)
});

// await clients.user.login({
//   payload: {
//     loginName: "demo",
//     password: "123456",
//     clientType: "Web",
//   },
// }).then(
//   res => {
//     console.log("clients.user.login resp", res.data)
//   }
// ).catch(err => {
//   console.log("clients.user.login err", err)
// })
