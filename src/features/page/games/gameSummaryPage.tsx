import React, { useEffect, useState } from "react"
import SummaryMain from "@feature/game/containers/components/organisms/SummaryMain"
import HeaderWaitingRoom from "@components/organisms/HeaderWaitingRoom"
import useGetGameRoomById from "@feature/game/containers/hooks/useGetGameRoomById"
import useGetSummaryGameByRoomId from "@feature/game/containers/hooks/useGetSummaryGameByRoomId"
import CardBodyList from "@feature/ranking/components/molecules/CardBodyList"
import { IGameReward } from "@src/types/games"
import { useRouter } from "next/router"

interface IProp {
  _roomId: string
}

const GameSummaryPage = ({ _roomId }: IProp) => {
  const router = useRouter()

  const [playerReward, setPlayerReward] = useState<IGameReward[]>([])
  const { gameRoomById } = useGetGameRoomById(_roomId)
  const { summaryGameData } = useGetSummaryGameByRoomId(_roomId)
  const splitPath = router.asPath.split("/")

  useEffect(() => {
    if (summaryGameData) {
      const sortResult = summaryGameData.sort(
        (a, b) => b.current_score - a.current_score
      )
      setPlayerReward(sortResult)
    }
  }, [summaryGameData])

  return gameRoomById && summaryGameData ? (
    <>
      <HeaderWaitingRoom
        roomTag={gameRoomById.room_number}
        roomName="#china town"
        timer={{
          time: new Date(gameRoomById.end_time)
        }}
        player={{
          currentPlayer: gameRoomById.amount_current_player,
          maxPlayer: gameRoomById.max_players
        }}
        className="rounded-t-3xl border"
        onOutRoom={() => router.push(`/${splitPath[1]}/${splitPath[2]}`)}
        isSummaryPage
      />
      <div className="flex flex-wrap justify-center rounded-b-md bg-neutral-800 p-[10px]">
        <CardBodyList
          className="w-full flex-[1_1_100%] sm:flex-[1_1_50%] lg:mr-[42px] lg:!h-[629px] lg:w-[362px] lg:flex-none"
          width="auto"
          players={playerReward}
        />
        <SummaryMain summaryData={summaryGameData} />
      </div>
    </>
  ) : (
    <>Loading...</>
  )
}

export default GameSummaryPage
