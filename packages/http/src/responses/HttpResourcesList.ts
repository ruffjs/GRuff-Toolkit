export default class HttpResourcesList<T extends RuffHttpResource = any>
  extends Array<T>
  implements RuffHttpResourcesList<T>
{
  private _raw: any;

  constructor(raw: any) {
    super();
    this._raw = raw || { content: [] };
  }

  get rawData(): RuffDataRecords<T> {
    return this._raw.content || [];
  }
  get total(): number {
    return this._raw.totalCount || 0;
  }
  get count(): number {
    return this._raw.content?.length || 0;
  }
}
