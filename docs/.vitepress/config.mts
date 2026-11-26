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
  head: [
    ['meta', { name: 'theme-color', content: '#1a56a0' }],
    ['meta', { property: 'og:site_name', content: 'PLC Handbook' }],
    ['meta', { property: 'og:type', content: 'website' }],
    [
      'meta',
      {
        property: 'og:image',
        content: 'https://anhnguyen-2104.github.io/plc-docs/img/og.webp'
      }
    ],
    ['meta', { property: 'og:image:width', content: '1200' }],
    ['meta', { property: 'og:image:height', content: '630' }]
  ],
  sitemap: { hostname: 'https://anhnguyen-2104.github.io/plc-docs/' },
  vite: { build: { reportCompressedSize: false } },
  markdown: {
    config(md) {
      md.core.ruler.after('inline', 'task-lists', (state) => {
        const tokens = state.tokens
        for (let i = 0; i < tokens.length; i++) {
          if (tokens[i].type !== 'inline') continue
          const parent = tokens[i - 1]
          if (!parent || parent.type !== 'paragraph_open') continue
          const listItem = tokens[i - 2]
          if (!listItem || listItem.type !== 'list_item_open') continue
          const m = /^\[([ xX])\]\s+/.exec(tokens[i].content)
          if (!m) continue
          tokens[i].content = tokens[i].content.slice(m[0].length)
          const children = tokens[i].children ?? []
          if (children[0] && children[0].type === 'text') {
            children[0].content = children[0].content.replace(/^\[([ xX])\]\s+/, '')
          }
          const checked = m[1].toLowerCase() === 'x'
          const box = new state.Token('html_inline', '', 0)
          box.content = `<span class="task-box${checked ? ' task-box-checked' : ''}" aria-hidden="true"></span>`
          tokens[i].children = [box, ...children]
          listItem.attrJoin('class', 'task-item')
        }
        return true
      })
    }
  },
  locales: {
    root: {
      label: 'Tiếng Việt',
      lang: 'vi',
      title: 'PLC Handbook',
      description: 'Cẩm nang lập trình PLC — MELSEC Q, module vị trí QD75D4, song ngữ Việt/Anh.',
      themeConfig: {
        nav: [{ text: 'Bắt đầu', link: '/q/start/' }, { text: 'MELSEC Q', link: '/q/' }, { text: 'So sánh dòng PLC', link: '/compare/' }],
        sidebar: sidebar('vi'),
        outline: { label: 'Trong trang này', level: [2, 3] },
        docFooter: { prev: 'Trước', next: 'Sau' },
        returnToTopLabel: 'Lên đầu'
      }
    },
    en: {
      label: 'English',
      lang: 'en',
      link: '/en/',
      title: 'PLC Handbook',
      description: 'A PLC programming handbook — MELSEC Q, QD75D4 positioning module, bilingual Vietnamese/English.',
      themeConfig: {
        nav: [{ text: 'Getting started', link: '/en/q/start/' }, { text: 'MELSEC Q', link: '/en/q/' }, { text: 'PLC comparison', link: '/en/compare/' }],
        sidebar: sidebar('en'),
        outline: { label: 'On this page', level: [2, 3] },
        docFooter: { prev: 'Previous', next: 'Next' },
        returnToTopLabel: 'Return to top'
      }
    }
  },
  themeConfig: {
    search: {
      provider: 'local',
      options: { locales: { root: { translations: { button: { buttonText: 'Tìm kiếm', buttonAriaLabel: 'Tìm kiếm' } } } } }
    }
  }
})
