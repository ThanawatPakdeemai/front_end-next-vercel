import React, { useEffect } from "react"
import { Box, LinearProgress, Typography } from "@mui/material"
import Helper from "@utils/helper"

interface IProps {
  type: "exp" | "energy"
  barColor: string
  exp?: {
    level: number
    expAmount: number
    maxExp: number
  }
  energy?: {
    staminaPoint: number
    totalStamina: number
  }
}

const InsideStatProfile = ({ type, barColor, exp, energy }: IProps) => {
  const [value, setValue] = React.useState<number>(0)
  const [max, setMax] = React.useState<number>(0)
  const [label, setLabel] = React.useState<string>("")

  useEffect(() => {
    if (type === "exp" && exp) {
      setValue(exp.expAmount)
      setMax(exp.maxExp)
      setLabel(`level ${exp.level}`)
    } else if (type === "energy" && energy) {
      setValue(energy.staminaPoint)
      setMax(energy.totalStamina)
      setLabel("free energy")
    }
  }, [type, exp, energy])

  const percentage = Helper.percentageCalc(value, max)

  return (
    <div className="flex h-full flex-1 flex-col rounded-[13px] bg-neutral-900 p-[10px_15px]">
      <Typography className={`text-xs font-bold uppercase ${barColor}`}>
        {label}
      </Typography>
      <Box
        component="div"
        className="flex text-xs font-bold uppercase text-white-default"
      >
        {type === "exp" ? "exp " : "stamina "}
        <Typography className={`ml-1 text-xs font-bold uppercase ${barColor}`}>
          {value}
        </Typography>
        / {max}
      </Box>
      {type === "exp" ? (
        <LinearProgress
          variant="determinate"
          color="error"
          className="mt-1 w-full rotate-180 rounded-[2px] bg-neutral-800 "
          value={percentage}
        />
      ) : (
        <LinearProgress
          variant="determinate"
          className="progress-bar-energy mt-1 w-full rotate-180"
          value={percentage}
          sx={[
            {
              ".MuiLinearProgress-bar1Determinate": {
                backgroundColor: "rgb(123,91,230)",
                background:
                  "linear-gradient(90deg, rgba(1,1,1,1) 52%, rgb(123,91,230) 52%);",
                backgroundRepeat: "repeat-x",
                backgroundSize: "5%"
              }
            }
          ]}
        />
      )}
    </div>
  )
}

export default InsideStatProfile
