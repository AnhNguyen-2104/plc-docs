import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
const dataFile = join(root, 'docs/.vitepress/data/modules/qseries.ts')

const KIND_LABEL = {
  cpu: { vi: 'CPU', en: 'CPU' },
  power: { vi: 'Module nguồn', en: 'Power supply module' },
  base: { vi: 'Base unit', en: 'Base unit' },
  input: { vi: 'Module vào số', en: 'Digital input module' },
  output: { vi: 'Module ra số', en: 'Digital output module' },
  combined: { vi: 'Module kết hợp vào/ra', en: 'Combined I/O module' },
  analog: { vi: 'Module tương tự', en: 'Analog module' },
  counter: { vi: 'Module đếm xung', en: 'High-speed counter module' },
  network: { vi: 'Module truyền thông', en: 'Network module' },
  motion: { vi: 'Module chuyển động', en: 'Motion module' }
}

function extractObjects(text, startMarker) {
  const start = text.indexOf(startMarker)
  if (start === -1) throw new Error(`Cannot find ${startMarker}`)
  const assign = text.indexOf('= [', start)
  if (assign === -1) throw new Error(`Cannot find array assignment after ${startMarker}`)
  const open = text.indexOf('[', assign)
  const objects = []
  let depth = 0
  let inQuote = false
  let startObj = -1

  for (let i = open + 1; i < text.length; i += 1) {
    const ch = text[i]
    if (ch === "'") {
      if (inQuote && text[i - 1] === '\\') continue
      inQuote = !inQuote
      continue
    }
    if (inQuote) continue
    if (ch === '{') {
      if (depth === 0) startObj = i
      depth += 1
    } else if (ch === '}') {
      depth -= 1
      if (depth === 0 && startObj !== -1) {
        objects.push(text.slice(startObj, i + 1))
        startObj = -1
      }
    } else if (ch === ']' && depth === 0) {
      break
    }
  }

  return objects
}

function str(obj, key) {
  const re = new RegExp(`\\b${key}:\\s*'([^']*)'`)
  const match = obj.match(re)
  return match ? match[1] : ''
}

function loc(obj, key) {
  const re = new RegExp(`${key}:\\s*\\{\\s*vi:\\s*'([^']*)',\\s*en:\\s*'([^']*)'`)
  const match = obj.match(re)
  return match ? { vi: match[1], en: match[2] } : { vi: '', en: '' }
}

function manualRef(obj) {
  const re = /manual:\s*\{\s*doc:\s*'([^']*)',\s*page:\s*'([^']*)'/
  const match = obj.match(re)
  return match ? { doc: match[1], page: match[2] } : { doc: '', page: '' }
}

function manualShort(key) {
  const match = key.match(/^([a-z]+)(\d+)(.*)$/)
  if (!match) return key.toUpperCase()
  return `${match[1].toUpperCase()}-${match[2]}${match[3].toUpperCase()}`
}

function parseModules(text) {
  const objects = extractObjects(text, 'const baseModules')
  return objects.map((obj) => ({
    id: str(obj, 'id'),
    model: str(obj, 'model'),
    kind: str(obj, 'kind'),
    name: loc(obj, 'name'),
    page: str(obj, 'page'),
    status: str(obj, 'status'),
    manual: manualRef(obj)
  }))
}

function pageContent(module, locale) {
  const kind = KIND_LABEL[module.kind] ?? { vi: module.kind, en: module.kind }
  const title = `${module.model} — ${kind[locale]}`
  const source = manualShort(module.manual.doc)
  return `---
title: "${title}"
family: q
module: module-${module.id}
status: draft
source: ${source}
---

<ModulePage id="${module.id}" />
`
}

const text = await readFile(dataFile, 'utf8')
const modules = parseModules(text).filter((module) => module.id && module.model && module.kind)

if (modules.length === 0) throw new Error('No modules parsed from qseries.ts')

const seen = new Set()
for (const module of modules) {
  if (seen.has(module.id)) throw new Error(`Duplicate module id: ${module.id}`)
  seen.add(module.id)
  if (!KIND_LABEL[module.kind]) console.warn(`Unknown kind '${module.kind}' for ${module.id}`)

  const targets = [
    join(root, 'docs/q/modules/m', `${module.id}.md`),
    join(root, 'docs/en/q/modules/m', `${module.id}.md`)
  ]

  for (const [index, target] of targets.entries()) {
    const content = pageContent(module, index === 0 ? 'vi' : 'en')
    await mkdir(dirname(target), { recursive: true })
    let existing = null
    try {
      existing = await readFile(target, 'utf8')
    } catch {
      existing = null
    }
    if (existing === content) continue
    await writeFile(target, content, 'utf8')
  }
}

console.log(`gen-module-pages: ${modules.length} module(s), ${modules.length * 2} page(s) up to date.`)
