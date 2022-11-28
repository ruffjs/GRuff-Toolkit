import { Input } from "ant-design-vue";
import { VNode, h, Component, VNodeProps } from "vue";

type Render = (props: VNodeProps, context: any) => VNode;

const widgets = new Map<
  string,
  {
    render: Render;
    defaults: {};
  }
>();

export function registerComponet(
  widgetname: string,
  component: Component,
  defaults: AnyRecord
) {}

export function registerFormWidgets(
  widgetname: string,
  render: Render,
  defaults: AnyRecord
) {
  widgets.set(widgetname, {
    render,
    defaults,
  });
}

export const FormWidget = (props: VNodeProps, context: any) => {
  const { widget: name, onChange, ...others } = props as any;
  const widget = widgets.get(name);
  if (widget) {
    return widget?.render(
      {
        ...(widget?.defaults || {}),
        ...others,
        onChange(...args: any[]) {
          onChange && onChange(...args);
        },
      },
      context
    );
  }
  return h("script", { type: "error-output" }, "Unknown Widget");
};

export const WithWidgetFormItem = () => {};

registerFormWidgets(
  "test",
  (props: VNodeProps, _: any) => {
    return h(Input, props);
  },
  {}
);
