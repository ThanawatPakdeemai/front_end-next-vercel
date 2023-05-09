import { Box } from "@mui/material"
import SingleWaiting from "@src/mobile/features/game/components/templates/single/SingleWaiting"
import useGameStore from "@stores/game"
import useProfileStore from "@stores/profileStore"
import MultiWaiting from "@src/mobile/features/game/components/templates/multi/MultiWaiting"

const WaitingRoomPage = () => {
  const profile = useProfileStore((state) => state.profile.data)
  const gameData = useGameStore((state) => state.data)

  const getTemplateGame = () => {
    if (gameData) {
      switch (gameData.game_type) {
        case "singleplayer":
          return <SingleWaiting />
        case "multiplayer":
          if (profile) {
            return <MultiWaiting />
          }
          return <>PleaseLogin</>
        default:
          return (
            <Box
              component="div"
              className="m-auto block"
            >
              <>NoData </>
            </Box>
          )
      }
    }
  }
  return <>{getTemplateGame()}</>
}
export default WaitingRoomPage
