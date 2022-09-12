import { ProxiedHttpPackagedResource } from "./HttpPackagedResource";

export default class HttpResourcesList<T extends RuffHttpResource = any, A extends string = any>
  extends Array<ProxiedHttpPackagedResource<T, A>>
  implements RuffHttpResourcesList<T>
{
  private _raw: RuffHttpPageableResources<T>;

  constructor(raw: RuffHttpPageableResources<T>) {
    super();
    this._raw = raw || { content: [] };
  }

  get rawData(): RuffHttpResourcesArray<T> {
    return (this._raw as any)?.content || [];
  }
  get total(): number {
    return (this._raw as any).totalCount || 0;
  }
  get count(): number {
    return (this._raw as any).content?.length || 0;
  }
}
