import { Button, Collapse } from "@mui/material"
import React, { useState } from "react"
import { NextRouter, useRouter } from "next/router"
import dynamic from "next/dynamic"
import { MENU_MARKETPLACE } from "@configs/menu"
import useMarketFilterStore from "@stores/marketFilter"

const HeaderMenuMobile = dynamic(() => import("./HeaderMenuMobile"), {
  suspense: true,
  ssr: false
})
const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: false
})
const Tagline = dynamic(() => import("@components/molecules/tagline/Tagline"), {
  suspense: true,
  ssr: false
})
const MenuItemCustom = dynamic(
  () => import("@components/atoms/MenuItemCustom"),
  {
    suspense: true,
    ssr: false
  }
)
const SwipeableEdgeDrawer = dynamic(
  () => import("@feature/marketplace/components/organisms/DrawerMobileFilter"),
  {
    suspense: true,
    ssr: false
  }
)
const FilterSearchBox = dynamic(
  () => import("@feature/marketplace/components/molecules/FilterSearchBox"),
  {
    suspense: true,
    ssr: false
  }
)
const MenuButtonExpandMobile = dynamic(
  () => import("./MenuButtonExpandMobile"),
  {
    suspense: true,
    ssr: false
  }
)

const Image = dynamic(() => import("@components/atoms/image/Image"), {
  suspense: true,
  ssr: true
})

interface IProp {
  isNoFilter?: boolean
}

const MarketplaceLayoutMobile = ({
  isNoFilter = true,
  children
}: IProp & React.PropsWithChildren<React.ComponentPropsWithoutRef<"div">>) => {
  const { onSetSearch } = useMarketFilterStore()

  const [expanded, setExpanded] = useState<boolean>(false)
  const [openFilter, setOpenFilter] = useState<boolean>(false)
  // eslint-disable-next-line no-unused-vars
  const [searchReset, setSearchReset] = useState<boolean>(false)
  const router: NextRouter = useRouter()

  const isP2P = router.asPath.includes("p2p")
  const listFilter = isP2P ? "P2P Market" : "NAKA Market"

  // const onCloseModalCustom = () => {
  //   setOpenFilter(!openFilter)
  // }

  const handleOnExpandClick = () => {
    setExpanded(!expanded)
  }

  const styleButton = {
    minWidth: "10px !important",
    borderRadius: "8px !important",
    "&:hover": {
      boxShadow: "none !important",
      "svg rect": {
        fill: "#E1E2E2 !important"
      }
    }
  }

  return (
    <div className="main-container mx-auto pt-14">
      <HeaderMenuMobile />
      <Image
        src="/images/banner/bannerMarketplace.webp"
        alt="openFilter"
        width={635}
        height={180}
        className="rounded-3xl p-4"
      />
      <Tagline
        icon={<Icomoon className="icon-require" />}
        bgColor="bg-neutral-800"
        textColor="text-neutral-500 font-bold"
        text="Join the NFT revolution and game a part of the future of ownership. "
        show
      />
      {isNoFilter && (
        <div className="grid w-full	justify-items-center">
          <div className="mb-8 flex p-4">
            <div className="grid h-[40px] w-[40px] content-center justify-items-center rounded-lg bg-purple-primary p-2 ">
              <MenuButtonExpandMobile
                isOpen={expanded}
                onClick={handleOnExpandClick}
                strokeWidth="2"
                color="#F1F4F4"
                transition={{
                  ease: "easeOut",
                  duration: 0.2,
                  stiffness: 10,
                  bounce: 5
                }}
                width="20"
                height="10"
              />
            </div>
            <Collapse
              in={expanded}
              timeout="auto"
              className="!mt-[48px]  w-[200px] rounded-[19px] p-2"
              sx={{
                backgroundColor: "#232329",
                zIndex: 99999,
                position: "absolute",
                width: "218px"
              }}
            >
              {MENU_MARKETPLACE &&
                MENU_MARKETPLACE.map((menu) => (
                  <div key={menu.name}>
                    {menu.name === listFilter && (
                      <>
                        {menu.chide?.map((item) => {
                          const active = router.asPath.includes(item.link)
                          return (
                            <MenuItemCustom
                              key={item.name}
                              label={item.name}
                              icon=""
                              href=""
                              id={item.name}
                              external={false}
                              active={active}
                              onClick={() => {
                                setExpanded(!expanded)
                                router.push(item.link)
                              }}
                            />
                          )
                        })}
                      </>
                    )}
                  </div>
                ))}
            </Collapse>
            <FilterSearchBox
              className="!px-5"
              title=""
              placeholder="e.g. 11900011"
              onClick={(_value) => {
                onSetSearch({ key: "nft_token", value: _value })
              }}
              onKey={(event, _value) => {
                if (event.key === "Enter") {
                  event.preventDefault()
                  onSetSearch({
                    key: "nft_token",
                    value: _value
                  })
                }
              }}
              reset={searchReset}
            />
            {/* {isP2P ? (
            <FilterSearchBox
              title="wallet address"
              placeholder="e.g. 0x20E7B302f92185098082988c482C4218f5c58695"
              onClick={(_value) => {
                onSetSearch({ key: "seller_id", value: _value })
              }}
              reset={searchReset}
            />
          ) : null} */}
            <div className="!h-[40px] !w-[40px]">
              <Button
                sx={styleButton}
                onClick={() => {
                  setOpenFilter(true)
                }}
                className="!h-[40px] !w-[40px] rounded-lg border border-neutral-700 bg-neutral-800 p-2"
              >
                <Icomoon className="icon-Filters-Horizontal text-white-default" />
              </Button>
            </div>
            <SwipeableEdgeDrawer
              open={openFilter}
              setClose={(_toggle) => setOpenFilter(_toggle)}
            />
          </div>
        </div>
      )}
      {children}
    </div>
  )
}

export default MarketplaceLayoutMobile
