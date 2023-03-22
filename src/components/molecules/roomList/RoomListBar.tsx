import ButtonIcon from "@components/atoms/button/ButtonIcon"
import IconArrowRight from "@components/icons/arrowRightIcon"
import ControllerIcon from "@components/icons/ControllerIcon"
import React from "react"
import { motion } from "framer-motion"
import Helper from "@utils/helper"
import ButtonToggleIcon from "../gameSlide/ButtonToggleIcon"
import RoomListBox from "./RoomListBox"

interface IProp {
  roomId: string | number
  roomName: string
  btnText?: string
  timer?: {
    time: Date
    onExpire?: () => void
  }
  player?: {
    currentPlayer: number
    maxPlayer?: number
  }
  unlimited?: boolean
  onClick?: () => void
}

const RoomListBar = ({
  roomId,
  roomName,
  btnText,
  timer,
  player,
  unlimited,
  onClick
}: IProp) => (
  <motion.div
    style={{
      minWidth: 563,
      padding: 8
    }}
    transition={{
      type: "spring",
      stiffness: 300,
      damping: 4
    }}
    whileHover={{
      padding: 14,
      x: -12,
      width: 590
    }}
    className="flex items-center justify-between gap-8 rounded-l-[16px] rounded-r-[36px] border border-neutral-700 bg-neutral-800 p-2"
  >
    <div className="flex flex-1 gap-2">
      <ButtonIcon
        // whileHover="none"
        className="flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-700"
        icon={<ControllerIcon stroke="#E1E2E2" />}
      />
      <div className="flex flex-col">
        <span className="text-xs font-bold uppercase text-neutral-500">
          #{roomId}
        </span>
        <span className="font-bold uppercase text-neutral-300">
          {roomName.length > 9 ? Helper.shortenString(roomName, 4) : roomName}
        </span>
      </div>
    </div>
    <div className="flex items-center gap-2">
      <RoomListBox
        type="timer"
        timer={timer}
        color="green"
        shade="lemon"
        unlimited={unlimited}
      />
      <RoomListBox
        type="player"
        player={player}
        color="neutral"
        shade="500"
      />
      <ButtonToggleIcon
        handleClick={onClick}
        startIcon={<></>}
        endIcon={<IconArrowRight stroke="#010101" />}
        text={btnText || "Join"}
        className={`first-letter:btn-green-rainbow z-[2] h-[40px] !w-[95px] ${
          btnText === "full" ? " bg-error-light" : "bg-green-lemon"
        } ${
          btnText === "played" ? " bg-primary-contrastText" : "bg-green-lemon"
        }  font-bold capitalize text-neutral-900`}
        type="button"
      />
    </div>
  </motion.div>
)

export default RoomListBar
