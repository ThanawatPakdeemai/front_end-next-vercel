import { ReactElement, useEffect } from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import dynamic from "next/dynamic"
import useGetGameByPath from "@feature/game/containers/hooks/useFindGameByPath"
import useGameStore from "@stores/game"
import { useRouter } from "next/router"
import { TabProvider } from "@feature/tab/contexts/TabProvider"
import useGlobal, { isMobile } from "@hooks/useGlobal"
import useBuyGameItemController from "@feature/buyItem/containers/hooks/useBuyGameItemController"
import { BalanceOfProvider } from "@providers/BalanceOfProvider"
import GameRoomWaitingPage from "@feature/page/games/gameRoomWaitingPage"

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

const GameTabsVertical = dynamic(
  () => import("@feature/game/components/templates/lobby/GameTabsVertical"),
  {
    suspense: true,
    ssr: false
  }
)

const WaitingLayout = dynamic(
  () => import("@mobile/components/templates/WaitingLayout"),
  {
    suspense: true,
    ssr: false
  }
)
const GameReviews = dynamic(
  () => import("@feature/game/components/molecules/GameReviews"),
  {
    suspense: true,
    ssr: false
  }
)

export default function GameWaitingRoom() {
  const router = useRouter()
  const { GameHome, id } = router.query
  const { gameData } = useGetGameByPath(GameHome ? GameHome.toString() : "")
  const { onSetGameData } = useGameStore()
  const { getGameMode } = useGlobal()
  const { refetchItemSelected } = useBuyGameItemController()

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
  }, [id, refetchItemSelected])

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

  const renderContentDesktop = () =>
    gameData ? (
      <GamePageDefault
        component={
          <div className="mb-[64px]">
            <GameRoomWaitingPage _roomId={id as string} />
          </div>
        }
        component2={
          <RightSidebarContent
            className="mb-[64px]"
            content={
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
                    gameType={getGameMode(gameData)}
                  />
                </TabProvider>
              </FullWidthContent>
            }
            aside={
              <GameReviews
                gameType={getGameMode(gameData)}
                gameId={gameData.id}
              />
            }
          />
        }
      />
    ) : (
      <GamePageDefault component={<SkeletonBanner />} />
    )

  /**
   * @description Content Mobile
   */
  const renderContentMobile = () => {
    if (gameData) {
      return <WaitingLayout />
    }
    return <GamePageDefault component={<SkeletonBanner />} />
  }

  /**
   * @description Render Default Page (Mobile or Desktop)
   * @returns
   */
  const renderDefaultPage = () => {
    if (isMobile) {
      return renderContentMobile()
    }
    return renderContentDesktop()
  }

  return <BalanceOfProvider>{renderDefaultPage()}</BalanceOfProvider>
}

GameWaitingRoom.getLayout = function getLayout(page: ReactElement) {
  return page
}

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"]))
    }
  }
}
