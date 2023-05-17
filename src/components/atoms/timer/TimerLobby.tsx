import Typography from "@mui/material/Typography"
import React from "react"
import { useTimer } from "react-timer-hook"

interface IProp {
  time: Date | null | undefined
  initTheme: string
  onExpire?: () => void
  classNameText?: string
}

/**
 *
 * @param time is how many time left
 * @param onExpire is what you want to do after timeout
 * @param color is parent key in tailwind.config.js
 * @param shade is child key in tailwind.config.js
 */

const TimerLobby = ({ time, onExpire, initTheme, classNameText }: IProp) => {
  const { hours, minutes, seconds } = useTimer({
    autoStart: true,
    expiryTimestamp: time as Date,
    onExpire
  })

  const formatTimer = (_time: number) => (_time > 9 ? `${_time}` : `0${_time}`)

  const initTimer = {
    h: formatTimer(hours),
    m: formatTimer(minutes),
    s: formatTimer(seconds)
  }

  return (
    <div className={`relative top-[2px] flex font-normal `}>
      <Typography
        className={`${classNameText}`}
        sx={{
          color: hours > 0 ? initTheme : "#4E5057"
        }}
      >{`${initTimer.h}:`}</Typography>
      <Typography
        className={`${classNameText}`}
        sx={{
          color: minutes > 0 || hours > 0 ? initTheme : "#4E5057"
        }}
      >{`${initTimer.m}:`}</Typography>
      <Typography
        className={`${classNameText}`}
        sx={{
          color: seconds > 0 || minutes > 0 || hours > 0 ? initTheme : "#4E5057"
        }}
      >{`${initTimer.s}`}</Typography>
    </div>
  )
}

export default TimerLobby
