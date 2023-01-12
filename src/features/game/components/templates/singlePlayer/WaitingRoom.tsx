import useProfileStore from "@stores/profileStore"
import { memo } from "react"
import { Typography } from "@mui/material"
import { IGameCurrentPlayer } from "@feature/game/interfaces/IGameService"
import SeatPlayers from "../../organisms/SeatPlayers"

interface IProp {
  _playerGameSingle: IGameCurrentPlayer[]
}
const WaitingRoom = ({ _playerGameSingle }: IProp) => {
  const profile = useProfileStore((state) => state.profile.data)

  return (
    <>
      {profile ? (
        <>
          {_playerGameSingle ? (
            <SeatPlayers players={_playerGameSingle} />
          ) : (
            <Typography className="text-center">Loading...</Typography>
          )}
        </>
      ) : (
        <Typography className="text-center">Please login</Typography>
      )}
    </>
  )
}

export default memo(WaitingRoom)
