import {
  bgPropType,
  borderPropType,
  descPropType,
  flexItemPropType,
  flexPropType,
  marginPropType,
  paddingPropType,
  roundPropType,
  sizePropType,
  TextBoxPropType,
} from "../utils/propTypes"

const stylePropType = {
  ...flexPropType,
  ...flexItemPropType,
  ...paddingPropType,
  ...borderPropType,
  ...marginPropType,
  ...roundPropType,
  ...sizePropType,
  ...descPropType,
  ...TextBoxPropType,
  ...bgPropType,
}

const nonStylePropType = {
  style: [Object],
  css: [String],
  class: [String, Object],
}

export const boxPropType = {
  ...stylePropType,
  ...nonStylePropType,
}
