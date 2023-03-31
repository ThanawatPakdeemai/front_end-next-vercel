import { ReactElement, useEffect } from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import dynamic from "next/dynamic"
import useGetGameByPath from "@feature/game/containers/hooks/useFindGameByPath"
import useGameStore from "@stores/game"
import { useRouter } from "next/router"
import { TabProvider } from "@feature/tab/contexts/TabProvider"
import useGlobal from "@hooks/useGlobal"
import { Box } from "@mui/material"
import { StartButtonCustomStyle } from "@feature/game/components/templates/lobby/GameContent"
import { useTranslation } from "react-i18next"
import CardBuyItem from "@feature/gameItem/components/molecules/CardBuyItem"

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
const StoryLobby = dynamic(
  () => import("@feature/game/components/templates/lobby/StoryLobby"),
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

// const GameContent = dynamic(
//   () => import("@feature/game/components/templates/lobby/GameContent"),
//   {
//     suspense: true,
//     ssr: false
//   }
// )

const OverviewContent = dynamic(
  () => import("@components/organisms/OverviewContent"),
  {
    suspense: true,
    ssr: false
  }
)

const GameTabs = dynamic(
  () => import("@feature/game/components/templates/lobby/GameTabs"),
  {
    suspense: true,
    ssr: false
  }
)

// const GameReviews = dynamic(
//   () => import("@feature/game/components/molecules/GameReviews"),
//   {
//     suspense: true,
//     ssr: false
//   }
// )

// const CardBuyItem = dynamic(
//   () => import("@feature/gameItem/components/molecules/CardBuyItem"),
//   {
//     suspense: true,
//     ssr: false
//   }
// )

const OverviewHowToPlay = dynamic(
  () => import("@components/organisms/OverviewHowToPlay"),
  {
    suspense: true,
    ssr: false
  }
)

// const DefaultLobby = dynamic(
//   () => import("@feature/game/components/templates/lobby/DefaultLobby"),
//   {
//     suspense: true,
//     ssr: false
//   }
// )

const ButtonGame = dynamic(
  () => import("@feature/game/components/molecules/ButtonGame"),
  {
    suspense: true,
    ssr: false
  }
)

export default function GameRoomList() {
  const router = useRouter()
  const { GameHome } = router.query
  const { gameData } = useGetGameByPath(GameHome ? GameHome.toString() : "")
  const { onSetGameData } = useGameStore()
  const { getTypeGamePathFolder, getGameStoryModeURL } = useGlobal()
  const { t } = useTranslation()

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

  /**
   * @description Render Form Buy Item
   */
  const renderFormBuyItem = () => {
    if (!gameData) return null
    switch (getTypeGamePathFolder(gameData)) {
      case "story-mode":
        return (
          <Box
            className="flex w-full flex-col justify-between gap-4 uppercase"
            sx={{
              ".right-sidebar__content": {
                padding: "0px!important",
                borderRadius: "24px!important",
                border: "none!important"
              },
              ".right-sidebar__aside .panel-content": {
                height: "700px"
              },
              ".like-no_wrapper": {
                flex: "0 0 100%",
                ".like-no_score": {
                  width: "100%"
                }
              }
            }}
          >
            <StoryLobby
              hideButtonPlay
              hideImage
            />
            <Box
              sx={StartButtonCustomStyle}
              className="flex w-full justify-center uppercase"
            >
              <ButtonGame
                textButton={t("join-game")}
                url={getGameStoryModeURL(gameData)}
              />
            </Box>
            {/* <LikeNoLobby
                hideImage={true}
                value={0}
              /> */}
          </Box>
        )

      case "free-to-play":
        return (
          <Box
            className="flex w-full flex-col justify-between gap-4 uppercase"
            sx={{
              ".right-sidebar__content": {
                padding: "0px!important",
                borderRadius: "24px!important",
                border: "none!important"
              },
              ".right-sidebar__aside .panel-content": {
                height: "700px"
              },
              ".like-no_wrapper": {
                flex: "0 0 100%",
                ".like-no_score": {
                  width: "100%"
                }
              }
            }}
          >
            <OverviewHowToPlay
              gameId={gameData.id}
              gameType={getTypeGamePathFolder(gameData)}
              title="How to play"
            />
            {/* <LikeNoLobby
              hideImage={true}
              value={0}
            /> */}
          </Box>
        )
      default:
        return (
          <CardBuyItem
            buttonStyle="green"
            gameObject={gameData}
          />
        )
    }
  }

  return (
    <>
      {gameData ? (
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
                      height: "270px",
                      maxHeight: "none"
                    },
                    ".like-no_score": {
                      margin: "0"
                    }
                  }}
                >
                  <OverviewContent
                    gameId={gameData.id}
                    gameType={getTypeGamePathFolder(gameData)}
                    title={gameData.name}
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
                  maxWidth: "100%!important"
                }
              }}
            >
              <TabProvider>
                <GameTabs
                  gameId={gameData.id}
                  gameType="arcade-emporium"
                />
              </TabProvider>
              {/* <GameReviews
                gameType="arcade-emporium"
                gameId={gameData.id}
              /> */}
            </FullWidthContent>
          }
        />
      ) : (
        <SkeletonBanner />
      )}
    </>
  )
}

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"]))
    }
  }
}

GameRoomList.getLayout = function getLayout(page: ReactElement) {
  return page
}
