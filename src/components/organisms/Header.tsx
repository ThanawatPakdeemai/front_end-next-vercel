import React, { memo } from "react"
import { Box } from "@mui/material"
import HeadLogo from "@components/molecules/HeadLogo"
import HeadMenu from "@components/molecules/HeadMenu"
import HeadPrice from "@components/molecules/HeadPrice"
import { RightMenu } from "@components/molecules/rightMenu"
import useGlobal from "@hooks/useGlobal"
import RightMenuDeveloper from "@components/molecules/rightMenu/RightMenuDeveloper"
import { useRouter } from "next/router"

const Header = () => {
  const { isMarketplace, isDeveloperPage } = useGlobal()
  const { asPath } = useRouter()

  const showHeadPrice = !isMarketplace && !isDeveloperPage
  const showHeadMenu = !isDeveloperPage
  const showRightMenu = !isDeveloperPage
  const showRightMenuDeveloper = isDeveloperPage

  return (
    <>
      {showHeadPrice && <HeadPrice />}
      <header
        className={`header ${
          asPath.includes("map")
            ? "w-full bg-primary-main lg:fixed"
            : "lg:sticky"
        } relative z-[999]`}
      >
        <Box
          component="div"
          className="flex flex-wrap items-center justify-between md:my-10 lg:flex-nowrap"
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
