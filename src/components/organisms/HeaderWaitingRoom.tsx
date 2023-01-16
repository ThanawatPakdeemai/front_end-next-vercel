import ButtonClose from "@components/atoms/button/ButtonClose"
import ButtonIcon from "@components/atoms/button/ButtonIcon"
import LockIcon from "@components/icons/LockIcon"
import PlusOutlineIcon from "@components/icons/PlusOutlineIcon"
import SettingIcon from "@components/icons/SettingIcon"
import RoomListBox from "@components/molecules/roomList/RoomListBox"
import useGetCurrentPlayerGameSingle from "@feature/game/containers/hooks/useGetCurrentPlayerGameSingle"
import useProfileStore from "@stores/profileStore"
import { useRouter } from "next/dist/client/router"
import React from "react"

interface IProp {
  roomTag: string | number
  roomName: string
  timer?: {
    time: Date
    onExpire?: () => void
  }
  player?: {
    currentPlayer: number
    maxPlayer?: number
  }
  onOutRoom: () => void
}

const HeaderWaitingRoom = ({
  roomTag,
  roomName,
  timer,
  player,
  onOutRoom
}: IProp) => {
  const router = useRouter()

  return (
    <div className="flex h-[72px] items-center gap-5 border-b  border-neutral-800">
      <div className="ml-4 flex flex-1 items-center  gap-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-800">
          <ButtonClose
            onClick={() => {
              onOutRoom()
              router.back()
            }}
          />
        </div>
        <span
          className="text-xs text-neutral-500 "
          aria-label="room-tag"
        >
          #{roomTag}
        </span>
        <LockIcon />
        <span
          className="text-default uppercase text-neutral-300"
          aria-label="room-nam"
        >
          ROOM : {roomName}
        </span>
      </div>
      <RoomListBox
        type="timer"
        timer={timer}
        color="green"
        shade="lemon"
      />
      <RoomListBox
        type="player"
        player={player}
        // for invite button
        icon={
          <PlusOutlineIcon
            onClick={() => null}
            className="mr-[15px]"
          />
        }
        //
        color="neutral"
        shade="500"
      />
      <ButtonIcon
        type="square"
        icon={<SettingIcon />}
        className="mr-4 flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-800"
      />
    </div>
  )
}

export default HeaderWaitingRoom
