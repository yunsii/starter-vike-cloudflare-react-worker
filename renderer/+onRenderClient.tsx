// https://vike.dev/onRenderClient
export { onRenderClient };

import React from "react";
import { hydrateRoot } from "react-dom/client";
import { PageLayout } from "./PageLayout";
import { PageContext } from "vike/types";

async function onRenderClient(pageContext: PageContext) {
  const { Page, pageProps } = pageContext;
  hydrateRoot(
    document.getElementById("page-view")!,
    <PageLayout pageContext={pageContext}>
      <Page {...pageProps} />
    </PageLayout>
  );
}
