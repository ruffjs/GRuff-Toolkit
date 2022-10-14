import createRDO, { RDO } from "@ruff-web/data-rdo";
import { createRandom } from "@ruff-web/data-random";
import { ResourceMethod } from "@ruff-web/http/src/utils/resource-methods";

export const random = createRandom()

const restResponse = <T extends RuffHttpResource = any>(data: T, code = 200, message = "") => {
    return JSON.parse(JSON.stringify({
        data,
        code,
        message
    })) as RuffClientResponseContent<T>
}

type ISOTime = string

class ResourceModelBase {
    static readonly methods: unique symbol = Symbol('ResourceProvider::methods')
    static readonly primaryKey: unique symbol = Symbol('ResourceProvider::primaryKey')
    static readonly prickKey: unique symbol = Symbol('ResourceProvider::primaryKey')
    static readonly listKeys: unique symbol = Symbol('ResourceProvider::listKeys')
}

export abstract class AbstractResourceModel extends ResourceModelBase {
    public static [ResourceModelBase.methods]?: string[]
    public static [ResourceModelBase.primaryKey]?: string
    public static [ResourceModelBase.prickKey]?: string
    public static [ResourceModelBase.listKeys]?: string[]
}

export class Gateway extends AbstractResourceModel {
    tenantId!: number;
    id!: number;
    name!: string;
    type = "Gateway";

    static [RDO.symbols.generate]() { return new Gateway }

    constructor() {
        super();
        this.id = random.natural()
        this.tenantId = random.natural()
        this.name = random.string()
    }
}

export class Device extends AbstractResourceModel {
    static [AbstractResourceModel.methods] = ["POST", "LIST", "GET", "PUT", "DELETE"]
    static [AbstractResourceModel.primaryKey] = 'id'
    static [AbstractResourceModel.prickKey] = 'ids'
    static [AbstractResourceModel.listKeys] = ["content", "totalCount", 'pageSize', 'pageIndex']

    creatorId!: number;
    tenantId!: number;
    id!: number;
    name!: string;
    type!: string;
    model!: string;
    network: string[] = [];
    sn!: string;
    online!: boolean;
    ota!: boolean;
    alert!: boolean;
    lastReport!: ISOTime
    gateway!: Gateway


    static [RDO.symbols.generate] = {
        [RDO.symbols.prototype]: Device.prototype,
        creatorId: 0,
        tenantId: 0,
        id: 0,
        name: 'cword 5 8',
        type: ["Device", "Gateway"],
        model: 'string',
        network: ['string'],
        sn: 'uuid',
        online: true,
        ota: false,
        alert: false,
        lastReport: 'isotime ',
        gateway: Gateway
    }
}

function convertProviderConfigByResourceModel(prefix: string, model: typeof AbstractResourceModel) {
    const methods = model[AbstractResourceModel.methods] || []
    const config = {
        prefix,
        methods: methods.map((m: any) => ResourceMethod[m]).filter(m => m !== undefined),
        pickable: model[AbstractResourceModel.prickKey] || "ids",
        pk: model[AbstractResourceModel.primaryKey] || 'id',
        listKeys: model[AbstractResourceModel.listKeys] || ["content", "totalCount", 'pageSize', 'pageIndex'],
    } as unknown as (RuffCreateResourceMockerConfig & { prefix: string, pk?: string | number, listKeys?: string[] })
    if (methods.includes("LIST") || methods.includes("GET")) {
        const rdo = createRDO(Device);
        if (methods.includes("LIST")) {
            config[ResourceMethod.LIST] = async function ({ query }) {
                // console.log(arguments)
                const size = query && config.listKeys && config.listKeys[2] ? (query as any)[config.listKeys[2]] : query ? (query as any)['pageSize'] : 10
                const lrdo = createRDO([rdo, size || 10]);
                const list = lrdo[RDO.symbols.generate](random)
                return restResponse({ content: list, totalCount: list.length + random.natural() })
            }
        }
        if (methods.includes("GET")) {
            config[ResourceMethod.GET] = async function ({ idOrKeys }) {
                // console.log(arguments)
                const item = rdo[RDO.symbols.generate](random)
                if (config.pk && idOrKeys !== undefined) {
                    item[config.pk] = idOrKeys
                }
                return restResponse(item)
            }
        }
    }

    return config
}

export default {
    device: convertProviderConfigByResourceModel("api/v1", Device)
} 