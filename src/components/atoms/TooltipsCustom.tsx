import React from "react"
import Tooltip, { TooltipProps } from "@mui/material/Tooltip"
import tailwindResolver from "tailwindResolver"

interface IProp extends TooltipProps {
  color: "primary" | "secondary" | "error" | "warning" | "info" | "success"
}

/**
 * @description Default placement is "bottom"
 * @param title Should always send
 */

const TooltipsCustom = ({ color, ...props }: IProp) => {
  const { theme }: any = tailwindResolver
  return (
    <Tooltip
      arrow
      PopperProps={{
        sx: {
          "& .MuiTooltip-tooltip": {
            backgroundColor:
              theme && theme !== undefined
                ? theme?.["colors"][color].main
                : "transparent",
            color: "white",
            fontSize: "14px",
            fontFamily: "neueMachina",
            padding: "10px",
            borderRadius: "10px"
          },
          "& .MuiTooltip-arrow": {
            "&::before": {
              backgroundColor:
                theme && theme !== undefined
                  ? theme?.["colors"][color].main
                  : "transparent"
            }
          },
          zIndex: "auto"
        }
      }}
      classes={{
        tooltip: `bg-${color}-main text-${color}-contrastText uppercase font-neue-machina-bold py-[20px] px-4 rounded-lg sm:!m-4 !m-4 sm:!top-0 top-14`,
        arrow: `text-${color}-main`,
        tooltipPlacementRight: "!mr-0 ml-[14px]",
        tooltipPlacementLeft: "mr-[14px] !ml-0"
      }}
      {...props}
    >
      {props.children}
    </Tooltip>
  )
}
export default TooltipsCustom
