// https://vike.dev/onRenderHtml
import React from 'react'
import { renderToStream } from 'react-streaming/server'
import { escapeInject } from 'vike/server'

import { PageLayout } from './PageLayout'

import './_global.css'

import type { OnRenderHtmlAsync } from 'vike/types'

export const onRenderHtml: OnRenderHtmlAsync = async (pageContext) => {
  const { Page, pageProps } = pageContext

  const page = (
    <PageLayout pageContext={pageContext}>
      <Page {...pageProps} />
    </PageLayout>
  )

  // Streaming is optional and we can use renderToString() instead
  const stream = await renderToStream(page, { userAgent: pageContext.userAgent })

  return escapeInject`
    <!DOCTYPE html>
    <html>
      <body>
        <div id="page-view">${stream}</div>
      </body>
    </html>
  `
}
