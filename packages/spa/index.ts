import AnimateKeepAlivePageRouter from "./src/runtime/router/components/AnimateKeepAlivePageRouter.vue"
import AnimatePageRouter from "./src/runtime/router/components/AnimatePageRouter.vue"
import KeepAlivePageRouter from "./src/runtime/router/components/KeepAlivePageRouter.vue"
import PageRouter from "./src/runtime/router/components/PageRouter.vue"

export const AnimateKeepAliveRouter = AnimateKeepAlivePageRouter
export const AnimateRouter = AnimatePageRouter
export const KeepAliveRouter = KeepAlivePageRouter
export const DirectRouter = PageRouter

import components from "./src/components"

export const Application = components.Application
export const DualModesView = components.DualModesView
export const MultipleDevicesView = components.MultipleDevicesView
