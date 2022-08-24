type RuffHttpResource = RuffDataModel;

type RuffDataRecords<T extends RuffDataModel = RuffDataModel> =
  RuffBatchModels<T>;

interface RuffHttpResponse<T extends RuffHttpResource> {
  data: T;
  status: number;
  message: string;
}

interface RuffHttpResourcesList<T extends RuffHttpResource> {
  // content
  rawData: RuffDataRecords<T>;
  // totalCount
  total: number;
  count: number;
}

type RuffPeriodDataItem = RIRecord & {
  time: TimeStamp;
  value: any;
};
interface RuffPeriodData<T extends RuffPeriodDataItem>
  extends RuffHttpResourcesList<T> {
  // nextValid
  hasNext: boolean;
  nextTime: TimeStamp;
}
