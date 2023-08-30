import { Chip, ChipProps, Typography } from "@mui/material"
import dynamic from "next/dynamic"
import React from "react"

const TooltipsCustom = dynamic(() => import("./TooltipsCustom"), {
  suspense: true,
  ssr: false
})

interface IProp extends ChipProps {
  title: string
  label: string | number
}

const TitleWithChip = ({ title, label, ...props }: IProp) => (
  <div>
    <Typography className="mb-[5px] text-xs text-neutral-600">
      {title}
    </Typography>
    <TooltipsCustom
      color="error"
      className="cursor-pointer"
      title={label}
    >
      <Chip
        size="small"
        variant="outlined"
        label={label}
        {...props}
      />
    </TooltipsCustom>
  </div>
)

export default TitleWithChip
