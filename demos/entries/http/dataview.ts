import DataView from "@ruff-web/http/src/DataView";
import clients from "./clients";

const dataview1 = new DataView({
  apiId: "api/v1/user",
  method: DataView.LIST,
  client: clients.user,
  rules: {},
});

const dataview2 = new DataView({
  apiId: "api/v1/user/@/profile",
  method: DataView.READ,
  client: clients.user,
  rules: {},
});

const dataview3 = new DataView({
  apiId: "api/v1/user",
  method: DataView.LIST,
  client: clients.mock,
  rules: {
    bla: "foo",
    other: ({ foo }: any) => "It's " + foo,
  },
});

console.log(dataview1, dataview2, dataview3);

console.log(dataview1.getApiId());

console.log(dataview2.getApiId());

console.log(dataview3.getApiId());

const list = dataview3.getData({});
console.log(list);
const { bla, other } = list[0];
console.log(bla, other);
