import { IProfile } from "@feature/profile/interfaces/IProfileService"
import { useToast } from "@feature/toast/containers"
import useGameStore from "@stores/game"
import useProfileStore from "@stores/profileStore"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { IGame } from "@feature/game/interfaces/IGameService"
import { MESSAGES } from "@constants/messages"

const useGlobal = () => {
  const router = useRouter()
  const [stateProfile, setStateProfile] = useState<IProfile | null>()
  const { onSetGameData } = useGameStore()
  const profile = useProfileStore((state) => state.profile.data)
  const { errorToast } = useToast()
  useEffect(() => {
    setStateProfile(profile)
  }, [profile])

  /**
   * @description Handle click on game card
   * @param _gameUrl
   * @param _gameData
   */
  const onHandleClick = async (_gameUrl: string, _gameData?: IGame) => {
    if (stateProfile) {
      if (_gameData) onSetGameData(_gameData)
      await router.push(`/${_gameUrl}`)
    } else {
      errorToast(MESSAGES.please_login)
    }
  }

  return {
    onHandleClick
  }
}

export default useGlobal
