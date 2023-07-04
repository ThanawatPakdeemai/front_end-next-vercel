import { getProfileByEmail } from "@feature/profile/containers/services/profile.service"
import { useWeb3Provider } from "@providers/Web3Provider"
import useNotiStore from "@stores/notification"
import useProfileStore from "@stores/profileStore"
import Helper from "@utils/helper"
import { useEffect, useState } from "react"
import jwt_decode from "jwt-decode"
import { refreshProfileToken } from "@feature/authentication/containers/services/auth.service"
import useDrawerControllerMobile from "@mobile/features/game/containers/hooks/useDrawerControllerMobile"

const useRefreshProfile = () => {
  const { onReset } = useProfileStore()
  const { address, handleConnectWithMetamask } = useWeb3Provider()

  const [isTokenValid, setIsTokenValid] = useState(false)
  const token = Helper.getTokenFromLocal()
  const { onSetProfileData, onSetProfileAddress, onSetProfileJWT } =
    useProfileStore()
  const { onResetNotification } = useNotiStore()

  // Remove all modal mobile
  const { clearAllDrawer } = useDrawerControllerMobile()

  const fetchToken = () => {
    refreshProfileToken()
      .then((_res) => {
        if (_res) {
          getProfileByEmail(_res.email).then((__res) => {
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
        onResetNotification() // remove notification zustand
        onReset() // remove profile zustand
        clearAllDrawer()
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

  return { fetchToken, isTokenValid }
}

export default useRefreshProfile
