import { families } from './data/families'
import { modules } from './data/modules'

export function sidebar(locale: 'vi' | 'en') {
  const prefix = locale === 'en' ? '/en' : ''

  return families
    .filter((family) => family.status !== 'planned')
    .sort((a, b) => a.order - b.order)
    .map((family) => ({
      text: family.name[locale],
      collapsed: false,
      items: [
        {
          text: locale === 'vi' ? 'Tổng quan dòng' : 'Family overview',
          link: `${prefix}/${family.id}/`
        },
        ...modules
          .filter((module) => module.familyId === family.id)
          .map((module) => ({
            text: module.name[locale],
            collapsed: false,
            items: module.pages.map((page) => ({
              text: page.title[locale],
              link: `${prefix}/${family.id}/${module.slug}${page.slug ? '/' + page.slug : '/'}`
            }))
          }))
      ]
    }))
}
