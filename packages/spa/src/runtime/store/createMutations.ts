export type MapVaule<T> = {
  time: number
  data: T
}
export type StoredRecord<I extends string | number | symbol, T> = Record<
  I,
  MapVaule<T>
>
type Map = StoredRecord<string | number | symbol, any>
export default function createMutations<T>(
  namespace: string = "app",
  storage: RIAppStorage
) {
  type StateKey = keyof T
  return {
    assignState(state: T, payload: T) {
      Object.assign(state, payload)
    },
    storeState(state: T, payload: any) {
      // console.log(state, payload);
      Object.assign(state, payload)
      Object.keys(payload).forEach(key =>
        storage.write(`${namespace}.${key}`, payload[key])
      )
    },
    updateMap(state: T, payload: any) {
      const { map, key, data } = payload
      ;(state[<StateKey>map] as unknown as Map)[key] = {
        time: Date.now(),
        data,
      }
    },
  }
}
