import React, { memo } from "react"
import { Box } from "@mui/material"
import HeadLogo from "@components/molecules/HeadLogo"
import HeadMenu from "@components/molecules/HeadMenu"
import HeadPrice from "@components/molecules/HeadPrice"
import { RightMenu } from "@components/molecules/rightMenu"
import useGlobal from "@hooks/useGlobal"
import RightMenuDeveloper from "@components/molecules/rightMenu/RightMenuDeveloper"

const Header = () => {
  const { isMarketplace, isDeveloperPage } = useGlobal()

  const showHeadPrice = !isMarketplace && !isDeveloperPage
  const showHeadMenu = !isDeveloperPage
  const showRightMenu = !isDeveloperPage
  const showRightMenuDeveloper = isDeveloperPage

  return (
    <>
      {showHeadPrice && <HeadPrice />}
      <header className="header top-10 z-[999] lg:sticky">
        <Box
          component="div"
          className="flex flex-wrap items-center justify-between lg:my-10 xl:flex-nowrap"
        >
          <HeadLogo />
          {showHeadMenu && <HeadMenu />}
          {showRightMenu && <RightMenu />}
          {showRightMenuDeveloper && <RightMenuDeveloper />}
        </Box>
      </header>
    </>
  )
}

export default memo(Header)
