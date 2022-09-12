<script lang="tsx">
import { defineComponent } from "vue";
import * as AntdIconsVue from "@ant-design/icons-vue";
import { pixelValueCheck, stringValueCheck } from "./style";

const {
  default: SvgIcon,
  createFromIconfontCN,
  setTwoToneColor,
  getTwoToneColor,
  ...AntdIcons
} = AntdIconsVue;

const iconTypes = {
  antd: AntdIcons,
};
type IconType = keyof typeof iconTypes;

type IconName = keyof typeof iconTypes[IconType];

export default defineComponent({
  name: "RuffIcon",
  props: {
    type: [String],
    name: [String],
    size: [String, Number],
    rotate: [Number],
    spin: [Boolean],
    color: [String],
    twoToneColor: [String],
  },
  render(props: any) {
    const type: IconType = props.type in iconTypes ? props.type : "antd";
    const Icons = iconTypes[type];

    const name = (props.name?.replace(/((^|-)([a-z]))/g, (c: string) =>
      c.replace("-", "").toUpperCase()
    ) || "") as IconName;

    // console.log(name, props);

    if (name in Icons) {
      const Icon = Icons[name];
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
