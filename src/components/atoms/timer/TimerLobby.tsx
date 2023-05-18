import Typography from "@mui/material/Typography"
import React from "react"
import { useTimer } from "react-timer-hook"

interface IProp {
  endTime: Date
  initTheme: string
  onExpire?: () => void
  classNameText?: string
  showTotalHours?: boolean
  showTotalDay?: boolean
}

/**
 *
 * @param time is how many time left
 * @param onExpire is what you want to do after timeout
 * @param color is parent key in tailwind.config.js
 * @param shade is child key in tailwind.config.js
 */

const TimerLobby = ({
  endTime,
  onExpire,
  initTheme,
  classNameText,
  showTotalDay = false,
  showTotalHours = false
}: IProp) => {
  const { hours, minutes, seconds, days } = useTimer({
    autoStart: true,
    expiryTimestamp: endTime,
    onExpire
  })

  const formatTimer = (_time: number) => (_time > 9 ? `${_time}` : `0${_time}`)
  const convertDayAsHours = days * 24

  const initTimer = {
    d: formatTimer(days),
    totolH: formatTimer(convertDayAsHours + hours),
    h: formatTimer(hours),
    m: formatTimer(minutes),
    s: formatTimer(seconds)
  }

  const unitDay = days > 1 ? "day " : "days "

  return (
    <div className={`relative top-[2px] flex font-normal `}>
      {showTotalDay && (
        <Typography
          sx={{
            color: hours > 0 ? initTheme : "#4E5057"
          }}
          className={`${classNameText}`}
        >
          {`${initTimer.d}`}
          {unitDay && <span className="mx-1">{`${unitDay}`}</span>}
        </Typography>
      )}

      {showTotalHours ? (
        <Typography
          className={`${classNameText}`}
          sx={{
            color: hours > 0 ? initTheme : "#4E5057"
          }}
        >{`${initTimer.totolH}:`}</Typography>
      ) : (
        <Typography
          className={`${classNameText}`}
          sx={{
            color: hours > 0 ? initTheme : "#4E5057"
          }}
        >{`${initTimer.h}:`}</Typography>
      )}

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
