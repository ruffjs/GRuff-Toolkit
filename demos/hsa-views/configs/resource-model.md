# 终极集成配置：ResourceModel

```typescript
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

export default {
    device: convertProviderConfigByResourceModel("api/v1", Device)
} 
```
