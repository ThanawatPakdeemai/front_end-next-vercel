import React from "react"
import type { AppProps } from "next/app"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useRouter } from "next/router"
import Head from "next/head"
import { createTheme, ThemeProvider } from "@mui/material"
import { theme } from "@src/styles/themes/darkTheme"
import type { ThemeOptions } from "@mui/material"
import { DATA_META_TAG } from "@src/constants/metaTagData"

import "@src/styles/globals.css"
import "@src/styles/css/common.css"
import "@src/styles/fonts.css"

const MyApp = ({ Component, pageProps }: AppProps) => {
  const customTheme = createTheme(theme as ThemeOptions)
  const queryClient = new QueryClient()
  const router = useRouter()
  const pathActive = router.pathname

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width"
        />
        <link
          rel="shortcut icon"
          href="punGame-logo.svg"
          type="image/x-icon"
        />
      </Head>
      {DATA_META_TAG?.map((item) =>
        item.path === pathActive
          ? item.metaTag?.map((meta) => (
              <Head key={item.path}>
                <title>{meta.pageTitle}</title>
                <meta
                  name="description"
                  content={meta.pageDescription}
                />
                <meta
                  property="og:url"
                  content={meta.ogURL}
                />
                <meta
                  property="og:type"
                  content={meta.ogType}
                />
                <meta
                  property="og:site_name"
                  content={meta.ogSiteName}
                />
                <meta
                  property="og:title"
                  content={meta.ogTitle}
                />
                <meta
                  property="og:description"
                  content={meta.ogDescription}
                />
                <meta
                  property="og:image"
                  content={meta.ogImage}
                />
                <meta
                  name="twitter:card"
                  content={meta.twitterCard}
                />
                <meta
                  name="twitter:title"
                  content={meta.twitterTitle}
                />
                <meta
                  name="twitter:description"
                  content={meta.twitterDescription}
                />
                <meta
                  name="twitter:image"
                  content={meta.twitterImage}
                />
              </Head>
            ))
          : null
      )}
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={customTheme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </QueryClientProvider>
    </>
  )
}

export default MyApp
