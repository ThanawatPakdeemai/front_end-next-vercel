import React, { useEffect, useState } from "react"
import { unstable_batchedUpdates } from "react-dom"
import { Box } from "@mui/material"
import dynamic from "next/dynamic"
import useTopPlayerByGameId from "@feature/ranking/containers/hook/useTopPlayerByGameId"
import useGetStatisticsGameById from "@feature/game/containers/hooks/useGetStatisticsGameById"
import useGameStore from "@stores/game"
import { IGame } from "@feature/game/interfaces/IGameService"
import useGlobal from "@hooks/useGlobal"
import { TabProvider } from "@feature/tab/contexts/TabProvider"

const TopPlayer = dynamic(
  () => import("@feature/ranking/components/template/TopPlayer"),
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
const FullWidthContent = dynamic(() => import("./contents/FullWidthContent"), {
  suspense: true,
  ssr: false
})
const Howto = dynamic(() => import("@components/molecules/HowToPlay"), {
  suspense: true,
  ssr: false
})

const Footer = dynamic(() => import("@components/organisms/Footer"), {
  suspense: true,
  ssr: false
})
const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: false
})
const StatisticGameDetail = dynamic(
  () => import("@components/molecules/statistic/StatisticGameDetail"),
  {
    suspense: true,
    ssr: false
  }
)
const Tagline = dynamic(() => import("@components/molecules/tagline/Tagline"), {
  suspense: true,
  ssr: false
})
const Banners = dynamic(() => import("@components/molecules/Banners"), {
  suspense: true,
  ssr: false
})
const Header = dynamic(() => import("@components/organisms/Header"), {
  suspense: true,
  ssr: false
})

const GameRoomLayout = ({
  children
}: React.PropsWithChildren<React.ComponentPropsWithoutRef<"div">>) => {
  /* mockup data */
  const data = useGameStore((state) => state.data)
  const [gameData, setGameData] = useState<IGame>()
  const { topPlayerGameId, fetchTopPlayersByGameId } = useTopPlayerByGameId()
  const { statsGameById, fetchStatsGameById } = useGetStatisticsGameById()
  const { getGameMode } = useGlobal()

  const renderStatistic = () => {
    if (!gameData) return null
    switch (getGameMode(gameData as IGame)) {
      case "story-mode":
      case "free-to-play":
      case "free-to-earn":
        return null
      default:
        return (
          <Box component="section">
            <Tagline
              bgColor="bg-neutral-800"
              textColor="text-neutral-500 font-bold"
              text="Don't miss the information analysis about this game"
              icon={<Icomoon className="icon-require" />}
              show={false}
            />
            <div className="flex flex-wrap gap-3 xl:flex-row xl:flex-nowrap">
              {/* <LikeNoLobby
                imgSrc={
                  gameData && "image_category_list" in gameData
                    ? gameData.image_category_list
                    : ""
                }
                value={78.34}
              /> */}
              {statsGameById && (
                <StatisticGameDetail statsGameById={statsGameById} />
              )}
              <TopPlayer
                element="select"
                subtitle
                background="neutral"
                note
                elevation={0}
                className="lg:max-w-auto max-w-full border border-neutral-900 border-opacity-80 !bg-warning-contrastText lg:!h-[424px] xl:!w-[550px]"
                rank
                topPlayerGameId={topPlayerGameId && topPlayerGameId}
              />
            </div>
          </Box>
        )
    }
  }

  useEffect(() => {
    let load = false

    if (!load) {
      if (data) {
        setGameData(data as IGame)
      }
    }

    return () => {
      load = true
    }
  }, [data])

  useEffect(() => {
    let load = false

    if (!load) {
      if (gameData && fetchStatsGameById && fetchTopPlayersByGameId) {
        unstable_batchedUpdates(() => {
          fetchStatsGameById(gameData._id)
          fetchTopPlayersByGameId(gameData._id)
        })
      }
    }

    return () => {
      load = true
    }
  }, [gameData, fetchStatsGameById, fetchTopPlayersByGameId])

  useEffect(() => {
    if (gameData) {
      // const link =
      //   `${baseUrl.baseSite}/${gameData.path}/roomLists/${
      //     gameData.play_to_earn ? "" : item_size
      //   }?search=${code}` +
      //   `${lang !== "en" && lang !== null ? `&lang=${lang}` : ""}`
    }
  }, [gameData])

  return (
    <div className="main-container mx-auto px-2 lg:px-0">
      <Header />
      <Banners />
      {gameData && <Howto data={gameData} />}
      {children}
      <FullWidthContent
        sxCustomStyled={{
          "&.container": {
            maxWidth: "100%!important",
            marginTop: "90px!important",
            "&.container-fullWidth": {
              padding: "49px"
            }
          }
        }}
      >
        {gameData ? (
          <TabProvider>
            <GameTabsVertical
              gameId={gameData.id}
              gameType={getGameMode(gameData)}
            />
            {/* <GameTabs
              gameId={gameData.id}
              gameType={getGameMode(gameData)}
            /> */}
          </TabProvider>
        ) : null}
      </FullWidthContent>
      {renderStatistic()}
      <Footer />
    </div>
  )
}

export default GameRoomLayout
