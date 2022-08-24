import { useSlots } from "vue";
import FixedPageView from "./FixedPageView.vue"
import ScrollPageView from "./ScrollPageView.vue"

const PageView = (props: AnyRecord) => {
    const slots = useSlots();

    if (props.fixed) {
        return <FixedPageView {...props} >{slots}</FixedPageView>
    }
    return <ScrollPageView {...props} >{slots}</ScrollPageView>
}

export default PageView