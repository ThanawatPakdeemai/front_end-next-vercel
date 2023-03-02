import React, { memo } from "react"
import { Box } from "@mui/material"
import HeadLogo from "@components/molecules/HeadLogo"
import HeadMenu from "@components/molecules/HeadMenu"
import HeadPrice from "@components/molecules/HeadPrice"
import { RightMenu } from "@components/molecules/rightMenu"
import useGlobal from "@hooks/useGlobal"

const Header = () => {
  const { isMarketplace } = useGlobal()
  return (
    <>
      {!isMarketplace ? <HeadPrice /> : null}
      <header className="header top-10 z-[999] lg:sticky">
        <Box
          component="div"
          className="flex flex-wrap items-center justify-between lg:my-10 xl:flex-nowrap"
        >
          <HeadLogo />
          <HeadMenu />
          <RightMenu />
        </Box>
      </header>
    </>
  )
}

export default memo(Header)
