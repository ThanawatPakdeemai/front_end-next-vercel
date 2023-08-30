/* eslint-disable no-useless-return */
import { IProfile } from "@feature/profile/interfaces/IProfileService"
import useGameStore from "@stores/game"
import useProfileStore from "@stores/profileStore"
import { useRouter } from "next/router"
import { useCallback, useEffect, useMemo, useState } from "react"
import {
  IPayloadGameFilter,
  IGame,
  IGetType,
  TGameType,
  IGameCurrentPlayer
} from "@feature/game/interfaces/IGameService"
import { IPartnerGameData } from "@feature/game/interfaces/IPartnerGame"
import { TNFTType } from "@feature/marketplace/interfaces/IMarketService"
import CONFIGS from "@configs/index"
import { IGameItemListData } from "@feature/gameItem/interfaces/IGameItemService"
import useChainSupportStore from "@stores/chainSupport"
import useNotiStore from "@stores/notification"
import Helper from "@utils/helper"
import { isMobile as detectMobile } from "react-device-detect"
import { signOut } from "next-auth/react"
import useCountPlayGame from "@feature/game/containers/hooks/useCountPlayGame"
import useSupportedChain from "./useSupportedChain"
import useGameGlobal from "./useGameGlobal"

export const isMobile = !!(
  detectMobile && CONFIGS.DISPLAY_MOBILE_MODE === "true"
)

const useGlobal = (
  _limit?: number,
  _skip?: number,
  _sort?: string,
  _search?: string,
  _item?: string | string[],
  _device?: string,
  _gameMode?: IGetType,
  _gameType?: TGameType,
  _tournament?: boolean,
  _category?: string,
  _nftgame?: boolean
) => {
  const router = useRouter()

  const defaultBody: IPayloadGameFilter = {
    limit: _limit ?? 30,
    skip: _skip ?? 1,
    sort: _sort ?? "_id",
    search: _search ?? "",
    item: _item ?? "all",
    device: _device ?? "all",
    game_mode: _gameMode ?? "all",
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
  const { mutateUpdateCountPlayGame } = useCountPlayGame()

  const { conditionPlayToEarn } = useGameGlobal()

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
    router.asPath.includes("game-developer") ||
    router.asPath.includes("developer")

  const isWrongFormatURL = useCallback(
    (url: string): boolean =>
      url.includes("nakamoto-prod-s3.s3.eu-central-1.amazonaws.com/https://"),
    []
  )

  const isOldPathURL = useCallback(
    (url: string): boolean =>
      url.includes("nakamoto-prod-new.s3.eu-central-1.amazonaws.com"),
    []
  )

  const isWrongHttpURL = useCallback(
    (url: string): boolean =>
      url.includes("http://") === false || url.includes("https://") === false,
    []
  )

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
        // await router.push(`/partner/${_gameUrl}?id=${_gameData.id}`)
        break

      case "arcade-emporium":
        onSetGameData(_gameData as IGame)
        // await router.push(`/arcade-emporium/${_gameUrl}?id=${_gameData.id}`)
        break

      default:
        onSetGameData(_gameData as IGame)
        // await router.push(`/${_type}/${_gameUrl}`)
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
        return `/partner/${_gameUrl}?id=${_gameData.id}`

      case "arcade-emporium":
        return `/arcade-emporium/${_gameUrl}?id=${_gameData.id}`

      default:
        return `/${_type}/${_gameUrl}`
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
   * @description Get type game path by game_mode
   * @returns {IGetType}
   */
  const getGameMode = (_gameData: IGame): IGetType => {
    if (_gameData.is_NFT) {
      return "arcade-emporium"
    }
    return _gameData.game_mode
  }

  /**
   * @description Check if game is free to earn
   */
  const isFreeToEarnGame = (_gameData: IGame): boolean => {
    if (_gameData.game_mode === "free-to-earn" && !_gameData.is_NFT) {
      return true
    }
    return false
  }

  /**
   * @description Check if game is free to play
   */
  const isFreeToPlayGame = (_gameData: IGame): boolean => {
    if (
      _gameData &&
      _gameData?.game_mode === "free-to-play" &&
      !_gameData?.is_NFT
    ) {
      return true
    }
    return false
  }

  /**
   * @description Check if game is free to play
   */
  const isStoryModeGame = (_gameData: IGame): boolean => {
    if (
      _gameData.game_type === "storymode" ||
      _gameData.game_mode === "story-mode"
    ) {
      return true
    }
    return false
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

      case "story-mode":
        return "!bg-info-main !text-neutral-900"

      case "play-to-earn":
        return "!bg-error-main !text-neutral-900"

      case "free-to-play":
        return "!bg-secondary-main !text-neutral-900"

      case "free-to-earn":
        return "!bg-purple-02 !text-purple-primary"

      default:
        return "!bg-neutral-800 !text-neutral-900"
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
    const type_play = conditionPlayToEarn ? "free" : "not_free"
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

  const getGamePokerModeURL = (gameData: IGame): string => {
    if (!profile) return ""

    const frontendUrl = `${CONFIGS.BASE_URL.FRONTEND}/${router.query.typeGame}/${gameData.path}`
    const { username, address, avatar, status } = profile

    return `${gameData.game_url}?game_data=${gameData.id}?data=${btoa(
      `${address}:|:${username}:|:${avatar}:|:${status}:|:${CONFIGS.BASE_URL.API?.slice(
        0,
        -4
      )}:|:${frontendUrl}:|:${gameData.image_banner}`
    )}`
  }

  const isPokerGame = (gameData: IGame) =>
    gameData && gameData?.category?.name === "Casino"

  const goldProfile: number = useMemo(() => profile?.gold || 0, [profile])
  const goldProfileComma: string = useMemo(
    () => Helper.formatNumber(profile?.gold || 0),
    [profile]
  )

  const isRedirectRoomlist = (_game: IGame): "/roomlist" | "" => {
    if (
      _game.play_to_earn_status === "free" ||
      _game.game_mode === "free-to-earn" ||
      _game.game_mode === "free-to-play"
    ) {
      if (isPokerGame(_game)) {
        return ""
      }
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
    signOut({ redirect: false })
    await router.push("/")
  }

  const handleClickScroll = (targetSection: string) => {
    const element = document.getElementById(targetSection)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  /**
   * @description Get market type
   */
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
      } else {
        // path = "/"
        setMarketType("nft_land")
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

  const getURLWithEmailToken = useCallback(() => {
    if (typeof window !== "undefined") {
      if (profile) {
        return `/${Helper.encodeURILink(profile.email, profile.jwtToken)}`
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile])

  /**
   * @description Get avatar url
   */
  const getAvatarURL = useCallback((_avatar?: IGameCurrentPlayer) => {
    if (!_avatar) return "/images/home/logoNakaMaster.svg"
    if (!_avatar.avatar) return "/images/home/logoNakaMaster.svg"
    if (_avatar.avatar.split("/")[0] === "assets") {
      return `/${_avatar.avatar}`
    }
    return _avatar.avatar
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /**
   * @description When click play game story mode, count play game will be increase
   * @param gameData
   */
  const handleClickPlayGameStoryMode = useCallback((gameData: IGame) => {
    mutateUpdateCountPlayGame(gameData.id)
      .then((res) => {
        if (res) {
          // Redirect to game with save play to api
          router.push(`${getGameStoryModeURL(gameData)}`)
        }
      })
      .catch(() => {
        // Redirect to game without save play to api
        router.push(`${getGameStoryModeURL(gameData)}`)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
    getGamePokerModeURL,
    openInNewTab,
    getGameMode,
    getTypeGamePartnerPathFolder,
    marketType,
    isRedirectRoomlist,
    onHandleSetGameStore,
    onClickLogout,
    fetchChainData,
    getColorChipByGameType,
    getGameStoryModeURL,
    isFreeToEarnGame,
    isFreeToPlayGame,
    isStoryModeGame,
    isPokerGame,
    goldProfile,
    goldProfileComma,
    handleClickScroll,
    getURLWithEmailToken,
    getAvatarURL,
    handleClickPlayGameStoryMode,
    isWrongFormatURL,
    isOldPathURL,
    isWrongHttpURL
  }
}

export default useGlobal
