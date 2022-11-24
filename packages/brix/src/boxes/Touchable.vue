<script lang="tsx">
import { defineComponent, reactive, toRefs, useSlots } from "vue";
import { boxPropType } from "./propTypes";
import Box, { BoxProps } from "./Box.vue";
import { trimPropsObject } from "../utils/style";

export type TouchableBoxNonStyleProps = {};
export type TouchableBoxProps = BoxProps & TouchableBoxNonStyleProps;

const touchableBoxPropType = {
  ...boxPropType,
};

export default defineComponent({
  props: touchableBoxPropType,
  render(props: TouchableBoxProps) {
    const slots = useSlots();

    const cssProps = {
      "--local-hghilight-color": "unset",
    };

    const boxProps = {
      ...trimPropsObject(props, boxPropType),
      direction: props.direction || "row",
      class: props.class
        ? `brix-touchable-box ${props.class}`
        : "brix-touchable-box",
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
.brix-touchable-box {
  cursor: pointer;
  &:hover {
    background-color: var(--local-hghilight-color);
  }
}
</style>
