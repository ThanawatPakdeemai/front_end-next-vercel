import { Image } from "@components/atoms/image"
import SearchIcon from "@components/icons/SearchIcon"
import ShineIcon from "@components/icons/ShineIcon"
import Tagline from "@components/molecules/tagline/Tagline"
import {
  Button,
  Collapse,
  InputAdornment,
  Stack,
  TextField
} from "@mui/material"
import React, { useState } from "react"
import SettingIconFilter from "@components/icons/Inventory/SettingIconFilter"
import { MENU_MARKETPLACE } from "@configs/menu"
import MenuItemCustom from "@components/atoms/MenuItemCustom"
import { NextRouter, useRouter } from "next/router"
import { ModalCustom } from "@components/molecules/Modal/ModalCustom"
import ModalHeader from "@components/molecules/Modal/ModalHeader"
import FilterBox from "@feature/marketplace/components/molecules/FilterBox"
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
  const [openFilter, setOpenFilter] = useState<boolean>(false)
  const router: NextRouter = useRouter()

  const isP2P = router.asPath.includes("p2p")
  const listFilter = isP2P ? "P2P Market" : "NAKA Market"

  const onCloseModalCustom = () => {
    setOpenFilter(!openFilter)
  }

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
      <HeaderMunuMobile />
      <Image
        src="/images/banner/bannerMarketplace.webp"
        alt="openFilter"
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
          <div className="!h-[40px] !w-[40px]">
            <Button
              sx={styleButton}
              onClick={() => {
                setOpenFilter(true)
              }}
              className="!h-[40px] !w-[40px] rounded-lg border border-neutral-700 bg-neutral-800 p-2"
            >
              <SettingIconFilter />
            </Button>
          </div>

          <ModalCustom
            open={openFilter}
            onClose={onCloseModalCustom}
            className="m-auto gap-3 rounded-[34px] p-[10px] max-[420px]:w-[370px]"
            width={515}
          >
            <Stack
              spacing={3}
              className="md:p-5"
            >
              <div className="rounded-2xl border-[1px] border-neutral-700 bg-neutral-800 p-2 uppercase">
                <ModalHeader
                  handleClose={onCloseModalCustom}
                  title="Filter"
                />
              </div>
              <div className="grid h-[500px] w-full justify-items-center overflow-y-auto">
                <FilterBox />
              </div>
            </Stack>
          </ModalCustom>
        </div>
      )}
      {children}
    </div>
  )
}

export default MarketplaceLayoutMobile
