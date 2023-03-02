import { Chip } from "@mui/material"
import React from "react"

interface IProp {
  title: string
  total: number | string
  textColor?: string
  padding?: string
}

const BoxContent = ({
  title,
  total,
  textColor = "text-error-main",
  padding = "p-[20px]"
}: IProp) => (
  <div className="mt-2 h-auto w-full rounded-2xl border border-solid border-neutral-700 bg-primary-main">
    <div className={padding}>
      <div className={`font-digital-7 text-[26px] ${textColor}`}>{total}</div>
      <Chip
        label={title}
        variant="outlined"
        size="small"
        className="mt-3 cursor-pointer uppercase"
      />
    </div>
  </div>
)

export default BoxContent
