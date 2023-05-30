import { Image } from "@components/atoms/image"
import MenuItemCustom from "@components/atoms/MenuItemCustom"
import PlugIcon from "@components/icons/MenunIcon/PlugIcon"
import ButtonToggleIcon from "@components/molecules/gameSlide/ButtonToggleIcon"
import Footer from "@components/organisms/Footer"
import Header from "@components/organisms/Header"
import { MENU_MARKETPLACE_INVENTORY } from "@configs/menu"
import InventoryPage from "@feature/page/inventory/InventoryPage"
import { Divider, MenuList, Typography } from "@mui/material"
import useProfileStore from "@stores/profileStore"
import useNotiStore from "@stores/notification"
import Helper from "@utils/helper"
import { NextRouter, useRouter } from "next/router"
import React from "react"
import { useTranslation } from "react-i18next"
import { InventoryProvider } from "@providers/InventoryProvider"

const MarketplaceLayoutInventory = ({
  children
}: React.PropsWithChildren<React.ComponentPropsWithoutRef<"div">>) => {
  const profile = useProfileStore((state) => state.profile.data)
  const { onResetNotification } = useNotiStore()
  const { onReset } = useProfileStore()
  const router: NextRouter = useRouter()
  const { t } = useTranslation()

  return (
    <InventoryProvider>
      <div className="main-container mx-auto">
        <Header />
        <div className="items-center sm:flex" />
        <Divider
          className="!w-full"
          sx={{ marginTop: 2 }}
        />
        <div className="flex flex-col md:flex-row">
          {/* add filter component here */}
          <div className="w-60">
            {/* <div className="w-full flex-row md:flex"> */}
            <MenuList className="mt-4 h-fit w-full max-w-xs rounded-[13px] bg-neutral-800 p-[6px] md:mx-0">
              <div className="w-full">
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
            {/* </div> */}

            {profile ? (
              <ButtonToggleIcon
                startIcon={<PlugIcon />}
                text={t("logout")}
                handleClick={async () => {
                  await onResetNotification()
                  await onReset()
                }}
                className="btn-rainbow-theme my-4 bg-error-main px-14 text-sm text-white-default"
                type="button"
              />
            ) : null}
          </div>
          <InventoryPage />
          <main className="flex w-full flex-col gap-y-4 px-2">
            {/* <FilterDropdown /> */}
            {children}
          </main>
        </div>
        <Footer />
      </div>
    </InventoryProvider>
  )
}

export default MarketplaceLayoutInventory
