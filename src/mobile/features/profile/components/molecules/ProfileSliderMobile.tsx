import React from "react"
import HorizontalThumbSlide from "@feature/slider/components/templates/HorizontalThumbSlide"
import { Box } from "@mui/material"
import useProfileSettingController from "../../containers/useProfileSettingController"

const ProfileSliderMobile = () => {
  const { avatarList, avatarGoto } = useProfileSettingController()

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
          speed: 500
        }}
      />
    </Box>
  )
}

export default ProfileSliderMobile
