import DataView from "@ruff-web/http/src/helpers/DataView";
import { injectToken } from "@ruff-web/http/src/utils/formatters";
import clients from "./clients";

clients.user.beforeRequest = injectToken(() =>
  "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozMzYsInR5cGUiOiJUZW5hbnQiLCJsZXZlbCI6IkFkbWluIiwidGVuYW50SWQiOjY2LCJlbWFpbCI6InRhbmtfdGVzdCIsInBob25lIjoiMTExMTExMTExIiwibmFtZSI6IuWCqOe9kOa1i-ivlSIsInJvbGVzIjpbXSwicHJvamVjdHMiOlstMV19LCJleHBpcmVBdCI6MTY2MTc4MTM1NywiaXNzdWVBdCI6MTY2MTY5NDk1NywiaWF0IjoxNjYxNjk0OTU3LCJpc3MiOiJydWZmIn0.-Erlqm_g2HsBPPa96LlvqEUlqRiJeYiZ31qYsPYYHc-HxwYfvGvS29bPYusdm2kaeoDjEwfD5Penuk1CjdQIMg");


const dataview1 = new DataView({
  apiId: DataView.formatApiId("api/v1/user", "profile", DataView.GET),
  client: clients.user,
  rules: {},
});

const dataview2 = new DataView({
  apiId: DataView.formatApiId("api/v1/user", DataView.LIST),
  client: clients.mock,
  rules: {
    bla: "foo",
    other: ({ foo }: any) => "It's " + foo,
  },
});

console.log(dataview1, dataview2);

console.log(dataview1.getApiId());

console.log(dataview2.getApiId());

clients.user.login({
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

  try {
    const list = await dataview2.fetch({});
    const profile = await dataview1.fetch(1);
    console.log(list, profile);

    // const { bla, other } = list[0];
    // console.log(bla, other);
  } catch (error) {
    console.log(error);
  }

}).catch(err => {
  console.log('userHttp.login err:', err)
});
