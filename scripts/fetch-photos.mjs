import { createHash } from 'node:crypto'
import { mkdir, readFile, writeFile, stat } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
const sourceDir = join(root, 'assets-src', 'photos')
const manifestPath = join(sourceDir, 'manifest.json')
const qseriesPath = join(root, 'docs', '.vitepress', 'data', 'modules', 'qseries.ts')
const SITE = 'https://www.mitsubishielectric.com'
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) plc-docs-photo-fetcher/1.0'
const TIMEOUT = 210000
const FORCE = process.argv.includes('--force')
const RETRY = process.argv.includes('--retry')
const CONCURRENCY = 2
const DELAY = RETRY ? 750 : 1000
const ATTEMPTS = 2
const TODAY = new Date().toISOString().slice(0, 10)

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
const log = (...args) => console.log(`[${new Date().toISOString().slice(11, 19)}]`, ...args)
let saveChain = Promise.resolve()
function saveManifest() {
  saveChain = saveChain.then(() => writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`))
  return saveChain
}
async function readJson(path, fallback) {
  try {
    return JSON.parse(await readFile(path, 'utf8'))
  } catch {
    return fallback
  }
}

function parseModels(text) {
  const entries = []
  const re = /id:\s*'([^']+)'[\s\S]*?model:\s*'([^']+)'/g
  let match
  while ((match = re.exec(text))) {
    entries.push({ id: match[1], model: match[2] })
  }
  return entries
}

function imageSize(buffer) {
  if (buffer.length > 24 && buffer[0] === 0x89 && buffer[1] === 0x50) {
    return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20), ext: 'png' }
  }
  if (buffer.length > 4 && buffer[0] === 0xff && buffer[1] === 0xd8) {
    let i = 2
    while (i + 9 < buffer.length) {
      if (buffer[i] !== 0xff) {
        i += 1
        continue
      }
      const marker = buffer[i + 1]
      if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
        return {
          height: buffer.readUInt16BE(i + 5),
          width: buffer.readUInt16BE(i + 7),
          ext: 'jpg'
        }
      }
      const length = buffer.readUInt16BE(i + 2)
      if (length < 2) break
      i += 2 + length
    }
  }
  return null
}

async function get(url, accept = 'text/html,image/*') {
  const response = await fetch(url, {
    headers: { 'user-agent': UA, accept },
    signal: AbortSignal.timeout(TIMEOUT)
  })
  if (!response.ok) throw new Error(`HTTP ${response.status}`)
  return response
}

function candidates(model) {
  const list = [model]
  if (/^Q\d{2}U(?:DV|DH)$/.test(model)) list.push(`${model}CPU`)
  return list
}

async function tryResolve(entry) {
  let networkError = null
  for (const formNm of candidates(entry.model)) {
    const page = `${SITE}/fa/products/faspec/point.page?kisyu=/plcq&formNm=${encodeURIComponent(formNm)}&popup=1`
    let html
    try {
      html = await (await get(page)).text()
    } catch (error) {
      networkError = error
      continue
    }
    if (html.length < 5000) {
      networkError = new Error('short page')
      continue
    }
    const title = html.match(/<title>([^<]+)<\/title>/i)?.[1]?.trim() ?? ''
    if (!title.toUpperCase().startsWith(formNm.toUpperCase())) continue
    const path = html.match(/src="(\/fa\/specimg\/prodimg\/[^"]+\.(?:jpg|jpeg|png))"/i)?.[1]
    if (!path) continue
    const url = `${SITE}${path}`
    let response
    try {
      response = await get(url, 'image/*')
    } catch (error) {
      networkError = error
      continue
    }
    const type = response.headers.get('content-type') ?? ''
    if (!type.startsWith('image/')) continue
    let buffer
    try {
      buffer = Buffer.from(await response.arrayBuffer())
    } catch (error) {
      networkError = error
      continue
    }
    const size = imageSize(buffer)
    if (!size || size.width < 400 || size.height < 300) continue
    const file = join(sourceDir, `${entry.id}.${size.ext}`)
    await writeFile(file, buffer)
    return {
      url,
      page,
      retrieved: TODAY,
      verifiedModel: true,
      formNm,
      width: size.width,
      height: size.height,
      sha256: createHash('sha256').update(buffer).digest('hex')
    }
  }
  if (networkError) throw networkError
  return null
}

async function resolveModel(entry) {
  for (let attempt = 1; attempt <= ATTEMPTS; attempt += 1) {
    try {
      const record = await tryResolve(entry)
      return record
    } catch (error) {
      log(`retry: ${entry.id} attempt ${attempt}/${ATTEMPTS} — ${error.message}`)
    }
    if (attempt < ATTEMPTS) await sleep(8000)
  }
  return null
}

async function exists(path) {
  try {
    return (await stat(path)).isFile()
  } catch {
    return false
  }
}

async function runPool(items, worker, limit) {
  const queue = [...items]
  async function next() {
    while (queue.length) {
      const item = queue.shift()
      await worker(item)
      await sleep(DELAY + Math.floor(Math.random() * 400))
    }
  }
  await Promise.all(Array.from({ length: limit }, next))
}

await mkdir(sourceDir, { recursive: true })
const manifest = await readJson(manifestPath, {})
const entries = parseModels(await readFile(qseriesPath, 'utf8'))
const pending = []

for (const entry of entries) {
  const record = manifest[entry.id]
  const file = record ? join(sourceDir, `${entry.id}.${record.url.split('.').pop()}`) : ''
  if (!FORCE && record?.verifiedModel && file && (await exists(file))) continue
  pending.push(entry)
}

log(`${entries.length} models, ${pending.length} to resolve, concurrency ${CONCURRENCY}`)

let done = 0
await runPool(
  pending,
  async (entry) => {
    const started = Date.now()
    try {
      const record = await resolveModel(entry)
      if (record) {
        manifest[entry.id] = record
        await saveManifest()
        log(`ok: ${entry.id} (${record.width}x${record.height}) ${Date.now() - started}ms`)
      } else {
        log(`no image: ${entry.id} (${entry.model}) ${Date.now() - started}ms`)
      }
    } catch (error) {
      log(`failed: ${entry.id} — ${error.message}`)
    }
    done += 1
    if (done % 5 === 0) log(`${done}/${pending.length} processed`)
  },
  CONCURRENCY
)

await saveManifest()
const verified = Object.values(manifest).filter((record) => record.verifiedModel).length
log(`manifest: ${verified} verified image(s)`)
