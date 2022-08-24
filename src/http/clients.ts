import Client from "@ruff-web/http/src/Client/Client";

export default {
  main: new Client("/test-dev-svc"),
  user: new Client("/test-user-svc"),
  tank: new Client("/test-tank-svc"),
  bsmm: new Client("/test-bsm-svc"),
  bsmu: new Client("/test-bsm-user-svc/"),
  mock: new Client("mock"),
};
