import { Card, CardContent } from "@mui/material"
import React from "react"
import InsideStatProfile from "../insideStatProfile/InsideStatProfile"

interface IProps {
  exp: {
    level: number
    expAmount: number
    maxExp: number
  }
  energy: {
    staminaPoint: number
    totalStamina: number
  }
}

const StatProfile = ({ exp, energy }: IProps) => (
  <CardContent className="flex items-center justify-center py-1 px-3">
    <Card
      className="flex items-center justify-between gap-[5px] rounded-[13px] bg-grey-A100 p-[5px]"
      sx={{ maxWidth: 265, minWidth: 265, height: 70 }}
    >
      <InsideStatProfile
        type="exp"
        barColor="text-error-main"
        exp={exp}
      />
      <InsideStatProfile
        type="energy"
        barColor="text-secondary-main"
        energy={energy}
      />
    </Card>
  </CardContent>
)

export default StatProfile
