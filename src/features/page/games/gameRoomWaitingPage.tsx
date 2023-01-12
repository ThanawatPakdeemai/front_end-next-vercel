import GameMultiPlayer from "@feature/game/components/templates/waitingRoom/multiPlayer/GameMultiPlayer"
import GameSinglePlayer from "@feature/game/components/templates/waitingRoom/singlePlayer/GameSinglePlayer"
import GameStorymode from "@feature/game/components/templates/waitingRoom/storymode/GameStorymode"
import { Box } from "@mui/material"
import useGameStore from "@stores/game"
import useProfileStore from "@stores/profileStore"
import React from "react"

interface IProp {
  _roomId: string
}

const GameRoomWaitingPage = ({ _roomId }: IProp) => {
  // const { gameRoomById } = useGetGameRoomById(_roomId)
  const profile = useProfileStore((state) => state.profile.data)
  const gameData = useGameStore((state) => state.data)

  if (profile && gameData) {
    switch (gameData.game_type) {
      case "singleplayer":
        return <GameSinglePlayer _roomId={_roomId} />
      case "multiplayer":
        return <GameMultiPlayer />
      case "storymode":
        return <GameStorymode />
      default:
        return <Box className="m-auto block">No Data</Box>
    }
  }
  return <></>
}

export default GameRoomWaitingPage
