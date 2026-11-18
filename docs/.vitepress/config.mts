import { defineConfig } from 'vitepress'
import { sidebar } from './sidebar'

export default defineConfig({
  title: 'PLC Handbook',
  titleTemplate: ':title | PLC Handbook',
  description: 'Cẩm nang lập trình PLC — MELSEC Q, module vị trí QD75D4, song ngữ Việt/Anh.',
  base: process.env.BASE ?? '/',
  cleanUrls: true,
  ignoreDeadLinks: false,
  lastUpdated: true,
  locales: {
    root: { label: 'Tiếng Việt', lang: 'vi' },
    en:   { label: 'English',   lang: 'en', link: '/en/' }
  },
  themeConfig: {
    search: {
      provider: 'local',
      options: { locales: { root: { translations: { button: { buttonText: 'Tìm kiếm', buttonAriaLabel: 'Tìm kiếm' } } } } }
    },
    locales: {
      root: {
        label: 'Tiếng Việt',
        nav: [{ text: 'MELSEC Q', link: '/q/' }, { text: 'So sánh dòng PLC', link: '/compare/' }],
        sidebar: sidebar('vi'),
        outline: { label: 'Trong trang này', level: [2, 3] },
        docFooter: { prev: 'Trước', next: 'Sau' },
        returnToTopLabel: 'Lên đầu'
      },
      en: {
        label: 'English',
        nav: [{ text: 'MELSEC Q', link: '/en/q/' }, { text: 'PLC comparison', link: '/en/compare/' }],
        sidebar: sidebar('en'),
        outline: { label: 'On this page', level: [2, 3] }
      }
    }
  }
})
