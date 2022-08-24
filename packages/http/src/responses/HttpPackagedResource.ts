export default class HttpPackagedResource {
  constructor(raw: AnyRecord, handler: ProxyHandler<AnyRecord>) {
    (this as any).__proto__ = new Proxy(raw, handler);
  }
}
