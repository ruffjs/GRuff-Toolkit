<script lang="tsx">
import { defineComponent, reactive, toRefs, useSlots } from "vue";
import { boxPropType } from "./propTypes";
import Box, { BoxProps } from "./Box.vue";
import { trimPropsObject, convertNummericToPixel } from "../utils/style";

export type TouchableBoxNonStyleProps = {};
export type TouchableBoxProps = BoxProps & TouchableBoxNonStyleProps;

const touchableBoxPropType = {
  ...boxPropType,
  top: [Number, String],
  right: [Number, String],
  bottom: [Number, String],
  left: [Number, String],
};

export default defineComponent({
  props: touchableBoxPropType,
  render(props: any) {
    const slots = useSlots();

    const cssProps: any = {
      position: "absolute",
    };

    if (props.top) {
      cssProps.top = convertNummericToPixel(props.top);
    }
    if (props.right) {
      cssProps.right = convertNummericToPixel(props.right);
    }
    if (props.bottom) {
      cssProps.bottom = convertNummericToPixel(props.bottom);
    }
    if (props.left) {
      cssProps.left = convertNummericToPixel(props.left);
    }
    const boxProps = {
      ...trimPropsObject(props, boxPropType),
      direction: props.direction || "row",
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
<style lang="scss" scoped></style>
