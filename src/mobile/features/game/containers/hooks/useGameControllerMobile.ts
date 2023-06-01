import { useEffect, useState } from "react"
import useCategories from "@hooks/useCategories"
import useGlobal from "@hooks/useGlobal"
import useFilterStore from "@stores/blogFilter"
import { IGameCategory } from "@feature/dropdown/interfaces/IDropdownService"
import useGamePageListController from "@feature/game/containers/hooks/useGamePageListController"
import { IGame } from "@feature/game/interfaces/IGameService"
import useGlobalControllerMobile from "./useGlobalControllerMobile"

const useGameControllerMobile = () => {
  // Hook
  const { search: searchBlog, setSearch: setSearchBlog } = useFilterStore()
  const { limit } = useGlobal()
  const { activeMenu, setActiveMenu } = useGlobalControllerMobile()

  // State
  const [gameData, setGameData] = useState<IGame[]>([])

  const [categories, setCategories] = useState<IGameCategory[]>()
  const [selectedCategory, setSelectedCategory] = useState<string>("")

  const { getCategoriesAll, isFetchingCategories } = useCategories({
    limit: 100
  })
  const {
    gameFilter: dataGames,
    loadingFilterGame,
    onSetGameStore
  } = useGamePageListController(
    activeMenu,
    "all",
    limit,
    selectedCategory,
    "mobile"
  )

  useEffect(() => {
    let load = false

    if (!load) {
      if (dataGames && dataGames.length > 0) {
        setGameData(dataGames)
      }
    }

    return () => {
      load = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataGames])

  useEffect(() => {
    let load = false

    if (!load) {
      if (!isFetchingCategories && getCategoriesAll) {
        setCategories(getCategoriesAll)
      }
    }
    return () => {
      load = true
    }
  }, [getCategoriesAll, isFetchingCategories])

  return {
    gameData,
    categories,
    selectedCategory,
    setSelectedCategory,
    searchBlog,
    setSearchBlog,
    isFetchingCategories,
    loadingFilterGame,
    limit,
    onSetGameStore,
    activeMenu,
    setActiveMenu
  }
}

export default useGameControllerMobile
