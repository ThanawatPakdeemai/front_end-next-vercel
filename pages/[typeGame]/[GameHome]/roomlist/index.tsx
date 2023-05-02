import { ReactElement, useEffect } from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import dynamic from "next/dynamic"
import useGetGameByPath from "@feature/game/containers/hooks/useFindGameByPath"
import useGameStore from "@stores/game"
import { useRouter } from "next/router"
import { TabProvider } from "@feature/tab/contexts/TabProvider"
import { Box } from "@mui/material"
import useGlobal from "@hooks/useGlobal"
import CardBuyItem from "@feature/gameItem/components/molecules/CardBuyItem"
import useBuyGameItemController from "@feature/buyItem/containers/hooks/useBuyGameItemController"
// eslint-disable-next-line import/no-extraneous-dependencies
import { isMobile } from "react-device-detect"
import CONFIGS from "@configs/index"

const BuyItemBody = dynamic(
  () => import("@components/templates/game/BuyItemBody"),
  {
    suspense: true,
    ssr: false
  }
)
const GameRoomListPage = dynamic(
  () => import("@feature/page/games/gameRoomListPage"),
  {
    suspense: true,
    ssr: false
  }
)

const SkeletonBanner = dynamic(
  () => import("@components/atoms/skeleton/SkeletonBanner"),
  {
    suspense: true,
    ssr: false
  }
)
const GamePageDefault = dynamic(
  () => import("@components/templates/GamePageDefault"),
  {
    suspense: true,
    ssr: false
  }
)
const RightSidebarContent = dynamic(
  () => import("@components/templates/contents/RightSidebarContent"),
  {
    suspense: true,
    ssr: false
  }
)
const FullWidthContent = dynamic(
  () => import("@components/templates/contents/FullWidthContent"),
  {
    suspense: true,
    ssr: false
  }
)

const OverviewContent = dynamic(
  () => import("@components/organisms/OverviewContent"),
  {
    suspense: true,
    ssr: false
  }
)

const GameTabsVertical = dynamic(
  () => import("@feature/game/components/templates/lobby/GameTabsVertical"),
  {
    suspense: true,
    ssr: false
  }
)

const RoomListLayout = dynamic(
  () => import("@src/mobile/components/templates/RoomListLayout"),
  {
    suspense: true,
    ssr: false
  }
)

export default function GameRoomList() {
  const router = useRouter()
  const { GameHome, id } = router.query
  const { gameData } = useGetGameByPath(GameHome ? GameHome.toString() : "")
  const { onSetGameData } = useGameStore()
  const { getTypeGamePathFolder } = useGlobal()
  const { refetchItemSelected } = useBuyGameItemController()

  /**
   * @description Render Form Buy Item
   */
  const renderFormBuyItem = () => {
    if (!gameData) return null
    switch (getTypeGamePathFolder(gameData)) {
      case "story-mode-games":
      case "free-to-play-games":
        return null
      case "play-to-earn-games":
        return (
          <BuyItemBody>
            <CardBuyItem
              buttonStyle="green"
              gameObject={gameData}
            />
          </BuyItemBody>
        )
      default:
        null
    }
  }

  /**
   * @description Refetch Item Selected when click link from Discord
   */
  useEffect(() => {
    let load = false
    if (!load) {
      refetchItemSelected()
    }
    return () => {
      load = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  useEffect(() => {
    let load = false

    if (!load) {
      if (gameData) onSetGameData(gameData)
    }

    return () => {
      load = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameData])

  return gameData ? (
    <GamePageDefault
      component={
        <RightSidebarContent
          className="mb-24"
          content={<GameRoomListPage />}
          aside={
            <Box
              component="div"
              className="aside-wrapper flex flex-col justify-between gap-4 lg:h-full"
              sx={{
                ".panel-content": {
                  maxHeight: "200px",
                  ".custom-scroll": {
                    overflow: "hidden"
                  }
                },
                ".like-no_score": {
                  margin: "0"
                }
              }}
            >
              <OverviewContent
                gameId={gameData.id}
                gameType={getTypeGamePathFolder(gameData)}
              />
              {renderFormBuyItem()}
            </Box>
          }
        />
      }
      component2={
        <FullWidthContent
          sxCustomStyled={{
            "&.container": {
              maxWidth: "100%!important",
              "&.container-fullWidth": {
                padding: "49px"
              }
            }
          }}
        >
          <TabProvider>
            <GameTabsVertical
              gameId={gameData.id}
              gameType={getTypeGamePathFolder(gameData)}
            />
            {/* <GameTabs
                  gameId={gameData.id}
                  gameType={getTypeGamePathFolder(gameData)}
                /> */}
          </TabProvider>
        </FullWidthContent>
      }
    />
  ) : (
    <GamePageDefault component={<SkeletonBanner />} />
  )
}

GameRoomList.getLayout = function getLayout(page: ReactElement) {
  return isMobile && CONFIGS.DISPLAY_MOBILE_MODE ? <RoomListLayout /> : page
}

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"]))
    }
  }
}
