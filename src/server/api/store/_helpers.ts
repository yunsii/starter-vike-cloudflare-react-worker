export const DATA_KEY = 'data'

export type DataType = string | null

export async function upsertStore(value: DataType) {
  const result = await Promise.all([
    typeof value === 'string' ? KV_STORE.put(DATA_KEY, value) : KV_STORE.delete(DATA_KEY),
    R2_BUCKET.put(DATA_KEY, value),
  ])
  return result
}

export async function getStore() {
  const [kvData, r2Data] = await Promise.all([
    KV_STORE.get(DATA_KEY),
    R2_BUCKET.get(DATA_KEY).then((response) => response?.text() || null),
  ])
  return {
    kvData,
    r2Data,
  }
}
