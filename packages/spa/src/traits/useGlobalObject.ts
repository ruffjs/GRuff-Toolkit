import { ComponentInternalInstance, getCurrentInstance } from "vue"

export default function useGlobalObject() {
  const { app: vueApp } = (getCurrentInstance() as ComponentInternalInstance)
    .appContext
  return {
    vueApp,
  }
}
