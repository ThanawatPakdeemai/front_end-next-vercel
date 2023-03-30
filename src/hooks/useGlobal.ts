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
import { TNFTType } from "@feature/marketplace/interfaces/IMarketService"
import { useWeb3Provider } from "@providers/Web3Provider"
import CONFIGS from "@configs/index"
import { IGameItemListData } from "@feature/gameItem/interfaces/IGameItemService"
import useChainSupportStore from "@stores/chainSupport"
import useNotiStore from "@stores/notification"
import useSupportedChain from "./useSupportedChain"

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
  const { onResetChainStore, currentChainSelected } = useChainSupportStore()
  const { onResetNotification } = useNotiStore()
  const {
    onSetGameData,
    onSetGamePartnersData,
    onSetGameItemSelectd,
    setQtyItemOfRoom
  } = useGameStore()
  const profile = useProfileStore((state) => state.profile.data)
  const { isLogin, onReset } = useProfileStore()
  const { fetchNAKAToken, fetchAllTokenSupported } = useSupportedChain()
  const { chainId, signer, address, isConnected } = useWeb3Provider()

  // States
  const [stateProfile, setStateProfile] = useState<IProfile | null>()
  const [hydrated, setHydrated] = useState(false)
  const [marketType, setMarketType] = useState<TNFTType>()

  /**
   * @description check if url is in marketplace
   */
  const isMarketplace = router.asPath.includes("marketplace")

  /**
   * @description check if url is in marketplace
   */
  const isDeveloperPage =
    router.asPath.includes("become-developer") ||
    router.asPath.includes("developer")

  /**
   * @description Set profile
   */
  useEffect(() => {
    let load = false

    if (!load) {
      setStateProfile(profile)
    }

    return () => {
      load = true
    }
  }, [profile])

  /**
   * @description Set hydrate to fix error "Text content does not match server-rendered HTML"
   */
  useEffect(() => {
    let load = false

    if (!load) {
      setHydrated(true)
    }

    return () => {
      load = true
    }
  }, [])

  /**
   * @description Global values for pagination
   */
  const [limit, setLimit] = useState<number>(24)
  const [page, setPage] = useState<number>(1)
  const [totalCount, setTotalCount] = useState<number>(0)
  const pager: number[] = [6, 12, 24, 48, 64]
  const handleLimit = (limitItem: number) => {
    setLimit(limitItem)
  }

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
      case "partner-publisher":
        onSetGamePartnersData(_gameData as IPartnerGameData)
        // await router.push(`/publishers/${_gameData.name}`)
        break

      case "partner-game":
        onSetGamePartnersData(_gameData as IPartnerGameData)
        // await router.push(`/partner-games/${_gameUrl}?id=${_gameData.id}`)
        break

      case "arcade-emporium":
        onSetGameData(_gameData as IGame)
        // await router.push(`/arcade-emporium/${_gameUrl}?id=${_gameData.id}`)
        break

      default:
        onSetGameData(_gameData as IGame)
        // await router.push(`/${_type}-games/${_gameUrl}`)
        break
    }
    // NOTE: No need this code
    // await router.push(`/${_gameUrl}`)
  }

  const onHandleSetGameStore = async (
    _type: IGetType,
    _gameData: IGame | IPartnerGameData
  ) => {
    switch (_type) {
      case "partner-publisher":
        onSetGamePartnersData(_gameData as IPartnerGameData)
        break

      case "partner-game":
        onSetGamePartnersData(_gameData as IPartnerGameData)
        break

      case "arcade-emporium":
        onSetGameData(_gameData as IGame)
        break

      default:
        onSetGameData(_gameData as IGame)
        break
    }
  }

  const onClickLink = async (
    _type: IGetType,
    _gameUrl: string,
    _gameData: IGame | IPartnerGameData
  ) => {
    switch (_type) {
      case "partner-publisher":
        return `/publishers/${_gameData.name}`

      case "partner-game":
        return `/partner-games/${_gameUrl}?id=${_gameData.id}`

      case "arcade-emporium":
        return `/arcade-emporium/${_gameUrl}?id=${_gameData.id}`

      default:
        return `/${_type}-games/${_gameUrl}`
    }
  }

  /**
   * @description Open link in new tab
   * @param url {string}
   */
  const openInNewTab = (url: string) => {
    window.open(url, "_blank", "noreferrer")
  }

  /**
   * @description Get type game path folder
   */
  const getTypeGamePathFolder = (_gameData: IGame): IGetType => {
    if (_gameData) {
      // if (_gameData.play_to_earn && _gameData.play_to_earn_status !== "free") {
      //   return "play-to-earn-games"
      // }
      if (_gameData.play_to_earn_status === "free") {
        return "free-to-play"
      }
      if (_gameData.game_type === "storymode") {
        return "story-mode"
      }
      if (_gameData.is_NFT) {
        return "arcade-emporium"
      }
    }
    return "play-to-earn-games"
  }

  const getColorChipByGameType = (type: IGetType): string => {
    switch (type) {
      case "partner-publisher":
        return "!bg-green-lemon"

      case "partner-game":
        return "!bg-secondary-main"

      case "arcade-emporium":
        return "!bg-warning-light"

      default:
        return "!bg-error-main"
    }
  }

  const isRedirectRoomlist = (_game: IGame): "/roomlist" | "" => {
    if (_game.play_to_earn_status === "free") {
      return "/roomlist"
    }
    return ""
  }

  /**
   * @description When logout reset all stores
   */
  const onClickLogout = async () => {
    onResetChainStore()
    onSetGameItemSelectd({} as IGameItemListData)
    setQtyItemOfRoom(0)
    await onResetNotification()
    await onReset()
    await router.push("/")
  }

  useEffect(() => {
    let load = false

    if (!load) {
      if (router.asPath.includes("land")) {
        setMarketType("nft_land")
      } else if (router.asPath.includes("building")) {
        setMarketType("nft_building")
      } else if (router.asPath.includes("naka-punk")) {
        setMarketType("nft_naka_punk")
      } else if (router.asPath.includes("material")) {
        setMarketType("nft_material")
      } else if (router.asPath.includes("game-item")) {
        setMarketType("game_item")
      } else if (router.asPath.includes("arcade-game")) {
        setMarketType("nft_game")
      }
    }

    return () => {
      load = true
    }
  }, [router.asPath])

  /**
   * @description Fetch all token supported
   */
  useEffect(() => {
    let load = false
    if (!isLogin) return
    if (!isConnected) return
    if (!load) {
      if (signer && address) {
        if (chainId === CONFIGS.CHAIN.CHAIN_ID_HEX_BNB) {
          fetchAllTokenSupported()
        } else if (chainId === CONFIGS.CHAIN.CHAIN_ID_HEX) {
          fetchNAKAToken()
        }
      }
    }

    return () => {
      load = true
    }
  }, [
    address,
    isLogin,
    isConnected,
    chainId,
    signer,
    fetchAllTokenSupported,
    fetchNAKAToken
  ])

  const fetchChainData = async () => {
    if (!isLogin) return
    if (currentChainSelected === CONFIGS.CHAIN.CHAIN_ID_HEX_BNB) {
      await fetchAllTokenSupported()
    } else if (currentChainSelected === CONFIGS.CHAIN.CHAIN_ID_HEX) {
      await fetchNAKAToken()
    }
  }

  /**
   * @description Fetch all token supported
   */
  useEffect(() => {
    fetchChainData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogin, currentChainSelected])

  return {
    onHandleClick,
    onClickLink,
    limit,
    page,
    setPage,
    setLimit,
    totalCount,
    setTotalCount,
    handleLimit,
    stateProfile,
    hydrated,
    defaultBody,
    pager,
    isMarketplace,
    isDeveloperPage,
    openInNewTab,
    getTypeGamePathFolder,
    marketType,
    isRedirectRoomlist,
    onHandleSetGameStore,
    onClickLogout,
    fetchChainData,
    getColorChipByGameType
  }
}

export default useGlobal
