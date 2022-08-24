<script lang="tsx">
/* eslint-disable no-unused-vars */
import { defineComponent } from "vue";
import * as AntdIcons from "@ant-design/icons-vue";
import { pixelValueCheck, stringValueCheck } from "./style";

const {
  default: SvgIcon,
  createFromIconfontCN,
  setTwoToneColor,
  getTwoToneColor,
  ...Icons
} = AntdIcons;

type IconType = keyof typeof Icons;

export default defineComponent({
  name: "BIcon",
  props: {
    type: [String],
    size: [String, Number],
    rotate: [Number],
    spin: [Boolean],
    color: [String],
    twoToneColor: [String],
  },
  render(props: any) {
    const type = props.type.replace(/((^|-)([a-z]))/g, (c: string) =>
      c.replace("-", "").toUpperCase()
    );

    if (type in Icons) {
      const Icon = Icons[type as IconType];
      const styleObj = {};
      pixelValueCheck("fontSize", props.size, styleObj);
      stringValueCheck("color", props.color, styleObj);
      return (
        <Icon
          style={styleObj}
          rotate={props.rotate}
          spin={props.spin}
          twoToneColor={props.twoToneColor}
        ></Icon>
      );
    }
    return "";
  },
});
</script>
