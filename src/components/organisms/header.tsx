import React, { memo } from "react"
import { Box } from "@mui/material"
import HeadLogo from "@components/molecules/HeadLogo"
import HeadMenu from "@components/molecules/HeadMenu"
import HeadPrice from "@components/molecules/HeadPrice"

const Header = () => (
  <header className="header">
    <HeadPrice />
    <Box
      component="div"
      className="my-10 items-center justify-between lg:flex"
    >
      <HeadLogo />
      <HeadMenu />
      <div className="text-error-main">MENU</div>
    </Box>
  </header>
)

export default memo(Header)
