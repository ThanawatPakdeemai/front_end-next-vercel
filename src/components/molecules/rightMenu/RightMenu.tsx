import React, { useEffect, useState } from "react"
import { Box } from "@mui/material"
import useProfileStore from "@stores/profileStore"
import CreateProfile from "@feature/profile/components/createProfile/CreateProfile"

import useGlobal from "@hooks/useGlobal"
import jwt_decode from "jwt-decode"
import Helper from "@utils/helper"
import { refreshProfileToken } from "@feature/authentication/containers/services/auth.service"
import RightMenuLogIn from "./RightMenuLogIn"
import RightMenuNotLogIn from "./RightMenuNotLogIn"

const RightMenu = () => {
  const { onReset, profile } = useProfileStore()

  const { hydrated } = useGlobal()

  const [isTokenValid, setIsTokenValid] = useState(false)
  const token = Helper.getTokenFromLocal()

  useEffect(() => {
    // Retrieve the token from local storage
    let load = false
    if (!load) {
      if (token) {
        // Decode the token to obtain the expiration time
        const { exp }: any = jwt_decode(token)
        // Compare the expiration time with the current time
        // console.log(Date.now(), exp * 1000)
        // console.log(Date.now() < exp * 1000)

        if (Date.now() < exp * 1000) {
          setIsTokenValid(true)
        } else {
          // If the token has expired, remove it from local storage
          refreshProfileToken()
            .then((_res) => {
              if (_res) {
                // console.log(_res)
              }
            })
            .catch((err) => {
              console.error(err)
              setIsTokenValid(false)
              onReset() // remove profile zustand
            })
        }
      }
    }
    return () => {
      load = true
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
