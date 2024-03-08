import type { PageContext } from 'vike/types'

import { getStore } from '#src/server/api/store/_helpers'

export async function data(pageContext: PageContext) {
  const id = pageContext.routeParams?.id
  const store = await getStore()

  return {
    id,
    ...store,
  }
}

export type AboutPageData = Awaited<ReturnType<typeof data>>
