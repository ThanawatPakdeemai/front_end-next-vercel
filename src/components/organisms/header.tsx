import React, { memo } from "react"
import { Box } from "@mui/material"
import HeadLogo from "@components/molecules/HeadLogo"
import HeadMenu from "@components/molecules/HeadMenu"
import RightMenu from "@components/molecules/RightMenu"

const Header = () => (
  <header className="header top-10 z-[999] lg:sticky">
    <Box
      component="div"
      className="my-10 items-center justify-between lg:flex"
    >
      <HeadLogo />
      <HeadMenu />
      <RightMenu />
    </Box>
  </header>
)

export default memo(Header)
