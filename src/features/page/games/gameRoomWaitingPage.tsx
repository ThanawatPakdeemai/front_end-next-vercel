import HeaderWaitingRoom from "@components/organisms/HeaderWaitingRoom"
import useGetGameRoomById from "@feature/game/containers/hooks/useGetGameRoomById"
import React from "react"

interface IProp {
  _roomId: string
}

const GameRoomWaitingPage = ({ _roomId }: IProp) => {
  const { gameRoomById } = useGetGameRoomById(_roomId)

  return gameRoomById ? (
    <div className="rounded-3xl border border-neutral-700">
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
      />
    </div>
  ) : (
    <>Loading...</>
  )
}

export default GameRoomWaitingPage
