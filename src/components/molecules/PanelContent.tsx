import { Box, SxProps, Theme } from "@mui/material"
import React from "react"

interface IPanelContentProps {
  children: React.ReactNode
  height?: string
  sxCustomStyled?: SxProps<Theme>
}

/**
 * @description Panel Content
 * @param height Example: h-[600px]
 * @returns
 */
const PanelContent = ({
  children,
  height,
  sxCustomStyled = {}
}: IPanelContentProps) => (
  <Box
    sx={sxCustomStyled}
    className={`panel-content relative text-neutral-500 ${height}`}
  >
    <div className="custom-scroll h-[90%] overflow-y-scroll pr-4">
      {children}
    </div>
    <div className="absolute bottom-0 left-0 h-20 w-full bg-gradient-to-b from-neutral-780/0 to-neutral-780" />
  </Box>
)

export default PanelContent
