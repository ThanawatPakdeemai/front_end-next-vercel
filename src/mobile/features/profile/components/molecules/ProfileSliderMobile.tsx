import HorizontalThumbSlide from "@feature/slider/components/templates/HorizontalThumbSlide"
import { Box } from "@mui/material"
import React, { useEffect } from "react"
import useProfileSettingController from "../../containers/useProfileSettingController"

const ProfileSliderMobile = () => {
  const { avatarList } = useProfileSettingController()

  return (
    <Box
      component="section"
      id={`profile-avatar__slider`}
      className="w-full"
    >
      <HorizontalThumbSlide items={avatarList} />
    </Box>
  )
}

export default ProfileSliderMobile
