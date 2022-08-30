export const delay = (ms: number, ...rest: any[]): Promise<any[]> =>
    new Promise(resolve => setTimeout(() => resolve(rest), ms))

export const debounce = <T extends AnyFn = AnyFn>(fn: T, duration: number) => {
    let requestSymbol: Symbol | undefined = undefined
    return (async (...args: any[]) => {
        requestSymbol = Symbol()
        const [symbol] = await delay(duration, requestSymbol)
        if (symbol === requestSymbol) {
            return await fn(...args)
        }
        // ignored
        return Promise.resolve(void 0)
    }) as unknown as T
}