import TimerLobby from "@components/atoms/timer/TimerLobby"
import TimerStamina from "@components/atoms/timer/TimerStamina"
import ShineIcon from "@components/icons/ShineIcon"
import Banner from "@components/molecules/Banner"
import LikeNoLobby from "@components/molecules/LikeNoLobby"
import StatisticGameDetail from "@components/molecules/statistic/StatisticGameDetail"
import Tagline from "@components/molecules/tagline/Tagline"
import { GAME_DETAILS_BANNER } from "@constants/gameBanner"
import React, { useState } from "react"

/**
 *
 * @description this page is only mockup for design before use with real api
 */
const GameDetailsPage = () => {
  const [percentageOfLike, setPercentageOfLike] = useState<number>(78.34)

  return (
    <>
      <Banner data={GAME_DETAILS_BANNER} />
      <Tagline
        bgColor="bg-neutral-800"
        textColor="text-neutral-500 font-bold"
        text="Don't miss the information analysis about this game"
        icon={<ShineIcon />}
      />
      <div className="flex flex-col gap-3 md:flex-row">
        <LikeNoLobby value={percentageOfLike} />
        <StatisticGameDetail />
      </div>
    </>
  )
}

export default GameDetailsPage
