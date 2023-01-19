import MultiWaiting from "@feature/game/components/templates/waitingRoom/multiPlayer/MultiWaiting"
import SingleWaiting from "@feature/game/components/templates/waitingRoom/singlePlayer/SingleWaiting"
import StoryWaiting from "@feature/game/components/templates/waitingRoom/storymode/StoryWaiting"
import { IGame } from "@feature/game/interfaces/IGameService"
import { Box } from "@mui/material"
import useGameStore from "@stores/game"
import useProfileStore from "@stores/profileStore"
import React, { useEffect, useState } from "react"

interface IProp {
  _roomId: string
}

const GameRoomWaitingPage = ({ _roomId }: IProp) => {
  const profile = useProfileStore((state) => state.profile.data)
  const data = useGameStore((state) => state.data)
  const [gameData, setGameData] = useState<IGame>()

  useEffect(() => {
    if (data) {
      setGameData(data)
    }
  }, [data])

  const getTemplateGame = () => {
    if (gameData) {
      switch (gameData.game_type) {
        case "singleplayer":
          return <SingleWaiting _roomId={_roomId} />
        case "multiplayer":
          return <MultiWaiting _roomId={_roomId} />
        case "storymode":
          return <StoryWaiting />
        default:
          return <Box className="m-auto block">No Data</Box>
      }
    }
  }
  return <>{profile && getTemplateGame()}</>
}

export default GameRoomWaitingPage
