import { Box } from "@mui/material"
import React from "react"

const NoReady = () => (
  <Box
    component="div"
    sx={{
      background: "#18181C",
      border: "0.7px solid #35383F",
      borderRadius: "16px",
      padding: "10px 20px",
      textAlign: "center"
    }}
  >
    {`Your don't have items to play. Please go to website to buy items to continue to play.`}
  </Box>
)

export default NoReady
