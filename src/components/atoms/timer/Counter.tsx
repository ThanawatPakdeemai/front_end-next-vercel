import Typography from "@mui/material/Typography"
import React from "react"
import { useCountdown } from "../../../hooks/useCountdown"

interface IProp {
  classNameText?: string
  initTheme?: string
  targetDate: Date
}

const Counter = ({ classNameText, initTheme, targetDate }: IProp) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate)

  return (
    <div className={`relative top-[2px] flex font-normal `}>
      <Typography
        className={`${classNameText}`}
        sx={{
          color: days > 0 ? initTheme : "#4E5057"
        }}
      >{`${days}:`}</Typography>
      <Typography
        className={`${classNameText}`}
        sx={{
          color: hours > 0 ? initTheme : "#4E5057"
        }}
      >{`${hours}:`}</Typography>
      <Typography
        className={`${classNameText}`}
        sx={{
          color: minutes > 0 ? initTheme : "#4E5057"
        }}
      >{`${minutes}:`}</Typography>
      <Typography
        className={`${classNameText}`}
        sx={{
          color: seconds > 0 ? initTheme : "#4E5057"
        }}
      >{`${seconds}`}</Typography>
    </div>
  )
}

export default Counter
