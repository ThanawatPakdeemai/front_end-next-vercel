import { Box } from "@mui/material"
import SingleRoom from "@src/mobile/features/game/components/templates/single/SingleRoom"
import useGameStore from "@stores/game"
import useProfileStore from "@stores/profileStore"
import PleaseLogin from "@components/atoms/PleaseLogin"
import NoData from "@components/molecules/NoData"
import MultiRoom from "../../game/components/templates/multi/MultiRoom"

const RoomListPage = () => {
  const profile = useProfileStore((state) => state.profile.data)
  const gameData = useGameStore((state) => state.data)

  const getTemplateGame = () => {
    if (gameData) {
      switch (gameData.game_type) {
        case "singleplayer":
          return <SingleRoom />
        case "multiplayer":
          if (profile) {
            return <MultiRoom />
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
export default RoomListPage
