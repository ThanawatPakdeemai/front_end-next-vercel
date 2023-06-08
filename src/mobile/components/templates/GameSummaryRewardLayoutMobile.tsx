import React from "react"
import { Box } from "@mui/material"
import { IGame, IGetType } from "@feature/game/interfaces/IGameService"
import GameSummaryRewardPage from "@mobile/features/pages/game/GameSummaryRewardPage"
import { useRouter } from "next/router"
import ArrowBackIcon from "../atoms/icons/ArrowBackIcon"

interface IProps {
  data: IGame
  gameId: string
  gameType: IGetType
}

// eslint-disable-next-line no-unused-vars
const GameSummaryRewardLayoutMobile = ({ data, gameId, gameType }: IProps) => {
  const router = useRouter()

  return (
    <Box
      component="div"
      className="flex min-h-[100vh] flex-col bg-[#121212] p-[0_24px_24px]"
    >
      <h2
        className="flex items-center gap-4 py-[30px] font-urbanist text-[24px] font-bold text-white-primary"
        onClick={() => router.back()}
        aria-hidden="true"
      >
        <ArrowBackIcon />
        {data.name}
      </h2>
      <Box
        component="section"
        className="game-section flex flex-col gap-6 font-urbanist text-white-primary"
      >
        <GameSummaryRewardPage />
      </Box>
    </Box>
  )
}

export default GameSummaryRewardLayoutMobile
