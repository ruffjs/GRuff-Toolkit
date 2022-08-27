import QS from "query-string";

export const isEmptyObject = (obj: any) => JSON.stringify(obj) === "{}";

export const isNotEmpty = (obj: any) => obj !== null && !isEmptyObject(obj);

type joinable = string | number;

export const joinPath = (path: joinable[] | joinable) => {
  if (typeof path === "object" && path instanceof Array) {
    return path.join("/") || "/";
  }
  if (typeof path === "string") {
    return path || "/";
  }
  if (typeof path === "number") {
    return String(path) || "/";
  }
  return "/";
};

export const withQuery = (query?: RuffHttpQueryCondition) => {
  if (typeof query === "string")
    return ("?" + query.replace(/^\?/, "")).replace(/\?$/, "");
  if (typeof query === "object")
    return isNotEmpty(query) ? "?" + QS.stringify(query) : "";
  return "";
};

class _MultipleValues extends Array {}
const formatQueryConditionUnit = (query: RuffHttpQueryCondition) => {
  if (query) {
    if (typeof query === "object") return query;
    if (typeof query === "string") {
      const map: RuffHttpQueryModel = {};
      query
        .trim()
        .split(/\&+/)
        .map((field) => field.split("="))
        .forEach(([key, value]) => {
          // console.log(key, value, map[key], typeof map[key] === "undefined");
          if (typeof map[key] === "undefined") {
            map[key] = value;
          } else {
            if (map[key] instanceof _MultipleValues) {
              map[key].push(value);
            } else {
              const values = new _MultipleValues();
              values.push(map[key], value);
              map[key] = values;
            }
          }
        });
      return map;
    }
  }
  return {};
};
export const formatQueryCondition = (...qs: RuffHttpQueryCondition[]) => {
  const qm: RuffHttpQueryModel = {};
  qs.forEach((query) => {
    Object.assign(qm, formatQueryConditionUnit(query));
  });
  return qm;
};
