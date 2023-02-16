import { IProfile } from "@feature/profile/interfaces/IProfileService"
import useGameStore from "@stores/game"
import useProfileStore from "@stores/profileStore"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import {
  IFilterGamesByKey,
  IGame,
  IGetType
} from "@feature/game/interfaces/IGameService"
import { IPartnerGameData } from "@feature/game/interfaces/IPartnerGame"

const useGlobal = (
  _limit?: number,
  _skip?: number,
  _sort?: string,
  _search?: string,
  _item?: string | string[],
  _device?: string,
  _gameType?: string,
  _tournament?: boolean,
  _category?: string,
  _nftgame?: boolean
) => {
  const router = useRouter()

  const defaultBody: IFilterGamesByKey = {
    limit: _limit ?? 20,
    skip: _skip ?? 1,
    sort: _sort ?? "_id",
    search: _search ?? "",
    item: _item ?? "all",
    device: _device ?? "all",
    game_type: _gameType ?? "all",
    tournament: _tournament ?? false,
    category: _category ?? "all",
    nftgame: _nftgame ?? false
  }

  // hook
  const { onSetGameData, onSetGamePartnersData } = useGameStore()
  const profile = useProfileStore((state) => state.profile.data)

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
   * @description Global values for pagination
   */
  const limit = _limit || 20
  const [page, setPage] = useState<number>(1)
  const [totalCount, setTotalCount] = useState<number>(0)
  const pager: number[] = [6, 12, 24, 48, 64]

  /**
   * @description Handle click on game card
   * @param _gameUrl - Game url to redirect
   * @param _gameData - Game data to set to store
   */
  const onHandleClick = async (
    _type: IGetType,
    _gameUrl: string,
    _gameData: IGame | IPartnerGameData
  ) => {
    switch (_type) {
      case "partner-game":
        onSetGamePartnersData(_gameData as IPartnerGameData)
        await router.push(`/partner-games/${_gameUrl}?id=${_gameData.id}`)
        break

      case "arcade-emporium":
        onSetGameData(_gameData as IGame)
        await router.push(`/arcade-emporium/${_gameUrl}?id=${_gameData.id}`)
        break

      default:
        onSetGameData(_gameData as IGame)
        await router.push(`/${_gameUrl}`)
        break
    }
    await router.push(`/${_gameUrl}`)
  }

  return {
    onHandleClick,
    limit,
    page,
    setPage,
    totalCount,
    setTotalCount,
    stateProfile,
    hydrated,
    defaultBody,
    pager
  }
}

export default useGlobal
