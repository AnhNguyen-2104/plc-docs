import { withBase } from 'vitepress'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import ParamTable from './ParamTable.vue'
import CodeTabs from './CodeTabs.vue'
import VerifiedOn from './VerifiedOn.vue'
import FamilyMatrix from './FamilyMatrix.vue'
import SourceRef from './SourceRef.vue'
import WiringDiagram from './WiringDiagram.vue'
import LadderDiagram from './LadderDiagram.vue'
import PinMapDiagram from './PinMapDiagram.vue'
import ModuleMatrix from './ModuleMatrix.vue'
import ModuleBlockDiagram from './ModuleBlockDiagram.vue'
import SystemDiagram from './SystemDiagram.vue'
import IOWiringDiagram from './IOWiringDiagram.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.config.globalProperties.$withBase = withBase
    app.component('ParamTable', ParamTable)
    app.component('CodeTabs', CodeTabs)
    app.component('VerifiedOn', VerifiedOn)
    app.component('FamilyMatrix', FamilyMatrix)
    app.component('SourceRef', SourceRef)
    app.component('WiringDiagram', WiringDiagram)
    app.component('LadderDiagram', LadderDiagram)
    app.component('PinMapDiagram', PinMapDiagram)
    app.component('ModuleMatrix', ModuleMatrix)
    app.component('ModuleBlockDiagram', ModuleBlockDiagram)
    app.component('SystemDiagram', SystemDiagram)
    app.component('IOWiringDiagram', IOWiringDiagram)
  }
} satisfies Theme
export { ParamTable, CodeTabs, VerifiedOn, FamilyMatrix, SourceRef, WiringDiagram, LadderDiagram, PinMapDiagram, ModuleMatrix, ModuleBlockDiagram, SystemDiagram, IOWiringDiagram }
