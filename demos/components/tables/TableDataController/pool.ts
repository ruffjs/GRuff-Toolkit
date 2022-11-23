import clients from "@/entries/http/clients";
import DataPool from "@ruff-web/http/src/helpers/DataPool";
import { User } from "./User";

export const userdata = new DataPool<User>({
  apiId: DataPool.formatApiId("api/v1/user", DataPool.LIST),
  client: clients.user,
  mapping: {},
});
