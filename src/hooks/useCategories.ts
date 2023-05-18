import { getCategories } from "@feature/dropdown/containers/services/dropdown.service"
import { getGamesByKey } from "@feature/game/containers/services/game.service"
import { IFilterGamesByKey } from "@feature/game/interfaces/IGameService"
import { useQuery } from "@tanstack/react-query"
import useGlobal from "./useGlobal"

const useCategories = (_body?: IFilterGamesByKey | undefined) => {
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
    staleTime: Infinity,
    retry: 3
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
    queryKey: ["getGamesByKey", _body],
    queryFn: () => getGamesByKey(_body || defaultBody),
    keepPreviousData: true,
    staleTime: Infinity,
    retry: 3
  })

  /**
   * @description Handle click
   * @param _link
   */
  const onHandleClickCatogory = (_link: string, _id: string) =>
    `/categories/${_link}?id=${_id}`

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
