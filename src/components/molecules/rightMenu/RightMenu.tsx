import React, { useEffect, useState } from "react"
import { Box } from "@mui/material"
import useProfileStore from "@stores/profileStore"
import CreateProfile from "@feature/profile/components/createProfile/CreateProfile"
import { IProfile } from "@feature/profile/interfaces/IProfileService"

import useGetProfileByEmail from "@feature/profile/containers/hook/getProfileByEmail"

import RightMenuLogIn from "./RightMenuLogIn"
import RightMenuNotLogIn from "./RightMenuNotLogIn"

const RightMenu = () => {
  const profile = useProfileStore((state) => state.profile.data)
  const [stateProfile, setStateProfile] = useState<IProfile | null>()
  const { profile: profileData } = useGetProfileByEmail(profile?.email ?? "")

  useEffect(() => {
    if (profileData) {
      setStateProfile(profileData)
    } else {
      setStateProfile(profile)
    }
  }, [profileData, profile, profile?.email])

  return (
    <Box>
      {stateProfile ? (
        <>
          <CreateProfile />
          <RightMenuLogIn />
        </>
      ) : (
        <RightMenuNotLogIn />
      )}
    </Box>
  )
}

export default RightMenu
