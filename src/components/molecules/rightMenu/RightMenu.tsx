import React, { useEffect, useState } from "react"
import { Box } from "@mui/material"
import useProfileStore from "@stores/profileStore"
import CreateProfile from "@feature/profile/components/createProfile/CreateProfile"

import useGlobal from "@hooks/useGlobal"
import jwt_decode from "jwt-decode"
import Helper from "@utils/helper"
import { refreshProfileToken } from "@feature/authentication/containers/services/auth.service"
import { getProfileByEmail } from "@feature/profile/containers/services/profile.service"
import { IProfile } from "@src/types/profile"
import { useWeb3Provider } from "@providers/Web3Provider"
import RightMenuLogIn from "./RightMenuLogIn"
import RightMenuNotLogIn from "./RightMenuNotLogIn"

const RightMenu = () => {
  const { onReset, profile } = useProfileStore()
  const { address, handleConnectWithMetamask } = useWeb3Provider()
  const { hydrated } = useGlobal()

  const [isTokenValid, setIsTokenValid] = useState(false)
  const token = Helper.getTokenFromLocal()
  const { onSetProfileData, onSetProfileAddress, onSetProfileJWT } =
    useProfileStore()

  const fetchToken = () => {
    refreshProfileToken()
      .then((_res) => {
        if (_res) {
          getProfileByEmail(_res.email).then((__res: IProfile) => {
            onSetProfileData(__res)
            onSetProfileAddress(__res.address)
            onSetProfileJWT(__res.jwtToken)
            if (!address) {
              if (handleConnectWithMetamask) handleConnectWithMetamask()
            }
          })
        }
      })
      .catch((err) => {
        console.error(err)
        setIsTokenValid(false)
        onReset() // remove profile zustand
      })
  }
  useEffect(() => {
    // Retrieve the token from local storage
    let load = false
    if (!load) {
      if (token) {
        // Decode the token to obtain the expiration time
        const { exp }: any = jwt_decode(token)
        // Compare the expiration time with the current time
        if (Date.now() < exp * 1000) {
          setIsTokenValid(true)
        } else {
          // If the token has expired, remove it from local storage
          fetchToken()
        }
      } else {
        fetchToken()
      }
    }
    return () => {
      load = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, isTokenValid])

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
