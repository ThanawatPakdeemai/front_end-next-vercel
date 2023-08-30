import React from "react"
import HorizontalThumbSlide from "@feature/slider/components/templates/HorizontalThumbSlide"
import { Box } from "@mui/material"
import useProfileSettingController from "@src/mobile/features/profile/containers/useProfileSettingController"

const ProfileSliderMobile = () => {
  const { avatarList, avatarGoto, setDefaultAvatar } =
    useProfileSettingController()

  return (
    <Box
      component="section"
      id="profile-avatar__slider"
      className="w-full"
    >
      <HorizontalThumbSlide
        items={avatarList}
        sliderType="avatar"
        currentSelected={avatarGoto}
        settingSingle={{
          speed: 500
        }}
        settingThumbnail={{
          speed: 500,
          beforeChange: (current: number) => {
            const selected = avatarList[current]
            if (selected) {
              setDefaultAvatar(selected.src)
            }
          }
        }}
      />
    </Box>
  )
}

export default ProfileSliderMobile
