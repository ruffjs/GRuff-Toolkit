import Resource from "@ruff-web/http/src/resource/MainResource";
import userResource from "@ruff-web/entities/src/presets/user/user.http";
import clients from "./clients";

console.log(clients, clients.user.network);

clients.user.onTokenRequired = () =>
  "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJ0eXBlIjoiUGxhdGZvcm0iLCJsZXZlbCI6IkFkbWluIiwidGVuYW50SWQiOjEsImVtYWlsIjoiZGVtbyIsInBob25lIjoiMTgyMTczOTQwNjUiLCJuYW1lIjoi5Y2X5r2uIiwicm9sZXMiOltdLCJwcm9qZWN0cyI6Wy0xXX0sImV4cGlyZUF0IjoxNjU1NzgzMDc5LCJpc3N1ZUF0IjoxNjU1Njk2Njc5LCJpYXQiOjE2NTU2OTY2NzksImlzcyI6InJ1ZmYifQ._g_W-IX97Rqwplaz5zOB1ctodtO2Nh7hDUbRVKS25n9edBS7K5HkhZeFdz5S2UDr5i7uvVdgVZDCQ-Mm0SRtNQ";

const userHttp = Resource.idealize(clients.user.user, userResource);

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
const idealizedUserLoginLogResource = Resource.idealize(
  userHttp.loginLog,
  userResource.children.loginLog
);

console.log(await idealizedUserLoginLogResource.list());

const ref = userHttp(10);
ref.profile({});
ref.profile.get();

userHttp.login({
  loginName: "string",
  password: "string",
  clientType: "Web",
});

ref.doSth({ foo: "bar" });
