import { Box } from "@mui/material"
import React from "react"
import dynamic from "next/dynamic"
import useProfileStore from "@stores/profileStore"
import useGameStore from "@stores/game"

const SingleRoomList = dynamic(
  () =>
    import(
      "@feature/game/components/templates/roomList/singlePlayer/SingleRoomList"
    ),
  {
    suspense: true,
    ssr: true
  }
)
const MultiRoomList = dynamic(
  () =>
    import(
      "@feature/game/components/templates/roomList/multiPlayer/MultiRoomList"
    ),
  {
    suspense: true,
    ssr: true
  }
)
const PleaseLogin = dynamic(() => import("@components/atoms/PleaseLogin"), {
  suspense: true,
  ssr: true
})
const NoData = dynamic(() => import("@components/molecules/NoData"), {
  suspense: true,
  ssr: true
})

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
            <Box
              component="div"
              className="m-auto block"
            >
              <NoData />
            </Box>
          )
      }
    }
  }
  return <>{getTemplateGame()}</>
}

export default GameRoomListPage
