/* eslint-disable no-console */
import { Blog } from "@feature/blog/interfaces/IBlogService"
import { useQuery } from "@tanstack/react-query"
import { getBlogAll } from "../services/blog.service"

const useGetBlog = ({ limit, skip, search, sort, cate }: Blog) => {
  const {
    data: getBlogAllData,
    error,
    isLoading,
    isPreviousData,
    isError,
    isFetching
  } = useQuery({
    queryKey: ["getBlog", { limit, skip, search, sort, cate }],
    queryFn: () => getBlogAll({ limit, skip, search, sort, cate }),
    keepPreviousData: true,
    staleTime: Infinity
  })

  return {
    getBlogAllData,
    error,
    isLoading,
    isPreviousData,
    isError,
    isFetching
  }
}

export default useGetBlog
