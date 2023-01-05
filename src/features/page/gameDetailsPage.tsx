import ShineIcon from "@components/icons/ShineIcon"
import Banner from "@components/molecules/Banner"
import LikeNoLobby from "@components/molecules/LikeNoLobby"
import StatisticGameDetail from "@components/molecules/statistic/StatisticGameDetail"
import Tagline from "@components/molecules/tagline/Tagline"
import { GAME_DETAILS_BANNER } from "@constants/gameBanner"
import TopPlayer from "@feature/ranking/components/template/TopPlayer"
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
        <TopPlayer
          element="select"
          subtitle
          background="neutral"
          note
          elevation={0}
          className="!h-[424px] !w-[550px] !bg-primary-main"
          rank
        />
      </div>
    </>
  )
}

export default GameDetailsPage
