import { computed } from "vue";
import { useStore } from "vuex";

const titleElement: HTMLTitleElement =
  document.head.querySelector("title") ||
  (() => {
    const element = document.createElement("title");
    document.head.appendChild(element);
    return element;
  })();

export default function useGeneralSettings() {
  const store = useStore<RuffSPAState>();

  // 应用标题，显示于网页标题栏
  const getAppTitle = () => titleElement.innerHTML;
  const appTitle = computed(getAppTitle);
  const setAppTitle = (title: string) => {
    titleElement.innerHTML = title;
  };

  return {
    appTitle,
    getAppTitle,
    setAppTitle,
  };
}
