import React from "react"
import ButtonIcon from "@components/atoms/button/ButtonIcon"
import IconArrowRight from "@components/icons/arrowRightIcon"
import ControllerIcon from "@components/icons/ControllerIcon"
import { motion } from "framer-motion"
import Helper from "@utils/helper"
import { IGoalRushData } from "@feature/game/interfaces/IGameService"
import { FLAGS } from "@constants/flags"
import { Image } from "@components/atoms/image/index"
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
  dataGoalRush?: IGoalRushData
  path?: string
}

const RoomListBar = ({
  roomId,
  roomName,
  btnText,
  timer,
  player,
  unlimited,
  onClick,
  dataGoalRush,
  path
}: IProp) => (
  <motion.div
    style={{
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
    className="flex w-fit min-w-full flex-col items-center justify-between gap-2 rounded-l-[16px] rounded-r-[36px] border border-neutral-700 bg-neutral-800 p-2 sm:min-w-[563px] sm:flex-row sm:gap-8"
  >
    <div className="flex flex-1 gap-2">
      <ButtonIcon
        // whileHover="none"
        className="flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-700"
        icon={<ControllerIcon stroke="#E1E2E2" />}
      />
      <div className="flex flex-col">
        <span className="w-32 text-xs font-bold uppercase text-neutral-500">
          #{roomId}{" "}
          {dataGoalRush && path === "goal-rush" && (
            <span className="pl-1 text-xs font-bold uppercase text-neutral-500">
              {dataGoalRush.game_mode.text}
            </span>
          )}
        </span>
        {dataGoalRush && path === "goal-rush" ? (
          <div className="flex pt-1">
            <span className="font-bold uppercase text-neutral-300">
              <Image
                src={
                  FLAGS.find(
                    (flag) =>
                      flag.code ===
                      dataGoalRush.player_team.text.toLocaleLowerCase()
                  )?.flag_4x3 ?? "/assets/flags/4x3/us.svg"
                }
                width="20"
                height="20"
                alt="th"
              />
            </span>
            <span className="text-md px-4 text-neutral-500">X</span>
            <span className="font-bold uppercase text-neutral-300">
              <Image
                src={
                  FLAGS.find(
                    (flag) =>
                      flag.code ===
                      dataGoalRush.ai_team.text.toLocaleLowerCase()
                  )?.flag_4x3 ?? "/assets/flags/4x3/us.svg"
                }
                width="20"
                height="20"
                alt="th"
              />
            </span>
          </div>
        ) : (
          <span className="font-bold uppercase text-neutral-300">
            {roomName.length > 10
              ? Helper.shortenString(roomName, 4)
              : roomName}
          </span>
        )}
      </div>
    </div>
    <div className="flex flex-col items-center gap-2 sm:flex-row">
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
