import { getCategories } from "@feature/dropdown/containers/services/dropdown.service"
import { useQuery } from "@tanstack/react-query"

const useAllCategories = () => {
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
    queryKey: ["getCategories"],
    queryFn: () => getCategories(),
    keepPreviousData: true,
    staleTime: Infinity,
    retry: 3
  })

  return {
    getCategoriesAll,
    errorCategories,
    isLoadingCategories,
    isPreviousDataCategories,
    isErrorCategories,
    isFetchingCategories
  }
}

export default useAllCategories
