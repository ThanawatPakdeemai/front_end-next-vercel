import SettingModal from "@mobile/components/organisms/modal/SettingModal"
import useDrawerControllerMobile from "@mobile/features/game/containers/hooks/useDrawerControllerMobile"
import { SwipeableDrawer } from "@mui/material"
import React from "react"

interface IHeaderSyncAccountProps {
  target: string
  open: boolean
  setOpenSyncAccount: (_toggle: boolean) => void
  setOpenSetting: (_toggle: boolean) => void
}

const HeaderSyncAccount = ({
  target,
  open,
  setOpenSyncAccount
}: IHeaderSyncAccountProps) => {
  const { clearAllDrawer } = useDrawerControllerMobile()

  return (
    <SwipeableDrawer
      anchor="top"
      open={open}
      onClose={() => setOpenSyncAccount(false)}
      onOpen={() => {
        clearAllDrawer()
      }}
      disableSwipeToOpen
      ModalProps={{
        keepMounted: true
      }}
      sx={{
        maxHeight: "52px",
        ".MuiDrawer-paper": {
          background: "transparent"
        },
        ".MuiModal-backdrop": {
          display: "none"
        }
      }}
    >
      <div className="fixed left-0 top-0 w-full bg-[#18181C] p-2 text-center font-urbanist text-[12px] text-[#616161]">
        {`Seem your account haven't sycn with ${target}, please click `}
        <button
          className="font-bold"
          type="button"
        >
          Setting
        </button>{" "}
        to complete your profile.
      </div>
    </SwipeableDrawer>
  )
}

export default HeaderSyncAccount
