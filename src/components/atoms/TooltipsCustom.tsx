import React from "react"
import Tooltip, { TooltipProps } from "@mui/material/Tooltip"

interface IProp extends TooltipProps {
  color: "primary" | "secondary" | "error" | "warning" | "info" | "success"
}

/**
 * @description Default placement is "bottom"
 * @param title Should always send
 */

const TooltipsCustom = ({ color, ...props }: IProp) => (
  <Tooltip
    arrow
    classes={{
      tooltip: `bg-${color}-main text-${color}-contrastText uppercase font-neue-machina-bold py-[10px] px-4 rounded-lg`,
      arrow: `text-${color}-main`,
      tooltipPlacementRight: "!mr-0 ml-[14px]",
      tooltipPlacementLeft: "mr-[14px] !ml-0"
    }}
    {...props}
  >
    {props.children}
  </Tooltip>
)

export default TooltipsCustom
