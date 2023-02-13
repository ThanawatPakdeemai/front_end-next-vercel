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
import { IFilterGamesByCategory } from "@feature/dropdown/interfaces/IDropdownService"

const useGlobal = (
  _limit?: number,
  _skip?: number,
  _sort?: string,
  _search?: string,
  _item?: string | string[],
  _device?: string,
  _gameType?: string,
  _tournament?: boolean
) => {
  const router = useRouter()

  const defaultBody: IFilterGamesByCategory = {
    "limit": _limit || 20,
    "skip": _skip || 1,
    "sort": _sort || "_id",
    "search": _search || "",
    "item": _item || "all",
    "device": _device || "all",
    "game_type": _gameType || "all",
    "tournament": _tournament || false
  }

  // hook
  const { onSetGameData, onSetGamePartnersData } = useGameStore()
  const profile = useProfileStore((state) => state.profile.data)
  const { errorToast } = useToast()

  // States
  const [stateProfile, setStateProfile] = useState<IProfile | null>()
  const [hydrated, setHydrated] = useState(false)

  /**
   * @description Set profile
   */
  useEffect(() => {
    setStateProfile(profile)
  }, [profile])

  /**
   * @description Set hydrate to fix error "Text content does not match server-rendered HTML"
   */
  useEffect(() => {
    setHydrated(true)
  }, [])

  /**
   * @description Pagination
   */
  const limit = _limit || 20
  const [page, setPage] = useState<number>(1)
  const [totalCount, setTotalCount] = useState<number>(0)

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
    gamePartnerData,
    dataGame,
    limit,
    page,
    setPage,
    totalCount,
    setTotalCount,
    stateProfile,
    hydrated,
    defaultBody
  }
}

export default useGlobal
