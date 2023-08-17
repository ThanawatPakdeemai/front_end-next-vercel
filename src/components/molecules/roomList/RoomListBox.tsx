import { Typography } from "@mui/material"
import React, { ReactNode } from "react"
import dynamic from "next/dynamic"
import fullConfig from "../../../../tailwindResolver"

const PlayersAmount = dynamic(() => import("@components/atoms/PlayersAmount"), {
  suspense: true,
  ssr: false
})
const Counter = dynamic(() => import("@components/atoms/timer/Counter"), {
  suspense: true,
  ssr: false
})
const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: false
})

interface IProp {
  timer?: {
    time: Date
    onExpire?: () => void
  }
  player?: {
    currentPlayer: number
    maxPlayer?: number
  }
  icon?: React.ReactNode
  color: string
  shade: string
  type: "timer" | "player"
  borderColor?: string
  unlimited?: boolean
  onClick?: () => void
  classNameText?: string
  showClock?: ReactNode
}

/**
 *
 * @param time is how many time left
 * @param onExpire is what you want to do after timeout
 * @param color is parent key in tailwind.config.js
 * @param shade is child key in tailwind.config.js
 * @param borderColor is child key in tailwind.config.js
 * @param onClick is what you want to do when click invite function
 */

const RoomListBox = ({
  timer,
  player,
  icon,
  color,
  shade,
  type,
  borderColor = "border-neutral-700",
  unlimited,
  onClick,
  classNameText,
  showClock = true
}: IProp) => {
  const { theme } = fullConfig

  const initTheme: string = theme && theme.colors && theme.colors[color][shade]

  return type === "timer" ? (
    <div
      className={`timer-box flex h-[40px] w-fit flex-[1_1_100%] items-center justify-center gap-3 rounded-lg border px-3 sm:flex-[1_1_50%] lg:flex-none ${
        borderColor ?? "border-neutral-700"
      } bg-neutral-900 py-2 align-baseline`}
    >
      {showClock || <Icomoon className={`icon-Stopwatch ${initTheme}`} />}

      {timer && !unlimited ? (
        <Counter
          initTheme={initTheme}
          classNameText={classNameText}
          targetDate={timer.time}
        />
      ) : (
        <Typography
          sx={{
            color: initTheme || "#4E5057"
          }}
        >
          Unlimited
        </Typography>
      )}
    </div>
  ) : (
    <div className="player-list flex h-[40px] w-fit flex-[1_1_100%] items-center justify-center rounded-lg border border-neutral-700 bg-neutral-900 p-2 px-3 align-baseline sm:flex-[1_1_50%] lg:flex-none">
      <button
        type="button"
        aria-label="icon button"
        onClick={onClick}
      >
        {icon}
      </button>
      <Icomoon className={`icon-Users-Group mr-[10px] ${initTheme}`} />
      {player && (
        <PlayersAmount
          currentPlayer={player.currentPlayer}
          maxPlayer={player.maxPlayer}
        />
      )}
    </div>
  )
}

export default RoomListBox
