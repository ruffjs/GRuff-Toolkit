<script lang="tsx">
import { CSSProperties, defineComponent, toRefs, useSlots } from "vue";
import { convertCssToStyleObject } from "../utils/style";
import { boxPropType } from "./propTypes";
import { BoxStyleProps, convertPropsToStyleObject } from "./style";

export type BoxNonStyleProps = {
  style?: CSSProperties;
  css?: string;
  class?: string;
};
export type BoxProps = BoxStyleProps & BoxNonStyleProps;

export default defineComponent({
  props: boxPropType,
  render(props: BoxProps) {
    const slots = useSlots();
    const styleObj = convertPropsToStyleObject(props as BoxStyleProps);
    const cssObj = props.css ? convertCssToStyleObject(props.css) : {};

    return (
      <div
        class={props.class ? `bricky-box ${props.class}` : "bricky-box"}
        style={{
          ...styleObj,
          ...cssObj,
          ...(props.style || {}),
        }}
      >
        {slots.default ? slots.default() : ""}
      </div>
    );
  },
});
</script>
<style lang="scss" scoped>
.bricky-box {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}
</style>
