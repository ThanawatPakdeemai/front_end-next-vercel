import "@styles/globals.css"
import "slick-carousel/slick/slick-theme.css"
import "slick-carousel/slick/slick.css"

import { ReactElement, ReactNode } from "react"
import type { NextPage } from "next"
import { appWithTranslation } from "next-i18next"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import type { AppProps } from "next/app"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useRouter } from "next/router"
import Head from "next/head"
import { DATA_META_TAG } from "@configs/metaTagData"
import { ProviderApp, Web3Provider } from "@providers/index"
import { createTheme, ThemeOptions, ThemeProvider } from "@mui/material"
import { theme } from "@styles/themes/darkTheme"
import dayjs from "dayjs"
import rt from "dayjs/plugin/relativeTime"

dayjs.extend(rt)


type NextPageWithLayout = NextPage & {
  getLayout?: (_page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page)
  const queryClient = new QueryClient()
  const router = useRouter()
  const pathActive = router.pathname
  const customTheme = createTheme(theme as ThemeOptions)

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width"
        />
        <link
          rel="shortcut icon"
          href="favicon.ico"
          type="image/x-icon"
        />
      </Head>
      {DATA_META_TAG?.map((item) =>
        item.path === pathActive ? (
          <Head key={item.path}>
            <title>{item.metaTag?.pageTitle}</title>
            <meta
              name="description"
              content={item.metaTag?.pageDescription}
            />
            {item.metaTag?.ogURL ? (
              <meta
                property="og:url"
                content={item.metaTag?.ogURL}
              />
            ) : null}
            {item.metaTag?.ogType ? (
              <meta
                property="og:type"
                content={item.metaTag?.ogType}
              />
            ) : null}
            {item.metaTag?.ogSiteName ? (
              <meta
                property="og:site_name"
                content={item.metaTag?.ogSiteName}
              />
            ) : null}
            {item.metaTag?.ogTitle ? (
              <meta
                property="og:title"
                content={item.metaTag?.ogTitle}
              />
            ) : null}
            {item.metaTag?.ogDescription ? (
              <meta
                property="og:description"
                content={item.metaTag?.ogDescription}
              />
            ) : null}
            {item.metaTag?.ogImage ? (
              <meta
                property="og:image"
                content={item.metaTag?.ogImage}
              />
            ) : null}
            {item.metaTag?.twitterCard ? (
              <meta
                name="twitter:card"
                content={item.metaTag?.twitterCard}
              />
            ) : null}
            {item.metaTag?.twitterTitle ? (
              <meta
                name="twitter:title"
                content={item.metaTag?.twitterTitle}
              />
            ) : null}
            {item.metaTag?.twitterDescription ? (
              <meta
                name="twitter:description"
                content={item.metaTag?.twitterDescription}
              />
            ) : null}
            {item.metaTag?.twitterImage ? (
              <meta
                name="twitter:image"
                content={item.metaTag?.twitterImage}
              />
            ) : null}
          </Head>
        ) : null
      )}
      <QueryClientProvider client={queryClient}>
        <Web3Provider>
          <ThemeProvider theme={customTheme}>
            <ProviderApp>{getLayout(<Component {...pageProps} />)}</ProviderApp>
          </ThemeProvider>
        </Web3Provider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  )
}

export default appWithTranslation(MyApp)
