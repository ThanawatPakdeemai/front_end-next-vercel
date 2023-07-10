import { useCallback, useEffect } from "react"
import useGameStore from "@stores/game"
import { useBaseProvider } from "@providers/BaseProvider"
import useFilterStore from "@stores/blogFilter"
import useFilterGameListSwr from "./useFilterGameListSwr"

const useGamePageListControllerMobile = () => {
  const { setAllGameFreeToPlay, setAllGameStoryMode, setAllGame } =
    useGameStore()
  const { search: searchBlog } = useFilterStore()
  const { selectedCategory } = useBaseProvider()
  const { gameAllFilterData, gameAllFilterIsLoading } = useFilterGameListSwr({
    skip: 1,
    sort: "_id",
    search: "",
    category: "all",
    item: "all",
    device: "mobile",
    game_type: "all",
    game_mode: "all",
    tournament: false,
    nftgame: "all",
    limit: -1
  })

  const handleGameStore = useCallback(() => {
    // Set game free to play to store
    if (!gameAllFilterData) {
      return
    }

    setAllGame(gameAllFilterData)

    const _freeToPlay = gameAllFilterData
      .filter((item) => item.game_mode === "free-to-play")
      .filter((item) =>
        searchBlog !== ""
          ? item.name.toLowerCase().includes(searchBlog.toLowerCase())
          : []
      )
      .filter((item) => {
        if (selectedCategory.id !== "all") {
          return item.category_list.some(
            (category) => category.id === selectedCategory.id
          )
        }
        return []
      })
    setAllGameFreeToPlay(_freeToPlay)

    // Set game story mode to store
    const _storyMode = gameAllFilterData
      .filter((item) => item.game_mode === "story-mode")
      .filter((item) =>
        searchBlog !== ""
          ? item.name.toLowerCase().includes(searchBlog.toLowerCase())
          : []
      )
      .filter((item) => {
        if (selectedCategory.id !== "all") {
          return item.category_list.some(
            (category) => category.id === selectedCategory.id
          )
        }
        return []
      })
    setAllGameStoryMode(_storyMode)
  }, [
    gameAllFilterData,
    setAllGameFreeToPlay,
    setAllGameStoryMode,
    setAllGame,
    selectedCategory,
    searchBlog
  ])

  useEffect(() => {
    let load = false

    if (!load) {
      handleGameStore()
    }

    return () => {
      load = true
    }
  }, [handleGameStore])

  return {
    gameAllFilterIsLoading
  }
}

export default useGamePageListControllerMobile
