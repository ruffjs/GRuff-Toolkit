type Method =
    | 'get' | 'GET'
    | 'delete' | 'DELETE'
    | 'head' | 'HEAD'
    | 'options' | 'OPTIONS'
    | 'post' | 'POST'
    | 'put' | 'PUT'
    | 'patch' | 'PATCH'
    | 'purge' | 'PURGE'
    | 'link' | 'LINK'
    | 'unlink' | 'UNLINK';

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

interface RuffClientResponseContent<T extends RuffHttpResource = any> {
    data?: T;
    code: number;
    message: string;
}

type RuffHttpPageableResources<T extends RuffHttpResource> = Record<string, RuffHttpResourcesArray<T> | number>

interface RuffHttpResourcesList<T extends RuffHttpResource> {
    $raw: RuffHttpResourcesArray<T>;
    total: number;
    count: number;
}

type RuffCallArguments<P extends AnyRecord = any> = {
    payload?: P;
    query?: RuffHttpQueryCondition;
};

type RuffFeatureResourceGetter<T extends RuffDataModel = any> = (
    condition?: RuffHttpQueryCondition
) => Promise<RuffClientResponseContent<T>>;


type RuffResourceCaller<T extends RuffHttpResource = any, P extends AnyRecord = any> = (
    args: RuffCallArguments<P>
) => Promise<RuffClientResponseContent<T>>;


type RuffMockRandomFunction<T extends RuffHttpResource = any, D extends RuffHttpResource = any> = ((params: RuffClientResourceCallParams<D>,
    config?: AxiosRequestConfig<D>) => Promise<RuffClientResponseContent<T>>)