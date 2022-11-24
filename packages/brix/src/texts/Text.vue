<script lang="tsx">
/* eslint-disable no-unused-vars */
import { CSSProperties, defineComponent, useSlots } from "vue";
import { convertCssToStyleObject } from "../utils/style";
import { textPropType } from "./propTypes";
import { TextStyleProps, convertPropsToStyleObject } from "./style";

export type TextNonStyleProps = {
  style?: CSSProperties;
  css?: string;
  class?: string;
};
export type TextProps = TextStyleProps & TextNonStyleProps;

export default defineComponent({
  name: "BText",
  props: textPropType,
  render(props: any) {
    const slots = useSlots();
    // const { style, css, class: className, ...rest } = toRefs(props);
    const styleObj = convertPropsToStyleObject(
      props as TextStyleProps,
      textPropType
    );
    const cssObj = props.css ? convertCssToStyleObject(props.css) : {};
    // console.log(props, styleObj);
    return (
      <span
        class={props.class ? `brix-text ${props.class}` : "brix-text"}
        style={{
          ...styleObj,
          ...cssObj,
          ...(props.style || {}),
        }}
      >
        {slots.default ? slots.default() : ""}
      </span>
    );
  },
});
</script>
<style lang="scss" scoped>
.brix-text {
  display: inline;
}
</style>
