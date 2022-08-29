export default class DataMapping<
  K extends string = any,
  OK extends string = any
> {
  static defineMapping<
    T extends Record<K, any>,
    K extends string = any,
    OK extends string = any
  >(options: MappingOptions<T[K], K, OK>, target?: MappingData<OK>) {
    console.log(options);
    const keys = Object.keys(options) as K[];
    const formatted = {} as Record<K, MappingOption<T[K], K, OK>>;
    keys.forEach((key) => {
      if (typeof options[key] === "string") {
        const ok = options[key] as OK;

        formatted[key] = {
          get(data?: MappingData<OK>, mapping?: DataMapping<K, OK>): T[K] {
            return data ? data[ok] : (undefined as T[K]);
          },
          set(value: T[K], data?: MappingData<OK>) {
            if (data) data[ok] = value;
          },
        };
      } else if (typeof options[key] === "function") {
        const get = options[key] as MappingOptionGetter<T[K], K, OK>;
        formatted[key] = {
          get,
        };
      } else if (typeof options[key] === "object") {
        const { value, get, set } = options[key] as Partial<
          MappingOption<T[K], K, OK>
        >;
        formatted[key] = {
          value,
          get,
          set,
        };
      } else {
        formatted[key] = {
          value: void 0,
        };
      }
    });
    const mapping = new DataMapping(formatted, target);
    return mapping as unknown as DataMapping & T & Record<K, unknown>;
  }

  private _targetData: MappingData<OK>;
  private _computedData: Record<K, any>;
  private constructor(
    options: Record<K, MappingOption<any, K, OK>>,
    target?: MappingData<OK>
  ) {
    console.log(options);

    this._targetData = target || ({} as MappingData<OK>);
    this._computedData = {} as Record<K, any>;

    const context = this as any;
    const updateTarget = this.updateTarget.bind(this);
    const getTarget = this.getTarget.bind(this);
    const getLast = this.getLast.bind(this);
    context.__proto__ = new Proxy<Record<K, any>>(this._computedData, {
      get(target, p: K) {
        if (p === "updateTarget") {
          return updateTarget;
        }
        if (p === "getTarget") {
          return getTarget;
        }
        if (p === "getLast") {
          return getLast;
        }
        if (typeof options[p].get === "function") {
          target[p] = (<Function>options[p].get)(context._targetData, context);
        } else {
          target[p] = options[p].value;
        }
        return target[p];
      },
      set(target, p: K, value: any, receiver: Record<K, any>) {
        if (typeof options[p].set === "function") {
          target[p] = (<Function>options[p].set)(
            value,
            context._targetData,
            context
          );
          return true;
        }
        throw new Error(`Prop ${p} is a readonly property`);
      },
    });
  }

  updateTarget(data: Partial<MappingData<OK>>): void;
  updateTarget(key: OK, value: any): void;
  updateTarget(key: OK | Partial<MappingData<OK>>, value?: any) {
    if (typeof key === "object") {
      Object.assign(this._targetData, key);
    } else if (typeof key === "string") {
      this._targetData[key] = value;
    }
  }

  getTarget() {
    return this._targetData;
  }

  getLast() {
    return this._computedData;
  }
}
