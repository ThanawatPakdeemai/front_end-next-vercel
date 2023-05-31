import React from "react"
import { Box, SwipeableDrawer } from "@mui/material"
import ArrowBackIcon from "@mobile/components/atoms/icons/ArrowBackIcon"
import { StyleDrawer } from "@mobile/styles/muiStyleMobile"

interface ISettingModalProps {
  open: boolean
  setOpenSetting: React.Dispatch<React.SetStateAction<boolean>>
}

const SettingModal = ({ open, setOpenSetting }: ISettingModalProps) => (
  <SwipeableDrawer
    anchor="right"
    open={open}
    onClose={() => setOpenSetting(false)}
    onOpen={() => setOpenSetting(true)}
    disableSwipeToOpen={false}
    ModalProps={{
      keepMounted: true
    }}
    sx={StyleDrawer}
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
