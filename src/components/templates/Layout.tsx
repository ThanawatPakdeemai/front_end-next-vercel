import Footer from "@components/organisms/Footer"
import Header from "@components/organisms/Header"
import { Box } from "@mui/material"
import React from "react"
import { BrowserView } from "react-device-detect"

export default function Layout({
  children
}: React.PropsWithChildren<React.ComponentPropsWithoutRef<"div">>) {
  return (
    <Box
      component="div"
      sx={{
        ".footer-divider": {
          display: "none"
        }
      }}
      className="main-container mx-auto w-full px-2 "
    >
      <Header />
      {children}
      <BrowserView>
        <Footer />
      </BrowserView>
    </Box>
  )
}
