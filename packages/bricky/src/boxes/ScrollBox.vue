<script lang="tsx">
import { CSSProperties, defineComponent, useSlots } from "vue";
import { boxPropType } from "./propTypes";
import Box, { BoxProps } from "./Box.vue";
import { trimPropsObject } from "../utils/style";

export type ScrollBoxNonStyleProps = {
  both: boolean | string;
  x: boolean | string;
  y: boolean | string;
};
export type ScrollBoxProps = BoxProps & ScrollBoxNonStyleProps;

const scrollBoxPropType = {
  ...boxPropType,
  both: [Boolean, String],
  x: [Boolean, String],
  y: [Boolean, String],
};

export default defineComponent({
  props: scrollBoxPropType,
  render(props: ScrollBoxProps) {
    const slots = useSlots();

    const cssProps: CSSProperties = {};
    if (props.both) {
      cssProps.overflowX = "auto";
      cssProps.overflowY = "auto";
    } else if (props.x) {
      cssProps.overflowX = "auto";
      cssProps.overflowY = "hidden";
    } else {
      cssProps.overflowX = "hidden";
      cssProps.overflowY = "auto";
    }

    const boxProps = {
      ...trimPropsObject(props, boxPropType),
      class: props.class
        ? `bricky-scroll-box ${props.class}`
        : "bricky-scroll-box",
      style: {
        ...cssProps,
        ...props.style,
      },
    } as any;
    // console.log(boxProps)
    return <Box {...boxProps}>{slots.default ? slots.default() : ""}</Box>;
  },
});
</script>
<style lang="scss" scoped>
.bricky-scroll-box {
  width: 100%;
  height: 100%;
}
</style>
