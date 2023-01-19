import React, { memo } from "react"
import { Box, ButtonGroup } from "@mui/material"
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined"
import ButtonLink from "@components/atoms/button/ButtonLink"
import DropdownList from "@components/atoms/DropdownList"
import ButtonIcon from "@components/atoms/button/ButtonIcon"
import AddOutlinedIcon from "@mui/icons-material/AddOutlined"
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined"
import useGameStore from "@stores/game"
import { CURENCY } from "@configs/dropdown"
import { Image } from "@components/atoms/image"

const iconmotion = {
  hover: {
    scale: 1.2,
    rotate: 17,
    ease: "easeIn",
    transition: {
      duration: 0.4,
      stiffness: 500,
      type: "spring"
    }
  }
}

const FromButItem = () => {
  const game = useGameStore((state) => state.data)

  return (
    <>
      {game && (
        <form>
          <Box>
            <div className=" grid grid-cols-2 justify-center gap-4">
              <div className="flex justify-center rounded-2xl border-[1px] border-[#232329]">
                <Image
                  src="/images/gamePage/Silver_Skull.png"
                  alt=""
                  width={100}
                  height={100}
                  className="w-full p-4"
                />
              </div>
              <div className="">
                <p className="text-[#ffffff]">Asset name</p>
                <p className="text-[#70727B]">Skull</p>
                <p className="text-[#ffffff]">Descriptions</p>
                <p className="text-[#70727B]">
                  Our skull game assets are the perfect addition to any dark and
                  cyberpunk game <span className="text-[#7B5BE6]">...</span>
                </p>
              </div>
            </div>
          </Box>
          <Box className="my-4 w-full pr-4">
            <p className="py-2 uppercase text-[#70727B]">Tier assets</p>
            <DropdownList
              title="List Items"
              list={game.item}
              className="w-[410px]"
            />
          </Box>
          <Box className="my-4 w-full pr-4">
            <p className="py-2 uppercase text-[#70727B]">Currency</p>
            <DropdownList
              title="Item Game"
              list={CURENCY}
              className="w-[410px]"
            />
          </Box>
          <p className="uppercase text-[#7B5BE6]">Skull XL = 13.8389 NAKA</p>

          <div className="my-4  grid grid-cols-6  content-center gap-4">
            <div className="btn">
              <ButtonIcon
                variants={iconmotion}
                whileHover="hover"
                transition={{ type: "spring", stiffness: 400, damping: 4 }}
                icon={
                  <RemoveOutlinedIcon className="h-[30px] w-[30px] text-white-primary" />
                }
                className="ml-1 flex h-[50px] w-[50px] items-center justify-center rounded-lg border border-neutral-700 bg-secondary-main"
              />
            </div>
            <div className="input col-span-4">
              <div className="flex h-full w-full justify-between rounded-xl bg-[#232329] p-2  text-[#70727B]">
                <div className="text-center">
                  <p className="h-full w-[220px] pt-2 text-center">0.00 </p>
                </div>
                <Image
                  src="/images/gamePage/skull.png"
                  alt="skull"
                />
              </div>
            </div>
            <div className="btn">
              <ButtonIcon
                variants={iconmotion}
                whileHover="hover"
                transition={{ type: "spring", stiffness: 400, damping: 4 }}
                icon={
                  <AddOutlinedIcon className="h-[30px] w-[30px] rotate-90 text-white-primary" />
                }
                className="ml-1 flex h-[50px] w-[50px] items-center justify-center rounded-lg border border-neutral-700 bg-secondary-main"
              />
            </div>
          </div>
          <div className="my-2 flex w-full justify-between rounded-xl border border-[#232329] p-4">
            <div className="">
              <p>TOTAL PRICE:</p>
            </div>
            <div className="flex items-baseline text-secondary-main">
              <p className="pr-2">0.00</p>
              <Image
                src="/images/logo/Logo-Master2.png"
                alt="Master2"
                width="30"
                height="30"
              />
            </div>
          </div>
          <div className="w-full text-end">
            <p className="text-sm text-[#70727B]">= $0.00</p>
          </div>
          <ButtonGroup className="mt-10 flex flex-col  gap-3">
            <ButtonLink
              href="/"
              size="medium"
              className="h-[40px] w-full text-sm "
              text="Buy Now"
              type="submit"
              color="secondary"
              variant="contained"
            />
            <div className="flex w-full justify-center rounded-2xl  border border-[#2f2f2f]">
              <ButtonLink
                className="h-[40px] w-full text-sm"
                href="/"
                text="View in Marketplace"
                size="medium"
                variant="contained"
                icon={<ShoppingCartOutlinedIcon />}
              />
            </div>
          </ButtonGroup>
        </form>
      )}
    </>
  )
}
export default memo(FromButItem)
