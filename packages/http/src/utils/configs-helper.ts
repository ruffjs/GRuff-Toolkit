import { joinPath } from "@ruff-web/http/src/utils";

const formatMockRPCConfigs = (
  commands: Record<string, RuffMockRPCConfiguration>,
  prefix: string
) => {
  const randomRules = {} as Record<string, RuffMockRandom>;
  Object.keys(commands).forEach((commandName) => {
    const { path, random } = commands[commandName];
    const apiId = prefix + (path ? joinPath(path) : commandName) + ":0";
    randomRules[apiId] = random;
  });
  return randomRules;
};

export const formatMockConfig = (
  name: string,
  config: RuffMockConfiguration & { prefix: string }
) => {
  const { prefix, path, children, commands, attrs, acts, ...rest } = config;
  const randomRules = {} as Record<string, RuffMockRandom>;
  const dirname = joinPath([
    prefix || "api/v1",
    path ? joinPath(path) : name,
  ]);
  Object.keys(rest).forEach((m) => {
    const port = parseInt(m);
    if (isNaN(port) === false) {
      randomRules[dirname + ":" + port] = rest[port];
    }
  });

  if (children) {
    Object.keys(children).forEach((childName) => {
      const r = formatMockConfig(childName, {
        ...children[childName],
        prefix: dirname,
      });
      Object.assign(randomRules, r);
    });
  }

  if (attrs) {
    Object.keys(attrs).forEach((attrName) => {
      const r = formatMockConfig(attrName, {
        ...attrs[attrName],
        prefix: dirname + "/**",
      });
      Object.assign(randomRules, r);
    });
  }
  if (commands) {
    Object.assign(randomRules, formatMockRPCConfigs(commands, dirname + "/"));
  }
  if (acts) {
    Object.assign(randomRules, formatMockRPCConfigs(acts, dirname + "/**/"));
  }
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
      })
    );
  });
  return randomRules;
}
