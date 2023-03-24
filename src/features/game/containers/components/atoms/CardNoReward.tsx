import { LogoNaka } from "@components/atoms/logo"
import { Box } from "@mui/material"
import React from "react"

const StyledLogoReset = {
  ".logo-naka-icon": {
    width: "auto"
  },
  ".logo-naka-icon__rect": {
    width: "210px",
    display: "block"
  },
  ".logo-naka-icon__path-1": {
    opacity: 1
  },
  ".logo-naka-icon__path-2": {
    opacity: 0
  },
  ".logo-naka-icon__path-3, .logo-naka-icon__path-4": {
    transform: "translate(0, 0)"
  }
}

const CardNoReward = () => (
  <Box
    component="div"
    className="flex h-full w-full flex-col items-center justify-center rounded border border-neutral-800 bg-neutral-800 p-[10px]"
    sx={StyledLogoReset}
  >
    <LogoNaka />
  </Box>
)

export default CardNoReward
