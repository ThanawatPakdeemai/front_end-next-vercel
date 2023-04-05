import { IGameRoomAvailable } from "@feature/game/interfaces/IGameService"
import React from "react"
import CountOnPlaying from "./CountOnPlaying"

interface IProps {
  data?: IGameRoomAvailable[]
}
const RoomAvailable = ({ data }: IProps) => (
  <>
    <div className="flex flex-wrap gap-[5px]">
      {data?.map((item) => (
        <>
          <CountOnPlaying
            key={item.item_size}
            count={`${item.item_name} ${item.item_size}`}
          />
        </>
      ))}
    </div>
  </>
)

export default RoomAvailable
