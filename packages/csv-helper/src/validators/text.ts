export function maxLength(max: number, itemName = "长度") {
  return (text: string) => {
    const length = text.replace(/[\u4e00-\u9fa5]/g, "xx").length;
    if (length <= max) {
      return null;
    }
    return `${itemName}不得超过${max}个字符（1个汉字 = 2个字符）`;
  };
}

export function phoneNumber(itemName = "手机号", required = false) {
  return (text: string) => {
    const length = text.replace(/[\u4e00-\u9fa5]/g, "xx").length;
    if (length === 0 && !required) return null;
    if (/1\d{10}/.test(text)) {
      return null;
    }
    return `${itemName}必须是1开头的11位数字，你提供的是[ ${text} ]`;
  };
}
