import { Divider, MenuList, Typography } from "@mui/material"
import { NextRouter, useRouter } from "next/router"
import React from "react"
import { useTranslation } from "react-i18next"
import dynamic from "next/dynamic"
import { MENU_MARKETPLACE_INVENTORY } from "@configs/menu"
import useProfileStore from "@stores/profileStore"
import useNotiStore from "@stores/notification"
import Helper from "@utils/helper"
import { InventoryProvider } from "@providers/InventoryProvider"

const Image = dynamic(() => import("@components/atoms/image/Image"), {
  suspense: true,
  ssr: true
})
const HeaderMunuMobile = dynamic(
  () => import("@feature/page/marketplace/mobilescreen/HeaderMenuMobile"),
  {
    suspense: true,
    ssr: false
  }
)
const Balance = dynamic(() => import("@components/molecules/balance/Balance"), {
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
const ButtonToggleIcon = dynamic(
  () => import("@components/molecules/gameSlide/ButtonToggleIcon"),
  {
    suspense: true,
    ssr: false
  }
)
const Footer = dynamic(() => import("@components/organisms/Footer"), {
  suspense: true,
  ssr: false
})
const Header = dynamic(() => import("@components/organisms/Header"), {
  suspense: true,
  ssr: true
})
const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: false
})

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
        <div className="hidden sm:block">
          <Header />
        </div>
        <div className="block sm:hidden">
          <HeaderMunuMobile margin="mt-16" />
        </div>
        <div className="items-center sm:flex" />
        <Divider
          className="hidden !w-full sm:block"
          sx={{ marginTop: 2 }}
        />
        <div className="flex flex-col gap-3 sm:flex-row">
          {/* add filter component here */}
          <div className="hidden w-[200px] sm:block">
            <div className="mb-4 flex-row gap-3 md:flex">
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
                            onClick={() =>
                              Helper.copyClipboard(profile?.address)
                            }
                            className="cursor-pointer text-xs font-bold text-secondary-main"
                          >
                            {Helper.shortenString(profile?.address)}
                          </Typography>
                        )}
                      </div>
                    </div>
                  ) : null}
                  {MENU_MARKETPLACE_INVENTORY.map((ele) => {
                    const active =
                      router.asPath.split("/")[3] === ele.href.split("/")[3]
                    const activeOnlyInventory =
                      router.pathname.split("/")[3] === "[type]" &&
                      ele.href.split("/").length === 3
                    return (
                      <MenuItemCustom
                        key={ele.id}
                        id={ele.id}
                        label={ele.label}
                        icon={ele.icon}
                        href={ele.href}
                        external={ele.external}
                        active={active || activeOnlyInventory}
                      />
                    )
                  })}
                </div>
              </MenuList>
            </div>
            <Balance widthBalance="w-[calc(100%-70px)]" />
            {profile && (
              <ButtonToggleIcon
                startIcon={<Icomoon className="icon-Power" />}
                text={t("logout")}
                handleClick={async () => {
                  await onResetNotification()
                  await onReset()
                }}
                className="btn-rainbow-theme my-4 bg-error-main px-2 text-sm text-white-default"
                type="button"
              />
            )}
          </div>
          <div className="flex w-full justify-center border-l border-neutral-800 pl-0 sm:pl-10">
            {children}
          </div>
        </div>
        <Footer />
      </div>
    </InventoryProvider>
  )
}

export default MarketplaceLayoutInventory
