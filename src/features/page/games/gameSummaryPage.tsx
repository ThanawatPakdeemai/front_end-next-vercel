import React from "react"
import SummaryMain from "@feature/game/containers/components/organisms/SummaryMain"
import HeaderWaitingRoom from "@components/organisms/HeaderWaitingRoom"
import useGetGameRoomById from "@feature/game/containers/hooks/useGetGameRoomById"

interface IProp {
  _roomId: string
}

const GameSummaryPage = ({ _roomId }: IProp) => {
  const { gameRoomById } = useGetGameRoomById(_roomId)

  return gameRoomById ? (
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
        onOutRoom={() => {}}
      />
      <SummaryMain />
    </>
  ) : (
    <>Loading...</>
  )
}

export default GameSummaryPage
