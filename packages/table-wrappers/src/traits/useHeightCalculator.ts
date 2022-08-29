import { onMounted, onUnmounted, ref } from "vue"

export default function useHeightCalculator(defaultBodyHeight: number = 400) {
  const tableWrapper = ref<HTMLElement | null>(null)
  const bodyHeight = ref(defaultBodyHeight)

  const updatebodyHeight = () => {
    if (tableWrapper.value) {
      // console.log(tableWrapper.value);
      const theadHeight =
        tableWrapper.value.querySelector("thead")?.offsetHeight || 0
      bodyHeight.value =
        (tableWrapper.value?.offsetHeight || 0) - theadHeight ||
        defaultBodyHeight
    }
  }

  onMounted(() => {
    updatebodyHeight()
    window.addEventListener("resize", updatebodyHeight, false)
  })
  onUnmounted(() => {
    window.removeEventListener("resize", updatebodyHeight)
  })

  return {
    tableWrapper,
    bodyHeight,
  }
}
