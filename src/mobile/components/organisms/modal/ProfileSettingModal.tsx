import React from "react"
import { Box, SwipeableDrawer } from "@mui/material"
import ArrowBackIcon from "@mobile/components/atoms/icons/ArrowBackIcon"
import FormProfileSetting from "@mobile/features/profile/components/organisms/FormProfileSetting"

interface IProfileSettingModalProps {
  open: boolean
  setProfileSetting: React.Dispatch<React.SetStateAction<boolean>>
}

const ProfileSettingModal = ({
  open,
  setProfileSetting
}: IProfileSettingModalProps) => (
  <SwipeableDrawer
    anchor="right"
    open={open}
    onClose={() => setProfileSetting(false)}
    onOpen={() => setProfileSetting(true)}
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
        onClick={() => setProfileSetting(false)}
        aria-hidden="true"
      >
        <ArrowBackIcon />
        Edit Profile
      </h2>
      <FormProfileSetting />
    </Box>
  </SwipeableDrawer>
)

export default ProfileSettingModal
