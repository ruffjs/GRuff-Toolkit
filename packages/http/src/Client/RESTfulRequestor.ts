import { AxiosRequestConfig } from "axios";
import { joinPath, withQuery } from "../utils";
import Requestor from "./Requestor";

export default class RESTfulRequestor
  extends Requestor
  implements RuffResourceMethods, RuffResourceRequestor
{
  withQuery = withQuery;

  $addResource<T extends RuffDataModel = any, D = any>(
    pathname: string,
    model: D,
    query?: RuffHttpQueryCondition,
    config?: AxiosRequestConfig<D>
  ) {
    return this.post<T, D>(pathname + withQuery(query), model, config);
  }

  $createEntity<T extends RuffDataModel = any, D extends RuffDataModel = any>(
    entityPath: RuffResourcePath,
    model: D,
    query?: RuffHttpQueryCondition,
    config?: AxiosRequestConfig<D>
  ) {
    return this.$addResource<T, D>(joinPath(entityPath), model, query, config);
  }

  $createEntityWithAttachment<
    T extends RuffDataModel = any,
    D extends RuffDataModel = any
  >(
    entityPath: RuffResourcePath,
    model: D,
    query?: RuffHttpQueryCondition,
    config?: AxiosRequestConfig<FormData>
  ) {
    const body = new FormData();
    for (let [key, value] of Object.entries(model || {})) {
      body.append(key, value);
    }
    return this.$addResource<T, FormData>(
      joinPath(entityPath),
      body,
      query,
      config
    );
  }

  $addReferences<
    T extends RuffDataModel = any,
    D extends RuffReferencesDescription = any
  >(
    entityPath: RuffResourcePath,
    description: D,
    query?: RuffHttpQueryCondition,
    config?: AxiosRequestConfig<D>
  ) {
    return this.$addResource<T, D>(
      joinPath(entityPath),
      description,
      query,
      config
    );
  }

  $addBelonging<T extends RuffDataModel = any, D extends RuffDataModel = any>(
    entityPath: RuffResourcePath,
    belongingPath: RuffResourcePath,
    id: Id,
    model: D,
    query?: RuffHttpQueryCondition,
    config?: AxiosRequestConfig<D>
  ) {
    return this.$addResource<T, D>(
      joinPath([joinPath(entityPath), id, joinPath(belongingPath)]),
      model,
      query,
      config
    );
  }

  $getResource<T extends RuffDataModel = any, D = any>(
    pathname: string,
    query?: RuffHttpQueryCondition,
    config?: AxiosRequestConfig<D>
  ) {
    return this.get<T, D>(pathname + withQuery(query), config);
  }

  $getData = this.$getResource;

  $getIdentifiableData<T extends RuffDataModel = any, D = any>(
    pathname: string,
    id: Id,
    query?: RuffHttpQueryCondition,
    config?: AxiosRequestConfig<D>
  ) {
    return this.$getResource<T, D>(joinPath([pathname, id]), query, config);
  }

  $getEntityById<T extends RuffDataModel = any, D = any>(
    entityPath: RuffResourcePath,
    id: Id,
    config?: AxiosRequestConfig<D>
  ) {
    return this.$getIdentifiableData<T, D>(
      joinPath(entityPath),
      id,
      undefined,
      config
    );
  }

  $getEntityByKeys<T extends RuffDataModel = any, D = any>(
    entityPath: RuffResourcePath,
    keys: Id[],
    query?: RuffHttpQueryCondition,
    config?: AxiosRequestConfig<D>
  ) {
    return this.$getIdentifiableData<T, D>(
      joinPath(entityPath),
      joinPath(keys),
      query,
      config
    );
  }

  $getIdentifiableBelonging<
    T extends RuffDataModel = any,
    D extends RuffDataModel = any
  >(
    entityPath: RuffResourcePath,
    belongingPath: RuffResourcePath,
    aidOrAkeys: IdOrKeys,
    bidOrAkeys: IdOrKeys,
    config?: AxiosRequestConfig<D>
  ) {
    return this.$getIdentifiableData<T, D>(
      joinPath([
        joinPath(entityPath),
        joinPath(aidOrAkeys),
        joinPath(belongingPath),
      ]),
      joinPath(bidOrAkeys),
      config
    );
  }

  $getEnumerableData<T extends RuffDataModel = any, D = any>(
    pathname: string,
    query?: RuffHttpQueryCondition,
    config?: AxiosRequestConfig<D>
  ) {
    return this.get<RuffDataRecords<T>, D>(pathname + withQuery(query), config);
  }

  $getEnumerableEntitys<T extends RuffDataModel = any, D = any>(
    entityPath: RuffResourcePath,
    query?: RuffPageableResourcesQueryModel,
    config?: AxiosRequestConfig<D>
  ) {
    return this.$getEnumerableData<T, D>(joinPath(entityPath), query, config);
  }

  $getEnumerableBelonging<
    T extends RuffDataModel = any,
    D extends RuffDataModel = any
  >(
    entityPath: RuffResourcePath,
    belongingPath: RuffResourcePath,
    aidOrAkeys: IdOrKeys,
    query?: RuffHttpQueryCondition,
    config?: AxiosRequestConfig<D>
  ) {
    return this.$getEnumerableData<T, D>(
      joinPath([
        joinPath(entityPath),
        joinPath(aidOrAkeys),
        joinPath(belongingPath),
      ]),
      query,
      config
    );
  }

  $getEnumerableBelongings = this.$getEnumerableBelonging.bind(this);

  $getEnumerableAndIdentifiableBelonging<
    T extends RuffDataModel = any,
    D extends RuffDataModel = any
  >(
    entityPath: RuffResourcePath,
    belongingPath: RuffResourcePath,
    aidOrAkeys: IdOrKeys,
    bidOrAkeys: IdOrKeys,
    query?: RuffHttpQueryCondition,
    config?: AxiosRequestConfig<D>
  ) {
    return this.$getEnumerableData<T, D>(
      joinPath([
        joinPath(entityPath),
        joinPath(aidOrAkeys),
        joinPath(belongingPath),
        joinPath(bidOrAkeys),
      ]),
      query,
      config
    );
  }

  $getPageableResources<T extends RuffDataModel = any, D = any>(
    pathname: string,
    query?: RuffPageableResourcesQueryModel,
    config?: AxiosRequestConfig<D>
  ) {
    return this.get<RuffHttpResourcesList<T>, D>(
      pathname + withQuery(query),
      config
    );
  }

  $getEntitys<T extends RuffDataModel = any, D = any>(
    entityPath: RuffResourcePath,
    query?: RuffPageableResourcesQueryModel,
    config?: AxiosRequestConfig<D>
  ) {
    return this.$getPageableResources<T, D>(
      joinPath(entityPath),
      query,
      config
    );
  }

  $getPageableBelonging<
    T extends RuffDataModel = any,
    D extends RuffDataModel = any
  >(
    entityPath: RuffResourcePath,
    belongingPath: RuffResourcePath,
    aidOrAkeys: IdOrKeys,
    query?: RuffPageableResourcesQueryModel,
    config?: AxiosRequestConfig<D>
  ) {
    return this.$getPageableResources<T, D>(
      joinPath([
        joinPath(entityPath),
        joinPath(aidOrAkeys),
        joinPath(belongingPath),
      ]),
      query,
      config
    );
  }

  $getPeriodData<T extends RuffPeriodDataItem = any, D = any>(
    pathname: string,
    query?: RuffPeriodDataQueryModel,
    config?: AxiosRequestConfig<D>
  ) {
    return this.get<RuffPeriodData<T>, D>(pathname + withQuery(query), config);
  }

  $getPeriodBelonging<
    T extends RuffDataModel = any,
    D extends RuffDataModel = any
  >(
    entityPath: RuffResourcePath,
    belongingPath: RuffResourcePath,
    aidOrAkeys: IdOrKeys,
    query?: RuffPeriodDataQueryModel,
    config?: AxiosRequestConfig<D>
  ) {
    return this.$getPeriodData<RuffHttpResourcesList<T>, D>(
      joinPath([
        joinPath(entityPath),
        joinPath(aidOrAkeys),
        joinPath(belongingPath),
      ]),
      query,
      config
    );
  }

  $setResource<T extends RuffDataModel = any, D extends RuffDataModel = any>(
    pathname: string,
    model: D,
    config?: AxiosRequestConfig<D>,
    patially = false
  ) {
    if (patially) {
      return this.patch<T, D>(pathname, model, config);
    }
    return this.put<T, D>(pathname, model, config);
  }

  $setEntityById<T extends RuffDataModel = any, D extends RuffDataModel = any>(
    entityPath: RuffResourcePath,
    idOrKeys: IdOrKeys,
    model: D,
    config?: AxiosRequestConfig<D>
  ) {
    return this.$setResource<T, D>(
      joinPath([joinPath(entityPath), joinPath(idOrKeys)]),
      model,
      config
    );
  }

  $setEntityPatiallyById<
    T extends RuffDataModel = any,
    D extends RuffDataModel = any
  >(
    entityPath: RuffResourcePath,
    idOrKeys: IdOrKeys,
    model: D,
    config?: AxiosRequestConfig<D>
  ) {
    return this.$setResource<T, D>(
      joinPath([joinPath(entityPath), joinPath(idOrKeys)]),
      model,
      config,
      true
    );
  }

  $setBelonging<T extends RuffDataModel = any, D extends RuffDataModel = any>(
    entityPath: RuffResourcePath,
    belongingPath: RuffResourcePath,
    aidOrAkeys: IdOrKeys,
    model: D,
    query?: RuffHttpQueryCondition,
    config?: AxiosRequestConfig<D>
  ) {
    return this.$setResource<T, D>(
      joinPath([
        joinPath(entityPath),
        joinPath(aidOrAkeys),
        joinPath(belongingPath),
      ]) + withQuery(query),
      model,
      config
    );
  }

  $delResource<T extends RuffDataModel = any, D = any>(
    pathname: string,
    query?: RuffHttpQueryCondition,
    config?: AxiosRequestConfig<D>
  ) {
    return this.delete<T, D>(pathname + withQuery(query), config);
  }

  $removeEntityById<T extends RuffDataModel = any, D = any>(
    entityPath: RuffResourcePath,
    id: Id,
    config?: AxiosRequestConfig<D>
  ) {
    return this.$delResource<T, D>(
      joinPath([joinPath(entityPath), joinPath(id)]),
      undefined,
      config
    );
  }

  $removeEntityByKeys<T extends RuffDataModel = any, D = any>(
    entityPath: RuffResourcePath,
    keys: Id[],
    query?: RuffHttpQueryCondition,
    config?: AxiosRequestConfig<D>
  ) {
    return this.$delResource<T, D>(
      joinPath([joinPath(entityPath), joinPath(keys)]),
      query,
      config
    );
  }

  $removeBelonging<
    T extends RuffDataModel = any,
    D extends RuffDataModel = any
  >(
    entityPath: RuffResourcePath,
    belongingPath: RuffResourcePath,
    aidOrAkeys: IdOrKeys,
    query?: RuffHttpQueryCondition,
    config?: AxiosRequestConfig<D>
  ) {
    return this.$delResource<T, D>(
      joinPath([
        joinPath(entityPath),
        joinPath(aidOrAkeys),
        joinPath(belongingPath),
      ]),
      query,
      config
    );
  }

  $clearReferences<
    T extends RuffDataModel = any,
    D extends RuffReferencesDescription = any
  >(
    entityPath: RuffResourcePath,
    description: D,
    query?: RuffHttpQueryCondition,
    config?: AxiosRequestConfig<D>
  ) {
    // delete with body
    return this.request<T, D>({
      ...config,
      method: "delete",
      url: joinPath(entityPath) + withQuery(query),
      data: description,
    });
  }

  $runCommand<T extends RuffDataModel = any, A extends AnyRecord = any>(
    entityPath: RuffResourcePath,
    command: string,
    args: A,
    query?: RuffHttpQueryCondition,
    config?: AxiosRequestConfig<A>
  ) {
    return this.request<T, A>({
      method: "post",
      ...config,
      url: joinPath([joinPath(entityPath), command]) + withQuery(query),
      data: args,
    });
  }

  $takeAction<T extends RuffDataModel = any, A extends AnyRecord = any>(
    entityPath: RuffResourcePath,
    command: string,
    idOrKeys: IdOrKeys,
    args: A,
    query?: RuffHttpQueryCondition,
    config?: AxiosRequestConfig<A>
  ) {
    return this.request<T, A>({
      method: "post",
      ...config,
      url:
        joinPath([joinPath(entityPath), joinPath(idOrKeys), command]) +
        withQuery(query),
      data: args,
    });
  }
}
