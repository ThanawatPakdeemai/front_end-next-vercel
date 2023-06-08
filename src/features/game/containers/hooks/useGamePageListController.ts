/* eslint-disable max-len */
import { useEffect, useState } from "react"
import useGlobal, { isMobile } from "@hooks/useGlobal"
import useFilterStore from "@stores/blogFilter"
import {
  IFilterGamesByKey,
  IGame,
  IGetType,
  TGameType
} from "@feature/game/interfaces/IGameService"
import useFilterGameList from "@feature/dropdown/containers/hooks/useFilterGameList"
import { useRouter } from "next/router"
import useScrollDetector from "@hooks/useScrollDetector"
import { useToast } from "@feature/toast/containers"
import { MESSAGES } from "@constants/messages"

interface ILimitPage {
  limit: number
  endLimit: boolean
  endLimitCount: number
}

const useGamePageListController = (
  gameMode?: IGetType,
  gameType?: TGameType,
  _limit?: number,
  _categoryId?: string,
  _device?: "mobile" | "desktop" | "all"
) => {
  const router = useRouter()
  const categoryId = router.query.id
  const staminaRecovery = new Date("2023-01-07T22:24:00.000Z")
  const scrollBottom = useScrollDetector()
  const { warnToast } = useToast()

  const [cooldown, setCooldown] = useState<boolean>(true)
  const [gameFilter, setGameFilter] = useState<IGame[]>()
  const [limitPage, setLimitPage] = useState<ILimitPage>({
    limit: 10,
    endLimit: false,
    endLimitCount: 0
  })
  let countCallApi = 0

  const {
    onHandleSetGameStore,
    limit,
    setPage,
    setLimit,
    totalCount,
    page,
    pager,
    setTotalCount,
    getTypeGamePathFolder,
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

  const { mutateGetGamesByCategoryId, isLoading: loadingFilterGame } =
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
      const filterData: IFilterGamesByKey = {
        limit: limitPage.limit,
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
      if (!limitPage.endLimit && countCallApi < 1) {
        mutateGetGamesByCategoryId(filterData).then((res) => {
          if (res) {
            const { data, info } = res
            setGameFilter(data)
            setTotalCount(info ? info.totalCount : 1)
          }
        })
      } else {
        warnToast(MESSAGES.end_of_the_limit)
      }
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
    mutateGetGamesByCategoryId,
    gameMode,
    _categoryId,
    limitPage
  ])

  const handleInfinityLimit = () => {
    if (gameFilter) {
      if (scrollBottom && limitPage.limit < totalCount) {
        setLimitPage({
          limit: limitPage.limit + 10,
          endLimit: false,
          endLimitCount: gameFilter.length
        })
      } else {
        setLimitPage({
          limit: gameFilter?.length,
          endLimit: true,
          endLimitCount: 1
        })
        countCallApi += 1
      }
    }
  }

  useEffect(() => {
    handleInfinityLimit()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollBottom])

  const onSetGameStore = (game: IGame) => {
    onHandleSetGameStore(getTypeGamePathFolder(game), game)
  }

  const onClickLink = (game: IGame) =>
    `/${game.is_NFT ? "arcade-emporium" : getTypeGamePathFolder(game)}/${
      game.path
    }${isRedirectRoomlist(game).toString()}`

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
