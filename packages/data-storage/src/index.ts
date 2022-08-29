type KeysOptions<
    SK extends string = any,
    NK extends string = any,
    BK extends string = any,
    OK extends string = any> = {
        strings?: SK[];
        numbers?: NK[];
        booleans?: BK[];
        others?: OK[];
    }

const localStorage = window.localStorage

const tString = ['TRUE', 'True', 'true', 'T', 'YES', 'Yes', 'yes', 'Y'] as const
const fString = ['FALSE', 'False', 'false', 'F', 'NO', 'No', 'no', 'n '] as const

const TRUE = [true, 1, ...tString]
const FALSE = [false, 0, ...fString]

type BooleanValue = typeof TRUE[number] | typeof FALSE[number]

export default class Storage<
    SK extends string = any,
    NK extends string = any,
    BK extends string = any,
    OK extends string = any> {

    static TRUE = TRUE
    static FALSE = FALSE

    static getJSONItem<T = any>(namespace: string, key: string): T | null {
        try {
            return JSON.parse(localStorage.getItem(`${namespace}.${key}`) || "null");
        } catch (error) {
            return null;
        }
    };

    static setJSONItem<T = any>(namespace: string, key: string, data: T) {
        localStorage.setItem(`${namespace}.${key}`, JSON.stringify(data));
    };

    static allocateStorage<
        SK extends string = any,
        NK extends string = any,
        BK extends string = any,
        OK extends string = any>(namespace: string, keys: KeysOptions<SK, NK, BK, OK> = {}) {

        let { strings, numbers, booleans, others } = keys;

        strings = strings || ([] as SK[])
        numbers = numbers || ([] as NK[])
        booleans = booleans || ([] as BK[])
        others = others || ([] as OK[])
        const storage = new Storage<SK, NK, BK, OK>(namespace, strings, numbers, booleans, others);

        [].concat(strings, numbers, booleans, others).forEach(
            (key) => storage[key] = storage.readItem(key)
        );

        return storage as Storage<SK, NK, BK, OK> &
            Record<SK, string> &
            Record<NK, number> &
            Record<BK, boolean> &
            Record<OK, unknown>
    }

    private _namespace: string
    private _stringKeys: SK[]
    private _numberKeys: NK[]
    private _booleanKeys: BK[]
    private _otherKeys: OK[]

    get namespace() { return this._namespace }

    private constructor(namespace: string, strings: SK[], numbers: NK[], booleans: BK[], others: OK[]) {
        this._namespace = namespace
        this._stringKeys = strings
        this._numberKeys = numbers
        this._booleanKeys = booleans
        this._otherKeys = others
    }

    private _getStringItem = (key: SK) => {
        return localStorage.getItem(`${this._namespace}.${key}`) || "";
    }

    private _setStringItem = (key: SK, data: string) => {
        localStorage.setItem(`${this._namespace}.${key}`, data || "");
    }


    private _getNumberItem = (key: NK) => {
        return Number(localStorage.getItem(`${this._namespace}.${key}`)) || 0;
    }

    private _setNumberItem = (key: NK, data: number) => {
        localStorage.setItem(`${this._namespace}.${key}`, data ? data.toString() : "0");
    }


    private _getBooleanItem = (key: BK) => {
        return localStorage.getItem(`${this._namespace}.${key}`) === "true";
    }

    private _setBooleanItem = (key: BK, data: boolean) => {

        localStorage.setItem(`${this._namespace}.${key}`, TRUE.includes(data) ? "true" : "false");
    }

    private _getObjectItem = (key: OK) => {
        return Storage.getJSONItem(this._namespace, key) || null;
    }

    private _setObjectItem = (key: OK, data: any) => {
        Storage.setJSONItem(this._namespace, key, data);
    }

    deleteItem(key: SK | NK | BK | OK | string) {
        localStorage.removeItem(`${this._namespace}.${key}`);
    }

    clearAll = () => {
        [...this._stringKeys, ...this._numberKeys, ...this._booleanKeys, ...this._otherKeys].forEach(
            this.deleteItem.bind(this)
        );
    };

    readItem(key: SK): string;
    readItem(key: NK): number;
    readItem(key: BK): boolean;
    readItem<T = any>(key: OK): T;
    readItem(key: string): unknown;
    readItem(key: SK | NK | BK | OK | string) {
        if (this._stringKeys.includes(key as SK))
            return this._getStringItem(key as SK);
        if (this._numberKeys.includes(key as NK))
            return this._getNumberItem(key as NK);
        if (this._booleanKeys.includes(key as BK))
            return this._getBooleanItem(key as BK);
        if (this._otherKeys.includes(key as OK))
            return this._getObjectItem(key as OK);
        return Storage.getJSONItem(this._namespace, key);
    }

    writeItem(key: SK, data: string): void;
    writeItem(key: NK, data: number): void;
    writeItem(key: BK, data: BooleanValue): void;
    writeItem<T = any>(key: OK, data: T): void;
    writeItem<T = any>(key: string, data: T): void;
    writeItem(key: SK | NK | BK | OK | string, data: any): void {
        if (this._stringKeys.includes(key as SK))
            return this._setStringItem(key as SK, data);
        if (this._numberKeys.includes(key as NK))
            return this._setNumberItem(key as NK, data);
        if (this._booleanKeys.includes(key as BK))
            return this._setBooleanItem(key as BK, data);
        if (this._otherKeys.includes(key as OK))
            return this._setObjectItem(key as OK, data);
        return Storage.setJSONItem(this._namespace, key, data);
    }

    read = this.readItem
    write = this.writeItem
    delete = this.deleteItem
    clear = this.clearAll

    createBucket<Types extends AnyRecord = AnyRecord>(subnamespace: string) {
        const storage = this
        return new Proxy(
            {},
            {
                get(t, propname: string, r) {
                    return storage.readItem(`${subnamespace}.${propname}`);
                },
                set(t, propname: string, v, r) {
                    storage.writeItem(`${subnamespace}.${propname}`, v);
                    return true;
                },
                deleteProperty(t, propname: string) {
                    storage.deleteItem(`${subnamespace}.${propname}`);
                    return true;
                },
            }
        ) as Types;
    }
}