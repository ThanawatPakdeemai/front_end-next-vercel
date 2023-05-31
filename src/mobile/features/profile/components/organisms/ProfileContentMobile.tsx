import { Box } from "@mui/material"
import React, { useEffect, useRef, useState } from "react"
import ProfileSliderMobile from "../molecules/ProfileSliderMobile"
import ProfileInfoMobile from "../molecules/ProfileInfoMobile"
import ProfileFooterMobile from "../molecules/ProfileFooterMobile"

const ProfileContentMobile = () => {
  return (
    <Box
      component={"div"}
      className="profile-content__mobile flex flex-col justify-between gap-4"
    >
      <ProfileSliderMobile />
      <ProfileInfoMobile />
      <ProfileFooterMobile />
    </Box>
  )
}

export default ProfileContentMobile
