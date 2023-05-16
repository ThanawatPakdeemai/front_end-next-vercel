import { ReactElement, useEffect } from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useRouter } from "next/router"
import { GetServerSideProps } from "next"
import dynamic from "next/dynamic"
import { getGameByPath } from "@feature/game/containers/services/game.service"
import useGetGameByPath from "@feature/game/containers/hooks/useFindGameByPath"
import useGameStore from "@stores/game"
import { TabProvider } from "@feature/tab/contexts/TabProvider"
import useGlobal from "@hooks/useGlobal"
import { Box } from "@mui/material"
import CardBuyItem from "@feature/gameItem/components/molecules/CardBuyItem"
import { StartButtonCustomStyle } from "@feature/game/components/templates/lobby/GameContent"
import { useTranslation } from "react-i18next"

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
const RightSidebarContentEffect = dynamic(
  () => import("@components/templates/contents/RightSidebarContentEffect"),
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

const GameContent = dynamic(
  () => import("@feature/game/components/templates/lobby/GameContent"),
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

const ButtonGame = dynamic(
  () => import("@feature/game/components/molecules/ButtonGame"),
  {
    suspense: true,
    ssr: false
  }
)

export default function GameLobby() {
  const router = useRouter()
  const { onSetGameData } = useGameStore()
  const { GameHome } = router.query

  const { gameData } = useGetGameByPath(GameHome ? GameHome.toString() : "")
  const {
    getTypeGamePathFolder,
    getColorChipByGameType,
    getGameStoryModeURL,
    isRedirectRoomlist
  } = useGlobal()
  const { t } = useTranslation()

  useEffect(() => {
    let load = false

    if (!load) {
      if (!gameData) return
      onSetGameData(gameData)
    }

    return () => {
      load = true
    }
  }, [gameData, onSetGameData])

  const getTemplateLobby = () => {
    // FIXME Boy code ตรงนี้ยังไม่ดีคควรเขียนใหม่
    if (gameData) {
      switch (gameData.game_type) {
        // case "storymode":
        //   return <StoryLobby />
        default:
          return (
            <GameContent
              gameId={gameData?.id}
              gameType={
                getTypeGamePathFolder(gameData) === "story-mode-games"
                  ? "storymode"
                  : getTypeGamePathFolder(gameData)
              }
              themeColor={getColorChipByGameType(
                getTypeGamePathFolder(gameData)
              )}
            />
          )
      }
    }
  }

  /**
   * @description Render Form Buy Item
   */
  const renderFormBuyItem = () => {
    if (!gameData) return null
    switch (getTypeGamePathFolder(gameData)) {
      case "story-mode-games":
        return (
          <Box
            component="div"
            className="flex w-full flex-col justify-between gap-4 uppercase"
            sx={{
              ".like-no_wrapper": {
                flex: "0 0 100%",
                ".like-no_score": {
                  width: "100%"
                }
              }
            }}
          >
            <Box
              component="div"
              sx={StartButtonCustomStyle}
              className="flex w-full justify-center uppercase"
            >
              <ButtonGame
                textButton={t("join-game")}
                url={getGameStoryModeURL(gameData)}
              />
            </Box>
          </Box>
        )

      case "free-to-play-games":
      case "free-to-earn-games":
        return (
          <Box
            component="div"
            className="flex w-full flex-col justify-between gap-4 uppercase"
            sx={{
              ".like-no_wrapper": {
                flex: "0 0 100%",
                ".like-no_score": {
                  width: "100%"
                }
              }
            }}
          >
            <Box
              component="div"
              sx={StartButtonCustomStyle}
              className="flex w-full justify-center uppercase"
            >
              <ButtonGame
                textButton={t("join-game")}
                url={`/${getTypeGamePathFolder(gameData)}-games/${
                  gameData.path
                }${isRedirectRoomlist(gameData).toString()}`}
              />
            </Box>
          </Box>
        )
      default:
        return (
          <CardBuyItem
            buttonStyle={
              getTypeGamePathFolder(gameData) !== "storymode"
                ? "purple"
                : "green"
            }
            gameObject={gameData}
          />
        )
    }
  }

  return gameData ? (
    <GamePageDefault
      component={
        <RightSidebarContentEffect
          className="mb-[64px]"
          content={getTemplateLobby()}
          aside={
            <Box
              component="div"
              className="aside-wrapper flex flex-col justify-between gap-4 lg:h-full"
              sx={{
                ".panel-content": {
                  maxHeight: "270px",
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
                gameIdNFT={gameData.NFT_Owner}
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
              gameType="arcade-emporium"
            />
          </TabProvider>
        </FullWidthContent>
      }
    />
  ) : (
    <GamePageDefault component={<SkeletonBanner />} />
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const _gameData = await getGameByPath((ctx?.params?.GameHome as string) || "")

  const _redirect = _gameData
    ? false
    : { destination: "/404", permanent: false }
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale!, ["common"]))
    },
    redirect: _redirect
  }
}

GameLobby.getLayout = function getLayout(page: ReactElement) {
  return page
}
