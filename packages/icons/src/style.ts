const convertStringToVarible = (string: string) => {
  if (string.startsWith("--")) {
    return `var(${string})`
  }
  return string
}

const convertNummericToPixel = (nummeric: number | string) => {
  if (typeof nummeric === "number") {
    if (nummeric === 0) return "0"
    return nummeric + "px"
  } else if (typeof nummeric === "string") {
    if (nummeric === "0") return "0"
    if (nummeric.match(/^\d+$/)) {
      return nummeric + "px"
    }
    return convertStringToVarible(nummeric)
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