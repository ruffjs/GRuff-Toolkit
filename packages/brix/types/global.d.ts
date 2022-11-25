type Booleanish = boolean | "true" | "false"
type Numberish = number | string

interface FlexProps {
  alignContent?: string
  alignItems?: string
  flexDirection?: string
  flexWrap?: string
  justifyContent?: string
  justifyItems?: string
  gap?: Numberish
}

interface ExtendedFlexProps extends FlexProps {
  row?: boolean | string
  column?: boolean | string
  direction?: string
  center?: boolean | string
  align?: string | string[]
  justify?: string
  items?: string
}

interface FlexItemProps {
  alignSelf?: string
  flex?: Numberish
  order?: number
}

interface PaddingProps {
  padding?: Numberish | Numberish[]
  paddingV?: Numberish
  paddingH?: Numberish
  paddingTop?: Numberish
  paddingRight?: Numberish
  paddingBottom?: Numberish
  paddingLeft?: Numberish
  paddingBlock?: Numberish | Numberish[]
  paddingInline?: Numberish | Numberish[]
  paddingBlockStart?: Numberish
  paddingBlockEnd?: Numberish
  paddingInlineStart?: Numberish
  paddingInlineEnd?: Numberish
}

interface BorderProps {
  border?: Numberish | Numberish[]
  borderV?: Numberish | Numberish[]
  borderH?: Numberish | Numberish[]
  borderTop?: Numberish | Numberish[]
  borderTopWidth?: Numberish
  borderTopColor?: string
  borderTopStyle?: string
  borderRight?: Numberish | Numberish[]
  borderRightWidth?: Numberish
  borderRightColor?: string
  borderRightStyle?: string
  borderBottom?: Numberish | Numberish[]
  borderBottomWidth?: Numberish
  borderBottomColor?: string
  borderBottomStyle?: string
  borderLeft?: Numberish | Numberish[]
  borderLeftWidth?: Numberish
  borderLeftColor?: string
  borderLeftStyle?: string
  borderBlock?: Numberish | Numberish[]
  borderInline?: Numberish | Numberish[]
  borderBlockStart?: Numberish | Numberish[]
  borderBlockStartWidth?: Numberish
  borderBlockStartColor?: string
  borderBlockStartStyle?: string
  borderBlockEnd?: Numberish | Numberish[]
  borderBlockEndWidth?: Numberish
  borderBlockEndColor?: string
  borderBlockEndStyle?: string
  borderInlineStart?: Numberish | Numberish[]
  borderInlineStartWidth?: Numberish
  borderInlineStartColor?: string
  borderInlineStartStyle?: string
  borderInlineEnd?: Numberish | Numberish[]
  borderInlineEndWidth?: Numberish
  borderInlineEndColor?: string
  borderInlineEndStyle?: string
}

interface MarginProps {
  margin?: Numberish | Numberish[]
  marginV?: Numberish
  marginH?: Numberish
  marginTop?: Numberish
  marginRight?: Numberish
  marginBottom?: Numberish
  marginLeft?: Numberish
  marginBlock?: Numberish | Numberish[]
  marginInline?: Numberish | Numberish[]
  marginBlockStart?: Numberish
  marginBlockEnd?: Numberish
  marginInlineStart?: Numberish
  marginInlineEnd?: Numberish
}

interface RoundProps {
  round?: Numberish | boolean
  roundTop?: Numberish
  roundRight?: Numberish
  roundBottom?: Numberish
  roundLeft?: Numberish
  roundTL?: Numberish
  roundTR?: Numberish
  roundBL?: Numberish
  roundBR?: Numberish
  roundSS?: Numberish
  roundSE?: Numberish
  roundES?: Numberish
  roundEE?: Numberish
}

interface SizeProps {
  minWidth?: Numberish
  width?: Numberish
  maxWidth?: Numberish
  minHeight?: Numberish
  height?: Numberish
  maxHeight?: Numberish
}

interface BackgroudProps {
  background?: string
  backgroundColor?: string
  backgroundImage?: string
  backgroundPosition?: Numberish | Numberish[]
  backgroundSize?: Numberish | Numberish[]
  backgroundRepeat?: string
}

interface DescProps {
  overflow?: string | string[]
  cursor?: string
  pointer?: boolean
}

type TextFontProps = {
  family?: string
  size?: Numberish
  weight?: Numberish
  style?: string
  smooth?: string
  stretch?: string
  variant?: string
  kerning?: string
  synthesis?: string
  opticalSizing?: string
}

type TextTypeProps = {
  align?: string
  alignLast?: string
  decoration?: string
  descStyle?: string
  descWidth?: Numberish
  combineUpright?: string
  emphasis?: string
  emphasisColor?: string
  emphasisPosition?: string
  emphasisStyle?: string
  indent?: Numberish
  justify?: string
  orientation?: string
  overflow?: string
  rendering?: string
  shadow?: string
  adjust?: string
  transform?: string
  underlineOffset?: string
  underlinePosition?: string
}

type TextBoxProps = {
  lineHeight?: Numberish
  color?: string
  spacing?: Numberish
}
