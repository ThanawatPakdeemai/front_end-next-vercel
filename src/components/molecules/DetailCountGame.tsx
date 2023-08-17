import React from "react"
import { useRouter } from "next/router"
import dynamic from "next/dynamic"
import { IGameRoomAvailable } from "@feature/game/interfaces/IGameService"

const CountOnPlaying = dynamic(
  () => import("@components/atoms/CountOnPlaying"),
  {
    suspense: true,
    ssr: false
  }
)
const RoomAvailable = dynamic(() => import("@components/atoms/RoomAvailable"), {
  suspense: true,
  ssr: false
})

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
