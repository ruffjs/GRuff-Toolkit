export async function delay(ms: number, ...rest: any[]): Promise<any[]> {
  return new Promise((resolve) => setTimeout(() => resolve(rest), ms));
}

export function debounce<T extends AnyFn = AnyFn>(fn: T, duration: number) {
  let requestSymbol: Symbol | undefined = undefined;
  return (async (...args: any[]) => {
    requestSymbol = Symbol();
    const [symbol] = await delay(duration, requestSymbol);
    if (symbol === requestSymbol) {
      return await fn(...args);
    }
    // ignored
    return Promise.resolve(void 0);
  }) as unknown as T;
}

export async function tryLikeGo<T, E = Error>(
  promise: Promise<T>
): Promise<[T, E]> {
  try {
    const ret = await promise;
    return [ret, null as E];
  } catch (e) {
    return [null as T, e as E];
  }
}
