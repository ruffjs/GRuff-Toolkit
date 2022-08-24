import { IStorage } from "../types/export"

const getJSONItem = (namespace: string, key: string) => {
  try {
    return JSON.parse(localStorage.getItem(`${namespace}.${key}`) || "null")
  } catch (error) {
    return null
  }
}

const setJSONItem = (namespace: string, key: string, data: any) => {
  localStorage.setItem(`${namespace}.${key}`, JSON.stringify(data))
}

type KeysOption = Readonly<{
  strings?: readonly string[]
  numbers?: readonly string[]
  booleans?: readonly string[]
  others?: readonly string[]
}>

export default function (namespace: string, keys: KeysOption = {} as const) {
  if (typeof namespace !== "string" || namespace === "")
    throw "Must indicate a namespace of storage"
  const { strings, numbers, booleans, others } = keys

  const stringKeys = strings || ([] as readonly string[])
  const numberKeys = numbers || ([] as readonly string[])
  const booleanKeys = booleans || ([] as readonly string[])
  const objectKeys = others || ([] as readonly string[])

  type StringKey = typeof stringKeys[number]
  type NumberKey = typeof numberKeys[number]
  type BooleanKey = typeof booleanKeys[number]
  type ObjectKey = typeof objectKeys[number]

  type ItemKey = StringKey | NumberKey | BooleanKey | ObjectKey

  const getStringItem = (key: StringKey) => {
    return localStorage.getItem(`${namespace}.${key}`) || ""
  }
  const setStringItem = (key: StringKey, data: string) => {
    localStorage.setItem(`${namespace}.${key}`, data || "")
  }

  const getNumberItem = (key: NumberKey) => {
    return Number(localStorage.getItem(`${namespace}.${key}`)) || 0
  }
  const setNumberItem = (key: NumberKey, data: number) => {
    localStorage.setItem(`${namespace}.${key}`, data ? data.toString() : "0")
  }

  const getBooleanItem = (key: BooleanKey) => {
    return localStorage.getItem(`${namespace}.${key}`) === "true"
  }
  const setBooleanItem = (key: BooleanKey, data: boolean) => {
    localStorage.setItem(`${namespace}.${key}`, data ? "true" : "false")
  }

  const getObjectItem = (key: ObjectKey) => {
    return getJSONItem(namespace, key) || null
  }

  const setObjectItem = (key: ObjectKey, data: any) => {
    setJSONItem(namespace, key, data)
  }

  function readItem(key: StringKey): string
  function readItem(key: NumberKey): number
  function readItem(key: BooleanKey): boolean
  function readItem<T = any>(key: ObjectKey): T | null
  // function readItem(key: string): any;
  function readItem(key: ItemKey): any {
    if (stringKeys.includes(key as StringKey))
      return getStringItem(key as StringKey)
    if (numberKeys.includes(key as NumberKey))
      return getNumberItem(key as NumberKey)
    if (booleanKeys.includes(key as BooleanKey))
      return getBooleanItem(key as BooleanKey)
    if (objectKeys.includes(key as ObjectKey))
      return getObjectItem(key as ObjectKey)
    return getJSONItem(namespace, key)
  }
  function writeItem<T = StringKey>(key: T, data: string): void
  function writeItem<T = NumberKey>(key: T, data: number): void
  function writeItem<T = BooleanKey>(key: T, data: boolean): void
  function writeItem<T = ObjectKey>(key: T, data: any): void
  // function writeItem(key: string, data: any): void;
  function writeItem<T>(key: ItemKey, data: any): void {
    if (stringKeys.includes(key as StringKey))
      return setStringItem(key as StringKey, data)
    if (numberKeys.includes(key as NumberKey))
      return setNumberItem(key as NumberKey, data)
    if (booleanKeys.includes(key as BooleanKey))
      return setBooleanItem(key as BooleanKey, data)
    if (objectKeys.includes(key as ObjectKey))
      return setObjectItem(key as ObjectKey, data)
    return setJSONItem(namespace, key, data)
  }

  function deleteItem(key: StringKey): void
  function deleteItem(key: NumberKey): void
  function deleteItem(key: BooleanKey): void
  function deleteItem(key: ObjectKey): void
  // function deleteItem(key: string): void;
  function deleteItem(key: ItemKey) {
    localStorage.removeItem(`${namespace}.${key}`)
  }

  const clearStorage = () => {
    ;[...stringKeys, ...numberKeys, ...booleanKeys, ...objectKeys].forEach(
      deleteItem
    )
  }

  return {
    write: writeItem,
    read: readItem,
    delete: deleteItem,
    clear: clearStorage,
    createBucket(subnamespace: string) {
      return new Proxy(
        {},
        {
          get(t, propname: string, r) {
            return readItem(`${subnamespace}.${propname}`)
          },
          set(t, propname: string, v, r) {
            writeItem(`${subnamespace}.${propname}`, v)
            return true
          },
          deleteProperty(t, propname: string) {
            deleteItem(`${subnamespace}.${propname}`)
            return true
          },
        }
      )
    },
  } as IStorage
}
