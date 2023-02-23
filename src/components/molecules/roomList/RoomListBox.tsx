import PlayersAmount from "@components/atoms/PlayersAmount"
import TimerLobby from "@components/atoms/timer/TimerLobby"
import PlayersIcon from "@components/icons/PlayersIcon"
import StopwatchIcon from "@components/icons/StopwatchIcon"
import { Typography } from "@mui/material"
import React from "react"
import fullConfig from "../../../../tailwindResolver"

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
  onClick
}: IProp) => {
  const { theme } = fullConfig

  const initTheme: string = theme && theme.colors && theme.colors[color][shade]

  return type === "timer" ? (
    <div
      className={`flex h-[40px] w-fit items-center justify-center gap-3 rounded-lg border px-3 ${
        borderColor ?? "border-neutral-700"
      } bg-neutral-900 py-2 align-baseline`}
    >
      <StopwatchIcon stroke={initTheme} />
      {timer && !unlimited ? (
        <TimerLobby
          time={timer.time}
          initTheme={initTheme}
          onExpire={timer.onExpire}
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
    <div className="flex h-[40px] w-fit items-center justify-center rounded-lg border border-neutral-700 bg-neutral-900 p-2 px-3 align-baseline">
      <button
        type="button"
        onClick={onClick}
      >
        {icon}
      </button>
      <PlayersIcon
        stroke={initTheme}
        className="mr-[10px]"
      />
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
