import "@styles/globals.css"
import "slick-carousel/slick/slick-theme.css"
import "slick-carousel/slick/slick.css"

import { ReactElement, ReactNode, useEffect, useState } from "react"
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
// import { BrowserView, MobileView } from "react-device-detect"
// import Home from "src/mobile/home"
import MetaDataTag from "@components/atoms/MetaDataTag"
import { getTypesGameItem } from "@feature/gameItem/marketplace/containers/services/gameItem.service"
import useMarketCategTypes from "@stores/marketCategTypes"
import { getTypesMaterial } from "@feature/material/marketplace/containers/services/material.services"
import { ITypeMaterials } from "@feature/material/marketplace/interfaces/IMaterialService"
import { getTypesBuilding } from "@feature/building/containers/services/building.services"
import { NextRouter, useRouter } from "next/router"

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

const MyApp = (props) => {
  const { Component, pageProps }: AppPropsWithLayout = props
  const getLayout = Component.getLayout ?? ((page) => page)
  const emotionCache: EmotionCache = clientSideEmotionCache
  const queryClient = new QueryClient()
  const customTheme = createTheme(theme as ThemeOptions)
  const {
    onSetGameItemTypes,
    onSetLandTypes,
    onSetBuildingTypes,
    onSetMaterialTypes,
    onSetCategory,
    setFetchStatus
  } = useMarketCategTypes()
  const [fetchRef, setFetchRef] = useState<boolean>(false)
  const router: NextRouter = useRouter()

  const fetchTypeMarketplace = async () => {
    // game
    const { data: gameItemTypes } = await getTypesGameItem()
    // land & material
    const { data } = await getTypesMaterial()
    const landTypes: ITypeMaterials[] = []
    const materialTypes: ITypeMaterials[] = []
    data.map((i) => {
      if (i.type === "land") {
        return landTypes.push(i)
      }
      return materialTypes.push(i)
    })
    // building
    const { data: buildingTypes } = await getTypesBuilding()

    onSetGameItemTypes(gameItemTypes)
    onSetLandTypes(landTypes)
    onSetBuildingTypes(buildingTypes)
    onSetMaterialTypes(materialTypes)
    setFetchStatus(true)
  }

  useEffect(() => {
    if (!fetchRef) {
      fetchTypeMarketplace()
    }
    return () => {
      setFetchRef(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const selectedCategory = () => {
      const _path = router.asPath
      if (_path.includes("/game-item")) {
        onSetCategory("game_item")
      } else if (_path.includes("/land")) {
        onSetCategory("nft_land")
      } else if (_path === "/marketplace") {
        onSetCategory("nft_land")
      } else if (_path.includes("/building")) {
        onSetCategory("nft_building")
      } else if (_path.includes("/material")) {
        onSetCategory("nft_material")
      } else if (_path.includes("/naka-punk")) {
        onSetCategory("nft_naka_punk")
      } else if (_path.includes("/arcade-game")) {
        onSetCategory("nft_game")
      } else if (_path.includes("/avatar-reef")) {
        onSetCategory("nft_avatar")
      } else {
        onSetCategory(undefined)
      }
    }
    selectedCategory()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.asPath])

  return (
    <>
      <MetaDataTag />
      <Loading />
      <QueryClientProvider client={queryClient}>
        <Web3Provider>
          <CacheProvider value={emotionCache}>
            <ThemeProvider theme={customTheme}>
              {/* <BrowserView>
                <ProviderApp>
                  {getLayout(<Component {...pageProps} />)}
                </ProviderApp>
              </BrowserView>
              <MobileView>
                <Home />
                <SignInLayout />
                <GameDetailLayout />
                <CreateProfileLayout />
                {getLayout(<Component {...pageProps} />)}
              </MobileView> */}
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
