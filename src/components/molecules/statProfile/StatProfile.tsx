import { IEnergy, IExp } from "@interfaces/IProfileMenu"
import { Card, CardContent, SxProps, Theme } from "@mui/material"
import React from "react"
import InsideStatProfile from "../insideStatProfile/InsideStatProfile"

interface IProps {
  exp: IExp
  energy: IEnergy
  className?: string
  sx?: SxProps<Theme> | undefined
}

const StatProfile = ({ exp, energy, className, sx }: IProps) => (
  <CardContent className="flex items-center justify-center py-1 px-3">
    <Card
      className={`flex items-center justify-between gap-[5px] rounded-[13px] bg-neutral-800 p-[5px] ${className}`}
      sx={sx}
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
