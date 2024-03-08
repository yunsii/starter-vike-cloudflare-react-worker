import { ApiManager } from '../helpers'

import { defineStoreApi } from './store'

export async function handleApi(request: Request) {
  defineStoreApi()

  return await ApiManager.match(request)
}
