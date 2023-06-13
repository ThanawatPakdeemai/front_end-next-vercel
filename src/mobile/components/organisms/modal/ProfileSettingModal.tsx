import React from "react"
import { Box, SwipeableDrawer } from "@mui/material"
import ArrowBackIcon from "@mobile/components/atoms/icons/ArrowBackIcon"
import FormProfileSetting from "@mobile/features/profile/components/organisms/FormProfileSetting"
import { StyleDrawer } from "@mobile/styles/muiStyleMobile"
import useDrawerControllerMobile from "@mobile/features/game/containers/hooks/useDrawerControllerMobile"

interface IProfileSettingModalProps {
  open: boolean
  setProfileSetting: React.Dispatch<React.SetStateAction<boolean>>
  title?: string
}

const ProfileSettingModal = ({
  open,
  setProfileSetting,
  title = "Edit Profile"
}: IProfileSettingModalProps) => {
  const { clearAllDrawer } = useDrawerControllerMobile()

  return (
    <SwipeableDrawer
      anchor="bottom"
      open={open}
      onClose={() => setProfileSetting(false)}
      onOpen={() => {
        clearAllDrawer()
        setProfileSetting(true)
      }}
      sx={{
        ...StyleDrawer,
        "&.MuiDrawer-root": {
          zIndex: 1200
        }
      }}
    >
      <Box
        component="div"
        className="setting-list flex flex-col p-[8px_24px_36px]"
        sx={{
          "h2": {
            lineHeight: "1",
            alignItems: "flex-start"
          }
        }}
      >
        <h2
          className="flex items-center gap-4 py-[30px] font-urbanist text-[24px] font-bold text-white-primary"
          onClick={() => setProfileSetting(false)}
          aria-hidden="true"
        >
          <ArrowBackIcon />
          {title}
        </h2>
        <FormProfileSetting />
      </Box>
    </SwipeableDrawer>
  )
}

export default ProfileSettingModal
