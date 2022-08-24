import Entity from "@ruff-web/http/src/Entity/Entity";
import userResource from "@ruff-web/entities/src/presets/user/user.src";
import clients from "./http/clients";

console.log(clients);

clients.user.onTokenRequired = () =>
  "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJ0eXBlIjoiUGxhdGZvcm0iLCJsZXZlbCI6IkFkbWluIiwidGVuYW50SWQiOjEsImVtYWlsIjoiZGVtbyIsInBob25lIjoiMTgyMTczOTQwNjUiLCJuYW1lIjoi5Y2X5r2uIiwicm9sZXMiOltdLCJwcm9qZWN0cyI6Wy0xXX0sImV4cGlyZUF0IjoxNjU1NzgzMDc5LCJpc3N1ZUF0IjoxNjU1Njk2Njc5LCJpYXQiOjE2NTU2OTY2NzksImlzcyI6InJ1ZmYifQ._g_W-IX97Rqwplaz5zOB1ctodtO2Nh7hDUbRVKS25n9edBS7K5HkhZeFdz5S2UDr5i7uvVdgVZDCQ-Mm0SRtNQ";
const userEntity = Entity.createEntity("user", {
  resource: userResource,
  client: clients.user,
});

console.log(userEntity);

// userEntity.token;

// userEntity.login;

for (const user of await userEntity.list()) {
  console.log(user.name, user, user.rawData);
}

const withQueryUserEntity = userEntity.query({ role: "Admin" });
console.log(withQueryUserEntity);
console.log(await withQueryUserEntity.query({ role: "PM" }).list());
