import { Typography } from "@mui/material"
import Helper from "@utils/helper"
import React from "react"

interface IProp {
  title: string
  value: string
  className?: string
}

const CopyAddress = ({ title, value, className }: IProp) => (
  <Typography
    paragraph
    component="span"
    onClick={() => Helper.copyClipboard(value)}
    className={`${className}`}
  >
    {title}
  </Typography>
)

export default CopyAddress
