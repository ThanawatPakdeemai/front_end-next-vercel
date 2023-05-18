import { getProfileByEmail } from "@feature/profile/containers/services/profile.service"
import { IProfile } from "@src/types/profile"
import useProfileStore from "@stores/profileStore"
// import { useEffect } from "react"
import useGameStore from "@stores/game"
import useRefreshProfile from "./useRefreshProfile"

const useRefreshStamina = () => {
  const { profile } = useProfileStore()
  const { fetchToken } = useRefreshProfile()
  const { onSetProfileData } = useProfileStore()
  const { data } = useGameStore()
  // console.log(data?.game_mode)

  const refreshStamina = () => {
    if (profile && data && data.game_mode !== "play-to-earn") {
      getProfileByEmail(profile?.data?.email || "")
        .then((__res: IProfile) => {
          onSetProfileData(__res)
          // console.log(__res)
        })
        .catch((err) => {
          console.error(err)
          // console.log(err)
          fetchToken()
        })
    }
  }
  // useEffect(() => {
  //   let load = false
  //   // TODO Yui GET Stamina one time
  //   if (!load) refreshStamina()
  //   return () => {
  //     load = true
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  return { refreshStamina }
}

export default useRefreshStamina
