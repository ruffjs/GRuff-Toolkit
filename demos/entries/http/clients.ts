import Client from "@ruff-web/http/src/Client";

import userApis, {
  login,
} from "@ruff-web/entities/src/presets/user/user.resource";
import userMock from "@ruff-web/entities/src/presets/user/user.resource.withmock";
import { formatMockConfig } from "@ruff-web/http/src/utils/configs-helper";

const userMockConfig = formatMockConfig("user", userMock);

const clients = {
  main: Client.createClient("/test-dev-svc"),
  user: Client.createClient("/test-user-svc", {
    resources: {
      user: userApis,
    },
    calls: {
      login: login,
    },
  }),
  tank: Client.createClient("/test-tank-svc"),
  bsmm: Client.createClient("/test-bsm-svc"),
  bsmu: Client.createClient("/test-bsm-user-svc/"),
  mock: Client.createClient("/test-user-svc", {
    resources: {
      user: userMock,
    },
    // withMock: true,
    rules: {
      ...userMockConfig,
    },
  }),
};

clients.mock.onResponseFulfilled = (res: any) => {
  console.log(res.status, res);
  return res.data;
};

export default clients;
