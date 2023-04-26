import { IProfile } from "@feature/profile/interfaces/IProfileService"
import useGameStore from "@stores/game"
import useProfileStore from "@stores/profileStore"
import { useRouter } from "next/router"
import { useCallback, useEffect, useState } from "react"
import {
  IFilterGamesByKey,
  IGame,
  IGetType
} from "@feature/game/interfaces/IGameService"
import { IPartnerGameData } from "@feature/game/interfaces/IPartnerGame"
import { TNFTType } from "@feature/marketplace/interfaces/IMarketService"
import CONFIGS from "@configs/index"
import { IGameItemListData } from "@feature/gameItem/interfaces/IGameItemService"
import useChainSupportStore from "@stores/chainSupport"
import useNotiStore from "@stores/notification"
import Helper from "@utils/helper"
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
    limit: _limit ?? 30,
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
  const [limit, setLimit] = useState<number>(30)
  const [page, setPage] = useState<number>(1)
  const [totalCount, setTotalCount] = useState<number>(0)
  const pager: number[] = [30, 60, 90, 120, 150]
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
    if (
      (_gameData?.game_type === "singleplayer" ||
        _gameData?.game_type === "multiplayer") &&
      _gameData?.play_to_earn_status === "in_progress"
    ) {
      return "play-to-earn-games"
    }
    if (
      (_gameData?.game_type === "singleplayer" ||
        _gameData?.game_type === "multiplayer") &&
      _gameData?.play_to_earn_status === "free"
    ) {
      return "free-to-play-games"
    }
    if (_gameData.game_type === "storymode") {
      return "story-mode-games"
    }
    if (_gameData?.is_NFT) {
      return "arcade-emporium"
    }
    return "all"
  }

  const getTypeGamePartnerPathFolder = (
    _gameData: IPartnerGameData
  ): IGetType => "partner-game"

  /**
   * @description Get color chip by game type
   * @param type
   * @returns
   */
  const getColorChipByGameType = (type: IGetType): string => {
    switch (type) {
      case "partner-publisher":
        return "!bg-green-lemon !text-neutral-900"

      case "partner-game":
        return "!bg-green-lemon !text-neutral-900"

      case "arcade-emporium":
        return "!bg-warning-dark !text-neutral-900"

      case "storymode":
      case "story-mode-games":
        return "!bg-info-main !text-neutral-900"

      case "play-to-earn-games":
        return "!bg-error-main !text-neutral-900"

      case "free-to-play-games":
        return "!bg-secondary-main !text-neutral-900"

      default:
        return "!bg-neutral-800 !text-neutral-900"
    }
  }

  /**
   * @description Get game type by pathname
   * @returns {IGetType}
   */
  const getGameTypeByPathname = (): IGetType => {
    switch (router.pathname) {
      case "/arcade-emporium":
      case "/arcade-emporium-games":
        return "arcade-emporium"

      case "/partner":
      case "/partner-games":
        return "partner-game"

      case "/play-to-earn-games":
        return "play-to-earn-games"

      case "/free-to-play-games":
        return "free-to-play-games"

      case "/story-mode-games":
        return "storymode"

      default:
        return "play-to-earn-games"
    }
  }

  /**
   * @description Get game url by game type
   * @param gameData
   * @returns
   */
  const getGameStoryModeURL = (gameData: IGame): string => {
    if (!profile) return ""

    const room_id = null
    const frontendUrl = `${CONFIGS.BASE_URL.FRONTEND}/${router.query.typeGame}/${gameData.path}/summary/${room_id}`
    const profile_id = profile.id
    const room_number = null
    const item_size = null
    const { email } = profile
    const token = Helper.getTokenFromLocal()
    const rank_name = null
    const date = null
    const stage_id = null
    const profile_name = profile.username
    const type_play = gameData.play_to_earn === true ? "free" : "not_free"
    // Get url by game type
    switch (gameData.game_type) {
      case "storymode":
        return `${CONFIGS.BASE_URL.GAME}/${gameData.id}/?${Helper.makeID(
          8
        )}${btoa(
          `${room_id}:|:${profile_id}:|:${item_size}:|:${email}:|:${token}:|:${frontendUrl}:|:${CONFIGS.BASE_URL.API?.slice(
            0,
            -4
          )}:|:${rank_name}:|:${room_number}:|:${date}:|:${stage_id}:|:${profile_name}:|:${type_play}`
        )}`
      case "singleplayer":
        // TODO: Need to update url later
        return "/singleplayer"
      case "multiplayer":
        // TODO: Need to update url later
        return "/multiplayer"
      default:
        return ""
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
    onResetNotification()
    onReset()
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
      } else if (router.asPath.includes("avatar-reef")) {
        setMarketType("nft_avatar")
      }
    }

    return () => {
      load = true
    }
  }, [router.asPath])

  /**
   * @description Fetch all token supported
   */
  const fetchChainData = useCallback(async () => {
    if (!isLogin) return
    if (currentChainSelected === CONFIGS.CHAIN.CHAIN_ID_HEX_BNB) {
      await fetchAllTokenSupported()
    } else if (currentChainSelected === CONFIGS.CHAIN.CHAIN_ID_HEX) {
      await fetchNAKAToken()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentChainSelected, fetchAllTokenSupported, fetchNAKAToken])

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
    getTypeGamePartnerPathFolder,
    marketType,
    isRedirectRoomlist,
    onHandleSetGameStore,
    onClickLogout,
    fetchChainData,
    getColorChipByGameType,
    getGameStoryModeURL,
    getGameTypeByPathname
  }
}

export default useGlobal
