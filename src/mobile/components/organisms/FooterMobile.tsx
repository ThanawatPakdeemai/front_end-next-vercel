import React, { useState } from "react"
import { MAIN_MENU_MOBILE, TGameMenuMobile } from "@mobile/constants/menuMobile"
import { Box } from "@mui/material"
import useDrawerControllerMobile from "@mobile/features/game/containers/hooks/useDrawerControllerMobile"
import dynamic from "next/dynamic"

const WishlistModal = dynamic(() => import("./modal/WishlistModal"), {
  suspense: true,
  ssr: false
})

const SettingModal = dynamic(() => import("./modal/SettingModal"), {
  suspense: true,
  ssr: false
})

const EarnRewardModal = dynamic(() => import("./modal/EarnRewardModal"), {
  suspense: true,
  ssr: false
})

const FooterMobile = () => {
  const {
    openWishlist,
    setOpenWishlist,
    setOpenSetting,
    openSetting,
    setOpenReward,
    openReward,
    clearAllDrawer
  } = useDrawerControllerMobile()

  const [menuActive, setMenuActive] = useState({ id: "home", status: true })

  const onHandleClick = (_id: TGameMenuMobile) => {
    clearAllDrawer()
    if (_id === "home") {
      // do something when click Home
      setMenuActive({ id: _id, status: true })
    } else if (_id === "wishlist") {
      setMenuActive({ id: _id, status: true })
      return setOpenWishlist(true)
    } else if (_id === "rewards") {
      setMenuActive({ id: _id, status: true })
      return setOpenReward(true)
    } else if (_id === "settings") {
      setMenuActive({ id: _id, status: true })
      return setOpenSetting(true)
    }
  }

  const handMeneActive = (_id: TGameMenuMobile) => {
    if (_id === "home") {
      // do something when click Home
    } else if (_id === "wishlist") {
      setMenuActive({ id: "home", status: true })
      return setOpenWishlist(false)
    } else if (_id === "rewards") {
      setMenuActive({ id: "home", status: true })
      return setOpenReward(false)
    } else if (_id === "settings") {
      setMenuActive({ id: "home", status: true })
      return setOpenSetting(false)
    }
  }

  return (
    <Box
      component="footer"
      className="footer"
      sx={{
        position: "fixed",
        height: "90px",
        left: "0px",
        right: "0px",
        bottom: "0px",
        background: "#18181C",
        backdropFilter: "blur(10px)",
        borderRadius: "24px 24px 0px 0px",
        zIndex: 10
      }}
    >
      <div className="grid h-full grid-cols-4">
        {MAIN_MENU_MOBILE.map((_menu) => (
          <Box
            component="button"
            key={_menu.name}
            className="flex flex-col items-center justify-center gap-1 text-[#9E9E9E]"
            onClick={() => onHandleClick(_menu.id)}
          >
            <i className="flex items-center justify-center">
              {menuActive.status && menuActive.id === _menu.id
                ? _menu.iconActive
                : _menu.icon}
            </i>
            <span className="font-urbanist text-[12px]">{_menu.name}</span>
          </Box>
        ))}
      </div>
      {/* Modal Wishlist */}
      <WishlistModal
        open={openWishlist}
        setOpenWishlist={() => handMeneActive("wishlist")}
      />
      {/* Reward Modal */}
      <EarnRewardModal
        open={openReward}
        setOpenReward={() => handMeneActive("rewards")}
      />
      {/* Setting Modal */}
      <SettingModal
        open={openSetting}
        setOpenSetting={() => handMeneActive("settings")}
      />
    </Box>
  )
}

export default FooterMobile
