const convertStringToVarible = (string: string) => {
  if (string.startsWith("--")) {
    return `var(${string})`
  }
  return string
}

const convertNummericToPixel = (numeric: number | string) => {
  if (typeof numeric === "number") {
    if (numeric === 0) return "0"
    return numeric + "px"
  } else if (typeof numeric === "string") {
    if (numeric === "0") return "0"
    if (numeric.match(/^\d+$/)) {
      return numeric + "px"
    }
    return convertStringToVarible(numeric)
  }
}

export const stringValueCheck = (prop: string, value: any, obj: any) => {
  if (typeof value === "string") {
    obj[prop] = convertStringToVarible(value)
  }
}

export const pixelValueCheck = (prop: string, value: any, obj: any) => {
  if (typeof value === "number" || typeof value === "string") {
    obj[prop] = convertNummericToPixel(value)
  } else if (typeof value === "object" && value instanceof Array) {
    obj[prop] = value
      .map(convertNummericToPixel)
      .filter(el => el !== void 0)
      .join(" ")
  }
}