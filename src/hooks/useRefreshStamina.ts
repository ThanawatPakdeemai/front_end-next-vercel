import { getProfileByEmail } from "@feature/profile/containers/services/profile.service"
import useProfileStore from "@stores/profileStore"
import useGameStore from "@stores/game"
import useRefreshProfile from "./useRefreshProfile"

const useRefreshStamina = () => {
  const { profile } = useProfileStore()
  const { fetchToken } = useRefreshProfile()
  const { onSetProfileData } = useProfileStore()
  const { data } = useGameStore()

  const refreshStamina = () => {
    if (profile && data && data.game_mode !== "play-to-earn") {
      getProfileByEmail(profile?.data?.email || "")
        .then((__res) => {
          onSetProfileData(__res)
        })
        .catch((err) => {
          console.error(err)
          fetchToken()
        })
    }
  }

  return { refreshStamina }
}

export default useRefreshStamina
