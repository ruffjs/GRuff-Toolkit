import AnimateKeepAlivePageRouter from "./src/context/router/components/AnimateKeepAlivePageRouter.vue";
import AnimatePageRouter from "./src/context/router/components/AnimatePageRouter.vue";
import KeepAlivePageRouter from "./src/context/router/components/KeepAlivePageRouter.vue";
import PageRouter from "./src/context/router/components/PageRouter.vue";
import DemoPage from "./src/context/router/components/DemoPage.vue";

export const AnimateKeepAliveRouter = AnimateKeepAlivePageRouter;
export const AnimateRouter = AnimatePageRouter;
export const KeepAliveRouter = KeepAlivePageRouter;
export const DirectRouter = PageRouter;
export const PlaceholderPage = DemoPage;

import components from "./src/components";

export const Application = components.Application;
export const DualModesView = components.DualModesView;
export const MultipleDevicesView = components.MultipleDevicesView;
