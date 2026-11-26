import { readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
const manifest = JSON.parse(
  await readFile(join(root, 'assets-src', 'photos', 'manifest.json'), 'utf8')
)
const qseries = await readFile(
  join(root, 'docs', '.vitepress', 'data', 'modules', 'qseries.ts'),
  'utf8'
)

const models = new Map()
for (const match of qseries.matchAll(/id:\s*'([^']+)'[\s\S]*?model:\s*'([^']+)'/g)) {
  models.set(match[1], match[2])
}

const lines = [
  "import type { Loc } from './families'",
  '',
  'export type ModulePhotoFields = {',
  '  photo: string',
  '  photoThumb: string',
  '  photoAlt: Loc',
  '  photoCredit: string',
  '}',
  '',
  'export const modulePhotos: Record<string, ModulePhotoFields> = {'
]

for (const [id, record] of Object.entries(manifest)) {
  if (!record.verifiedModel) continue
  const model = models.get(id) ?? id.toUpperCase()
  lines.push(`  '${id}': {`)
  lines.push(`    photo: '/img/modules/${id}.webp',`)
  lines.push(`    photoThumb: '/img/modules/${id}-thumb.webp',`)
  lines.push(`    photoAlt: {`)
  lines.push(`      vi: '${model} — ảnh sản phẩm chính hãng',`)
  lines.push(`      en: '${model} — manufacturer product photo'`)
  lines.push('    },')
  lines.push(`    photoCredit: '${record.page}'`)
  lines.push('  },')
}

lines.push('}', '')
await writeFile(join(root, 'docs', '.vitepress', 'data', 'photos.ts'), lines.join('\n'))
console.log(`photos.ts: ${Object.values(manifest).filter((r) => r.verifiedModel).length} entries`)
