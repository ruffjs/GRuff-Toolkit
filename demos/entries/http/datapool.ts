import DataPool from "@ruff-web/http/src/helpers/DataPool";
import { injectToken } from "@ruff-web/http/src/utils/formatters";
import clients from "./clients";

const pool1 = new DataPool({
  apiId: DataPool.formatApiId("api/v1/user", "profile", DataPool.ITEM),
  client: clients.user,
  rules: {},
});


const pool2 = new DataPool({
  apiId: DataPool.formatApiId("api/v1/user", DataPool.LIST),
  client: clients.mock,
  rules: {
    bla: "foo",
    other: ({ foo }: any) => "It's " + foo,
  },
});

console.log(pool1, pool2);

console.log(pool1.getApiId());

console.log(pool2.getApiId());

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
    const list = await pool2.fetch({});
    const profile = await pool1.fetch(1);
    console.log(list, profile);

    // const { bla, other } = list[0];
    // console.log(bla, other);
  } catch (error) {
    console.log(error);
  }

}).catch(err => {
  console.log('userHttp.login err:', err)
});
