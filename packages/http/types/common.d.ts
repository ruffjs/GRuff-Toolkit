type RuffResourcePath = string[] | string;

type identity = number | string;
type Id = identity;
type UnionIdentity = identity[]; // Union keys as identity
type IdOrKeys = identity | UnionIdentity;

interface RuffHttpRecord extends AnyRecord { }
type RuffDataModel = RuffHttpRecord | ScalarValue | AnyArray;

interface RuffHttpQueryModel extends AnyRecord { }
type RuffHttpQueryCondition = RuffHttpQueryModel | string;

interface RuffPageableResourcesQueryModel extends RuffHttpQueryModel {
    sort?: string;
    order?: "DESC" | "ASC";
    pageIndex: number;
    pageSize: number;
}

type RuffHttpResource = RuffDataModel;

type RuffHttpResourcesArray<T extends RuffHttpResource = RuffHttpResource> = T[];

interface RuffResponseContent<T extends RuffHttpResource = any> {
    data?: T;
    code: number;
    message: string;
}

interface AxiosResponse<T = any, D = any> {
    data: T;
    status: number;
    statusText: string;
    headers: AxiosResponseHeaders;
    config: AxiosRequestConfig<D>;
    request?: any;
}

interface RuffHttpPageableResources<T extends RuffHttpResource> {
    [stirng]: RuffHttpResourcesArray<T> | number;
}

interface RuffHttpResourcesList<T extends RuffHttpResource> {
    rawData: RuffHttpResourcesArray<T>;
    total: number;
    count: number;
}

type RuffCallArguments<P extends AnyRecord = any> = {
    payload?: P;
    query?: RuffHttpQueryCondition;
};
