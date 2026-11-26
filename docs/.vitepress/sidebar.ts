import { families } from './data/families'
import { modules, type ModuleDef } from './data/modules'
import { qModules, Q_KINDS, Q_KIND_LABEL } from './data/modules/qseries'

type Group = { key: string; modules: ModuleDef[] }

function groupModules(list: ModuleDef[], locale: 'vi' | 'en'): Group[] {
  const groups: Group[] = []
  for (const module of list) {
    const key = module.group[locale]
    let group = groups.find((entry) => entry.key === key)
    if (!group) {
      group = { key, modules: [] }
      groups.push(group)
    }
    group.modules.push(module)
  }
  return groups
}

export function sidebar(locale: 'vi' | 'en') {
  const prefix = locale === 'en' ? '/en' : ''

  function buildKindTree() {
    return Q_KINDS.map((kind) => ({
      text: Q_KIND_LABEL[kind][locale],
      collapsed: true,
      items: qModules
        .filter((entry) => entry.kind === kind)
        .map((entry) => ({
          text: entry.model,
          link: `${prefix}/q/modules/m/${entry.id}`
        }))
    }))
  }

  return families
    .filter((family) => family.status !== 'planned')
    .sort((a, b) => a.order - b.order)
    .map((family) => {
      const familyModules = modules.filter((module) => module.familyId === family.id)
      return {
        text: family.name[locale],
        collapsed: false,
        items: [
          {
            text: locale === 'vi' ? 'Tổng quan dòng' : 'Family overview',
            link: `${prefix}/${family.id}/`
          },
          ...groupModules(familyModules, locale).map((group) => ({
            text: group.key,
            collapsed: false,
            items: group.modules.flatMap((module) => {
              const pages = module.pages.map((page) =>
                family.id === 'q' && page.slug === 'guides'
                  ? {
                      text: page.title[locale],
                      link: `${prefix}/${family.id}/${module.slug}/${page.slug}/`,
                      collapsed: true,
                      items: buildKindTree()
                    }
                  : {
                      text: page.title[locale],
                      link: `${prefix}/${family.id}/${module.slug}${page.slug ? '/' + page.slug : '/'}`
                    }
              )
              const collapsed =
                family.id === 'q' && (module.id === 'qd75d4' || module.id === 'qd75-drivers')
              const node = { text: module.name[locale], collapsed, items: pages }

              return [node]
            })
          }))
        ]
      }
    })
}