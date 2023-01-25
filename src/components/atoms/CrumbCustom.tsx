import { Typography } from "@mui/material"
import React from "react"

interface IProp {
  text: string
  background?: string
}

const CrumbCustom = ({ text, background }: IProp) => (
  <Typography
    className={`cursor-pointer rounded ${background} h-fit py-[5px] px-[10px] text-xs font-bold uppercase text-error-contrastText`}
  >
    {text}
  </Typography>
)

export default CrumbCustom
