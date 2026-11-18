import { readdir, readFile, stat } from 'node:fs/promises'
import { join, relative, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

const docsDir = fileURLToPath(new URL('../docs', import.meta.url))
const SKIP = new Set(['.vitepress', 'public', 'node_modules'])
const VALID_STATUS = new Set(['draft', 'reviewed', 'verified'])

const pages = []

async function collect(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  for (const entry of entries) {
    if (SKIP.has(entry.name)) continue
    const full = join(dir, entry.name)
    if (entry.isDirectory()) {
      await collect(full)
    } else if (entry.name.endsWith('.md')) {
      pages.push(full)
    }
  }
}

function frontmatter(text) {
  if (!text.startsWith('---')) return { data: {}, body: text }
  const end = text.indexOf('\n---', 3)
  if (end === -1) return { data: {}, body: text }
  const raw = text.slice(3, end)
  const body = text.slice(end + 4).replace(/^\r?\n/, '')
  const data = {}
  for (const line of raw.split(/\r?\n/)) {
    const match = line.match(/^([A-Za-z0-9_-]+)\s*:\s*(.*)$/)
    if (!match) continue
    let value = match[2].trim()
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }
    data[match[1]] = value
  }
  return { data, body }
}

async function exists(path) {
  try {
    const info = await stat(path)
    return info.isFile()
  } catch {
    return false
  }
}

await collect(docsDir)
pages.sort()

const errors = []
const warnings = []

for (const file of pages) {
  const rel = relative(docsDir, file).split(sep).join('/')
  const text = await readFile(file, 'utf8')
  const { data, body } = frontmatter(text)

  if (!data.title || !data.family) {
    errors.push(`❌ ${rel}: missing frontmatter title/family`)
  }

  if (data.status !== undefined && !VALID_STATUS.has(data.status)) {
    errors.push(`❌ ${rel}: invalid status '${data.status}'`)
  }

  if (data.status === 'verified' && !(body.includes('<VerifiedOn') && body.includes('date="'))) {
    errors.push(`❌ ${rel}: verified requires <VerifiedOn ... date="...">`)
  }

  if (!rel.startsWith('en/')) {
    const counterpart = join(docsDir, 'en', rel)
    if (!(await exists(counterpart))) {
      warnings.push(`⚠️ ${rel}: no EN counterpart`)
    }
  }
}

for (const warning of warnings) console.warn(warning)
for (const error of errors) console.error(error)

console.log(
  `\nContent check: ${pages.length} page(s), ${errors.length} error(s), ${warnings.length} warning(s).`
)

process.exit(errors.length > 0 ? 1 : 0)
