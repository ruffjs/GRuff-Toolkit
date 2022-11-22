import { Component, createVNode, VNode } from "vue";

type Render = (cxt: RenderContext) => VNode;

const cells = new Map<
  string,
  {
    render: Render;
    defaults: {};
  }
>();

export function registerComponet(
  cellname: string,
  component: Component,
  defaults: AnyRecord
): Render {
  if (cells.has(cellname)) {
    throw new Error("Cannot register an existed cell.");
  }
  if (typeof component === "object") {
    registerCell(
      cellname,
      ({ index, column, text, record }) => {
        return createVNode(component, { index, column, text, record });
      },
      defaults
    );
    return cells.get(cellname)!.render;
  }
  throw new Error("Component must be an object.");
}

export function registerCell(
  cellname: string,
  render: Render,
  defaults: AnyRecord
): boolean {
  if (cells.has(cellname)) {
    throw new Error("Cannot register an existed cell.");
  }
  if (typeof render === "function") {
    cells.set(cellname, {
      render,
      defaults: defaults || {},
    });
    return true;
  }
  throw new Error("Render method of cell must be a function.");
}

export function withCell(cellname: string, props: AnyRecord) {
  const cell = cells.get(cellname);
  if (cell) {
    return {
      ...cell.defaults,
      ...props,
      customRender: cell.render,
    };
  }
  return props;
}
