import { joinPath } from "@ruff-web/http/src/utils";

const formatMockRPCConfigs = (commands: Record<string, RuffMockRPCConfiguration>, prefix: string) => {
    const randoms = {} as Record<string, RuffMockRandom>
    Object.keys(commands).forEach(commandName => {
        const { dirname, random } = commands[commandName]
        const path = prefix + (dirname ? joinPath(dirname) : commandName) + ':0'
        randoms[path] = random
    })
    return randoms
}

export const formatMockConfig = (name: string, config: RuffMockConfiguration & { prefix: string }) => {
    const { prefix, dirname, children, commands, attrs, acts, ...rest } = config
    const randoms = {} as Record<string, RuffMockRandom>
    const path = joinPath([prefix || 'api/v1', (dirname ? joinPath(dirname) : name)])
    Object.keys(rest).forEach(m => {
        const port = parseInt(m)
        if (isNaN(port) === false) {
            randoms[path + ':' + port] = rest[port]
        }
    })

    if (children) {
        Object.keys(children).forEach(childName => {
            const r = formatMockConfig(childName, {
                ...children[childName],
                prefix: path
            })
            Object.assign(randoms, r)
        })
    }

    if (attrs) {
        Object.keys(attrs).forEach(attrName => {
            const r = formatMockConfig(attrName, {
                ...attrs[attrName],

                prefix: path + '/@'
            })
            Object.assign(randoms, r)
        })
    }
    if (commands) {
        Object.assign(randoms, formatMockRPCConfigs(commands, path + '/'))
    }
    if (acts) {
        Object.assign(randoms, formatMockRPCConfigs(acts, path + '/@/'))
    }
    return randoms
}

export default function formatMockConfigs(configs: RuffClientMocksConfigs, prefix: string) {
    const randoms = {} as Record<string, RuffMockRandom>
    Object.keys(configs).forEach(name => {
        Object.assign(randoms, formatMockConfig(name, {
            prefix, ...configs[name]
        }))
    })
    return randoms
}