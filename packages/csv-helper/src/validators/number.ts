export function lengthFixedInteger(
  len: number,
  itemName = "输入",
  required = false
) {
  return (text: string) => {
    const length = text.replace(/[\u4e00-\u9fa5]/g, "xx").length;
    if (length === 0 && !required) return null;
    if (/\d+/.test(text)) {
      if (length === len) {
        return null;
      }
      return `${itemName}必须为${len}位数字，你提供的是[ ${text} ]`;
    }
    return `${itemName}必须全部为数字，你提供的是[ ${text} ]`;
  };
}
export function float(fixed: number = -1, itemName = "输入", required = false) {
  return (text: string) => {
    const length = text.replace(/[\u4e00-\u9fa5]/g, "xx").length;
    if (length === 0 && !required) return null;
    const [a, b, ...rest] = text.split(".");
    if (rest.length || a.length === 0)
      return `${itemName}必须为合法的浮点数，你提供的是[ ${text} ]`;
    if (/\d+/.test(a)) {
      if (b.length === 0 || /\d+/.test(b)) {
        if (text.endsWith("."))
          return `${itemName}必须为合法的浮点数，你提供的是[ ${text} ]`;
        if (fixed >= 0 && b.length !== fixed)
          return `${itemName}必须为合法的浮点数，你提供的是[ ${text} ]`;
        return null;
      }
    }
    return `${itemName}必须为合法的浮点数，你提供的是[ ${text} ]`;
  };
}
