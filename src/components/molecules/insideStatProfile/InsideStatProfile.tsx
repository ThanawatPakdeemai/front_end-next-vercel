import React from "react"
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
  const [staminaValue, setStaminaValue] = React.useState<number>(0)
  const [expValue, setExpValue] = React.useState<number>(0)

  if (!staminaValue && energy) {
    setStaminaValue(
      Helper.percentageCalc(energy.staminaPoint, energy.totalStamina)
    )
  }

  if (!expValue && exp) {
    setExpValue(Helper.percentageCalc(exp.expAmount, exp.maxExp))
  }

  return (
    <div className="flex h-full flex-1 flex-col rounded-[13px] bg-grey-A200 p-[10px_15px]">
      <Typography className={`text-xs font-bold uppercase ${barColor}`}>
        {type === "exp" ? `level ${exp && exp.level}` : "free energy"}
      </Typography>
      <Box
        component="div"
        className="flex text-xs font-bold uppercase text-white-default"
      >
        {type === "exp" ? `exp ` : `stamina `}
        <Typography className={`ml-1 text-xs font-bold uppercase ${barColor}`}>
          {(energy && energy.staminaPoint) || (exp && exp.expAmount)}
        </Typography>
        / {(energy && energy.totalStamina) || (exp && exp.maxExp)}
      </Box>
      {type === "exp" ? (
        <LinearProgress
          variant="determinate"
          color="error"
          className="mt-1 w-full rotate-180 rounded-[2px] bg-grey-A100 "
          value={expValue}
        />
      ) : (
        <LinearProgress
          variant="determinate"
          className="progress-bar-energy mt-1 w-full rotate-180"
          value={staminaValue}
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
