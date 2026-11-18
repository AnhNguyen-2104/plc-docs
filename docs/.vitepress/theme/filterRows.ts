export type Searchable = string | number | { vi: string; en: string } | undefined | null

export function normalizeSearch(value: unknown): string {
  return String(value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
}

export function cellSearchText(value: Searchable): string {
  if (value == null) return ''
  if (typeof value === 'object') return `${value.vi} ${value.en}`
  return String(value)
}

export function rowMatches(values: Searchable[], query: string): boolean {
  const needle = normalizeSearch(query).trim()
  if (!needle) return true
  return normalizeSearch(values.map(cellSearchText).join(' ')).includes(needle)
}

export function filterRows<T>(rows: T[], query: string, values: (row: T) => Searchable[]): T[] {
  return rows.filter((row) => rowMatches(values(row), query))
}
