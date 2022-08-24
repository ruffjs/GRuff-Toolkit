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

export const withQuery = (query?: RuffHttpQueryModel | string) => {
  if (typeof query === "string")
    return ("?" + query.replace(/^\?/, "")).replace(/\?$/, "");
  if (typeof query === "object")
    return isNotEmpty(query) ? "?" + QS.stringify(query) : "";
  return "";
};
