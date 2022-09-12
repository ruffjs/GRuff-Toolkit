import { joinPath } from "@ruff-web/http/src/utils/formatters";

export const pickMockRulesOfResource = (
    name: string,
    config: RuffCreateMockResourceConfig & { prefix: string }
) => {
    const { prefix, path, ...rest } = config;
    const mockRules = {} as Record<string, RuffMockRandomConfig>;
    const dirname = joinPath([prefix || "api/v1", path ? joinPath(path) : name]);
    Object.keys(rest).forEach((m) => {
        if (m === "/") {
            const children = rest["/"] || {};
            Object.keys(children).forEach((childname) => {
                const opts = children[childname];
                if ("methods" in opts) {
                    const r = pickMockRulesOfResource(childname, {
                        ...opts,
                        prefix: dirname,
                    });
                    Object.assign(mockRules, r);
                } else {
                    const { path } = opts;
                    if (opts[0]) {
                        const apiId =
                            dirname + "/" + (path ? joinPath(path) : childname) + ":0";
                        mockRules[apiId] = opts[0];
                    }
                }
            });
        } else if (m === "/**/") {
            const props = rest["/**/"] || {};
            Object.keys(props).forEach((propname) => {
                const opts = props[propname];
                if ("methods" in opts) {
                    const r = pickMockRulesOfResource(propname, {
                        ...opts,
                        prefix: dirname + "/**",
                    });
                    Object.assign(mockRules, r);
                } else {
                    const { path } = opts;
                    if (opts[0]) {
                        const apiId =
                            dirname + "/**/" + (path ? joinPath(path) : propname) + ":0";
                        mockRules[apiId] = opts[0];
                    }
                }
            });
        } else {
            const port = parseInt(m);
            if (isNaN(port) === false) {
                mockRules[dirname + ":" + port] = rest[port];
            }
        }
    });

    return mockRules;
};

export function pickMockRules(
    configs: Partial<RuffClientMockResourcesConfigs>,
    prefix: string
) {
    const mockRules = {} as Record<string, RuffMockRandomConfig>;
    Object.keys(configs).forEach((name) => {
        Object.assign(
            mockRules,
            pickMockRulesOfResource(name, {
                prefix,
                ...configs[name],
            } as RuffCreateMockResourceConfig & { prefix: string })
        );
    });
    return mockRules;
}

