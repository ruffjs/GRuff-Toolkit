import Resource from "@ruff-web/http/src/resource/MainResource";
import userResource from "@ruff-web/entities/src/presets/user/user.resource";
import clients from "./clients";
import MainResource from "@ruff-web/http/src/resource/MainResource";

console.log(clients, clients.user.network);

clients.user.onTokenRequired = () =>
  "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJ0eXBlIjoiUGxhdGZvcm0iLCJsZXZlbCI6IkFkbWluIiwidGVuYW50SWQiOjEsImVtYWlsIjoiZGVtbyIsInBob25lIjoiMTgyMTczOTQwNjUiLCJuYW1lIjoi5Y2X5r2uIiwicm9sZXMiOltdLCJwcm9qZWN0cyI6Wy0xXX0sImV4cGlyZUF0IjoxNjU1NzgzMDc5LCJpc3N1ZUF0IjoxNjU1Njk2Njc5LCJpYXQiOjE2NTU2OTY2NzksImlzcyI6InJ1ZmYifQ._g_W-IX97Rqwplaz5zOB1ctodtO2Nh7hDUbRVKS25n9edBS7K5HkhZeFdz5S2UDr5i7uvVdgVZDCQ-Mm0SRtNQ";

class AType { }

console.log([clients.user.user]);
const userHttp = clients.user.user.$typify<
  "loginLog" | "token",
  "login" | "loginBySmsCode",
  "profile" | "password" | "bindPhone",
  "doSth",
  AType
>();

// const userHttp2 = MainResource.createResource("userHttp2", {
//   resource: userResource,
//   prefix: "string",
//   client: clients.user,
// });

// await userHttp2.login({ payload: {} });

for (const user of await userHttp.list(3)) {
  console.log(user.name, user, user.rawData);
  console.log(await user.profile());
}

const withQueryUserHttp = userHttp.query({ role: "Admin" });
console.log(withQueryUserHttp);
console.log(
  await withQueryUserHttp
    .query({ role: "PM" })
    .query("type=Gateway&type=Device", "nodeType=composite")
    .query({
      online: true,
    })
    .list()
);

console.log(await userHttp.loginLog.list());
const $typifydUserLoginLogResource = userHttp.loginLog.$typify();

console.log(await $typifydUserLoginLogResource.list());

const ref = userHttp(10);
ref.profile({});
ref.profile.get();

userHttp.login({
  payload: {
    loginName: "string1",
    password: "string1",
    clientType: "Web",
  },
});

ref.doSth({ foo: "bar" });

console.log(
  await clients.user.login({
    payload: {
      loginName: "string2",
      password: "string2",
      clientType: "Web",
    },
  })
);
