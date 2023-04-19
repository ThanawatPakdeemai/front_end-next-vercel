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
import { BrowserView, MobileView } from "react-device-detect"

const Loading = dynamic(() => import("@components/molecules/Loading"), {
  suspense: true,
  ssr: false
})

const Meta = dynamic(() => import("@components/atoms/MetaData"), {
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

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page)
  const emotionCache: EmotionCache = clientSideEmotionCache
  const queryClient = new QueryClient()
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
        <link
          rel="icon"
          href="https://files.naka.im/seo/favicon.png"
        />
      </Head>
      <Meta />
      <Loading />
      <QueryClientProvider client={queryClient}>
        <Web3Provider>
          <CacheProvider value={emotionCache}>
            <ThemeProvider theme={customTheme}>
              <BrowserView>
                <ProviderApp>
                  {getLayout(<Component {...pageProps} />)}
                </ProviderApp>
              </BrowserView>
              <MobileView>
                {/* <SignInLayout /> */}
                {getLayout(<Component {...pageProps} />)}
              </MobileView>
            </ThemeProvider>
          </CacheProvider>
        </Web3Provider>
        <ReactQueryDevtools initialIsOpen />
      </QueryClientProvider>
    </>
  )
}

export default appWithTranslation(MyApp)
