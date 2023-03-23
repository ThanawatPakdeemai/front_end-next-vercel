import { Image } from "@components/atoms/image"
import MenuItemCustom from "@components/atoms/MenuItemCustom"
import PlugIcon from "@components/icons/MenunIcon/PlugIcon"
import ButtonToggleIcon from "@components/molecules/gameSlide/ButtonToggleIcon"
import Footer from "@components/organisms/Footer"
import Header from "@components/organisms/Header"
import { MENU_MARKETPLACE_INVENTORY } from "@configs/menu"
import { Divider, MenuList, Typography } from "@mui/material"
import useProfileStore from "@stores/profileStore"
import Helper from "@utils/helper"
import { NextRouter, useRouter } from "next/router"
import React from "react"

const MarketplaceLayoutInventory = ({
  children
}: React.PropsWithChildren<React.ComponentPropsWithoutRef<"div">>) => {
  const profile = useProfileStore((state) => state.profile.data)
  const { onReset } = useProfileStore()
  const router: NextRouter = useRouter()

  return (
    <div className="main-container mx-auto">
      <Header />
      <div className="items-center sm:flex" />
      <Divider
        className="!w-full"
        sx={{ marginTop: 2 }}
      />
      <div className="flex flex-row gap-3">
        {/* add filter component here */}
        <div className="w-[200px]">
          <div className="flex-row gap-3 md:flex">
            <MenuList className="mx-auto mt-4 h-fit w-full max-w-xs rounded-[13px] bg-neutral-800 p-[6px] md:mx-0 md:w-[200px]">
              <div>
                {profile ? (
                  <div className="mb-2 flex rounded-lg border border-neutral-700 bg-neutral-780 p-1">
                    <Image
                      key={profile?.id}
                      src={profile?.avatar || "/images/avatar.png"}
                      alt="avatar"
                      width={40}
                      height={40}
                      className="mr-[5px] rounded-lg"
                    />
                    <div>
                      <Typography className="text-sm font-bold">
                        {profile?.username}
                      </Typography>
                      {profile?.address && (
                        <Typography
                          paragraph
                          component="span"
                          variant="body1"
                          onClick={() => Helper.copyClipboard(profile?.address)}
                          className="cursor-pointer text-xs font-bold text-secondary-main"
                        >
                          {Helper.shortenString(profile?.address)}
                        </Typography>
                      )}
                    </div>
                  </div>
                ) : null}
                {MENU_MARKETPLACE_INVENTORY.map((ele) => {
                  const active = router.asPath.includes(ele.href)
                  return (
                    <MenuItemCustom
                      key={ele.id}
                      id={ele.id}
                      label={ele.label}
                      icon={ele.icon}
                      href={ele.href}
                      external={ele.external}
                      active={active}
                    />
                  )
                })}
              </div>
            </MenuList>
          </div>
          {/* <AmountBalance
            icon={chain === "polygon" ? <INaka /> : <IBusd />}
            balance={balance || { digit: 0, text: "N/A" }}
          /> */}
          {profile && (
            <ButtonToggleIcon
              startIcon={<PlugIcon />}
              text="Logout"
              handleClick={async () => {
                await onReset()
              }}
              className="btn-rainbow-theme my-4 bg-error-main px-14 text-sm text-white-default"
              type="button"
            />
          )}
        </div>
        <div>{children}</div>
      </div>
      <Footer />
    </div>
  )
}

export default MarketplaceLayoutInventory
