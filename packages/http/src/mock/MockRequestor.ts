import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { joinPath, withQuery } from "../utils";
import Random from "./random";
import MockResponse from "./MockResponse";
import Mock from "./Mock";

const tmpls = {
  告警类型: "@alertType",
  中文名: "@cname",
  中文短文本: "@cword(2, 8)",
  中文长文本: "@cword(8, 20)",
  Base64图片: "@dataImage(64x64)",
  日期时间: "@datetime",
  设备名称: "@deviceName",
  电子邮件: "@email",
  FSU名称: "@fsuName",
  自增ID: "@increment(1)",
  手机号: "@integer(13000000000,19099999999)",
  自然数: "@natural(2, 10)",
  基站名称: "@stationName",
  序列号: "@string('number',10)",
  用户等级: "@userLevel",
};

export default class MockRequestor implements RuffResourceRequestor {
  private _endpoint: string = "mock://";
  private _axiosInstance: AxiosInstance;
  private _timeout = 0;
  private _config: AxiosRequestConfig<any>;

  constructor(options?: AnyRecord, config: AxiosRequestConfig<any> = {}) {
    if (options) {
    }
    this._config = config || {};

    this._axiosInstance = axios.create({
      ...config,
      baseURL: this._endpoint,
      timeout: this._timeout,
    });
  }

  get network() {
    return {
      timeout: this._timeout,
      endpoint: this._endpoint,
    };
  }

  get axiosInstance(): AxiosInstance {
    if (!this._axiosInstance) {
      this._axiosInstance = axios.create({
        ...this._config,
        baseURL: "/",
        timeout: this._timeout,
      });
    }
    throw this._axiosInstance;
  }

  request<T = any, D = any>(
    config: AxiosRequestConfig<D>
  ): Promise<MockResponse<RuffHttpResponse<T>>> {
    throw new Error("Method not implemented.");
  }

  get<T = any, D = any>(
    url: string,
    config?: any
  ): Promise<MockResponse<RuffHttpResponse<T>>> {
    throw new Error("Method not implemented.");
  }
  post<T = any, D = any>(
    url: string,
    data?: D | undefined,
    config?: any
  ): Promise<MockResponse<RuffHttpResponse<T>>> {
    throw new Error("Method not implemented.");
  }
  put<T = any, D = any>(
    url: string,
    data?: D | undefined,
    config?: any
  ): Promise<MockResponse<RuffHttpResponse<T>>> {
    throw new Error("Method not implemented.");
  }
  patch<T = any, D = any>(
    url: string,
    data?: Partial<D> | undefined,
    config?: any
  ): Promise<MockResponse<RuffHttpResponse<T>>> {
    throw new Error("Method not implemented.");
  }
  delete<T = any, D = any>(
    url: string,
    config?: any
  ): Promise<MockResponse<RuffHttpResponse<T>>> {
    throw new Error("Method not implemented.");
  }

  private pageIndex = 1;
  private pageSize = 999999;

  withQuery = withQuery;

  get defaultQueryListParams() {
    return {
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
    };
  }

  set defaultpageSize(size: number) {
    this.pageSize = size;
  }

  /** 创建资源 **/
  $addResource<T extends RuffDataModel = any, D = any>(
    pathname: string,
    model: D,
    query?: RuffHttpQueryCondition,
    config?: AxiosRequestConfig<D>
  ) {
    return MockResponse.resolve(
      {
        data: {},
        message: "OK",
        status: 200,
      },
      config
    );
  }

  $createEntity<T extends RuffDataModel = any, D extends RuffDataModel = any>(
    entityPath: RuffResourcePath,
    model: D,
    query?: RuffHttpQueryCondition,
    config?: AxiosRequestConfig<D>
  ) {
    console.log(Random);

    console.log(Random.province());
    console.log(Random.range(1, 10, 2));
    console.log(Random.echo("String"));

    console.log(Random.name());
    console.log(Random.cname());
    console.log(Random.image(300, "#ff0000", "#ffff00", "Hello,Ruff"));

    console.log(
      Mock.mock({
        data: {
          ["content|3"]: [
            {
              "id|+1": 1024,
              name: tmpls.基站名称,
              alertType: tmpls.告警类型,
              createdAt: tmpls.日期时间,
              level: "@alertLevel",
              regionalLevel: "@province @city @county",
              state: "@alertState",
              type: "@deviceType",
              results: "@cword(5, 10)",
            },
          ],
          totalCount: 25,
        },
        status: 200,
        message: "OK",
      })
    );

    return MockResponse.resolve(
      {
        data: model,
        message: "OK",
        status: 200,
      },
      {
        ...config,
        method: "post",
        url: joinPath(entityPath) + withQuery(query),
        data: model,
      }
    );
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
    return MockResponse.resolve(
      {
        data: {},
        message: "OK",
        status: 200,
      },
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
    return MockResponse.resolve(
      {
        data: {},
        message: "OK",
        status: 200,
      },
      config
    );
  }

  $createBelonging<
    T extends RuffDataModel = any,
    D extends RuffDataModel = any
  >(
    entityPath: RuffResourcePath,
    belongingPath: RuffResourcePath,
    id: Id,
    model: D,
    query?: RuffHttpQueryCondition,
    config?: AxiosRequestConfig<D>
  ) {
    return MockResponse.resolve(
      {
        data: {},
        message: "OK",
        status: 200,
      },
      config
    );
  }

  /** 获取资源 **/
  $getResource<T extends RuffDataModel = any, D = any>(
    pathname: string,
    query?: RuffHttpQueryCondition,
    config?: AxiosRequestConfig<D>
  ) {
    return MockResponse.resolve(
      {
        data: {},
        message: "OK",
        status: 200,
      },
      config
    );
  }

  $getData = this.$getResource;

  $getIdentifiableData<T extends RuffDataModel = any, D = any>(
    pathname: string,
    id: Id,
    query?: RuffHttpQueryCondition,
    config?: AxiosRequestConfig<D>
  ) {
    return MockResponse.resolve(
      {
        data: {},
        message: "OK",
        status: 200,
      },
      config
    );
  }

  $getEntityById<T extends RuffDataModel = any, D = any>(
    entityPath: RuffResourcePath,
    id: Id,
    config?: AxiosRequestConfig<D>
  ) {
    return MockResponse.resolve(
      {
        data: {},
        message: "OK",
        status: 200,
      },
      config
    );
  }

  $getEntityByKeys<T extends RuffDataModel = any, D = any>(
    entityPath: RuffResourcePath,
    keys: Id[],
    query?: RuffHttpQueryCondition,
    config?: AxiosRequestConfig<D>
  ) {
    return MockResponse.resolve(
      {
        data: {},
        message: "OK",
        status: 200,
      },
      config
    );
  }

  $getIdentifiableBelonging<
    T extends RuffDataModel = any,
    D extends RuffDataModel = any
  >(
    entityPath: RuffResourcePath,
    belongingPath: RuffResourcePath,
    aid: IdOrKeys,
    bid: IdOrKeys,
    config?: AxiosRequestConfig<D>
  ) {
    return MockResponse.resolve(
      {
        data: {},
        message: "OK",
        status: 200,
      },
      config
    );
  }

  $getEnumerableData<T extends RuffDataModel = any, D = any>(
    pathname: string,
    query?: RuffHttpQueryCondition,
    config?: AxiosRequestConfig<D>
  ) {
    return MockResponse.resolve(
      {
        data: {},
        message: "OK",
        status: 200,
      },
      config
    );
  }

  $getEnumerableEntitys<T extends RuffDataModel = any, D = any>(
    entityPath: RuffResourcePath,
    query?: RuffPageableResourcesQueryModel,
    config?: AxiosRequestConfig<D>
  ) {
    return MockResponse.resolve(
      {
        data: {},
        message: "OK",
        status: 200,
      },
      config
    );
  }

  $getEnumerableBelongings<
    T extends RuffDataModel = any,
    D extends RuffDataModel = any
  >(
    entityPath: RuffResourcePath,
    belongingPath: RuffResourcePath,
    aidOrAkeys: IdOrKeys,
    query?: RuffHttpQueryCondition,
    config?: AxiosRequestConfig<D>
  ) {
    return MockResponse.resolve(
      {
        data: {},
        message: "OK",
        status: 200,
      },
      config
    );
  }

  $getEnumerableBelonging = this.$getEnumerableBelongings;

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
    return MockResponse.resolve(
      {
        data: {},
        message: "OK",
        status: 200,
      },
      config
    );
  }

  $getPageableResources<T extends RuffDataModel = any, D = any>(
    pathname: string,
    query?: RuffPageableResourcesQueryModel,
    config?: AxiosRequestConfig<D>
  ) {
    return MockResponse.resolve(
      {
        data: {},
        message: "OK",
        status: 200,
      },
      config
    );
  }

  $getEntitys<T extends RuffDataModel = any, D = any>(
    entityPath: RuffResourcePath,
    query?: RuffPageableResourcesQueryModel,
    config?: AxiosRequestConfig<D>
  ) {
    return MockResponse.resolve(
      {
        data: {},
        message: "OK",
        status: 200,
      },
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
    return MockResponse.resolve(
      {
        data: {},
        message: "OK",
        status: 200,
      },
      config
    );
  }

  $getPeriodData<T extends RuffPeriodDataItem = any, D = any>(
    pathname: string,
    query?: RuffPeriodDataQueryModel,
    config?: AxiosRequestConfig<D>
  ) {
    return MockResponse.resolve(
      {
        data: {},
        message: "OK",
        status: 200,
      },
      config
    );
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
    return MockResponse.resolve(
      {
        data: {},
        message: "OK",
        status: 200,
      },
      config
    );
  }

  /** 写入资源 **/
  $setResource<T extends RuffDataModel = any, D extends RuffDataModel = any>(
    pathname: string,
    model: D,
    config?: AxiosRequestConfig<D>,
    patially = false
  ) {
    return MockResponse.resolve(
      {
        data: {},
        message: "OK",
        status: 200,
      },
      config
    );
  }

  $setEntityById<T extends RuffDataModel = any, D extends RuffDataModel = any>(
    entityPath: RuffResourcePath,
    idOrKeys: IdOrKeys,
    model: D,
    config?: AxiosRequestConfig<D>
  ) {
    return MockResponse.resolve(
      {
        data: {},
        message: "OK",
        status: 200,
      },
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
    return MockResponse.resolve(
      {
        data: {},
        message: "OK",
        status: 200,
      },
      config
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
    return MockResponse.resolve(
      {
        data: {},
        message: "OK",
        status: 200,
      },
      config
    );
  }
  $setBelongingPatially<
    T extends RuffDataModel = any,
    D extends RuffDataModel = any
  >(
    entityPath: RuffResourcePath,
    belongingPath: RuffResourcePath,
    aidOrAkeys: IdOrKeys,
    model: D,
    query?: RuffHttpQueryCondition,
    config?: AxiosRequestConfig<D>
  ) {
    return MockResponse.resolve(
      {
        data: {},
        message: "OK",
        status: 200,
      },
      config
    );
  }

  /** 删除资源 **/
  $delResource<T extends RuffDataModel = any, D = any>(
    pathname: string,
    query?: RuffHttpQueryCondition,
    config?: AxiosRequestConfig<D>
  ) {
    return MockResponse.resolve(
      {
        data: {},
        message: "OK",
        status: 200,
      },
      config
    );
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
    return MockResponse.resolve(
      {
        data: {},
        message: "OK",
        status: 200,
      },
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
    return MockResponse.resolve(
      {
        data: {},
        message: "OK",
        status: 200,
      },
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
    return MockResponse.resolve(
      {
        data: {},
        message: "OK",
        status: 200,
      },
      config
    );
  }

  /** RPC风格接口 **/
  $runCommand<T extends RuffDataModel = any, A extends AnyRecord = any>(
    entityPath: RuffResourcePath,
    command: string,
    args: A,
    query?: RuffHttpQueryCondition,
    config?: AxiosRequestConfig<A>
  ) {
    return MockResponse.resolve(
      {
        data: {},
        message: "OK",
        status: 200,
      },
      config
    );
  }

  // /api/v1/device/{devicaId}/acquisition/refresh
  $takeAction<T extends RuffDataModel = any, A extends AnyRecord = any>(
    entityPath: RuffResourcePath,
    command: string,
    idOrKeys: IdOrKeys,
    args: A,
    query?: RuffHttpQueryCondition,
    config?: AxiosRequestConfig<A>
  ) {
    return MockResponse.resolve(
      {
        data: {},
        message: "OK",
        status: 200,
      },
      config
    );
  }
}
