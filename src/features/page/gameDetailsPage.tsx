import ShineIcon from "@components/icons/ShineIcon"
import LikeNoLobby from "@components/molecules/LikeNoLobby"
import Tagline from "@components/molecules/tagline/Tagline"
import React, { useState } from "react"

/**
 *
 * @description this page is only mockup for design before use with real api
 */
const GameDetailsPage = () => {
  const [percentageOfLike, setPercentageOfLike] = useState<number>(78.34)

  return (
    <>
      <Tagline
        bgColor="bg-neutral-800"
        textColor="text-neutral-500 font-bold"
        text="Don't miss the information analysis about this game"
        icon={<ShineIcon />}
      />
      <LikeNoLobby value={percentageOfLike} />
    </>
  )
}

export default GameDetailsPage
