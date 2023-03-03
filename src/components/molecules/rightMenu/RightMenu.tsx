import React, { useEffect, useState } from "react"
import { Box } from "@mui/material"
import useProfileStore from "@stores/profileStore"
import CreateProfile from "@feature/profile/components/createProfile/CreateProfile"
import { IProfile } from "@feature/profile/interfaces/IProfileService"

import useGetProfileByEmail from "@feature/profile/containers/hook/getProfileByEmail"

import useGlobal from "@hooks/useGlobal"
import RightMenuLogIn from "./RightMenuLogIn"
import RightMenuNotLogIn from "./RightMenuNotLogIn"

const RightMenu = () => {
  const profile = useProfileStore((state) => state.profile.data)
  const [stateProfile, setStateProfile] = useState<IProfile | null>()
  const { profile: profileData } = useGetProfileByEmail(profile?.email ?? "")
  const { hydrated } = useGlobal()

  useEffect(() => {
    if (profileData) {
      setStateProfile(profileData)
    }
  }, [profileData, profile, profile?.email])

  return hydrated ? (
    <Box className="mx-auto flex w-[360px] flex-1 justify-end md:order-2 xl:mx-0 xl:flex-none">
      {stateProfile && profile ? (
        <>
          <CreateProfile />
          <RightMenuLogIn />
        </>
      ) : (
        <RightMenuNotLogIn />
      )}
    </Box>
  ) : (
    <></>
  )
}

export default RightMenu
