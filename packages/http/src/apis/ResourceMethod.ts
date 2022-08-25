export enum ResourceMethod {
  /** POSTLIKE **/
  /**
   * 创建实体资源
   *
   * http method: post
   *
   * sample: /api/v1/device
   */
  POST,

  /**
   * 创建包含附件的实体资源
   * POST的一个变种
   *
   * http method: post
   *
   * sample: /api/v1/otaPackage
   */
  UPLOAD,

  /**
   * 创建实体关系（关系亦看做一种特殊的实体）
   * 批量接口
   *
   * http method: post
   *
   * sample: /api/v1/tagRef
   */
  REFER,

  /**
   * 为实体添加附属资源
   *
   * http method: post
   *
   * params: eid
   *
   * sample: /api/v1/device/{id}/property
   */
  WRITE,

  /** GETLIKE - LIST **/
  /**
   * 查询实体资源，并以通用列表的形式返回
   *
   * http method: get
   *
   * sample: /api/v1/device
   */
  LIST,

  /**
   * 查询实体资源，并以通用列表的形式返回
   * LIST的一种语法糖
   *
   * http method: get
   *
   * sample: /api/v1/device
   */
  PICK,

  /**
   * 查询记录型附属资源，并以日志列表的形式返回
   *
   * http method: get
   *
   * params: eid
   *
   * sample: /api/v1/device/{id}/statusData
   */
  LOG,

  /**
   * 查询可枚举资源，并以枚举列表的形式返回
   * 主要为指标列表、配置项列表等可枚举资源
   * 同时适用于实体资源和附属资源
   *
   * http method: get
   *
   * sample: /api/v1/device/property/batchQuery
   * 		   /api/v1/device/{id}/property
   */
  ENUM,

  /** GETLIKE - ITEM **/
  /**
   * 查询单个实体资源
   *
   * http method: get
   *
   * params: id
   *
   * sample: /api/v1/device/{id}
   */
  GET,

  /**
   * 查询单个实体资源
   *
   * http method: get
   *
   * params: ...keys[]
   *
   * sample: /api/v1/attribute/{entityType}/{entityId}
   */
  GET_BY_KEYS,

  /**
   * 读取一般附属资源
   *
   * http method: get
   *
   * params: eid
   *
   * sample: /api/v1/device/{id}/status
   */
  READ,

  /** PUTLIKE **/
  /**
   * 全量修改单个实体资源
   *
   * http method: put
   *
   * params: id
   *
   * sample: /api/v1/device/{id}
   */
  PUT,

  /**
   * 全量修改单个实体资源
   *
   * http method: put
   *
   * params: ...keys[]
   *
   * sample: -
   */
  PUT_BY_KEYS,

  /**
   * 修改实体附属资源
   *
   * http method: put
   *
   * params: eid
   *
   * sample: /api/v1/device/{deviceId}/acquisition
   */
  MOD,

  /**
   * 非全量修改单个实体资源
   *
   * http method: patch
   *
   * params: id
   *
   * sample: -
   */
  PATCH,

  /** DELETELIKE - ITEM **/
  /**
   * 删除单个实体资源
   *
   * http method: delete
   *
   * params: id
   *
   * sample: /api/v1/device/{id}
   */
  DELETE,

  /**
   * 删除单个实体资源
   *
   * http method: delete
   *
   * params: ...keys[]
   *
   * sample: /api/v1/attribute/{entityType}/{entityId}/{key}/{type}
   */
  DELETE_BY_KEYS,

  /**
   * 删除实体附属资源
   *
   * http method: delete
   *
   * params: eid
   *
   * sample: /api/v1/user/{id}/bindPhone
   */
  DROP,

  /**
   * 接触实体关系（关系亦看做一种特殊的实体）
   * 批量接口
   *
   * http method: delete
   *
   * sample: /api/v1/tagRef
   */
  UNREF, //          delete
}

export type CommandMethod =
  | ResourceMethod.POST
  | ResourceMethod.GET
  | ResourceMethod.PUT
  | ResourceMethod.DELETE
  | ResourceMethod.PATCH;

export type EntityResourceMethod =
  | CommandMethod
  | ResourceMethod.LIST
  | ResourceMethod.PICK
  | ResourceMethod.GET_BY_KEYS
  | ResourceMethod.DELETE_BY_KEYS
  | ResourceMethod.REFER
  | ResourceMethod.UNREF
  | ResourceMethod.ENUM;

export type BelongingMethod =
  | ResourceMethod.WRITE
  | ResourceMethod.MOD
  | ResourceMethod.READ
  | ResourceMethod.DROP
  | ResourceMethod.ENUM
  | ResourceMethod.LIST
  | ResourceMethod.LOG;
