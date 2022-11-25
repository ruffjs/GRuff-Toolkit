import { ref, watch } from "vue"

export default function useTableWrapperProps(
  props: Readonly<AnyRecord>,
  slots: Readonly<AnyRecord>
) {
  const tableHeight = ref("auto")
  const paginationHeight = ref(0)

  watch(
    [props],
    () => {
      // console.log(props);
      let bottom = 0
      if (props.pagination) {
        paginationHeight.value = 45
        bottom = 45
      }
      if (typeof props.headerHeight === "number") {
        tableHeight.value = props.headerHeight
          ? `calc(100% - ${props.headerHeight + bottom + 10}px)`
          : `calc(100% - ${bottom}px)`
      } else {
        if (slots.header) {
          tableHeight.value = "auto"
        } else {
          tableHeight.value = `calc(100% - ${bottom}px)`
        }
      }
    },
    {
      immediate: true,
    }
  )

  return {
    tableHeight,
    paginationHeight,
  }
}
