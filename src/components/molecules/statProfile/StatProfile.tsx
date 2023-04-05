import { IEnergy, IExp } from "@interfaces/IProfileMenu"
import { Card, CardContent, SxProps, Theme } from "@mui/material"
import React from "react"
import useProfileStore from "@stores/profileStore"
import InsideStatProfile from "../insideStatProfile/InsideStatProfile"

interface IProps {
  exp?: IExp
  energy?: IEnergy
  className?: string
  sx?: SxProps<Theme> | undefined
  type?: string
}

const StatProfile = ({ exp, energy, className, sx, type = "col" }: IProps) => {
  const profile = useProfileStore((state) => state.profile.data)
  return (
    <>
      {profile && (
        <CardContent
          className={`flex
    ${type === "col" ? " p-0" : "items-center justify-center px-3 py-1"}`}
        >
          <Card
            className={`flex items-center justify-between gap-[5px] rounded-[13px] bg-neutral-800 p-[5px] ${className} w-full ${
              type === "col"
                ? "m-auto h-[150px] min-w-[200px] flex-col"
                : "min-w-[265px] flex-row "
            }`}
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
      )}
    </>
  )
}

export default StatProfile
