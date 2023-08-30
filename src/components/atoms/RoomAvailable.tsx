import { IGameRoomAvailable } from "@feature/game/interfaces/IGameService"
import dynamic from "next/dynamic"
import React from "react"

const CountOnPlaying = dynamic(() => import("./CountOnPlaying"), {
  suspense: true,
  ssr: false
})

interface IProps {
  data?: IGameRoomAvailable[]
}
const RoomAvailable = ({ data }: IProps) => (
  <>
    <div className="flex flex-wrap gap-[5px]">
      {data?.map((item) => (
        <CountOnPlaying
          key={item.item_size}
          count={`${item.item_name} ${item.item_size}`}
        />
      ))}
    </div>
  </>
)

export default RoomAvailable
