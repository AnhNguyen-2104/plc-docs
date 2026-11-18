import { withBase } from 'vitepress'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import ParamTable from './ParamTable.vue'
import CodeTabs from './CodeTabs.vue'
import VerifiedOn from './VerifiedOn.vue'
import FamilyMatrix from './FamilyMatrix.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.config.globalProperties.$withBase = withBase
    app.component('ParamTable', ParamTable)
    app.component('CodeTabs', CodeTabs)
    app.component('VerifiedOn', VerifiedOn)
    app.component('FamilyMatrix', FamilyMatrix)
  }
} satisfies Theme

export { ParamTable, CodeTabs, VerifiedOn, FamilyMatrix }
