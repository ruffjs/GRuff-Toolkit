export enum ResourceMethod {
  /** POSTLIKE **/
  /**
   * ### 创建资源
   *
   * http method: post
   *
   * sample: /api/v1/device
   * sample: /api/v1/device/{id}/property
   */
  POST = 1,

  /**
   * ### 创建包含附件的资源
   * POST的一个变种
   *
   * http method: post
   *
   * sample: /api/v1/otaPackage
   */
  UPLOAD,

  /** GETLIKE - LIST **/
  /**
   * ### 查询多个资源，并以分页列表的形式返回
   *
   * http method: get
   *
   * sample: /api/v1/device
   * sample: /api/v1/device/{id}/statusData
   */
  LIST,

  /** GETLIKE - ITEM **/
  /**
   * ### 查询单个资源
   *
   * http method: get
   *
   * params: id, keys(id[]), keys[]
   *
   * sample: /api/v1/device/{id}
   * sample: /api/v1/attribute/{entityType}/{entityId}
   * sample: /api/v1/device/{id}/status
   * sample: /api/v1/device/{id}/attrs/{subid}
   */
  GET,

  /** PUTLIKE **/
  /**
   * ### 全量修改单个资源
   *
   * http method: put
   *
   * params: id, keys(id[]), keys[]
   *
   * sample: /api/v1/device/{id}
   * sample: /api/v1/device/{deviceId}/acquisition
   */
  PUT,

  /**
   * ### 非全量修改单个资源
   *
   * http method: patch
   *
   * params: id, keys(id[]), keys[]
   *
   * sample: -
   */
  PATCH,

  /** DELETELIKE - ITEM **/
  /**
   * ### 删除单个资源
   *
   * params: id, keys(id[]), keys[]
   *
   * params: id
   *
   * sample: /api/v1/device/{id}
   * sample: /api/v1/attribute/{entityType}/{entityId}/{key}/{type}
   * sample: /api/v1/user/{id}/bindPhone
   */
  DELETE,
}

export type StandardMethod =
  | ResourceMethod.POST
  | ResourceMethod.GET
  | ResourceMethod.PUT
  | ResourceMethod.PATCH
  | ResourceMethod.DELETE;

export type SetterMethod =
  | ResourceMethod.POST
  | ResourceMethod.UPLOAD
  | ResourceMethod.PUT
  | ResourceMethod.PATCH;

export type GetterMethod = ResourceMethod.LIST | ResourceMethod.GET;
