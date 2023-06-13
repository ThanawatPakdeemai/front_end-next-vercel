import { Image } from "@components/atoms/image"
import MenuItemCustom from "@components/atoms/MenuItemCustom"
import PlugIcon from "@components/icons/MenunIcon/PlugIcon"
import ButtonToggleIcon from "@components/molecules/gameSlide/ButtonToggleIcon"
import Footer from "@components/organisms/Footer"
import Header from "@components/organisms/Header"
import { MENU_MARKETPLACE_INVENTORY } from "@configs/menu"
// import InventoryPage from "@feature/page/inventory/InventoryPage"
import { Divider, MenuList, Typography } from "@mui/material"
import useProfileStore from "@stores/profileStore"
import useNotiStore from "@stores/notification"
import Helper from "@utils/helper"
import { NextRouter, useRouter } from "next/router"
import React from "react"
import { useTranslation } from "react-i18next"
import { InventoryProvider } from "@providers/InventoryProvider"
import HeaderMunuMobile from "@feature/page/marketplace/mobilescreen/HeaderMunuMobile"
import FilterDropdown from "@feature/marketplace/components/molecules/FilterDropdown"
import InventoryPage from "@feature/page/inventory/InventoryPage"
import Balance from "@components/molecules/balance/Balance"

const MarketplaceLayoutInventory = ({
  children
}: React.PropsWithChildren<React.ComponentPropsWithoutRef<"div">>) => {
  const profile = useProfileStore((state) => state.profile.data)
  const { onResetNotification } = useNotiStore()
  const { onReset } = useProfileStore()
  const router: NextRouter = useRouter()
  const { t } = useTranslation()
  const isMapPage = router.asPath.includes("map")

  return (
    <InventoryProvider>
      <div
        className={`${
          isMapPage ? "w-full overflow-hidden" : "main-container"
        }  mx-auto mt-16 sm:mt-0`}
      >
        <div className="hidden sm:block">
          <Header />
        </div>
        <div className="block sm:hidden">
          <HeaderMunuMobile />
        </div>
        <div className="items-center sm:flex" />
        <Divider
          className="hidden !w-full sm:block"
          sx={{ marginTop: 2 }}
        />
        <div className="flex flex-col gap-3 sm:flex-row">
          {/* add filter component here */}
          {!isMapPage && (
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
              {/* <AmountBalance
            icon={chain === "polygon" ? <INaka /> : <IBusd />}
            balance={balance || { digit: 0, text: "N/A" }}
          /> */}
              {profile && (
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
              )}
            </div>
          )}
          <div
            className={` ${
              isMapPage && `absolute`
            } z-50 hidden h-0 sm:block sm:h-[85vh]`}
          >
            {/* className="absolute left-[22vh] z-50 h-[85vh]" */}
            <InventoryPage />
          </div>
          <div
            className={
              isMapPage
                ? "page-full-map h-[85vh] overflow-hidden"
                : "my-5 flex w-full flex-col gap-y-4"
            }
          >
            {isMapPage ? (
              <div className="map-wrapper h-full w-screen overflow-hidden">
                {children}
              </div>
            ) : (
              <main className="ml-0 flex w-full flex-col items-center	 gap-y-4 px-2 sm:ml-20 sm:items-start">
                <FilterDropdown />
                {/* <div className="block flex gap-2 sm:hidden">
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
                </div> */}
                {children}
              </main>
            )}
          </div>
        </div>
        {!isMapPage && <Footer />}
      </div>
    </InventoryProvider>
  )
}

export default MarketplaceLayoutInventory
