import { IProfile } from "@feature/profile/interfaces/IProfileService"
import { useToast } from "@feature/toast/containers"
import useGameStore from "@stores/game"
import useProfileStore from "@stores/profileStore"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { IGame, IGetType } from "@feature/game/interfaces/IGameService"
import { MESSAGES } from "@constants/messages"
import { IPartnerGameData } from "@feature/game/interfaces/IPartnerGame"
import useGamesById from "@feature/game/containers/hooks/useGamesById"

const useGlobal = () => {
  const router = useRouter()
  const [stateProfile, setStateProfile] = useState<IProfile | null>()
  const { onSetGameData, onSetGamePartnersData } = useGameStore()
  const profile = useProfileStore((state) => state.profile.data)
  const { errorToast } = useToast()
  useEffect(() => {
    setStateProfile(profile)
  }, [profile])

  /**
   * @description Get game partner data
   */
  const [gamePartnerData, setGamePartnerData] = useState<IPartnerGameData>()
  const { dataGamePartner } = useGameStore()
  const { dataGame, isLoading } = useGamesById({
    _gameId: dataGamePartner ? dataGamePartner.id : "",
    _type: "partner-game"
  })

  useEffect(() => {
    if (!isLoading && dataGame && dataGame.data) {
      setGamePartnerData(dataGame.data as IPartnerGameData)
    }
  }, [dataGame, isLoading])

  /**
   * @description Handle click on game card
   * @param _gameUrl
   * @param _gameData
   */
  const onHandleClick = async (
    _type: IGetType,
    _gameUrl: string,
    _gameData?: IGame | IPartnerGameData
  ) => {
    if (stateProfile) {
      switch (_type) {
        case "partner-game":
          onSetGamePartnersData(_gameData as IPartnerGameData)
          break

        default:
          onSetGameData(_gameData as IGame)
          break
      }
      await router.push(`/${_gameUrl}`)
    } else {
      errorToast(MESSAGES.please_login)
    }
  }

  return {
    onHandleClick,
    gamePartnerData
  }
}

export default useGlobal
