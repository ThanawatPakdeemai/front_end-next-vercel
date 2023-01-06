import ShineIcon from "@components/icons/ShineIcon"
import Banner from "@components/molecules/Banner"
import LikeNoLobby from "@components/molecules/LikeNoLobby"
import StatisticGameDetail from "@components/molecules/statistic/StatisticGameDetail"
import Tagline from "@components/molecules/tagline/Tagline"
import { GAME_DETAILS_BANNER } from "@constants/gameBanner"
import TopPlayer from "@feature/ranking/components/template/TopPlayer"
import React, { useEffect, useState } from "react"
import useTopPlayerByGameId from "@feature/ranking/containers/hook/useTopPlayerByGameId"
import Header from "@components/organisms/Header"
import Footer from "@components/organisms/Footer"
import useGetStatisticsGameById from "@feature/game/containers/hooks/useGetStatisticsGameById"
import useGameStore from "@stores/game"

/**
 *
 * @description this page is only mockup for design before use with real api
 */
const GameRoomLayout = ({
  children
}: React.PropsWithChildren<React.ComponentPropsWithoutRef<"div">>) => {
  /* mockup data */
  const data = useGameStore((state) => state.data)
  const [gameId, setGameId] = useState<string>("")

  useEffect(() => {
    if (data) {
      setGameId(data.id)
    }
  }, [data])

  const { topPlayerGameId } = useTopPlayerByGameId(gameId)
  const { statsGameById } = useGetStatisticsGameById(gameId)

  return (
    <div className="main-container mx-auto">
      <Header />
      <Banner data={GAME_DETAILS_BANNER} />
      {children}
      <Tagline
        bgColor="bg-neutral-800"
        textColor="text-neutral-500 font-bold"
        text="Don't miss the information analysis about this game"
        icon={<ShineIcon />}
      />
      <div className="flex flex-col gap-3 md:flex-row">
        <LikeNoLobby value={78.34} />
        {statsGameById && <StatisticGameDetail statsGameById={statsGameById} />}
        <TopPlayer
          element="select"
          subtitle
          background="neutral"
          note
          elevation={0}
          className="!h-[424px] !w-[550px] !bg-primary-main"
          rank
          topPlayerGameId={topPlayerGameId && topPlayerGameId}
        />
      </div>
      <Footer />
    </div>
  )
}

export default GameRoomLayout
