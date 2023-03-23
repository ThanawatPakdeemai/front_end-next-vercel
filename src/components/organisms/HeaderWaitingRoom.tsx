/* eslint-disable max-len */
import ButtonClose from "@components/atoms/button/ButtonClose"
import LockIcon from "@components/icons/LockIcon"
import ModalInvite from "@components/molecules/ModalInvite"
import RoomListBox from "@components/molecules/roomList/RoomListBox"
import { Chip } from "@mui/material"
import { useRouter } from "next/dist/client/router"
import React from "react"

export interface IHeaderWaitingRoomProp {
  roomTag: string | number
  roomName?: string | number
  rankName?: string
  timer?: {
    time: Date
    onExpire?: () => void
  }
  player?: {
    currentPlayer: number
    maxPlayer?: number
  }
  onOutRoom?: () => void
  className?: string
  isSummaryPage?: boolean
  onClick?: () => void
}

const HeaderWaitingRoom = ({
  roomTag,
  roomName,
  timer,
  player,
  onOutRoom,
  className,
  isSummaryPage,
  rankName,
  onClick
}: IHeaderWaitingRoomProp) => {
  const router = useRouter()
  return (
    <div
      className={`flex flex-wrap items-center gap-5 border-b border-neutral-800 p-2 lg:h-[72px] ${className}`}
    >
      <div className="flex flex-auto items-center gap-2 md:flex-none md:gap-5 xl:ml-4">
        <div className="summary-page__button flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-800">
          <ButtonClose
            onClick={() => {
              onOutRoom ? onOutRoom() : router.back()
            }}
          />
        </div>
        <span
          className="summary-page__roomNo text-xs text-neutral-500 "
          aria-label="room-tag"
        >
          #{roomTag || "000"}
        </span>
        <LockIcon />
        {roomName && (
          <span
            className="summary-page__roomName text-default uppercase text-neutral-300"
            aria-label="room-nam"
          >
            ROOM : {roomName}
          </span>
        )}
        {rankName && (
          <span
            className="summary-page__rankName text-default uppercase text-neutral-300"
            aria-label="room-nam"
          >
            Rank : {rankName}
          </span>
        )}

        {isSummaryPage && (
          <Chip
            label="FINISHED GAME"
            variant="filled"
            color="success"
            size="small"
            className="!bg-green-lemon"
          />
        )}
      </div>
      <div className="ml-auto flex items-center gap-2">
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
            !isSummaryPage ? (
              <>
                <ModalInvite />
              </>
            ) : null
          }
          onClick={onClick}
          //
          color="neutral"
          shade="500"
        />
      </div>
      {/* <ButtonIcon
        type="square"
        icon={<SettingIcon />}
        className="flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-800 xl:mr-4"
      /> */}
    </div>
  )
}

export default HeaderWaitingRoom
