import { Box } from "@mui/material"
import React from "react"
import useProfileStore from "@stores/profileStore"
import useGameStore from "@stores/game"

import SingleRoomList from "@feature/game/components/templates/roomList/singlePlayer/SingleRoomList"
import MultiRoomList from "@feature/game/components/templates/roomList/multiPlayer/MultiRoomList"
import PleaseLogin from "@components/atoms/PleaseLogin"
import NoData from "@components/molecules/NoData"

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
          if (profile) {
            return <MultiRoomList />
          }
          return <PleaseLogin />
        default:
          return (
            <Box className="m-auto block">
              <NoData />
            </Box>
          )
      }
    }
  }
  return <>{getTemplateGame()}</>
}

export default GameRoomListPage
