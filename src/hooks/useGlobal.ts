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
import CONFIGS from "@configs/index"

const useGlobal = (
  _limit?: number,
  _skip?: number,
  _sort?: string,
  _search?: string,
  _item?: string | string[],
  _device?: string,
  _gameType?: IGetType,
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
        await router.push(`/${_type}-games/${_gameUrl}`)
        break
    }
    // NOTE: No need this code
    // await router.push(`/${_gameUrl}`)
  }

  /**
   * @description Handle network setting for metamask
   * @param _chainId
   * @returns
   */
  const getNetwork = (_chainId: string) => {
    switch (_chainId) {
      case CONFIGS.CHAIN.CHAIN_ID_HEX_BNB:
        return {
          chainId: `0x${Number(CONFIGS.CHAIN.BNB_CHAIN_ID).toString(16)}`,
          chainName: `${CONFIGS.CHAIN.BNB_CHAIN_NAME}`,
          rpcUrls: [`${CONFIGS.CHAIN.BNB_RPC_URL}/`],
          blockExplorerUrls: [`${CONFIGS.CHAIN.BNB_SCAN}/`],
          nativeCurrency: {
            name: CONFIGS.CHAIN.TOKEN_NAME_BUSD,
            symbol: CONFIGS.CHAIN.TOKEN_SYMBOL_BNB,
            decimals: 18
          }
        }

      default:
        return {
          chainId: `0x${Number(CONFIGS.CHAIN.CHAIN_ID).toString(16)}`,
          chainName: `${CONFIGS.CHAIN.CHAIN_NAME}`,
          rpcUrls: [`${CONFIGS.CHAIN.POLYGON_RPC_URL}/`],
          blockExplorerUrls: [`${CONFIGS.CHAIN.POLYGON_SCAN}/`],
          nativeCurrency: {
            name: CONFIGS.CHAIN.TOKEN_NAME,
            symbol: CONFIGS.CHAIN.TOKEN_SYMBOL,
            decimals: 18
          }
        }
    }
  }

  const getTokenAddress = (_chainId: string) => {
    switch (_chainId) {
      case CONFIGS.CHAIN.CHAIN_ID_HEX_BNB:
        return CONFIGS.CONTRACT_ADDRESS.BEP20

      default:
        CONFIGS.CONTRACT_ADDRESS.ERC20
    }
  }

  /**
   * @description Get tokens amount
   * @param _chainId
   * @returns {string}
   */
  const getTokenSupply = (_chainId: string): string => {
    switch (_chainId) {
      case CONFIGS.CHAIN.CHAIN_ID_HEX_BNB:
        return "31000000000000000000000000"

      default:
        return "179999996000000000000000008"
    }
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
    pager,
    getNetwork,
    getTokenAddress,
    getTokenSupply
  }
}

export default useGlobal
