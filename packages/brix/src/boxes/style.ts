import { CSSProperties } from "vue"
import {
  checkMultiPixelProps,
  directions,
  numberishValueCheck,
  numberValueCheck,
  pixelValueCheck,
  stringValueCheck,
} from "../utils/style"

export type BoxStyleProps = ExtendedFlexProps &
  FlexItemProps &
  PaddingProps &
  BorderProps &
  MarginProps &
  RoundProps &
  SizeProps &
  BackgroudProps

const checkExtendedFlexProps = (
  props: ExtendedFlexProps,
  obj: CSSProperties
) => {
  const { row, column, direction, center, align, justify, items } = props

  if (direction) {
    stringValueCheck("flexDirection", direction || "column", obj)
  } else if (row) {
    if (row === "reverse") {
      stringValueCheck("flexDirection", "row-reverse", obj)
    } else {
      stringValueCheck("flexDirection", "row", obj)
    }
  } else if (column) {
    if (column === "reverse") {
      stringValueCheck("flexDirection", "column-reverse", obj)
    } else {
      stringValueCheck("flexDirection", "column", obj)
    }
  }

  if (center) {
    if (center === "content") {
      stringValueCheck("justifyContent", "center", obj)
    } else if (center === "items") {
      stringValueCheck("alignItems", "center", obj)
    } else {
      stringValueCheck("justifyContent", "center", obj)
      stringValueCheck("alignItems", "center", obj)
    }
  }
  if (typeof align === "string") {
    const a = align.trim().split(/\s+/)
    stringValueCheck("justifyContent", a[0], obj)
    stringValueCheck("alignItems", a[1] || a[0], obj)
  } else if (
    typeof align === "object" &&
    align instanceof Array &&
    align.length
  ) {
    stringValueCheck("justifyContent", align[0], obj)
    stringValueCheck("alignItems", align[1] || align[0], obj)
  }
  if (typeof justify === "string") {
    stringValueCheck("justifyContent", justify, obj)
  }
  if (typeof items === "string") {
    stringValueCheck("alignItems", items, obj)
  }
}
const checkFlexProps = (props: FlexProps, obj: CSSProperties) => {
  const {
    alignContent,
    alignItems,
    flexDirection,
    flexWrap,
    justifyContent,
    justifyItems,
    gap,
  } = props
  stringValueCheck("alignContent", alignContent, obj)
  stringValueCheck("alignItems", alignItems, obj)
  if (flexDirection) {
    stringValueCheck("flexDirection", flexDirection || "column", obj)
  }
  stringValueCheck("flexWrap", flexWrap, obj)
  stringValueCheck("justifyContent", justifyContent, obj)
  stringValueCheck("justifyItems", justifyItems, obj)
  pixelValueCheck("gap", gap, obj)
}

const checkFlexItemProps = (props: FlexItemProps, obj: CSSProperties) => {
  const { alignSelf, flex, order } = props
  numberishValueCheck("flex", flex, obj)
  numberValueCheck("order", order, obj)
  numberValueCheck("alignSelf", alignSelf, obj)
}

const checkSizeProps = (props: SizeProps, obj: CSSProperties) => {
  const { minWidth, width, maxWidth, minHeight, height, maxHeight } = props
  pixelValueCheck("minWidth", minWidth, obj)
  pixelValueCheck("width", width, obj)
  pixelValueCheck("maxWidth", maxWidth, obj)
  pixelValueCheck("minHeight", minHeight, obj)
  pixelValueCheck("height", height, obj)
  pixelValueCheck("maxHeight", maxHeight, obj)
}

const checkBackgroudProps = (props: BackgroudProps, obj: CSSProperties) => {
  const {
    background,
    backgroundColor,
    backgroundImage,
    backgroundRepeat,
    backgroundPosition,
    backgroundSize,
  } = props
  stringValueCheck("background", background, obj)
  stringValueCheck("backgroundColor", backgroundColor, obj)
  stringValueCheck("backgroundImage", backgroundImage, obj)
  stringValueCheck("backgroundRepeat", backgroundRepeat, obj)
  pixelValueCheck("backgroundPosition", backgroundPosition, obj)
  pixelValueCheck("backgroundSize", backgroundSize, obj)
}

const checkBroderProps = (props: BorderProps, obj: CSSProperties) => {
  const attrs = ["Width", "Style", "Color"]
  directions.forEach(direction => {
    attrs.forEach(attr => {
      const k = "border" + direction + attr
      const v = (props as any)[k]
      if (v !== void 0 && (typeof v === "number" || typeof v === "string")) {
        pixelValueCheck(k, v, obj)
      }
    })
  })
}

const checkTextProps = (props: TextBoxProps, obj: CSSProperties) => {
  const { lineHeight, color } = props
  pixelValueCheck("lineHeight", lineHeight, obj)
  stringValueCheck("color", color, obj)
}

const checkRoundProps = (props: RoundProps, obj: CSSProperties) => {
  const { round } = props
  if (round === true) {
    pixelValueCheck("borderRadius", "50%", obj)
  } else if (round === false) {
    pixelValueCheck("borderRadius", "none", obj)
  } else {
    pixelValueCheck("borderRadius", round, obj)
  }
}

const checkDescProps = (props: DescProps, obj: CSSProperties) => {
  const { overflow, cursor, pointer } = props
  if (typeof overflow === "string") {
    stringValueCheck("overflow", overflow, obj)
  } else if (
    typeof overflow === "object" &&
    overflow instanceof Array &&
    overflow.length
  ) {
    stringValueCheck("overflow", overflow[0], obj)
    stringValueCheck("overflow", overflow[1] || overflow[0], obj)
  }
  if (pointer) {
    stringValueCheck("cursor", "pointer", obj)
  }
  stringValueCheck("cursor", cursor, obj)
}

export function convertPropsToStyleObject(props: BoxStyleProps) {
  const obj: any = {}
  checkExtendedFlexProps(props as ExtendedFlexProps, obj)
  checkFlexProps(props as FlexProps, obj)
  checkFlexItemProps(props as FlexItemProps, obj)
  checkMultiPixelProps(props as PaddingProps & BorderProps & MarginProps, obj)
  checkBroderProps(props as BorderProps, obj)
  checkSizeProps(props as SizeProps, obj)
  checkBackgroudProps(props as BackgroudProps, obj)
  checkRoundProps(props as RoundProps, obj)
  checkDescProps(props as DescProps, obj)
  checkTextProps(props as TextBoxProps, obj)
  return obj
}
