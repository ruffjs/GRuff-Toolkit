import { natural } from "@ruff-web/data-random/src/traits/basic";
import { MAX } from "@ruff-web/data-random/src/utils/type-convert";

type RDOType = 'map' | 'list' | "str" | "raw" | "call"

const generate: unique symbol = Symbol('RDO::generate')
const prototype: unique symbol = Symbol('RDO::prototype')

class RDO<T> {
    type: RDOType;

    protected constructor(type: RDOType) {
        this.type = type
    }

    [generate](random: any = {}, context: object = {}): T {
        throw new Error("must implements gen method in subclass");
    }
}

class MapRDO<T extends object = AnyRecord> extends RDO<T> {
    fields: Record<keyof T, RDO<any>>;
    [prototype]: typeof Object = Object
    constructor(exp: Record<keyof T, any>) {
        super('map')
        const keys = Object.keys(exp) as Array<keyof T>
        const fields = {} as Record<keyof T, RDO<any>>
        keys.forEach(key => {
            fields[key] = createRDO(exp[key])
        })
        this.fields = fields
        if ((exp as any)[prototype]) {
            this[prototype] = (exp as any)[prototype]
        }
    }

    [generate](random: any = {}, context: object = {}): T {
        const keys = Object.keys(this.fields) as Array<keyof T>
        let data = {} as T
        if (typeof this[prototype] === 'object') {
            data = Object.create(this[prototype]) as T
        }
        keys.forEach(key => {
            data[key] = this.fields[key][generate](random, context)
        })
        return data
    }
}

class ListRDO<T extends any = any> extends RDO<T[]> {
    model: RDO<T>;
    count: [number, number];
    constructor(model: any, min: number, max: number) {
        super('list')
        this.model = createRDO(model) as RDO<T>
        let r0 = parseInt(min as unknown as string) || 1, r1
        r0 = r0 >= 0 ? r0 : 0
        if (typeof max === "number" && max > r0) {
            r1 = Math.floor(max)
        } else {
            r1 = r0
        }
        this.count = [r0, r1 > 0 ? r1 : 1]
    }

    [generate](random: any = {}, context: object = {}): T[] {
        const [min, max] = this.count
        const length = natural.call(random as any, min, max)
        const data: T[] = []
        for (let index = 0; index < length; index++) {
            data.push(this.model[generate](random, context))
        }
        return data
    }
}

class StrRDO<T extends string = string> extends RDO<T> {
    template: string;
    inputs: RDO<any>[];
    constructor(template: string, inputs: any[]) {
        super('str')
        this.template = template
        this.inputs = inputs.map(input => createRDO(input))
    }

    [generate](random: any = {}, context: object = {}): T {
        let string = this.template
        this.inputs.forEach((rdo, i) => {
            // console.log(rdo, i)
            string = string.replaceAll(`{${i}}`, String(rdo[generate](random, context)))
        })
        return string as T
    }
}

class RawRDO<T extends any = any> extends RDO<T> {
    value: T;
    constructor(value: any) {
        super('raw')
        this.value = value
    }

    [generate](random: any = {}, context: object = {}): T {
        return this.value
    }
}

class RandomRDO<T extends any = any> extends RDO<T> {
    method: string | AnyFn;
    args: any[];

    constructor(func: AnyFn, ...args: any[])
    constructor(methodname: string, ...args: any[])
    constructor(method: string | AnyFn, ...args: any[]) {
        super('call')
        this.method = method
        this.args = args
    }

    [generate](random: any = {}, context: object = {}): any {
        if (typeof this.method === 'function') {
            return this.method.apply(random || {}, this.args)
        }
        if (typeof this.method === 'string') {
            if (random && typeof random[this.method] === 'function') {
                return random[this.method].apply(random || {}, this.args)
            }
            const arr = [this.method]
            this.args.forEach(arg => {
                try {
                    arr.push(String(arg))
                } catch (error) {
                    arr.push('')
                }
            })
            return arr.join(" ")
        }
        return null
    }
}

function unique(arr: any[]) {
    return Array.from(new Set(arr))
}

function createRDOByObject(exp: {
    type?: RDOType
    model?: RDO<any> | any;
    count?: [number, number] | number;
    fields: Record<string, RDO<any> | any>;
    [prototype]: typeof Object;
    method?: string | AnyFn;
    args?: any[];
    value?: any;
    template?: string;
    inputs?: any[];
}) {
    if (exp instanceof RDO) {
        return exp
    }
    switch (exp.type) {
        case undefined:
            delete exp.type
            return new MapRDO(exp as AnyRecord)

        case 'list':
            if (exp.model) {
                let count = [1, 1]
                if (typeof exp.count === 'number') {
                    count = [exp.count, exp.count]
                } else if (typeof exp.count === 'object' && exp.count instanceof Array && typeof exp.count[0] === 'number') {
                    if (typeof exp.count[1] === 'number' && exp.count[1] > exp.count[0]) {
                        count = [exp.count[0], exp.count[1]]
                    } else {
                        count = [exp.count[0], exp.count[0]]
                    }
                }
                return new ListRDO(exp.model, count[0], count[1])
            }
            break;

        case 'map':
            if (exp.fields) {
                if (exp[prototype]) {
                    return new MapRDO({ ...exp.fields, [prototype]: exp[prototype] })
                }
                return new MapRDO(exp.fields)
            }
            break;

        case 'call':
            if (exp.method) {
                const args = typeof exp.args === 'object' && exp.args instanceof Array ? exp.args : []
                if (typeof exp.method === 'string') {
                    return new RandomRDO(exp.method, ...args)
                }
                if (typeof exp.method === 'function') {
                    return new RandomRDO(exp.method, ...args)
                }
            }
            break;

        case 'raw':
            return new RawRDO(exp.value || null)

        case 'str':
            if (typeof exp.template === 'string') {
                if (exp.template !== '') {
                    const inputs = typeof exp.inputs === 'object' && exp.inputs instanceof Array ? exp.inputs : []
                    return new StrRDO(exp.template, inputs)
                }
                return new RawRDO<string>('')
            }
            break;
    }
    return new MapRDO(exp as AnyRecord)
}

export default function createRDO(exp: any): RDO<any> {
    switch (typeof exp) {
        case 'undefined':
            return new RawRDO<null>(null)

        case 'symbol':
            return new RandomRDO<string>('uuid')

        case 'boolean':
            return new RandomRDO<bool>('boolean')

        case 'bigint':
            if (exp > 0) {
                const len = exp.toString().length
                return new RandomRDO<string>('bigint', len, len)
            } else if (exp < 0) {
                exp = exp * -1n
                const len = exp.toString().length
                return new RandomRDO<string>('bigint', len, len)
            }
            exp = 0

        case 'number':
            if (exp === 0) {
                return new RandomRDO<number>('natural')
            }
            let natural = true
            if (exp < 0) {
                natural = false
                exp = Math.abs(exp)
            }
            const len = Math.floor(exp).toString().length
            const arr = [...new Array(len)].map(i => "0")
            if (arr.length > 1) {
                arr[0] = "1"
            }
            const min = parseInt(arr.join(''))
            arr[0] = "1"
            arr.push("0")
            const max = (parseInt(arr.join('')) - 1) || MAX
            if (natural) {
                return new RandomRDO<number>('integer', min, max)
            }
            return new RandomRDO<number>('integer', max * -1, min * -1)

        case 'function':
            if (exp[generate]) {
                if (typeof exp[generate] === 'function') {
                    return new RandomRDO(exp[generate], exp.prototype)
                }
                return createRDO(exp[generate])
            }
            return new RandomRDO(exp)

        case 'object':
            if (exp === null) {
                return new RawRDO<null>(null)
            }
            if (exp instanceof Array) {
                if (exp.length === 0) {
                    return new RandomRDO<null[]>('empty')
                }
                if (exp.length > 3) {
                    return new RandomRDO<null[]>('pick', unique(exp), 1, 1)
                }
                if (exp.length === 1) {
                    return new ListRDO(exp[0], 1, 10)
                }
                if (typeof exp[1] !== 'number') {
                    return new RandomRDO<any[]>('pick', unique(exp), 1, 1)
                }
                if (typeof exp[2] !== 'undefined' && typeof exp[2] !== 'number') {
                    return new RandomRDO<any[]>('pick', unique(exp), 1, 1)
                }
                return new ListRDO(exp[0], exp[1], exp[2] || exp[1] || 1)
            }
            return createRDOByObject(exp)

        case 'string':
            exp = exp.trim()
            if (exp !== '') {
                const code = exp.charCodeAt(0)
                if ((code > 64 && code < 91) || (code > 96 && code < 123)) {
                    const [methodname, ...args] = exp.split(' ')
                    if (methodname !== '') {
                        return new RandomRDO(methodname, ...args)
                    }
                } else {
                    return new RawRDO<string>(exp)
                }
            }
            return new RawRDO<string>('')
    }
}

createRDO.generate = generate
createRDO.prototype = prototype