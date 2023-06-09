import React from "react"
import { Box, SxProps, Theme } from "@mui/material"

const ButtonOutlineTemplate = ({
  children,
  sxCustom,
  className,
  onClick,
  color = "#F2C94C"
}: {
  children: React.ReactNode
  sxCustom?: SxProps<Theme>
  className?: string
  onClick?: () => void
  color?: "#F2C94C" | "#F32429" | "#019B83" | "#1F222A"
}) => (
  <Box
    component="button"
    className={`flex-1 font-urbanist ${className}`}
    sx={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "38px",
      color,
      border: `1px solid ${color}`,
      borderRadius: "100px",
      padding: "8px 12px",
      fontWeight: 600,
      ...sxCustom
    }}
    onClick={onClick}
  >
    {children}
  </Box>
)

export default ButtonOutlineTemplate
