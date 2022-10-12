import { App as VueApp } from "vue"
import components from "../components"
import scaffolds from "../scaffolds"

export default function registerComponents(vueApp: VueApp) {
  vueApp.component("RApp", components.Application)
  vueApp.component("RApplication", components.Application)
  vueApp.component("RScaffold", scaffolds.Default)
  vueApp.component("RScaffoldDefault", scaffolds.Default)

  vueApp.component("RDualModes", components.DualModesView)
  vueApp.component("RMultiDevices", components.MultipleDevicesView)
  vueApp.component("RPermis", components.PermissionView)
  vueApp.component("RPermission", components.PermissionView)

  vueApp.component("RPage", components.PageView)
  vueApp.component("RFixedPage", components.FixedPageView)
  vueApp.component("RScrollPage", components.ScrollPageView)

  vueApp.component("RPanel", components.Panel)
  vueApp.component("RSpinPanel", components.SpinPanel)
  vueApp.component("RTitledPanel", components.TitledPanel)
}
