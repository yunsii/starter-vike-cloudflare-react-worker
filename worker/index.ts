import { handleFetchError } from '../helpers/worker'

import { handleSsr } from './ssr'
import { handleStaticAssets } from './static-assets'

async function handleFetchEvent(event: FetchEvent) {
  const { url } = event.request
  if (!isAssetUrl(url)) {
    const userAgent = event.request.headers.get('User-Agent')
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

function isAssetUrl(url: string) {
  const { pathname } = new URL(url)
  return pathname.startsWith('/assets/')
}
