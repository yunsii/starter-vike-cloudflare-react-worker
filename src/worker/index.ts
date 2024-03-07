import { handleSsr } from './ssr'
import { handleStaticAssets } from './static-assets'

import { handleFetchError } from '#src/helpers/worker'
import { handleApi } from '#src/server/api/_root'

export function isAssetUrl(url: string) {
  const { pathname } = new URL(url)
  return pathname.startsWith('/assets/')
}

export function isApiUrl(url: string) {
  const { pathname } = new URL(url)
  return pathname.startsWith('/api/')
}

async function handleFetchEvent(event: FetchEvent) {
  const { method, url } = event.request
  const userAgent = event.request.headers.get('User-Agent')

  if (isApiUrl(url)) {
    const response = await handleApi(method, url, userAgent)
    if (response !== null) {
      return response
    }
  }
  else if (!isAssetUrl(url)) {
    const response = await handleSsr(url, userAgent)
    if (response !== null) {
      return response
    }
  }
  const response = await handleStaticAssets(event)
  return response
}

addEventListener('fetch', (event: FetchEvent) => {
  try {
    event.respondWith(handleFetchEvent(event))
  }
  catch (err) {
    handleFetchError(event, err)
  }
})
