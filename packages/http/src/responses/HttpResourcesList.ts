export default class HttpResourcesList<T extends RuffHttpResource = any>
  extends Array
  implements RuffHttpResourcesList<T>
{
  private _raw: any;

  constructor(raw: any) {
    super();
    this._raw = raw;
  }

  get rawData(): RuffDataRecords<T> {
    return this._raw.content;
  }
  get total(): number {
    return this._raw.totalCount;
  }
  get count(): number {
    return this._raw.content.length;
  }
}
