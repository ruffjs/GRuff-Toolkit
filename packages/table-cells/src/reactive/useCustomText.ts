import { computed } from "vue";

export default function useCustomText(props: {
  index: number;
  column: AnyRecord;
  record: AnyRecord;
  text: any;
}) {
  return computed(() => {
    if (typeof props.column.rfTextRender === "function") {
      const text = props.column.rfTextRender({
        text: props.text,
        record: props.record,
        column: props.column,
      });
      if (typeof text === "string") {
        return text;
      }
    }
    return props.text || "-";
  });
}
