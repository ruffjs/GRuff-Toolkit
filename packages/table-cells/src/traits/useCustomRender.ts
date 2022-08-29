import { computed } from "vue"

export default function useCustomRender(props: {
  index: number
  column: AnyRecord
  record: AnyRecord
  text: any
}) {
  return computed(() => {
    if (props.column.customRender) {
      const text = props.column.customRender({
        text: props.text,
        record: props.record,
        column: props.column,
      })
      return text
    }
    return props.text
  })
}
