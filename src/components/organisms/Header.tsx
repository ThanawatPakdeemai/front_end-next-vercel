import React, { memo, useEffect } from "react"
import { Box } from "@mui/material"
import HeadLogo from "@components/molecules/HeadLogo"
import HeadMenu from "@components/molecules/HeadMenu"
import HeadPrice from "@components/molecules/HeadPrice"
import { RightMenu } from "@components/molecules/rightMenu"
import useGlobal, { isMobile } from "@hooks/useGlobal"
import RightMenuDeveloper from "@components/molecules/rightMenu/RightMenuDeveloper"
import HeadMenuMobile from "@mobile/components/organisms/headerMenu/HeadMenuMobile"
import HeadProfileMobile from "@mobile/components/organisms/headerMenu/HeadProfileMobile"
// import CONFIGS from "@configs/index"
import useMutateMarketplace from "@feature/marketplace/containers/hooks/useMutateMarketplace"
import useMarketCategTypes from "@stores/marketCategTypes"

const Header = () => {
  const { isMarketplace, isDeveloperPage } = useGlobal()

  const showHeadPrice = !isMarketplace && !isDeveloperPage
  const showHeadMenu = !isDeveloperPage
  const showRightMenu = !isDeveloperPage
  const showRightMenuDeveloper = isDeveloperPage

  const { mutateMarketTypes } = useMutateMarketplace()
  const { fetchStatus, setFetchStatus, onSetMarketTypes } =
    useMarketCategTypes()

  useEffect(() => {
    const fetchMarketTyps = async () => {
      if (!fetchStatus && isMarketplace) {
        const { status, data } = await mutateMarketTypes()
        if (status && data) {
          onSetMarketTypes(data)
          setFetchStatus(true)
        }
      }
    }
    let cleanup = false
    if (!cleanup) {
      fetchMarketTyps()
    }
    return () => {
      cleanup = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMarketplace])

  return (
    <div className="header-wrapper">
      {showHeadPrice && !isMobile && <HeadPrice />}
      {!isMobile && (
        <header className="header relative top-10 z-[999] lg:sticky">
          <Box
            component="div"
            className="flex flex-wrap items-center justify-between md:my-10 xl:flex-nowrap"
          >
            <HeadLogo />
            {showHeadMenu && <HeadMenu />}
            {showRightMenu && <RightMenu />}
            {showRightMenuDeveloper && <RightMenuDeveloper />}
          </Box>
        </header>
      )}

      {isMobile && (
        <>
          <HeadProfileMobile />
          <HeadMenuMobile />
        </>
      )}
    </div>
  )
}

export default memo(Header)
