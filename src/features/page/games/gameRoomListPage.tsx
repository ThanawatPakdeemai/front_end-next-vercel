import { Box, Divider } from "@mui/material"
import React from "react"
import useProfileStore from "@stores/profileStore"
import useGameStore from "@stores/game"

import SingleRoomList from "@feature/game/components/templates/roomList/singlePlayer/SingleRoomList"
import MultiRoomList from "@feature/game/components/templates/roomList/multiPlayer/MultiRoomList"
import StoryRoomList from "@feature/game/components/templates/roomList/storymode/StoryRoomList"

/**
 *
 * @description this page is only mockup for design before use with real api
 */
const GameRoomListPage = () => {
  /* mockup data */
  const profile = useProfileStore((state) => state.profile.data)
  const gameData = useGameStore((state) => state.data)

  const getTemplateGame = () => {
    if (gameData) {
      switch (gameData.game_type) {
        case "singleplayer":
          return <SingleRoomList />
        case "multiplayer":
          return <MultiRoomList />
        case "storymode":
          return <StoryRoomList />
        default:
          return <Box className="m-auto block">No Data</Box>
      }
    }
  }
  return <>{profile && getTemplateGame()}</>
}

export default GameRoomListPage
