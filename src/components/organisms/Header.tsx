import React, { memo, useEffect } from "react"
import { Box } from "@mui/material"
import dynamic from "next/dynamic"
import useMutateMarketplace from "@feature/marketplace/containers/hooks/useMutateMarketplace"
import useMarketCategTypes from "@stores/marketCategTypes"
import useGlobal, { isMobile } from "@hooks/useGlobal"

// Use dynamic import for the components
const HeadLogo = dynamic(() => import("@components/molecules/HeadLogo"), {
  suspense: true,
  ssr: false
})
const HeadMenu = dynamic(() => import("@components/molecules/HeadMenu"), {
  suspense: true,
  ssr: false
})
const HeadPrice = dynamic(() => import("@components/molecules/HeadPrice"), {
  suspense: true,
  ssr: false
})
const RightMenu = dynamic(
  () => import("@components/molecules/rightMenu/RightMenu"),
  {
    suspense: true,
    ssr: false
  }
)
const RightMenuDeveloper = dynamic(
  () => import("@components/molecules/rightMenu/RightMenuDeveloper"),
  {
    suspense: true,
    ssr: false
  }
)

const Header = () => {
  const { isMarketplace, isDeveloperPage } = useGlobal()

  const showHeadPrice = !isMarketplace && !isDeveloperPage
  const showHeadMenu = !isDeveloperPage
  const showRightMenu = !isDeveloperPage
  const showRightMenuDeveloper = isDeveloperPage

  const { mutateMarketTypes, mutateSettingMarket } = useMutateMarketplace()
  const { fetchStatus, setFetchStatus, onSetMarketTypes, onSetNFTMintAble } =
    useMarketCategTypes()

  useEffect(() => {
    const fetchMarketTyps = async () => {
      if (!fetchStatus && isMarketplace) {
        const [_marketResource, _marketSetting] = await Promise.all([
          mutateMarketTypes(),
          mutateSettingMarket()
        ])
        if (_marketResource.status && _marketResource.data) {
          onSetMarketTypes(_marketResource.data)
        }
        if (_marketSetting.status && _marketSetting.data) {
          const _setting = _marketSetting.data.map((d) => ({
            _nft: d.name,
            _value: d.value
          }))
          onSetNFTMintAble(_setting)
        }
        setFetchStatus(true)
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
    <div className="header-wrapper z-40">
      {showHeadPrice && !isMobile && <HeadPrice />}
      {!isMobile && (
        <header className="header relative z-[999] lg:sticky lg:top-10">
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
