import { RuleObject } from "ant-design-vue/lib/form";
import { reactive, ref, UnwrapNestedRefs } from "vue";

export const handleValidateRes = (err: any) => {
  return err ? Promise.reject(err) : Promise.resolve();
};

type RuleType = any;
type Validator = any;
type Rule = any;
type Field<T = any> = any;
type Fields<T = any> = any;
type Option<T = any> = any;
type MultipleOption<T = any> = any;

const patterns = {
  required: (type: RuleType = "string"): RuleObject => ({
    required: true,
    type,
    message: "不能为空",
    validateTrigger: ["change", "blur"],
  }),
  requiredArray: (tip: string | undefined = undefined): RuleObject => ({
    validator: (rule: RuleObject, value: Array<string | number>) => {
      let err;
      if (value.length === 0) {
        err = tip || "至少选择一项";
      }
      return handleValidateRes(err);
    },
    required: true,
    validateTrigger: ["change"],
  }),
  password: (): RuleObject => ({
    validator: (rule: RuleObject, value: string) => {
      let err;
      const reg = /^[A-Za-z0-9_.]+$/;
      if (value !== "" && value !== null && !reg.test(value)) {
        err = `只能包含字母、数字和下划线`;
      }
      return handleValidateRes(err);
    },
    validateTrigger: ["change", "blur"],
  }),
  id: (): RuleObject => ({
    validator: (rule: RuleObject, value: string) => {
      let err;
      const reg = /^[A-Za-z0-9_\u4e00-\u9fa5]+$/;
      if (value !== "" && value !== null && !reg.test(value)) {
        err = `只能包含中文、字母、数字、和下划线`;
      }
      return handleValidateRes(err);
    },
    validateTrigger: ["change", "blur"],
  }),
  digital: (): RuleObject => ({
    validator: (rule: RuleObject, value: string) => {
      let err;
      const reg = /^[0-9_-]+$/;
      if (value !== "" && !reg.test(value)) {
        err = `只能为整数`;
      }
      return handleValidateRes(err);
    },
    validateTrigger: ["change", "blur"],
  }),
  phone: (): RuleObject => ({
    validator: (rule: RuleObject, value: string) => {
      console.log("value", value);
      let err;
      const reg = /^1[3456789]\d{9}$/;
      if (
        value !== "" &&
        value !== null &&
        value !== undefined &&
        !reg.test(value)
      ) {
        err = `请输入正确的11位手机号`;
      }
      return handleValidateRes(err);
    },
    validateTrigger: ["change"],
  }),
  email: (): RuleObject => ({
    validator: (rule: RuleObject, value: string) => {
      let err;
      const reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (value !== "" && value !== null && !reg.test(value)) {
        err = `请输入正确的邮箱`;
      }
      return handleValidateRes(err);
    },
    validateTrigger: ["change", "blur"],
  }),
  ipv4: (): RuleObject => ({
    validator: (rule: RuleObject, value: string) => {
      let err;
      const reg =
        /^((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)$/;
      if (value !== "" && value !== null && !reg.test(value)) {
        err = `请输入正确的IP地址`;
      }
      handleValidateRes(err);
    },
    validateTrigger: ["change", "blur"],
  }),
  NonChinese: (): RuleObject => ({
    validator: (rule: RuleObject, value: string) => {
      let err;
      const reg = /^[A-Za-z0-9\,\.\-\(\)@#$%&*?\[\]\{\}\/]+$/;
      if (value !== "" && value !== null && !reg.test(value)) {
        err = `不能包含中文、特殊字符和空格`;
      }
      return handleValidateRes(err);
    },
    validateTrigger: ["change", "blur"],
  }),
} as const;
export type RulePattern = keyof typeof patterns;
export const defineRule = {
  ...patterns,
  validator: (
    validator: Validator,
    validateTrigger = ["change", "blur"]
  ): RuleObject => ({
    validator,
    validateTrigger,
  }),
  options: (options: string[], excludes: string[] = []): RuleObject => ({
    validator: (rule: RuleObject, value: string) => {
      let err;
      if (!options.includes(value)) {
        err = `输入值不得超出可选项`;
      }
      if (excludes.includes(value)) {
        err = `输入值不得包含于黑名单`;
      }
      return handleValidateRes(err);
    },
    validateTrigger: ["change", "blur"],
  }),
  blacklist: (excludes: string[] = []): RuleObject => ({
    validator: (rule: RuleObject, value: string) => {
      let err;
      if (excludes.includes(value)) {
        err = `输入值不得包含于黑名单`;
      }
      return handleValidateRes(err);
    },
    validateTrigger: ["change", "blur"],
  }),
  lengthRange: (min: number, max: number): RuleObject => ({
    // 按照字符长度区分
    validator: (rule: RuleObject, value: string) => {
      let err;
      const length = value.replace(/[\u4e00-\u9fa5]/g, "xx").length;
      if (value !== "" && value !== null && (length > max || length < min)) {
        if (max === Infinity) {
          err = `字符长度必须大于或等于 ${min} （1个汉字 = 2个字符）`;
        } else {
          err = `字符长度须在 ${min} 到 ${max} 之间（1个汉字 = 2个字符）`;
        }
      }
      return handleValidateRes(err);
    },
    validateTrigger: ["change", "blur"],
  }),
  greaterThan: (num: any): RuleObject => ({
    validator: (rule: RuleObject, value: any) => {
      let err;
      if (value !== "" && value !== null && value <= num) {
        err = `数字必须大于${num}`;
      }
      return handleValidateRes(err);
    },
    validateTrigger: ["change", "blur"],
  }),
  greaterOrEqualThan: (num: any): RuleObject => ({
    validator: (rule: RuleObject, value: string) => {
      let err;
      if (value !== "" && value !== null && value < num) {
        err = `数字不能小于${num}`;
      }
      return handleValidateRes(err);
    },
    validateTrigger: ["change", "blur"],
  }),
  lessOrEqualThan: (num: number): RuleObject => ({
    validator: (rule: RuleObject, value: any) => {
      let err;
      if (value !== "" && value !== null && value > num) {
        err = `数字不能大于${num}`;
      }
      return handleValidateRes(err);
    },
    validateTrigger: ["change", "blur"],
  }),
  maxDecimalCount: (count: number): RuleObject => ({
    validator: (rule: RuleObject, value: string) => {
      let err;
      const [, decimal] = value.toString().split("."); //3.141592654
      if (decimal && decimal.length > count) {
        err = `精度最大为小数点后${count}位`;
      }
      return handleValidateRes(err);
    },
    validateTrigger: ["change", "blur"],
  }),
  range: (min: number, max: number): RuleObject => ({
    validator: (rule: RuleObject, value: any) => {
      let err;
      const reg = /^[0-9_-]+$/;
      if (!reg.test(value) || value < min || value > max) {
        err = `取值范围为 ${min} ~  ${max}`;
      }
      return handleValidateRes(err);
    },
    validateTrigger: ["change", "blur"],
  }),
};

const checkRule = (rule: Rule | Rule[]): RuleObject => {
  if (typeof rule === "object") {
    if (rule instanceof Array) {
      return rule.map(checkRule) as RuleObject;
    }
    return rule;
  } else if (typeof rule === "function") {
    return defineRule.validator(rule);
  }
  if (rule.startsWith("required:")) {
    const [p, a, t] = rule.split(":");
    if (a === "array") {
      return defineRule.requiredArray(t);
    }
    return defineRule.required(a as RuleType);
  }
  if (patterns[rule as RulePattern]) {
    return defineRule[rule as RulePattern]();
  } else {
    throw "UnknownRulePattern " + rule;
  }
};

type ModelValue = number | string | boolean;
interface Model {
  [x: string]: ModelValue | undefined;
}
interface MultipleModel {
  [x: string]: ModelValue[] | undefined;
}

function hook<T extends object = object>(fields: Fields<T>) {
  // console.log(fields)
  type M = Partial<T>;
  type R = UnwrapNestedRefs<M>;
  type F = keyof M;
  type K = keyof R;
  type O = Partial<Record<F, Option<T[F]>[] | MultipleOption<T[F]>[]>>;
  const defaults = {} as M;

  const uniques: K[] = [];
  const editables: K[] = [];
  const opts = {} as O;

  const formRules = {} as Partial<Record<F, RuleObject>>;
  (Object.keys(fields) as F[]).forEach((key) => {
    const field = fields[key];
    if (typeof field === "object") {
      const { data, rule, options, unique, editable } = field as Field<T[F]>;
      defaults[key] = data;
      if (rule) formRules[key] = checkRule(rule);
      if (options) opts[key] = options;
      if (unique) uniques.push(key as K);
      if (editable) editables.push(key as K);
    } else {
      defaults[key] = field as T[F];
    }
  });
  const formRef = ref<HTMLElement | null>(null);
  const formOpts = reactive<O>({ ...opts });
  const formModel = reactive<M>({ ...defaults });

  const updateOptions = (
    key: keyof UnwrapNestedRefs<O>,
    data: UnwrapNestedRefs<O>[keyof UnwrapNestedRefs<O>]
  ) => {
    formOpts[key] = data;
  };
  const setItem = (key: K, data: R[K]) => {
    formModel[key] = data;
  };
  const updateItems = (data: Required<R>) => {
    (Object.keys(formModel) as K[]).map((key) => {
      if (key in data) {
        formModel[key] = data[key];
      }
    });
  };
  (Object.keys(fields) as F[]).forEach((key) => {
    const field = fields[key] as Field<T[F]>;
    // console.log(key, field, typeof field === "object", "default" in field)
    if (typeof field === "object" && "default" in field) {
      defaults[key] = field.default;
      setItem(<K>key, <R[K]>field.default);
    }
  });
  const model = { ...defaults };
  const updateModel = (data: M) => {
    (Object.keys(model) as (keyof T)[]).map((key) => {
      if (key in data) {
        model[key] = data[key];
      }
    });
    updateItems(<Required<R>>model);
  };
  const resetModel = () => {
    // console.log(defaults)
    updateModel(defaults);
  };

  let records: R[] = [];
  let ignored: R | null = null;
  const updateRecords = (savedRecords: R[], ignoredRecord: R | null = null) => {
    records = [...savedRecords];
    ignored = ignored;
  };
  const getChanges = () => {
    return Object.keys(model).map((key) => {
      return formModel[key as K] !== model[key as keyof T];
    });
  };
  const getEidtables = () => {
    const data: Partial<R> = {};
    const changes = editables.map((key) => {
      data[key] = formModel[key];
      // console.log(key, formModel[key], model[key as keyof T])
      return (
        formModel[key] !== void 0 && formModel[key] !== model[key as keyof T]
      );
    });
    // console.log(changes)
    if (changes.some((changed) => changed)) return data;
    return null;
  };
  const checkUniqued = (): [boolean, string | undefined] => {
    if (records?.length && uniques?.length) {
      let conflictKey: K | undefined = undefined;
      const conflicted = uniques.some((key) => {
        return records.some((record: any) => {
          if (formModel[key] === record[key as any]) {
            if (ignored && ignored[key] === formModel[key]) {
              return false;
            }
            conflictKey = key;
            return true;
          }
          return false;
        });
      });
      return [!conflicted, conflictKey];
    }
    return [true, undefined];
  };

  return {
    getters: {
      get changes() {
        return getChanges();
      },
      get eidtables() {
        return getEidtables();
      },
      get uniqued() {
        return checkUniqued();
      },
    },
    formRef,
    formOpts,
    formModel,
    formRules,
    checkUniqued,
    updateOptions,
    updateRecords,
    setItem,
    updateModel,
    resetModel,
  };
}

export default hook;
