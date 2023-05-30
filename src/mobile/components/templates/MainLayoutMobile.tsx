import { Box } from "@mui/material"
import React from "react"

const MainLayoutMobile = ({ children }: { children: React.ReactNode }) => (
  <Box
    component="div"
    className="home-page__mobile flex flex-col gap-6 pb-28"
    sx={{
      marginTop: "-50px",
      position: "relative",
      width: "100%",
      minHeight: "calc(100vh - 120px)",
      padding: "32px",
      background: "#181A20",
      borderRadius: "30px 30px 0 0"
    }}
  >
    {children}
  </Box>
)

export default MainLayoutMobile
