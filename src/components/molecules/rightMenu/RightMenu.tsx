import React, { useEffect, useState } from "react"
import { Box } from "@mui/material"
import useProfileStore from "@stores/profileStore"
import CreateProfile from "@feature/profile/components/createProfile/CreateProfile"

import useGlobal from "@hooks/useGlobal"
import jwt_decode from "jwt-decode"
import Helper from "@utils/helper"
import RightMenuLogIn from "./RightMenuLogIn"
import RightMenuNotLogIn from "./RightMenuNotLogIn"

const RightMenu = () => {
  const { onReset, profile } = useProfileStore()

  const { hydrated } = useGlobal()

  const [isTokenValid, setIsTokenValid] = useState(false)
  const token = Helper.getTokenFromLocal()

  useEffect(() => {
    // Retrieve the token from local storage

    if (token) {
      // Decode the token to obtain the expiration time
      const { exp }: any = jwt_decode(token)
      // Compare the expiration time with the current time
      if (Date.now() < exp * 1000) {
        setIsTokenValid(true)
      } else {
        // If the token has expired, remove it from local storage
        setIsTokenValid(false)

        onReset() // remove profile zustand
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, profile])

  return hydrated ? (
    <Box className="mx-auto flex w-[360px] flex-1 justify-end md:order-2 xl:mx-0 xl:flex-none">
      {!profile.data || !isTokenValid ? (
        <RightMenuNotLogIn />
      ) : (
        <>
          <CreateProfile />
          <RightMenuLogIn />
        </>
      )}
    </Box>
  ) : (
    <></>
  )
}

export default RightMenu
