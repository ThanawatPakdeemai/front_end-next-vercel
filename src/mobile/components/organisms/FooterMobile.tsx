import { MAIN_MENU_MOBILE, TGameMenuMobile } from "@mobile/constants/menuMobile"
import useHomeControllerMobile from "@mobile/features/game/containers/hooks/useHomeControllerMobile"
import { Box } from "@mui/material"
import React from "react"
import WishlistModal from "./modal/WishlistModal"
import SettingModal from "./modal/SettingModal"
import EarnRewardModal from "./modal/EarnRewardModal"

const FooterMobile = () => {
  const {
    openWishlist,
    setOpenWishlist,
    setOpenSetting,
    openSetting,
    setOpenReward,
    openReward
  } = useHomeControllerMobile()

  const onHandleClick = (_id: TGameMenuMobile) => {
    if (_id === "home") {
      // do something when click Home
    } else if (_id === "wishlist") {
      return setOpenWishlist(true)
    } else if (_id === "reward") {
      return setOpenReward(true)
    } else if (_id === "settings") {
      return setOpenSetting(true)
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
            className="flex flex-col items-center justify-center gap-1"
            onClick={() => onHandleClick(_menu.id)}
          >
            <i className="flex items-center justify-center">{_menu.icon}</i>
            <span className="font-urbanist text-[12px] text-[#9E9E9E]">
              {_menu.name}
            </span>
          </Box>
        ))}
      </div>
      {/* Modal Wishlist */}
      <WishlistModal
        open={openWishlist}
        setOpenWishlist={setOpenWishlist}
      />
      {/* Reward Modal */}
      <EarnRewardModal
        open={openReward}
        setOpenReward={setOpenReward}
      />
      {/* Setting Modal */}
      <SettingModal
        open={openSetting}
        setOpenSetting={setOpenSetting}
      />
    </Box>
  )
}

export default FooterMobile
