import { onMounted, onUnmounted, onUpdated, reactive, ref, watch } from "vue";

export default function useHeightCalculator(defaultBodyHeight: number = 400) {
  const tableWrapper = ref<HTMLElement | null>(null);
  const bodyHeight = ref(defaultBodyHeight);
  const isScrollNeeded = ref(false);
  // const t = ref();

  const updatebodyHeight = () => {
    if (tableWrapper.value) {
      // console.log(tableWrapper.value);
      const theadHeight =
          tableWrapper.value.querySelector("thead")?.offsetHeight || 0,
        tbodyHeight =
          tableWrapper.value.querySelector("tbody")?.offsetHeight || 0;
      bodyHeight.value =
        (tableWrapper.value?.offsetHeight || 0) - theadHeight ||
        defaultBodyHeight;

      // console.log(tbodyHeight > bodyHeight.value);
      isScrollNeeded.value = tbodyHeight > bodyHeight.value;
    }
  };

  onUpdated(() => {
    updatebodyHeight();
  });

  onMounted(() => {
    updatebodyHeight();
    window.addEventListener("resize", updatebodyHeight, false);
    // t.value = setInterval(updatebodyHeight, 1000 * 5);
  });
  onUnmounted(() => {
    window.removeEventListener("resize", updatebodyHeight);
    // t.value && clearInterval(t.value);
  });

  return {
    tableWrapper,
    bodyHeight,
    isScrollNeeded,
  };
}
