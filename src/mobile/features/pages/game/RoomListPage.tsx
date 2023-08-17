import { Box } from "@mui/material"
import useGameStore from "@stores/game"
import useProfileStore from "@stores/profileStore"
import dynamic from "next/dynamic"

const SingleRoom = dynamic(
  () =>
    import("@src/mobile/features/game/components/templates/single/SingleRoom"),
  {
    suspense: true,
    ssr: false
  }
)
const NoData = dynamic(() => import("@components/molecules/NoData"), {
  suspense: true,
  ssr: false
})
const PleaseLogin = dynamic(() => import("@components/atoms/PleaseLogin"), {
  suspense: true,
  ssr: false
})
const MultiRoom = dynamic(
  () =>
    import("@src/mobile/features/game/components/templates/multi/MultiRoom"),
  {
    suspense: true,
    ssr: false
  }
)

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
