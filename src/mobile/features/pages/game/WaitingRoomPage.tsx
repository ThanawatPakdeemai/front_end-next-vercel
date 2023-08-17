import { Box } from "@mui/material"
import useGameStore from "@stores/game"
import useProfileStore from "@stores/profileStore"
import dynamic from "next/dynamic"

const SingleWaiting = dynamic(
  () =>
    import(
      "@src/mobile/features/game/components/templates/single/SingleWaiting"
    ),
  {
    suspense: true,
    ssr: false
  }
)
const MultiWaiting = dynamic(
  () =>
    import("@src/mobile/features/game/components/templates/multi/MultiWaiting"),
  {
    suspense: true,
    ssr: false
  }
)
const PleaseLogin = dynamic(() => import("@components/atoms/PleaseLogin"), {
  suspense: true,
  ssr: false
})
const NoData = dynamic(() => import("@components/molecules/NoData"), {
  suspense: true,
  ssr: false
})

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
export default WaitingRoomPage
