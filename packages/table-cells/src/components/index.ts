import { h } from "vue";
import HiddenCells from "./HiddenCells.vue";

import Actions from "./ActionsCell.vue";
import Async from "./AsyncCell.vue";
import ColorfulTag from "./ColorfulTagCell.vue";
import Image from "./ImageCell.vue";
import Link from "./LinkCell.vue";
import StateTag from "./StateTagCell.vue";
import WithTooltipCell from "./WithTooltipCell.vue";
import { registerCell, registerComponet } from "../utils/cell";

export default {
  HiddenCells,
  Actions,
  Async,
  ColorfulTag,
  Image,
  Link,
  StateTag,
  WithTooltipCell,
};

export const renderActionsCell = ({ column, record }: RenderContext) =>
  h(Actions, { column, record });
registerCell("ruff-actions-cell", renderActionsCell, {
  dataIndex: "actions_" + Date.now(),
  actions: (record: AnyRecord) => [],
});

export const renderLinkCell = registerComponet("ruff-link-cell", Link, {
  disabled(record: AnyRecord) {
    return false;
  },
  action(record: AnyRecord) {
    console.log("default action handle");
  },
});

export const renderWithTooltipCell = registerComponet(
  "ruff-tooltip-cell",
  WithTooltipCell,
  {
    ellipsis: true,
  }
);
