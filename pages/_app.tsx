import "@styles/globals.css"
import "slick-carousel/slick/slick-theme.css"
import "slick-carousel/slick/slick.css"
import { ReactElement, ReactNode, useEffect } from "react"
import type { NextPage } from "next"
import { appWithTranslation } from "next-i18next"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { SessionProvider } from "next-auth/react"
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
import { metaData } from "@src/meta/meta"
import Head from "next/head"
import BaseProvider from "@providers/BaseProvider"
import GoogleTag from "@components/atoms/tags/GoogleTag"

const LiveSessionTag = dynamic(
  () => import("@components/atoms/tags/LiveSessionTag"),
  {
    suspense: true,
    ssr: false
  }
)

const TiktokTag = dynamic(() => import("@components/atoms/tags/TiktokTag"), {
  suspense: true,
  ssr: false
})
const MetaPixel = dynamic(() => import("@components/atoms/tags/MetaPixel"), {
  suspense: true,
  ssr: false
})

const Loading = dynamic(() => import("@components/molecules/Loading"), {
  suspense: true,
  ssr: false
})

const LoginManage = dynamic(() => import("@components/molecules/LoginManage"), {
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
  const {
    Component,
    pageProps: { session, ...pageProps }
  }: AppPropsWithLayout = props
  const getLayout = Component.getLayout ?? ((page) => page)
  const emotionCache: EmotionCache = clientSideEmotionCache
  const queryClient = new QueryClient()
  const customTheme = createTheme(theme as ThemeOptions)

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", async () => {
        try {
          const registration = await navigator.serviceWorker.register("/sw.js")

          // eslint-disable-next-line no-console
          console.warn(
            "Service Worker registered with scope:",
            registration.scope
          )
        } catch (error) {
          // eslint-disable-next-line no-console
          console.warn("Service Worker registration failed:", error)
        }
      })
    }
  }, [])

  return (
    <>
      {/* <MetaDataTag /> */}
      <Head>
        <title>{metaData.meta_title}</title>
        <meta
          name="google-site-verification"
          content="UsRiJhdMChniXZXa-OHistDhd4o8QZ0MunjBsx09yoQ"
        />
      </Head>

      {/* TAG */}
      <LiveSessionTag />
      <GoogleTag />
      <TiktokTag />
      <MetaPixel />
      {/* !!!! */}

      <Loading />
      <QueryClientProvider client={queryClient}>
        <Web3Provider>
          <CacheProvider value={emotionCache}>
            <SessionProvider session={session}>
              <LoginManage />
              <ThemeProvider theme={customTheme}>
                <ProviderApp>
                  <BaseProvider>
                    {getLayout(<Component {...pageProps} />)}
                  </BaseProvider>
                </ProviderApp>
              </ThemeProvider>
            </SessionProvider>
          </CacheProvider>
        </Web3Provider>
        <ReactQueryDevtools initialIsOpen />
      </QueryClientProvider>
    </>
  )
}

export default appWithTranslation(MyApp)
