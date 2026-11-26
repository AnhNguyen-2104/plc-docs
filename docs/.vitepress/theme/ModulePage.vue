<script setup lang="ts">
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'
import { qModules, type QKind } from '../data/modules/qseries'
import { pdfDocs } from '../data/pdfDocs'

const props = defineProps<{ id: string }>()

const { lang } = useData()
const isVi = computed(() => lang.value !== 'en')

const module = computed(() => qModules.find((entry) => entry.id === props.id))
const prefix = computed(() => (isVi.value ? '/q' : '/en/q'))

const KIND_LABEL: Record<QKind, { vi: string; en: string }> = {
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

const kindLabel = computed(() => {
  const entry = module.value
  return entry ? KIND_LABEL[entry.kind][isVi.value ? 'vi' : 'en'] : ''
})

const catalogueHref = computed(() => withBase(`${prefix.value}/modules/`))

const manualDef = computed(() => (module.value ? pdfDocs[module.value.manual.doc] : undefined))
const manualHref = computed(() => {
  const def = manualDef.value
  if (!def) return ''
  const page = module.value?.manual.page
  const pdfPage = page ? def.map[page] : undefined
  return pdfPage ? `${def.url}#page=${pdfPage}` : def.url
})


const sourceNote = computed(() => {
  const doc = module.value?.manual.doc
  if (!doc) return '—'
  const m = /^sh(\d+)$/i.exec(doc)
  return m ? `SH-${m[1]}` : doc.toUpperCase()
})

const compiledBy = computed(() => (isVi.value ? 'Cẩm nang PLC' : 'PLC Handbook'))
const notVerified = computed(() => (isVi.value ? '— (chưa xác minh)' : '— (not verified)'))

const facts = computed(() => {
  const entry = module.value
  if (!entry) return []
  const vi = isVi.value
  const rows: { label: string; value: string }[] = []
  if (entry.points != null) rows.push({ label: vi ? 'Số điểm' : 'Points', value: String(entry.points) })
  if (entry.current5v != null) {
    rows.push({ label: vi ? 'Dòng 5 VDC' : '5 VDC current', value: `${entry.current5v} A` })
  }
  if (entry.slots != null) rows.push({ label: vi ? 'Số khe' : 'Slots', value: String(entry.slots) })
  if (entry.rated5v != null) rows.push({ label: vi ? 'Dòng 5 V định mức' : 'Rated 5 V current', value: `${entry.rated5v} A` })
  if (entry.maxIoPoints != null) rows.push({ label: vi ? 'I/O tối đa' : 'Max I/O points', value: String(entry.maxIoPoints) })
  if (entry.maxModules != null) rows.push({ label: vi ? 'Số module tối đa' : 'Max modules', value: String(entry.maxModules) })
  if (entry.integratedBase != null) {
    rows.push({
      label: vi ? 'Tích hợp base' : 'Integrated base',
      value: entry.integratedBase ? (vi ? 'Có' : 'Yes') : vi ? 'Không' : 'No'
    })
  }
  rows.push({
    label: vi ? 'Trạng thái' : 'Status',
    value:
      entry.status === 'documented'
        ? vi
          ? 'Đã tài liệu hoá'
          : 'Documented'
        : vi
          ? 'Dự kiến — chưa xác minh đầy đủ'
          : 'Planned — not fully verified'
  })
  return rows
})
</script>

<template>
  <div v-if="module" class="module-page">
    <nav class="module-page-breadcrumb" :aria-label="isVi ? 'Đường dẫn' : 'Breadcrumb'">
      <a :href="catalogueHref">{{ isVi ? 'Danh mục module' : 'Module catalogue' }}</a>
      <span aria-hidden="true">/</span>
      <span>{{ module.model }}</span>
    </nav>

    <div class="module-page-titleblock">
      <h1 class="module-page-title">{{ module.model }}</h1>
      <p class="module-page-kind">{{ kindLabel }}</p>
      <p class="module-page-role">{{ isVi ? module.name.vi : module.name.en }}</p>
      <a class="module-page-jump" :href="isVi ? '#_1-nhom-tin-hieu-can-đau' : '#_1-signal-groups-to-wire'">
        {{ isVi ? 'Đấu dây từng bước ↓' : 'Step-by-step wiring ↓' }}
      </a>

      <dl class="module-page-plate" :aria-label="isVi ? 'Thông tin đầu mục' : 'Title block'">
        <div class="module-page-plate-cell">
          <dt>{{ isVi ? 'Dòng / nhóm PLC' : 'PLC series / group' }}</dt>
          <dd>MELSEC Q</dd>
        </div>
        <div class="module-page-plate-cell">
          <dt>{{ isVi ? 'Mã module' : 'Module code' }}</dt>
          <dd>{{ module.model }}</dd>
        </div>
        <div class="module-page-plate-cell">
          <dt>{{ isVi ? 'Người biên soạn' : 'Compiled by' }}</dt>
          <dd>{{ compiledBy }}</dd>
        </div>
        <div class="module-page-plate-cell">
          <dt>{{ isVi ? 'Ghi chú / nguồn' : 'Notes / source' }}</dt>
          <dd>{{ sourceNote }}</dd>
        </div>
      </dl>
    </div>


    <div class="module-page-head">
      <div class="module-page-photo">
        <ModulePhoto :id="module.id" :width="200" />
      </div>

      <div class="module-page-summary">
        <h2 class="module-page-summary-title">{{ isVi ? 'Thông số tóm tắt' : 'Summary facts' }}</h2>
        <div class="module-page-facts-wrap">
          <table class="module-page-facts">
            <tbody>
              <tr v-for="row in facts" :key="row.label">
                <th scope="row">{{ row.label }}</th>
                <td>{{ row.value }}</td>
              </tr>
              <tr>
                <th scope="row">{{ isVi ? 'Manual' : 'Manual' }}</th>
                <td>
                  <SourceRef v-if="module.manual.doc" :doc="module.manual.doc" :page="module.manual.page" />
                  <span v-if="module.manual.page" class="module-page-manual-page">§{{ module.manual.page }}</span>
                  <a
                    v-if="manualHref"
                    class="module-page-manual-link"
                    :href="manualHref"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {{ isVi ? 'Mở PDF' : 'Open PDF' }}
                  </a>
                  <span v-if="!module.manual.doc" class="module-page-manual-page">{{ notVerified }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <p v-if="module.status === 'planned'" class="module-page-planned">
      {{
        isVi
          ? 'Module này được khai báo ở mức "dự kiến": một số thông số chưa xác minh từ manual trên đĩa. Trang chỉ nêu quy tắc đấu dây chung, không suy diễn số liệu.'
          : 'This module is marked "planned": some values are not verified from the on-disk manuals. The page states common wiring rules only and does not infer numbers.'
      }}
    </p>
  </div>

  <div v-else class="module-page-missing">
    <p>
      {{
        isVi
          ? `Không tìm thấy module với id "${id}" trong danh mục Q-series.`
          : `No Q-series module with id "${id}" was found in the catalogue.`
      }}
    </p>
    <p><a :href="catalogueHref">{{ isVi ? 'Về danh mục module' : 'Back to the module catalogue' }}</a></p>
  </div>
</template>

<style scoped>
.module-page {
  margin-top: 1rem;
}

.module-page-breadcrumb {
  display: flex;
  gap: 0.375rem;
  align-items: center;
  margin-bottom: 0.5rem;
  font-size: 13px;
  color: var(--vp-c-text-2);
}

.module-page-breadcrumb a {
  color: var(--vp-c-brand-1);
  text-decoration: none;
}

.module-page-breadcrumb a:hover {
  text-decoration: underline;
}

.module-page-head {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 1rem 1.5rem;
  align-items: start;
}

@media (min-width: 768px) {
  .module-page-head {
    grid-template-columns: 200px minmax(0, 1fr);
  }
}

.module-page-titleblock {
  margin-bottom: 0.25rem;
}

.module-page-photo {
  flex: 0 0 auto;
}

.module-page-summary {
  min-width: 0;
}

.module-page-summary-title {
  margin: 0 0 0.5rem;
  padding: 0;
  border-top: none;
  font-size: 1.0625rem;
  line-height: 1.4;
}

.module-page-title {
  margin: 0;
  font-size: 2rem;
  line-height: 1.2;
}

.module-page-kind {
  margin: 0.25rem 0;
  font-weight: 600;
  color: var(--vp-c-brand-1);
}

.module-page-role {
  margin: 0;
  color: var(--vp-c-text-2);
}

.module-page-jump {
  display: inline-block;
  margin-top: 6px;
  padding: 2px 10px;
  border: 1px solid var(--vp-c-brand-1);
  border-radius: 999px;
  color: var(--vp-c-brand-1);
  font-size: 14px;
  line-height: 1.5;
  text-decoration: none;
}

.module-page-jump:hover {
  background: var(--vp-c-brand-soft);
}

.module-page-planned {
  margin-top: 1rem;
  padding: 0.75rem 1rem;
  border-left: 3px solid var(--vp-c-warning-1);
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  font-size: 13px;
}

.module-page-facts-wrap {
  overflow-x: auto;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
}

.module-page-facts {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.module-page-facts th,
.module-page-facts td {
  padding: 0.35rem 0.6rem;
  border-bottom: 1px solid var(--vp-c-divider);
  text-align: left;
  vertical-align: top;
}

.module-page-facts tbody tr:last-child th,
.module-page-facts tbody tr:last-child td {
  border-bottom: none;
}

.module-page-facts th {
  width: 9rem;
  color: var(--vp-c-text-2);
  font-weight: 500;
  background: var(--vp-c-bg-soft);
}

.module-page-manual-page {
  margin-left: 0.5rem;
  color: var(--vp-c-text-2);
}

.module-page-manual-link {
  margin-left: 0.75rem;
  color: var(--vp-c-brand-1);
}

.module-page-plate {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  margin: 0.25rem 0 0;
  padding: 0;
  border-bottom: 2px solid var(--vp-c-text-1);
}

.module-page-plate-cell {
  min-width: 0;
  padding: 0.35rem 0.6rem 0.4rem;
  border-left: 1px solid var(--vp-c-divider);
}

.module-page-plate-cell:first-child {
  padding-left: 0;
  border-left: none;
}

.module-page-plate dt {
  margin: 0 0 2px;
  font-family: var(--pq-font-ui);
  font-size: 10px;
  font-weight: 600;
  line-height: 1.3;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--vp-c-text-2);
}

.module-page-plate dd {
  margin: 0;
  font-family: var(--pq-font-mono);
  font-size: 13px;
  font-weight: 500;
  line-height: 1.35;
  color: var(--vp-c-text-1);
  overflow-wrap: anywhere;
}

@media (max-width: 640px) {
  .module-page-plate {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .module-page-plate-cell:nth-child(3) {
    padding-left: 0;
    border-left: none;
  }
}

.module-page-missing {
  padding: 1rem;
  border: 1px dashed var(--vp-c-divider);
  border-radius: 8px;
}
</style>
