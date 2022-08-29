import DataMapping from "./src";

export const readonly = <T>(key: keyof T) => ({
  get(data: T) {
    return data[key];
  },
});
export const constant = (value: any) => ({ value });
export const defineMapping = DataMapping.defineMapping;
