import { useQuery } from "@tanstack/react-query"
import { getPopularTags } from "../services/blog.service"

const useGetPopularTags = () => {
  const {
    data: getPopularTagsData,
    error,
    isLoading,
    isError
  } = useQuery({
    queryKey: ["getPopulartags"],
    queryFn: () => getPopularTags(),
    staleTime: Infinity
  })
  return {
    getPopularTagsData,
    error,
    isLoading,
    isError
  }
}

export default useGetPopularTags
