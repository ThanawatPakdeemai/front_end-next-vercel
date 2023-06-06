import { Image } from "@components/atoms/image"
import SearchIcon from "@components/icons/SearchIcon"
import ShineIcon from "@components/icons/ShineIcon"
import Tagline from "@components/molecules/tagline/Tagline"
import { Collapse, InputAdornment, TextField } from "@mui/material"
import React, { useState } from "react"
import SettingIconFilter from "@components/icons/Inventory/SettingIconFilter"
import { MENU_MARKETPLACE } from "@configs/menu"
import MenuItemCustom from "@components/atoms/MenuItemCustom"
import { NextRouter, useRouter } from "next/router"
import HeaderMunuMobile from "./HeaderMunuMobile"
import MenuButtonExpandMobile from "./MenuButtonExpandMobile"

interface IProp {
  isNoFilter?: boolean
}

const MarketplaceLayoutMobile = ({
  isNoFilter = true,
  children
}: IProp & React.PropsWithChildren<React.ComponentPropsWithoutRef<"div">>) => {
  const [expanded, setExpanded] = useState<boolean>(false)
  const router: NextRouter = useRouter()

  const isP2P = router.asPath.includes("p2p")
  const listFilter = isP2P ? "P2P Market" : "NAKA Market"

  const handleOnExpandClick = () => {
    setExpanded(!expanded)
  }
  return (
    <div className="main-container mx-auto pt-14">
      <HeaderMunuMobile />
      <Image
        src="/images/banner/bannerMarketplace.webp"
        alt="test"
        width={635}
        height={180}
        className="rounded-3xl p-4"
      />
      <Tagline
        icon={<ShineIcon />}
        bgColor="bg-neutral-800"
        textColor="text-neutral-500 font-bold"
        text="Join the NFT revolution and become a part of the future of ownership. "
        show
      />
      {isNoFilter && (
        <div className="mb-8 flex gap-4 p-4">
          <div className="grid h-[40px] w-[50px] content-center justify-center rounded-lg bg-purple-primary p-2">
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
            className="mt-10 w-[200px] rounded-[19px] p-2"
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
          <TextField
            className="w-full"
            placeholder="Search Keyword"
            InputProps={{
              style: {
                fontSize: "14px",
                fontFamily: "neueMachina",
                // width: "100%",
                paddingLeft: 16
              },
              endAdornment: (
                <InputAdornment
                  position="end"
                  className="cursor-pointer"
                  onClick={() => {}}
                >
                  <SearchIcon />
                </InputAdornment>
              )
            }}
            onChange={(_event) => {}}
          />
          <div className="h-[40px] w-[40px] rounded-lg bg-purple-primary p-2">
            <SettingIconFilter />
          </div>
        </div>
      )}
      {children}
    </div>
  )
}

export default MarketplaceLayoutMobile
