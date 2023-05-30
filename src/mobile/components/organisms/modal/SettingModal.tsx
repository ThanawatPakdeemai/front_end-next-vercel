import React from "react"
import { Box, SwipeableDrawer } from "@mui/material"
import ArrowBackIcon from "@mobile/components/atoms/icons/ArrowBackIcon"

interface ISettingModalProps {
  open: boolean
  toggleDrawerSetting: (newOpen: boolean) => void
  setOpenSetting: React.Dispatch<React.SetStateAction<boolean>>
}

const SettingModal = ({
  open,
  toggleDrawerSetting,
  setOpenSetting
}: ISettingModalProps) => (
  <SwipeableDrawer
    anchor="right"
    open={open}
    onClose={() => toggleDrawerSetting(false)}
    onOpen={() => toggleDrawerSetting(true)}
    disableSwipeToOpen={false}
    ModalProps={{
      keepMounted: true
    }}
    sx={{
      ".MuiDrawer-paper": {
        background: "#121212",
        width: "100%"
      }
    }}
  >
    <Box
      component="div"
      className="setting-list flex flex-col p-[8px_24px_36px]"
    >
      <h2
        className="flex items-center gap-4 py-[30px] font-urbanist text-[24px] font-bold text-white-primary"
        onClick={() => setOpenSetting(false)}
        aria-hidden="true"
      >
        <ArrowBackIcon />
        Setting
      </h2>
    </Box>
  </SwipeableDrawer>
)

export default SettingModal
