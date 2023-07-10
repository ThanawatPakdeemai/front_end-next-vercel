import { useEffect } from "react"
import useGlobal from "@hooks/useGlobal"
import useFilterStore from "@stores/blogFilter"
import useGameStore from "@stores/game"
import useAllCategories from "@hooks/useAllCategories"
import { defaultCategory } from "@providers/BaseProvider"

const useGameControllerMobile = () => {
  // Hook
  const { search: searchBlog, setSearch: setSearchBlog } = useFilterStore()

  const { setAllCategory } = useGameStore()
  const { limit } = useGlobal()
  const { getCategoriesAll, isFetchingCategories } = useAllCategories()

  useEffect(() => {
    let load = false

    if (!load) {
      if (
        !isFetchingCategories &&
        getCategoriesAll &&
        getCategoriesAll.length > 0
      ) {
        setAllCategory([defaultCategory, ...getCategoriesAll])
      }
    }
    return () => {
      load = true
    }
  }, [getCategoriesAll, isFetchingCategories, setAllCategory])

  return {
    searchBlog,
    setSearchBlog,
    isFetchingCategories,
    limit
  }
}

export default useGameControllerMobile
