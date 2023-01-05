import Typography from "@mui/material/Typography"
import React from "react"
import { useTimer } from "react-timer-hook"
import fullConfig from "../../../../tailwindResolver"

interface IProp {
  color: string
  shade: string
}

/**
 *
 * @param color is parent key in tailwind.config.js
 * @param shade is child key in tailwind.config.js
 */

const TimerLobby = ({ color, shade }: IProp) => {
  const time = new Date()
  time.setSeconds(time.getSeconds() + 3605)

  const { hours, minutes, seconds } = useTimer({
    autoStart: true,
    expiryTimestamp: time
  })
  const { theme } = fullConfig

  const formatTimer = (_time: number) => {
    if (_time > 9) {
      return `${_time}`
    }
    return `0${_time}`
  }

  const initTimer = {
    h: formatTimer(hours),
    m: formatTimer(minutes),
    s: formatTimer(seconds)
  }

  const initTheme = theme && theme.colors && theme.colors[color][shade]

  return (
    <div className="flex">
      <Typography
        sx={{
          color: hours > 0 ? initTheme : "#4E5057"
        }}
      >{`${initTimer.h}:`}</Typography>
      <Typography
        sx={{
          color: minutes > 0 || hours > 0 ? initTheme : "#4E5057"
        }}
      >{`${initTimer.m}:`}</Typography>
      <Typography
        sx={{
          color: seconds > 0 || minutes > 0 || hours > 0 ? initTheme : "#4E5057"
        }}
      >{`${initTimer.s}`}</Typography>
    </div>
  )
}

export default TimerLobby
