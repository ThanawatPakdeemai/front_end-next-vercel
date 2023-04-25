import React, { useEffect, useRef, useState } from "react"
import { iconmotion } from "@components/organisms/Footer"
import useGetBlog from "@feature/blog/containers/hook/useGetBlog"
import { v4 as uuid } from "uuid"
import { PaginationNaka } from "@components/atoms/pagination"
import BlogCard from "@components/molecules/cards/BlogCard"
import SkeletonCard from "@components/atoms/skeleton/SkeletonCard"
import { useQueryClient } from "@tanstack/react-query"
import { getBlogAll } from "@feature/blog/containers/services/blog.service"
import useSearchStore from "@stores/blogFilter"
import useSelectStore from "@stores/selector"

const arrowMotion = {
  rest: {
    opacity: 0,
    duration: 0.2,
    type: "spring"
  },
  hover: {
    width: "full",
    opacity: 1,
    x: 3,
    transition: {
      duration: 0.4
    }
  }
}

const imgMotion = {
  hover: {
    marginLeft: "10px",
    marginRight: "10px",
    marginBottom: "-10px"
  }
}

const BlogListPage = () => {
  const limitPage = 16
  const [page, setPage] = useState<number>(1)
  const [totalCount, setTotalCount] = useState<number>(0)
  const fetchRef = useRef(false)
  const queryClient = useQueryClient()
  const { select: selectHeader } = useSelectStore()
  const type = selectHeader
  const searchBlog = useSearchStore((state: any) => state.search)

  const { getBlogAllData, isPreviousData } = useGetBlog({
    limit: limitPage,
    skip: page,
    search: !fetchRef.current ? "" : searchBlog,
    sort: type,
    cate: "all"
  })

  useEffect(() => {
    let load = false

    if (!load) {
      if (!fetchRef.current && getBlogAllData) {
        fetchRef.current = true
        setTotalCount(getBlogAllData.info.totalCount)
      }
    }

    return () => {
      load = true
    }
  }, [getBlogAllData])

  useEffect(() => {
    let load = false

    if (!load) {
      if (!isPreviousData && getBlogAllData) {
        queryClient.prefetchQuery({
          queryKey: ["blog", type, page + 1],
          queryFn: () =>
            getBlogAll({
              limit: limitPage,
              skip: page + 1,
              search: "",
              sort: type,
              cate: "all"
            })
        })
        setTotalCount(getBlogAllData.info.totalCount)
      }
    }

    return () => {
      load = true
    }
  }, [getBlogAllData, isPreviousData, page, queryClient, type])

  return (
    <div className="blog-list-page w-full">
      <div className="mb-6 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {getBlogAllData
          ? getBlogAllData.data.map((item) => (
              <BlogCard
                key={uuid()}
                image={item.image_list}
                title={item.title}
                description={item.description}
                date_released={item.date_released}
                iconmotion={iconmotion}
                arrowMotion={arrowMotion}
                imgMotion={imgMotion}
                blog_id={item._id}
              />
            ))
          : [...Array(limitPage)].map(() => <SkeletonCard key={uuid()} />)}
      </div>
      <PaginationNaka
        totalCount={totalCount}
        limit={limitPage}
        page={page}
        setPage={setPage}
      />
    </div>
  )
}

export default BlogListPage
