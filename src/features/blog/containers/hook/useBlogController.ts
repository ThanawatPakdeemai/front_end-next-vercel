import { useEffect, useState } from "react"
import { IBlogDetail } from "@feature/blog/interfaces/IBlogService"
import useLoadingStore from "@stores/loading"
import { IPopularTags } from "@feature/blog/interfaces/IBlogPopularTags"
import useGetPopularTags from "./useGetPopularTags"
import useGetBlogDetails from "./useGetBlogDetails"

const useBlogController = (_blogId: string) => {
  const { getBlogDetails, isLoading } = useGetBlogDetails(_blogId)
  const [blogDetailState, setBlogDetailState] = useState<IBlogDetail>(
    {} as IBlogDetail
  )
  const [popularTagsState, setPopularTagsState] = useState<IPopularTags[]>([])
  const { setOpen, setClose } = useLoadingStore()
  const { popularTagsData } = useGetPopularTags()

  useEffect(() => {
    let load = false

    if (!load) {
      if (isLoading) {
        setOpen()
      } else {
        setClose()
      }
    }

    return () => {
      load = true
    }
  }, [isLoading, setOpen, setClose])

  /**
   * Get Blog Details
   */
  useEffect(() => {
    let load = false
    if (!load) {
      if (getBlogDetails) {
        setBlogDetailState(getBlogDetails)
      }
    }
    return () => {
      load = true
    }
  }, [getBlogDetails, _blogId])

  /**
   * Get Popular Tags
   */
  useEffect(() => {
    let load = false
    if (!load) {
      if (popularTagsData) {
        setPopularTagsState(popularTagsData)
      }
    }
    return () => {
      load = true
    }
  }, [popularTagsData])

  return {
    blogDetailState,
    popularTagsState
  }
}

export default useBlogController
