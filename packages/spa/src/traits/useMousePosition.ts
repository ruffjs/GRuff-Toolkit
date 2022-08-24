import { onMounted, ref } from "vue"

export default function useMousePosition() {
  let x = ref(0)
  let y = ref(0)

  onMounted(() => {
    window.addEventListener("mousemove", e => {
      x.value = e.pageX
      y.value = e.pageY
    })
  })
  return { x, y } // x, y可以在组件中使用
}
