import {
  checkMultiPixelProps,
  pixelValueCheck,
  stringValueCheck,
} from "../utils/style"

const stringMap = {
  family: "fontFamily",
  style: "fontStyle",
  smooth: "fontSmooth",
  stretch: "fontStretch",
  variant: "fontVariant",
  kerning: "fontKerning",
  synthesis: "fontSynthesis",
  opticalSizing: "fontOpticalSizing",
  align: "textAlign",
  alignLast: "textAlignLast",
  decoration: "textDecoration",
  descStyle: "textDecorationStyle",
  combineUpright: "textCombineUpright",
  emphasis: "textEmphasis",
  emphasisColor: "textEmphasisColor",
  emphasisPosition: "textEmphasisPosition",
  emphasisStyle: "textEmphasisStyle",
  justify: "textJustify",
  orientation: "textOrientation",
  overflow: "textOverflow",
  rendering: "textRendering",
  shadow: "textShadow",
  adjust: "textSizeAdjust",
  transform: "textTransform",
  underlineOffset: "textUnderlineOffset",
  underlinePosition: "textUnderlinePosition",
  color: "color",
}

const numberishMap = {
  size: "fontSize",
  descWidth: "textDecorationWidth",
  indent: "textIndent",
  lineHeight: "lineHeight",
  spacing: "letterSpacing",
}

const numericMap = {
  weight: "fontWeight",
}

export type TextStyleProps = MarginProps &
  TextFontProps &
  TextTypeProps &
  TextBoxProps

export function convertPropsToStyleObject(props: TextStyleProps, types: any) {
  const obj: any = {}
  checkMultiPixelProps(props as MarginProps, obj, ["margin"])
  Object.keys(types).forEach(prop => {
    if (props[prop as keyof TextStyleProps] === undefined) return
    if (prop in stringMap) {
      stringValueCheck(
        stringMap[prop as keyof typeof stringMap],
        props[prop as keyof TextStyleProps],
        obj
      )
    } else if (prop in numberishMap) {
      pixelValueCheck(
        numberishMap[prop as keyof typeof numberishMap],
        props[prop as keyof TextStyleProps],
        obj
      )
    } else if (prop in numericMap) {
      stringValueCheck(
        numericMap[prop as keyof typeof numericMap],
        props[prop as keyof TextStyleProps]?.toString() || "0",
        obj
      )
    }
  })

  return obj
}
