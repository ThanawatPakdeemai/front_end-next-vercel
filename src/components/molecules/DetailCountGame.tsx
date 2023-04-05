import CountOnPlaying from "@components/atoms/CountOnPlaying"
import RoomAvailable from "@components/atoms/RoomAvailable"
import { IGameRoomAvailable } from "@feature/game/interfaces/IGameService"
import { useRouter } from "next/router"

interface IProps {
  play_total_count?: number
  room_available?: IGameRoomAvailable[]
}
const DetailCountGame = ({ play_total_count, room_available }: IProps) => {
  const router = useRouter()

  return (
    <>
      {play_total_count && play_total_count > 0 ? (
        <>
          <CountOnPlaying count={play_total_count} />
        </>
      ) : (
        ""
      )}
      {room_available && router?.route.includes("play-to-earn") && (
        <>
          <RoomAvailable data={room_available} />
        </>
      )}
    </>
  )
}
export default DetailCountGame
