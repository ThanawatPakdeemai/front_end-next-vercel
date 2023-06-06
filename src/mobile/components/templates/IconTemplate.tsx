import React from "react"
import { Box } from "@mui/material"

const IconTemplate = ({
  children,
  onClick
}: {
  children: React.ReactNode
  onClick?: () => void
}) => (
  <Box
    component="button"
    sx={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      width: "48px",
      height: "48px",
      background: "#181A20",
      border: "1px solid #181A20",
      borderRadius: "100px",
      position: "relative"
    }}
    onClick={onClick}
  >
    {children}
  </Box>
)

export default IconTemplate
