import { Chip, Typography } from "@mui/material"
import React from "react"

interface IProp {
  title: string
  map: boolean
  width?: number
  children: React.ReactNode
  x?: string
  y?: string
}

const CardMyLandContent = ({
  title = "my land",
  map,
  children,
  width = 457,
  x = "21",
  y = "12"
}: IProp) => (
  <div
    className={`my-4 w-[${width}px] h-fit rounded-[24px] bg-neutral-800 p-[10px]`}
  >
    <div className="flex h-[40px] w-full items-center justify-between !rounded-[14px] border border-neutral-700 bg-neutral-900 px-[14px]">
      <Typography className="!font-neueMachinaSemiBold text-sm uppercase text-white-default">
        {title}
      </Typography>
      {map && (
        <Chip
          label={`X${x}, Y${y}`}
          color="secondary"
          variant="filled"
          size="small"
          className="!h-5"
        />
      )}
    </div>
    <div className="pt-2">{children}</div>
  </div>
)

export default CardMyLandContent
