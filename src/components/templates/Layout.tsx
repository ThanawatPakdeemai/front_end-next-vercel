import React from "react"
import { Box } from "@mui/material"
import dynamic from "next/dynamic"
import { isMobile } from "@hooks/useGlobal"

const Footer = dynamic(() => import("@components/organisms/Footer"), {
  suspense: true,
  ssr: true
})

const Header = dynamic(() => import("@components/organisms/Header"), {
  suspense: true,
  ssr: true
})

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
      className="main-container mx-auto w-full lg:px-2"
    >
      <Header />
      {children}
      {!isMobile && <Footer />}
    </Box>
  )
}
