import ShineIcon from "@components/icons/ShineIcon"
import LikeNoLobby from "@components/molecules/LikeNoLobby"
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
// import { useRouter } from "next/router"
// import { baseUrl } from "@constants/sites"

const GameRoomLayout = ({
  children
}: React.PropsWithChildren<React.ComponentPropsWithoutRef<"div">>) => {
  /* mockup data */
  const data = useGameStore((state) => state.data)
  const [gameData, setGameData] = useState<IGame>()
  const { topPlayerGameId, fetchTopPlayersByGameId } = useTopPlayerByGameId()
  const { statsGameById, fetchStatsGameById } = useGetStatisticsGameById()

  // const location = useRouter()
  // const searchParams = new URLSearchParams(location.pathname)
  // const lang = searchParams.get("lang")

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
      <Tagline
        bgColor="bg-neutral-800"
        textColor="text-neutral-500 font-bold"
        text="Don't miss the information analysis about this game"
        icon={<ShineIcon />}
      />
      <div className="flex flex-wrap gap-3 xl:flex-row xl:flex-nowrap">
        <LikeNoLobby value={78.34} />
        {statsGameById && <StatisticGameDetail statsGameById={statsGameById} />}
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
      <Footer />
    </div>
  )
}

export default GameRoomLayout
