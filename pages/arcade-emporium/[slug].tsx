import { ReactElement, useEffect } from "react"
import { useRouter } from "next/router"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import dynamic from "next/dynamic"
import { TabProvider } from "@feature/tab/contexts/TabProvider"
import { Box } from "@mui/material"
import useGlobal from "@hooks/useGlobal"
import useGameStore from "@stores/game"
import useGetGameByPath from "@feature/game/containers/hooks/useFindGameByPath"
import { useTranslation } from "react-i18next"
import { StartButtonCustomStyle } from "@feature/game/components/templates/lobby/GameContent"

const CardBuyItem = dynamic(
  () => import("@feature/gameItem/components/molecules/CardBuyItem"),
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
const GameReviews = dynamic(
  () => import("@feature/game/components/molecules/GameReviews"),
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

/**
 * @description Maybe this component is not necessary, delete it later
 */
export default function ArcadeEmporiumGameDetails() {
  const router = useRouter()
  const { slug } = router.query
  const gamePath = slug ? slug.toString() : ""
  const { gameData } = useGetGameByPath(gamePath)
  const { onSetGameData } = useGameStore()
  const { handleClickPlayGameStoryMode, isRedirectRoomlist } = useGlobal()
  const { t } = useTranslation()

  /**
   * @description Render Form Buy Item
   */
  const renderFormBuyItem = () => {
    if (!gameData) return null
    switch (gameData.game_mode) {
      case "story-mode":
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
            <StoryLobby
              hideButtonPlay
              hideImage
            />
            <Box
              component="div"
              sx={StartButtonCustomStyle}
              className="flex w-full justify-center uppercase"
            >
              <ButtonGame
                textButton={t("join-game")}
                url=""
                onClick={() => handleClickPlayGameStoryMode(gameData)}
              />
            </Box>
          </Box>
        )

      case "free-to-play":
      case "free-to-earn":
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
            {/* <LikeNoLobby
              hideImage={true}
              value={0}
            /> */}
            <Box
              component="div"
              sx={StartButtonCustomStyle}
              className="flex w-full justify-center uppercase"
            >
              <ButtonGame
                textButton={t("join-game")}
                url={`/${gameData.game_mode}/${
                  gameData.path
                }${isRedirectRoomlist(gameData).toString()}`}
              />
            </Box>
          </Box>
        )
      case "play-to-earn":
        return (
          <CardBuyItem
            buttonStyle="purple"
            gameObject={gameData}
          />
        )
      default:
        null
    }
  }

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

  return gameData ? (
    <GamePageDefault
      component={
        <RightSidebarContentEffect
          className="mb-[64px]"
          content={
            <GameContent
              gameId={gameData.id}
              gameType="arcade-emporium"
            />
          }
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
                gameType={gameData.game_mode}
                gameIdNFT={gameData.NFT_Owner}
              />
              {renderFormBuyItem()}
            </Box>
          }
        />
      }
      component2={
        <RightSidebarContent
          className="mb-[64px]"
          sidebarClassName="md:max-w-[563px]"
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
                  gameType={gameData.game_mode}
                />
              </TabProvider>
            </FullWidthContent>
          }
          aside={
            <GameReviews
              gameType={gameData.game_mode}
              gameId={gameData.id}
            />
          }
        />
      }
    />
  ) : (
    <GamePageDefault component={<SkeletonBanner />} />
  )
}

ArcadeEmporiumGameDetails.getLayout = function getLayout(page: ReactElement) {
  return page
}

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"]))
    }
  }
}
