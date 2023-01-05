import TimerLobby from "@components/atoms/timer/TimerLobby"
import StopwatchIcon from "@components/icons/StopwatchIcon"
import React from "react"
import fullConfig from "../../../../tailwindResolver"

interface IProp {
  time: Date
  color: string
  shade: string
  onExpire?: () => void
}

/**
 *
 * @param time is how many time left
 * @param onExpire is what you want to do after timeout
 * @param color is parent key in tailwind.config.js
 * @param shade is child key in tailwind.config.js
 */

const TimerRoomList = ({ time, onExpire, color, shade }: IProp) => {
  const { theme } = fullConfig

  const initTheme: string = theme && theme.colors && theme.colors[color][shade]

  return (
    <div className="flex w-[131px] items-center justify-center rounded-lg bg-neutral-900 py-2 align-baseline">
      <StopwatchIcon
        stroke={initTheme}
        className="mr-[10px]"
      />
      <TimerLobby
        time={time}
        initTheme={initTheme}
        onExpire={onExpire}
      />
    </div>
  )
}

export default TimerRoomList
