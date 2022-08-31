import { joinPath } from "@ruff-web/http/src/utils";

const formatMockRPCConfigs = (
  commands: Record<string, RuffMockRPCConfiguration>,
  prefix: string
) => {
  const randomRules = {} as Record<string, RuffMockRandom>;
  Object.keys(commands).forEach((commandName) => {
    const { dirname, random } = commands[commandName];
    const path = prefix + (dirname ? joinPath(dirname) : commandName) + ":0";
    randomRules[path] = random;
  });
  return randomRules;
};

export const formatMockConfig = (
  name: string,
  config: RuffMockConfiguration & { prefix: string }
) => {
  const { prefix, dirname, children, commands, attrs, acts, ...rest } = config;
  const randomRules = {} as Record<string, RuffMockRandom>;
  const path = joinPath([
    prefix || "api/v1",
    dirname ? joinPath(dirname) : name,
  ]);
  Object.keys(rest).forEach((m) => {
    const port = parseInt(m);
    if (isNaN(port) === false) {
      randomRules[path + ":" + port] = rest[port];
    }
  });

  if (children) {
    Object.keys(children).forEach((childName) => {
      const r = formatMockConfig(childName, {
        ...children[childName],
        prefix: path,
      });
      Object.assign(randomRules, r);
    });
  }

  if (attrs) {
    Object.keys(attrs).forEach((attrName) => {
      const r = formatMockConfig(attrName, {
        ...attrs[attrName],
        prefix: path + "/@",
      });
      Object.assign(randomRules, r);
    });
  }
  if (commands) {
    Object.assign(randomRules, formatMockRPCConfigs(commands, path + "/"));
  }
  if (acts) {
    Object.assign(randomRules, formatMockRPCConfigs(acts, path + "/@/"));
  }
  return randomRules;
};

export default function formatMockConfigs(
  configs: RuffClientMocksConfigs,
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
