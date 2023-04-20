import "@styles/globals.css"
import "slick-carousel/slick/slick-theme.css"
import "slick-carousel/slick/slick.css"

import { ReactElement, ReactNode } from "react"
import type { NextPage } from "next"
import { appWithTranslation } from "next-i18next"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import type { AppProps } from "next/app"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ProviderApp, Web3Provider } from "@providers/index"
import { createTheme, ThemeOptions, ThemeProvider } from "@mui/material"
import { theme } from "@styles/themes/darkTheme"
import { CacheProvider, EmotionCache } from "@emotion/react"
import Head from "next/head"
import dynamic from "next/dynamic"
import dayjs from "dayjs"
import rt from "dayjs/plugin/relativeTime"
import createEmotionCache from "@utils/createEmotionCache"
import { getSeoByPath } from "@feature/metaData/containers/services/seoMetaData.service"
import { ISeoResponse } from "@feature/metaData/interfaces/ISeoData"
import { metaData } from "@src/meta/meta"
import App from "next/app"

const Loading = dynamic(() => import("@components/molecules/Loading"), {
  suspense: true,
  ssr: false
})
// eslint-disable-next-line no-unused-vars
const MetaDataTag = dynamic(() => import("@components/atoms/MetaDataTag"), {
  suspense: true,
  ssr: false
})
dayjs.extend(rt)

const clientSideEmotionCache = createEmotionCache()

type NextPageWithLayout = NextPage & {
  getLayout?: (_page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const MyApp = (props) => {
  const { Component, pageProps }: AppPropsWithLayout = props
  const getLayout = Component.getLayout ?? ((page) => page)
  const emotionCache: EmotionCache = clientSideEmotionCache
  const queryClient = new QueryClient()
  const customTheme = createTheme(theme as ThemeOptions)

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link
          rel="shortcut icon"
          href="favicon.ico"
          type="image/x-icon"
        />
        <link
          rel="icon"
          href="https://files.naka.im/seo/favicon.png"
        />
      </Head>
      {/* <MetaDataTag
        meta_description={metaData.meta_description}
        meta_keyword={metaData.meta_keyword}
        meta_title={metaData.meta_title}
        meta_url={metaData.url}
        og_image={metaData.og_image}
      /> */}
      <Loading />
      <QueryClientProvider client={queryClient}>
        <Web3Provider>
          <CacheProvider value={emotionCache}>
            <ThemeProvider theme={customTheme}>
              <ProviderApp>
                {getLayout(<Component {...pageProps} />)}
              </ProviderApp>
            </ThemeProvider>
          </CacheProvider>
        </Web3Provider>
        <ReactQueryDevtools initialIsOpen />
      </QueryClientProvider>
    </>
  )
}

export const metadata = {
  title: "My Page Title"
}

MyApp.getInitialProps = async (context) => {
  const pageProps = await App.getInitialProps(context)

  const _seo = await getSeoByPath(`/`)
  return {
    ...pageProps,
    meta:
      _seo && (_seo as ISeoResponse)?.data?.length > 0
        ? (_seo as ISeoResponse)?.data?.[0]
        : metaData
    // Will be passed to the page component as props
  }
}
export default appWithTranslation(MyApp)
