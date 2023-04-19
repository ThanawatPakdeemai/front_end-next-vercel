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
import MetaDataTag from "@components/atoms/MetaDataTag"
import CONFIGS from "@configs/index"

const Loading = dynamic(() => import("@components/molecules/Loading"), {
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
export const metaData = {
  meta_description:
    "Get started in minutes with our free-to-play games. The best collection of play-to-earn crypto games featuring action, arcade, and more. Powered by $NAKA.",
  meta_keyword:
    "nakamoto games, play2earn, game crypto platform, Blockchain games, Free to play, NFT game, Crypto games, P2E, Gamefi, Browser Games, Cryptocurrency, Play to Earn, Blockchain Games, Gamefi,  Web3 games, Digital platform, 3D games, Polygon, Games platform, Free nft games, Top NFT Games, best NFT games, top cryoto game, top tier games 2022, the best 2022 games, y8, Free online games, unity, unreal engine, games coin crypto, where to play crypto games, play to earn games crypto, play to earn games crypto list,make money,free time,passive income,bullish project, bullish",
  meta_title:
    "Nakamoto Games - Get Started with the Best Play and Earn Crypto Platform",
  image: "https://files.naka.im/seo/homepage.png",
  url: CONFIGS.BASE_URL.FRONTEND
}
const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
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
      <MetaDataTag
        meta_description={metaData.meta_description}
        meta_keyword={metaData.meta_keyword}
        meta_title={metaData.meta_title}
        meta_url={metaData.url}
        og_image={metaData.image}
      />
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
