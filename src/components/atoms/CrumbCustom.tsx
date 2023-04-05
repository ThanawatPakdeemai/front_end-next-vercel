import { Typography } from "@mui/material"
import React from "react"

interface IProp {
  text: string
  background?: string
  className?: string
}

const CrumbCustom = ({ text, background, className }: IProp) => (
  <Typography
    className={`cursor-pointer rounded ${background} ${className} h-fit px-[10px] py-[5px] text-xs font-bold uppercase text-error-contrastText`}
  >
    {text}
  </Typography>
)

export default CrumbCustom
