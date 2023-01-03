import LikeNoLobby from "@components/molecules/LikeNoLobby"
import React, { useState } from "react"

/**
 *
 * @description this page is only mockup for design before use with real api
 */
const GameDetailsPage = () => {
  const [percentageOfLike, setPercentageOfLike] = useState<number>(78.34)

  return (
    <>
      <LikeNoLobby value={percentageOfLike} />
    </>
  )
}

export default GameDetailsPage
