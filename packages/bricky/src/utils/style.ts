import { CSSProperties } from "vue"

const convertStringToVarible = (string: string) => {
  if (string.startsWith("--")) {
    return `var(${string})`
  }
  // if (string.startsWith("-")) {
  //   return `var(--b${string})`
  // }
  return string
}

export const convertNummericToPixel = (numeric: number | string) => {
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

export const booleanishValueCheck = (prop: string, value: any, obj: any) => {
  if (typeof value === "boolean") {
    obj[prop] = value ? "true" : "false"
  } else if (typeof value === "string") {
    obj[prop] = value
  }
}

export const numberishValueCheck = (prop: string, value: any, obj: any) => {
  if (typeof value === "number") {
    obj[prop] = value.toString()
  }
  stringValueCheck(prop, value, obj)
}

export const stringValueCheck = (prop: string, value: any, obj: any) => {
  if (typeof value === "string") {
    obj[prop] = convertStringToVarible(value)
  }
}

export const numberValueCheck = (prop: string, value: any, obj: any) => {
  if (typeof value === "number") {
    obj[prop] = value
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

export function trimPropsObject(props: any, types: any) {
  const obj: any = {}
  Object.keys(types).forEach(key => {
    if (props[key] !== void 0) {
      obj[key] = props[key]
    }
  })
  return obj
}

export const directions = [
  "Top",
  "Right",
  "Bottom",
  "Left",
  "BlockStart",
  "BlockEnd",
  "InlineStart",
  "InlineEnd",
]
export const checkMultiPixelProps = (
  props: Partial<PaddingProps & BorderProps & MarginProps>,
  obj: CSSProperties,
  types = ["padding", "border", "margin"]
) => {
  types.forEach(type => {
    const value = (props as any)[type]
    // console.log(type, value);
    pixelValueCheck(type, value, obj)
    const valueV = (props as any)[type + "V"]
    if (valueV !== void 0) {
      pixelValueCheck(type + "Top", valueV, obj)
      pixelValueCheck(type + "Bottom", valueV, obj)
    }
    const valueH = (props as any)[type + "H"]
    if (valueH !== void 0) {
      pixelValueCheck(type + "Left", valueH, obj)
      pixelValueCheck(type + "Right", valueH, obj)
    }
    directions.forEach(direction => {
      const v = (props as any)[type + direction]
      if (v !== void 0) {
        pixelValueCheck(type + direction, v, obj)
      }
    })
  })
}

export function convertCssToStyleObject(css: string) {
  const obj: any = {}
  css
    .split(";")
    .map(item => item.trim())
    .forEach(prop => {
      if (prop) {
        const [key, value] = prop.split(":").map(item => item.trim())
        if (key !== "" && value !== "") {
          obj[key] = value
        }
      }
    })
  return obj
}
