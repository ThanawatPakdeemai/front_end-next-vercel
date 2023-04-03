import { useEffect, useState } from "react"
import useGlobal from "@hooks/useGlobal"
import useFilterStore from "@stores/blogFilter"
import { IFilterGamesByKey, IGame } from "@feature/game/interfaces/IGameService"
import useFilterGameList from "@feature/dropdown/containers/hooks/useFilterGameList"
import { useRouter } from "next/router"

const useGamePageListController = () => {
  const router = useRouter()
  const categoryId = router.query.id
  const staminaRecovery = new Date("2023-01-07T22:24:00.000Z")
  const [cooldown, setCooldown] = useState<boolean>(true)
  const [gameFilter, setGameFilter] = useState<IGame[]>()
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
    getGameTypeByPathname,
    isRedirectRoomlist
  } = useGlobal()
  const {
    category: categoryDropdown,
    gameItem: gameItemDropdown,
    device: deviceDropdown,
    search: searchDropdown,
    clearCategory,
    clearDevice,
    clearGameItem,
    clearSearch
  } = useFilterStore()

  const { mutateGetGamesByCategoryId, isLoading: loadingFilterGame } =
    useFilterGameList()

  /**
   * @description Get game type by pathname
   * @returns
   */
  const getGameTypeFilter = () => {
    if (categoryId) {
      return "all"
    }
    if (getGameTypeByPathname() === "arcade-emporium") {
      return "play-to-earn-games"
    }
    return getGameTypeByPathname()
  }

  useEffect(() => {
    let load = false
    if (!load) {
      clearCategory()
      clearDevice()
      clearGameItem()
      clearSearch()
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
        limit,
        skip: page,
        sort: "_id",
        search: searchDropdown,
        category: categoryId || categoryDropdown,
        item: gameItemDropdown,
        device: deviceDropdown,
        game_type: getGameTypeFilter(),
        tournament: false,
        nftgame: getGameTypeByPathname() === "arcade-emporium" ? true : "all"
      }
      mutateGetGamesByCategoryId(filterData).then((res) => {
        if (res) {
          const { data, info } = res
          setGameFilter(data)
          setTotalCount(info ? info.totalCount : 1)
        }
      })
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
    page,
    limit,
    mutateGetGamesByCategoryId
    // getTypeGamePathFolder,
    // onHandleSetGameStore
    // getGameTypeByPathname
    // filterGameList
  ])

  const onSetGameStore = (game: IGame) => {
    onHandleSetGameStore(getTypeGamePathFolder(game), game)
  }

  const onClickLink = (game: IGame) =>
    `/${getTypeGamePathFolder(game)}/${game.path}${isRedirectRoomlist(
      game
    ).toString()}`

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
    setCooldown
  }
}

export default useGamePageListController
