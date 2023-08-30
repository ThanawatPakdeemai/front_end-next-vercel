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

const OfflineIndicator = dynamic(
  () => import("@components/atoms/worker/OfflineIndicator"),
  {
    suspense: true,
    ssr: true
  }
)

const Layout = ({
  children
}: React.PropsWithChildren<React.ComponentPropsWithoutRef<"div">>) => (
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
    <OfflineIndicator />
  </Box>
)

export default Layout
