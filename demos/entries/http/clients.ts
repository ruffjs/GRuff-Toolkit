import createClient from "@ruff-web/http/src/clients";

import userApis, {
  login,
} from "@ruff-web/entities/src/presets/user/user.resource";
import userMock from "@ruff-web/entities/src/presets/user/user.resource.withmock";
import { pickMockRulesOfResource } from "@ruff-web/http/src/helpers/vendors/MockRule";

const userMockConfig = pickMockRulesOfResource("user", userMock);

const clients = {
  main: createClient("/test-dev-svc"),
  user: createClient("/test-user-svc", {
    resources: {
      user: userApis,
    },
    calls: {
      login: login,
    },
  }),
  tank: createClient("/test-tank-svc"),
  bsmm: createClient("/test-bsm-svc"),
  bsmu: createClient("/test-bsm-user-svc/"),
  mock: createClient("/test-user-svc", {
    resources: {
      user: userMock,
    },
    // withMock: true,
    rules: {
      ...userMockConfig,
    },
  }),
};

export default clients;
