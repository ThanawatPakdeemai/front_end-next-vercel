import {
  getCategories,
  getGamesByCategoryId
} from "@feature/dropdown/containers/services/dropdown.service"
import { IFilterGamesByCategory } from "@feature/dropdown/interfaces/IDropdownService"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"
import useGlobal from "./useGlobal"

const useCategories = (_body?: IFilterGamesByCategory | undefined) => {
  const router = useRouter()
  const { defaultBody } = useGlobal()

  /**
   * @description Get alll categories
   */
  const {
    data: getCategoriesAll,
    error: errorCategories,
    isLoading: isLoadingCategories,
    isPreviousData: isPreviousDataCategories,
    isError: isErrorCategories,
    isFetching: isFetchingCategories
  } = useQuery({
    // queryKey: ["getBlog", { limit, skip, search, sort, cate }],
    // queryFn: () => getCategories({ limit, skip, search, sort, cate }),
    queryKey: ["getCategories"],
    queryFn: () => getCategories(),
    keepPreviousData: true,
    staleTime: Infinity
  })

  /**
   * @description Filter games by category id
   */
  const {
    data: getGamesFilterByCategoryId,
    error: errorGamesFilterByCategoryId,
    isLoading: isLoadingGamesFilterByCategoryId,
    isPreviousData: isPreviousGamesFilterByCategoryId,
    isError: isErrorGamesFilterByCategoryId,
    isFetching: isFetchingGamesFilterByCategoryId
  } = useQuery({
    queryKey: ["getGamesByCategoryId", _body],
    queryFn: () => getGamesByCategoryId(_body || defaultBody),
    keepPreviousData: true,
    staleTime: Infinity
  })

  /**
   * @description Handle click
   * @param _link
   */
  const onHandleClickCatogory = (_link: string, _id: string) => {
    router.push(`/categories/${_link}?id=${_id}`)
  }

  return {
    getCategoriesAll,
    errorCategories,
    isLoadingCategories,
    isPreviousDataCategories,
    isErrorCategories,
    isFetchingCategories,
    onHandleClickCatogory,
    getGamesFilterByCategoryId,
    errorGamesFilterByCategoryId,
    isLoadingGamesFilterByCategoryId,
    isPreviousGamesFilterByCategoryId,
    isErrorGamesFilterByCategoryId,
    isFetchingGamesFilterByCategoryId
  }
}

export default useCategories
