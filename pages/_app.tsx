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
import dynamic from "next/dynamic"
import dayjs from "dayjs"
import rt from "dayjs/plugin/relativeTime"
import createEmotionCache from "@utils/createEmotionCache"

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

export default appWithTranslation(MyApp)
