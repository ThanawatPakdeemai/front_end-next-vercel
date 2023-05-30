import { useEffect, useState } from "react"
import useCategories from "@hooks/useCategories"
import useGlobal from "@hooks/useGlobal"
import useFilterStore from "@stores/blogFilter"
import { IGameCategory } from "@feature/dropdown/interfaces/IDropdownService"
import useGamePageListController from "@feature/game/containers/hooks/useGamePageListController"
import { IGame, IGetType } from "@feature/game/interfaces/IGameService"

const useHomeControllerMobile = () => {
  // Hook
  const { search: searchBlog, setSearch: setSearchBlog } = useFilterStore()
  const { limit } = useGlobal()

  // State
  const [gameData, setGameData] = useState<IGame[]>([])
  const [activeMenu, setActiveMenu] = useState<IGetType>("play-to-earn")
  const [categories, setCategories] = useState<IGameCategory[]>()
  const [selectedCategory, setSelectedCategory] = useState<string>("")

  const [open, setOpen] = useState(false)
  const [openNotification, setOpenNotification] = useState<boolean>(false)
  const [openWishlist, setOpenWishlist] = useState<boolean>(false)
  const [openSetting, setOpenSetting] = useState<boolean>(false)
  const [openReward, setOpenReward] = useState<boolean>(false)

  const { getCategoriesAll, isFetchingCategories } = useCategories({
    limit: 100
  })
  const {
    gameFilter: dataGames,
    loadingFilterGame,
    gameLink,
    onSetGameStore
  } = useGamePageListController(activeMenu, "all", limit, selectedCategory)

  /**
   * @description When click toggle categories
   */
  const toggleDrawer = (newOpen: boolean) => {
    setOpen(newOpen)
  }

  const toggleDrawerNotification = (newOpen: boolean) => {
    setOpenNotification(newOpen)
  }

  const toggleDrawerWishlist = (newOpen: boolean) => {
    setOpenWishlist(newOpen)
  }

  const toggleDrawerSetting = (newOpen: boolean) => {
    setOpenSetting(newOpen)
  }

  const toggleDrawerReward = (newOpen: boolean) => {
    setOpenReward(newOpen)
  }

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
    activeMenu,
    setActiveMenu,
    categories,
    open,
    setOpen,
    toggleDrawer,
    openNotification,
    setOpenNotification,
    toggleDrawerNotification,
    toggleDrawerWishlist,
    selectedCategory,
    setSelectedCategory,
    searchBlog,
    setSearchBlog,
    isFetchingCategories,
    loadingFilterGame,
    limit,
    gameLink,
    onSetGameStore,
    setOpenWishlist,
    openWishlist,
    toggleDrawerSetting,
    openSetting,
    setOpenSetting,
    setOpenReward,
    openReward,
    toggleDrawerReward
  }
}

export default useHomeControllerMobile
