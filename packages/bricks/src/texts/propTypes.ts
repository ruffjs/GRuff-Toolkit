import {
  marginPropType,
  TextBoxPropType,
  TextFontPropType,
  TextTypePropType,
} from "../utils/propTypes"

const stylePropType = {
  ...TextFontPropType,
  ...TextTypePropType,
  ...TextBoxPropType,
}

const nonStylePropType = {
  style: [Object],
  css: [String],
  class: [String, Object],
}

export const textPropType = {
  ...marginPropType,
  ...stylePropType,
  ...nonStylePropType,
}
