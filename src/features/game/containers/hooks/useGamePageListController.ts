import { useEffect, useState } from "react"
import useGlobal, { isMobile } from "@hooks/useGlobal"
import useFilterStore from "@stores/blogFilter"
import {
  IPayloadGameFilter,
  IGame,
  IGetType,
  TGameType,
  TDevice
} from "@feature/game/interfaces/IGameService"
import useFilterGameList from "@feature/dropdown/containers/hooks/useFilterGameList"
import { useRouter } from "next/router"
import useScrollDetector from "@hooks/useScrollDetector"
import useScrollToEndStore from "@stores/scrollToEnd"

interface ILimitPage {
  limit: number
  endLimitCount: number
}

const useGamePageListController = (
  gameMode?: IGetType,
  gameType?: TGameType,
  _limit?: number,
  _categoryId?: string,
  _device?: TDevice
) => {
  const router = useRouter()
  const categoryId = router.query.id
  const staminaRecovery = new Date("2023-01-07T22:24:00.000Z")
  const { scrollBottom } = useScrollDetector()

  const {
    setScrollToEndScreen: setEndScreen,
    getEndLimitApi: endLimit,
    setEndLimitApi: setEndLimit,
    getCountCallApi: countCallApi,
    setCountCallApi: setValueCountCallApi
  } = useScrollToEndStore()

  const [cooldown, setCooldown] = useState<boolean>(true)
  const [gameFilter, setGameFilter] = useState<IGame[]>()
  const [limitPage, setLimitPage] = useState<ILimitPage>({
    limit: 10,
    endLimitCount: 0
  })

  let _countCallApi = 0

  const {
    onHandleSetGameStore,
    limit,
    setPage,
    setLimit,
    totalCount,
    page,
    pager,
    setTotalCount,
    getGameMode,
    isRedirectRoomlist
  } = useGlobal()
  const {
    category: categoryDropdown,
    gameItem: gameItemDropdown,
    device: deviceDropdown,
    search: searchDropdown,
    game_type: gameTypeDropdown,
    clearCategory,
    clearDevice,
    clearGameItem,
    clearSearch,
    clearGameType,
    setDevice
  } = useFilterStore()

  const { mutateGetGameAllFilter, isLoading: loadingFilterGame } =
    useFilterGameList()

  useEffect(() => {
    let load = false
    if (!load) {
      if (isMobile) {
        setDevice("mobile")
      }
    }
    return () => {
      load = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile])

  /**
   * @description Get game type by pathname
   * @returns
   */
  const getGameModeFilter = (): IGetType => {
    if (categoryId) {
      return "all"
    }
    if (!gameMode) {
      return "all"
    }
    return gameMode
  }

  useEffect(() => {
    let load = false
    if (!load) {
      clearCategory()
      clearDevice()
      clearGameItem()
      clearSearch()
      clearGameType()
    }
    return () => {
      load = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    let load = false
    if (!load) {
      if (loadingFilterGame) {
        setGameFilter([])
      }
      const filterData: IPayloadGameFilter = {
        limit: limitPage.limit >= 10 ? limitPage.limit : 10,
        skip: page,
        sort: "_id",
        search: searchDropdown,
        category: categoryId || _categoryId || categoryDropdown,
        item: gameItemDropdown,
        device: _device || deviceDropdown,
        game_type: gameType || gameTypeDropdown,
        game_mode:
          getGameModeFilter() === "arcade-emporium"
            ? "all"
            : getGameModeFilter(),
        tournament: false,
        nftgame: getGameModeFilter() === "arcade-emporium" ? true : "all"
      }

      if (!endLimit && countCallApi < 1) {
        const timer = setTimeout(() => {
          mutateGetGameAllFilter(filterData).then((res) => {
            if (res) {
              const { data, info } = res
              setGameFilter(data)
              setTotalCount(info ? info.totalCount : 1)
              // eslint-disable-next-line react-hooks/exhaustive-deps
              _countCallApi = 0
              setValueCountCallApi(_countCallApi)
            }
          })
        }, 500)

        return () => clearTimeout(timer)
      }
      setEndScreen(true)
    }

    return () => {
      load = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    categoryDropdown,
    gameItemDropdown,
    deviceDropdown,
    searchDropdown,
    gameTypeDropdown,
    page,
    limit,
    mutateGetGameAllFilter,
    gameMode,
    _categoryId,
    limitPage
  ])

  const handleInfinityLimit = () => {
    if (gameFilter) {
      if (scrollBottom && limitPage.limit < totalCount && isMobile) {
        setLimitPage({
          limit: limitPage.limit + 10,
          endLimitCount: gameFilter.length
        })
        setEndLimit(false)
      } else {
        setLimitPage({
          limit: gameFilter?.length < 10 ? totalCount : gameFilter?.length,
          endLimitCount: 1
        })
        _countCallApi += 1
        setValueCountCallApi(_countCallApi)
        setEndLimit(true)
      }
    }
  }

  const handleSearchFilter = () => {
    setEndLimit(false)
    _countCallApi = 0
    setValueCountCallApi(_countCallApi)
  }

  useEffect(() => {
    handleInfinityLimit()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollBottom])

  useEffect(() => {
    handleSearchFilter()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchDropdown])

  const onSetGameStore = (game: IGame) => {
    onHandleSetGameStore(game.game_mode, game)
  }

  const onClickLink = (game: IGame) =>
    `/${getGameMode(game)}/${game.path}${isRedirectRoomlist(game).toString()}`

  return {
    limit,
    gameFilter,
    page,
    setPage,
    setLimit,
    pager,
    totalCount,
    loadingFilterGame,
    onSetGameStore,
    gameLink: onClickLink,
    staminaRecovery,
    cooldown,
    setCooldown,
    setDevice
  }
}

export default useGamePageListController
