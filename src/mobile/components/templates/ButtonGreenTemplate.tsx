import React from "react"
import { Box, SxProps, Theme } from "@mui/material"

const ButtonGreenTemplate = ({
  children,
  sxCustom,
  className,
  onClick
}: {
  children: React.ReactNode
  sxCustom?: SxProps<Theme>
  className?: string
  onClick?: () => void
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
      color: "#F2C94C",
      border: "1px solid #F2C94C",
      borderRadius: "100px",
      padding: "8px 12px",
      minWidth: "64px",
      fontWeight: 600,
      ...sxCustom
    }}
    onClick={onClick}
  >
    {children}
  </Box>
)

export default ButtonGreenTemplate
