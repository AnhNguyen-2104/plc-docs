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
import DriverPhoto from './DriverPhoto.vue'
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
    app.component('DriverPhoto', DriverPhoto)
  }
} satisfies Theme

export { ParamTable, CodeTabs, VerifiedOn, FamilyMatrix, SourceRef, WiringDiagram, LadderDiagram, DriverPhoto }
