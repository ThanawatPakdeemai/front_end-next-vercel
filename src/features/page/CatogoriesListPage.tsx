import React, { useEffect } from "react"
import { v4 as uuid } from "uuid"
import useCategories from "@hooks/useCategories"
import CategoryCard from "@components/molecules/cards/CategoryCard"
import SkeletonCategoryCard from "@components/atoms/skeleton/SkeletonCategoryCard"

const CatogoriesListPage = () => {
  const limitPage = 16
  // const [page, setPage] = useState<number>(1)
  // const [totalCount, setTotalCount] = useState<number>(0)
  // const fetchRef = useRef(false)
  // const queryClient = useQueryClient()
  // const { select: selectHeader } = useSelectStore()
  // const type = selectHeader
  // const searchBlog = useSearchStore((state: any) => state.search)
  // {
  //   limit: limitPage,
  //   skip: page,
  //   search: searchBlog,
  //   sort: type,
  //   cate: "all"
  // }
  const {
    getCategoriesAll,
    isFetchingCategories,
    isPreviousDataCategories,
    onHandleClickCatogory
  } = useCategories()

  useEffect(() => {
    if (!isFetchingCategories && getCategoriesAll) {
      // setTotalCount(getBlogAllData.info.totalCount)
    }
  }, [getCategoriesAll, isFetchingCategories])

  useEffect(() => {
    if (!isPreviousDataCategories && getCategoriesAll) {
      // queryClient.prefetchQuery({
      //   queryKey: ["blog", type, page + 1],
      //   queryFn: () =>
      //     getBlogAll({
      //       limit: limitPage,
      //       skip: page + 1,
      //       search: "",
      //       sort: type,
      //       cate: "all"
      //     })
      // })
    }
  }, [getCategoriesAll, isPreviousDataCategories])

  return (
    <>
      <div className="mb-6 mt-6 grid w-full grid-cols-2 gap-4 md:mt-0 md:grid-cols-4">
        {getCategoriesAll
          ? getCategoriesAll.map((item) => (
              <CategoryCard
                key={uuid()}
                img={item.image_list}
                text={item.name}
                onHandleClick={() => onHandleClickCatogory(item.slug, item.id)}
              />
            ))
          : [...Array(limitPage)].map(() => (
              <SkeletonCategoryCard key={uuid()} />
            ))}
      </div>
      {/* <PaginationNaka
        totalCount={totalCount}
        limit={limitPage}
        page={page}
        setPage={setPage}
      /> */}
    </>
  )
}

export default CatogoriesListPage
