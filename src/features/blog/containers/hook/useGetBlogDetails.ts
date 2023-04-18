import { useQuery } from "@tanstack/react-query"
import { getBlogDetail } from "../services/blog.service"

const useGetBlogDetails = (blog_id: string) => {
  const {
    data: getBlogDetails,
    error,
    isLoading,
    isError
  } = useQuery({
    queryKey: ["getBlogDetails", blog_id],
    queryFn: () => getBlogDetail(blog_id),
    staleTime: Infinity,
    enabled: blog_id !== ""
  })
  return {
    getBlogDetails: getBlogDetails?.data,
    error,
    isLoading,
    isError
  }
}

export default useGetBlogDetails
