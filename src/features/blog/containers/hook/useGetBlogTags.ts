/* eslint-disable no-console */
import { BlogTagsPayload } from "@feature/blog/interfaces/IBlogTagsService"
import { useQuery } from "@tanstack/react-query"
import { getBlogTags } from "../services/blog.service"

const useGetBlogTags = ({
  limit,
  skip,
  sort,
  search,
  tags_id
}: BlogTagsPayload) => {
  const {
    data: getBlogTagData,
    error,
    isLoading,
    isPreviousData,
    isError,
    isFetching
  } = useQuery({
    queryKey: ["getBlogTags", { limit, skip, sort, search, tags_id }],
    queryFn: () => getBlogTags({ limit, skip, sort, search, tags_id }),
    keepPreviousData: true,
    staleTime: Infinity,
    enabled: tags_id !== "" || tags_id !== undefined
  })

  return {
    getBlogTagData,
    error,
    isLoading,
    isPreviousData,
    isError,
    isFetching
  }
}

export default useGetBlogTags
