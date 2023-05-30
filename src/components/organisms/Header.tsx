import React, { memo, useEffect } from "react"
import { Box } from "@mui/material"
import HeadLogo from "@components/molecules/HeadLogo"
import HeadMenu from "@components/molecules/HeadMenu"
import HeadPrice from "@components/molecules/HeadPrice"
import { RightMenu } from "@components/molecules/rightMenu"
import useGlobal, { isMobile } from "@hooks/useGlobal"
import RightMenuDeveloper from "@components/molecules/rightMenu/RightMenuDeveloper"
import useMutateMarketplace from "@feature/marketplace/containers/hooks/useMutateMarketplace"
import useMarketCategTypes from "@stores/marketCategTypes"
import { NextRouter, useRouter } from "next/router"

const Header = () => {
  const router: NextRouter = useRouter()
  const { isMarketplace, isDeveloperPage } = useGlobal()

  const showHeadPrice = !isMarketplace && !isDeveloperPage
  const showHeadMenu = !isDeveloperPage
  const showRightMenu = !isDeveloperPage
  const showRightMenuDeveloper = isDeveloperPage

  const { mutateMarketTypes } = useMutateMarketplace()
  const { fetchStatus, setFetchStatus, onSetMarketTypes, onSetCategory } =
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

  useEffect(() => {
    let cleanup = false
    const selectedCategory = () => {
      const _path = router.asPath
      if (_path.includes("/game-item")) {
        onSetCategory("game_item")
      } else if (_path.includes("/land")) {
        onSetCategory("nft_land")
      } else if (_path === "/marketplace") {
        onSetCategory("nft_land")
      } else if (_path.includes("/building")) {
        onSetCategory("nft_building")
      } else if (_path.includes("/material")) {
        onSetCategory("nft_material")
      } else if (_path.includes("/naka-punk")) {
        onSetCategory("nft_naka_punk")
      } else if (_path.includes("/arcade-game")) {
        onSetCategory("nft_game")
      } else if (_path.includes("/avatar-reef")) {
        onSetCategory("nft_avatar")
      } else {
        onSetCategory(undefined)
      }
    }
    if (!cleanup && isMarketplace) {
      selectedCategory()
    }
    return () => {
      cleanup = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMarketplace, router.asPath])

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
    </div>
  )
}

export default memo(Header)
