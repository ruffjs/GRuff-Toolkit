interface RuffHttpQueryModel extends AnyRecord {}

interface RuffPageableResourcesQueryModel extends RIQueryModel {
  sort?: string;
  order?: "DESC" | "ASC";
  pageIndex: number;
  pageSize: number;
}

interface RuffPeriodDataQueryModel extends RIQueryModel {
  asc?: bool;
  pageSize?: number;
  startAt: TimeStamp;
  endAt: TimeStamp;
}
