type MappingData<OK extends string = any> = Record<OK, any>;

type MappingOptionGetter<
  T = any,
  K extends string = any,
  OK extends string = any
> = (data?: MappingData<OK>, mapping?: DataMapping<K, OK>) => T;

type MappingOptionSetter<
  T = any,
  K extends string = any,
  OK extends string = any
> = (value: T, data?: MappingData<OK>, mapping?: DataMapping<K, OK>) => void;

interface MappingOption<
  T = any,
  K extends string = any,
  OK extends string = any
> {
  value?: T;
  get?: MappingOptionGetter<T, K, OK>;
  set?: MappingOptionSetter<T, K, OK>;
}

type MappingOptionInput<
  T = any,
  K extends string = any,
  OK extends string = any
> = OK | Partial<MappingOption<T, K, OK>> | MappingOptionGetter<T, K, OK>;

type MappingOptions<
  T = any,
  K extends string = any,
  OK extends string = any
> = Record<K, MappingOptionInput<T, K, OK>>;
