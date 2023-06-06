import { Box } from "@mui/material"
import React from "react"

const HamburgerMenu = () => (
  <Box
    component="button"
    className="h-12 w-12 rounded-[14px] bg-primary-main"
    sx={{
      display: "flex",
      flexDirection: "column",
      gap: "6px",
      justifyContent: "center",
      padding: "10px 12px",
      span: {
        width: "100%",
        height: "2px",
        backgroundColor: "#fff",
        borderRadius: "2px",
        "&:last-child": {
          width: "50%"
        }
      }
    }}
  >
    <span />
    <span />
    <span />
  </Box>
)

export default HamburgerMenu
