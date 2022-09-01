import { joinPath } from "@ruff-web/http/src/utils";

export const formatMockConfig = (
  name: string,
  config: RuffMockConfiguration & { prefix: string }
) => {
  const { prefix, path, ...rest } = config;
  const randomRules = {} as Record<string, RuffMockRandom>;
  const dirname = joinPath([prefix || "api/v1", path ? joinPath(path) : name]);
  Object.keys(rest).forEach((m) => {
    if (m === "/") {
      const children = rest["/"] || {};
      Object.keys(children).forEach((childname) => {
        const opts = children[childname];
        if ("methods" in opts) {
          const r = formatMockConfig(childname, {
            ...opts,
            prefix: dirname,
          });
          Object.assign(randomRules, r);
        } else {
          const { path } = opts;
          const apiId =
            dirname + "/" + (path ? joinPath(path) : childname) + ":0";
          randomRules[apiId] = opts[0];
        }
      });
    } else if (m === "/**/") {
      const props = rest["/**/"] || {};
      Object.keys(props).forEach((propname) => {
        const opts = props[propname];
        if ("methods" in opts) {
          const r = formatMockConfig(propname, {
            ...opts,
            prefix: dirname + "/**",
          });
          Object.assign(randomRules, r);
        } else {
          const { path } = opts;
          const apiId =
            dirname + "/**/" + (path ? joinPath(path) : propname) + ":0";
          randomRules[apiId] = opts[0];
        }
      });
    } else {
      const port = parseInt(m);
      if (isNaN(port) === false) {
        randomRules[dirname + ":" + port] = rest[port];
      }
    }
  });

  return randomRules;
};

export default function formatMockConfigs(
  configs: Partial<RuffClientMocksConfigs>,
  prefix: string
) {
  const randomRules = {} as Record<string, RuffMockRandom>;
  Object.keys(configs).forEach((name) => {
    Object.assign(
      randomRules,
      formatMockConfig(name, {
        prefix,
        ...configs[name],
      } as RuffMockConfiguration & { prefix: string })
    );
  });
  return randomRules;
}
