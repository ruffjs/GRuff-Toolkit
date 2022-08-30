type Command<T extends RuffDataModel = any> = (
  args?: AnyRecord
) => Promise<AxiosResponse<RuffHttpResponse<T>>>;

type CallableBelonging<T extends RuffDataModel = any> = (
  condition?: RuffHttpQueryCondition
) => Promise<AxiosResponse<RuffHttpResponse<T>>>;
