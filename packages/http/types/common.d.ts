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

interface RuffHttpResponse<T extends RuffHttpResource> {
    data: T;
    status: number;
    message: string;
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
