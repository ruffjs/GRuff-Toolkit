import Client from "@ruff-web/http/src/Client/Client";

import userApis from "@ruff-web/entities/src/presets/user/user.http";
import userMock from "@ruff-web/entities/src/presets/user/user.mock";
import { formatMockConfig } from "@ruff-web/http/src/utils/formatMockConfigs";


const userMockConfig = formatMockConfig('user', userMock)

export default {
  main: Client.createClient("/test-dev-svc"),
  user: Client.createClient("/test-user-svc", {
    entitis: {
      user: userApis,
    },
  }),
  tank: Client.createClient("/test-tank-svc"),
  bsmm: Client.createClient("/test-bsm-svc"),
  bsmu: Client.createClient("/test-bsm-user-svc/"),
  mock: Client.createClient("/test-user-svc", {
    entitis: {
      user: userMock,
    },
    // mock: {
    //   user: userMock
    // }
    randoms: {
      ...userMockConfig,
    },
  }),
};