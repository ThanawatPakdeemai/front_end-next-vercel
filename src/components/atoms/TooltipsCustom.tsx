import React from "react"
import Tooltip, { TooltipProps } from "@mui/material/Tooltip"

interface IProp extends TooltipProps {
  color: "primary" | "secondary" | "error" | "warning" | "info" | "success"
}

const TooltipsCustom = ({ color, ...props }: IProp) => (
  <Tooltip
    arrow
    classes={{
      tooltip: `bg-${color}-main text-${color}-contrastText uppercase font-neue-machina-bold py-[10px] px-4 rounded-lg`,
      arrow: `text-${color}-main`
    }}
    {...props}
  >
    {props.children}
  </Tooltip>
)

export default TooltipsCustom
