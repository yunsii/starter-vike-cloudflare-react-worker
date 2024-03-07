import { getStore, upsertStore } from './_helpers'

import type { DataType } from './_helpers'

export function get() {
  return getStore()
}

export function post(value: DataType) {
  return upsertStore(value)
}
