import ShineIcon from "@components/icons/ShineIcon"
import StatisticGameDetail from "@components/molecules/statistic/StatisticGameDetail"
import Tagline from "@components/molecules/tagline/Tagline"
import TopPlayer from "@feature/ranking/components/template/TopPlayer"
import React, { useEffect, useState } from "react"
import useTopPlayerByGameId from "@feature/ranking/containers/hook/useTopPlayerByGameId"
import Header from "@components/organisms/Header"
import Footer from "@components/organisms/Footer"
import useGetStatisticsGameById from "@feature/game/containers/hooks/useGetStatisticsGameById"
import useGameStore from "@stores/game"
import { unstable_batchedUpdates } from "react-dom"
import Howto from "@components/molecules/HowToPlay"
import { IGame } from "@feature/game/interfaces/IGameService"
import Banners from "@components/molecules/Banners"
import { Box } from "@mui/material"
import useGlobal from "@hooks/useGlobal"
import { TabProvider } from "@feature/tab/contexts/TabProvider"
import GameTabs from "@feature/game/components/templates/lobby/GameTabs"
import FullWidthContent from "./contents/FullWidthContent"

const GameRoomLayout = ({
  children
}: React.PropsWithChildren<React.ComponentPropsWithoutRef<"div">>) => {
  /* mockup data */
  const data = useGameStore((state) => state.data)
  const [gameData, setGameData] = useState<IGame>()
  const { topPlayerGameId, fetchTopPlayersByGameId } = useTopPlayerByGameId()
  const { statsGameById, fetchStatsGameById } = useGetStatisticsGameById()
  const { getTypeGamePathFolder } = useGlobal()

  const renderStatistic = () => {
    if (!gameData) return null
    switch (getTypeGamePathFolder(gameData as IGame)) {
      case "story-mode-games":
      case "free-to-play-games":
        return null
      default:
        return (
          <Box component="section">
            <Tagline
              bgColor="bg-neutral-800"
              textColor="text-neutral-500 font-bold"
              text="Don't miss the information analysis about this game"
              icon={<ShineIcon />}
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
            marginTop: "90px!important"
          }
        }}
      >
        {gameData ? (
          <TabProvider>
            <GameTabs
              gameId={gameData.id}
              gameType={getTypeGamePathFolder(gameData)}
            />
          </TabProvider>
        ) : null}
      </FullWidthContent>
      {renderStatistic()}
      <Footer />
    </div>
  )
}

export default GameRoomLayout
