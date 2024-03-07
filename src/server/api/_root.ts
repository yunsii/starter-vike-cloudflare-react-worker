import * as store from './store'

export async function handleApi(method: string, url: string, userAgent: string | null) {
  const parsedUrl = new URL(url)

  if (parsedUrl.pathname === ('/api/store')) {
    if (method.toLowerCase() === 'get') {
      const data = await store.get()
      return new Response(JSON.stringify(data), { status: 200 })
    }
    if (method.toLowerCase() === 'post') {
      await store.post('test only')
      return new Response(null, { status: 204 })
    }
  }
  return null
}
