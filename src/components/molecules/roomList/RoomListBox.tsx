import PlayersAmount from "@components/atoms/PlayersAmount"
import TimerLobby from "@components/atoms/timer/TimerLobby"
import PlayersIcon from "@components/icons/PlayersIcon"
import StopwatchIcon from "@components/icons/StopwatchIcon"
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
  bordershade?: string
}

/**
 *
 * @param time is how many time left
 * @param onExpire is what you want to do after timeout
 * @param color is parent key in tailwind.config.js
 * @param shade is child key in tailwind.config.js
 * @param borderColor is child key in tailwind.config.js
 */

const RoomListBox = ({
  timer,
  player,
  icon,
  color,
  shade,
  type,
  borderColor = "border-neutral-700"
}: IProp) => {
  const { theme } = fullConfig

  const initTheme: string = theme && theme.colors && theme.colors[color][shade]

  return type === "timer" ? (
    <div
      className={`flex w-[131px] items-center justify-center gap-3 rounded-lg border ${
        borderColor ?? "border-neutral-700"
      } bg-neutral-900 py-2 align-baseline`}
    >
      <StopwatchIcon stroke={initTheme} />
      {timer && (
        <TimerLobby
          time={timer.time}
          initTheme={initTheme}
          onExpire={timer.onExpire}
        />
      )}
    </div>
  ) : (
    <div className="flex w-fit items-center justify-center rounded-lg border border-neutral-700 bg-neutral-900 p-2 align-baseline">
      {icon}
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
