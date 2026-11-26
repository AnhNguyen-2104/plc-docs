import { withBase } from 'vitepress'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import ParamTable from './ParamTable.vue'
import CodeTabs from './CodeTabs.vue'
import VerifiedOn from './VerifiedOn.vue'
import FamilyMatrix from './FamilyMatrix.vue'
import SourceRef from './SourceRef.vue'
import LadderDiagram from './LadderDiagram.vue'
import ModuleMatrix from './ModuleMatrix.vue'
import SystemDiagram from './SystemDiagram.vue'
import ManualFigure from './ManualFigure.vue'
import IoCatalog from './IoCatalog.vue'
import ModulePhoto from './ModulePhoto.vue'
import RackBuilder from './RackBuilder.vue'
import ModuleGallery from './ModuleGallery.vue'
import ModulePage from './ModulePage.vue'
import ModuleSectionNav from './ModuleSectionNav.vue'
import DriverWiring from './DriverWiring.vue'
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
    app.component('LadderDiagram', LadderDiagram)
    app.component('ModuleMatrix', ModuleMatrix)
    app.component('SystemDiagram', SystemDiagram)
    app.component('ManualFigure', ManualFigure)
    app.component('IoCatalog', IoCatalog)
    app.component('ModulePhoto', ModulePhoto)
    app.component('RackBuilder', RackBuilder)
    app.component('ModuleGallery', ModuleGallery)
    app.component('ModulePage', ModulePage)
    app.component('ModuleSectionNav', ModuleSectionNav)
    app.component('DriverWiring', DriverWiring)
  }
} satisfies Theme
export { ParamTable, CodeTabs, VerifiedOn, FamilyMatrix, SourceRef, LadderDiagram, ModuleMatrix, SystemDiagram, ManualFigure, IoCatalog, ModulePhoto, RackBuilder, ModuleGallery, ModulePage, ModuleSectionNav, DriverWiring }
