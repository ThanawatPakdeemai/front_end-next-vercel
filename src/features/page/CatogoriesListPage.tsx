import React from "react"
import { v4 as uuid } from "uuid"
import dynamic from "next/dynamic"
import useCategories from "@hooks/useCategories"
import useGamePageListController from "@feature/game/containers/hooks/useGamePageListController"
import { CATEGORY_ICON } from "@constants/categoryIcon"

const CategoryCard = dynamic(
  () => import("@components/molecules/cards/CategoryCard")
)
const SkeletonCategoryCard = dynamic(
  () => import("@components/atoms/skeleton/SkeletonCategoryCard")
)

const CatogoriesListPage = () => {
  // page, setPage, pager, setLimit, totalCount
  const { limit } = useGamePageListController()
  const { getCategoriesAll } = useCategories()

  return (
    <>
      <div className="mb-6 mt-6 grid w-full grid-cols-2 gap-4 md:mt-0 md:grid-cols-4">
        {getCategoriesAll
          ? getCategoriesAll.map((item) => (
              <CategoryCard
                key={uuid()}
                img={item.image_list}
                text={item.name}
                href={`/categories/${item.slug}?id=${item.id}`}
                icon={
                  CATEGORY_ICON.find((_item) => _item.id === item.slug)?.icon ||
                  ""
                }
              />
            ))
          : [...Array(limit)].map(() => <SkeletonCategoryCard key={uuid()} />)}
      </div>
      {/* //TODO: Change to POST later */}
      {/* <Box
        className="my-2 flex w-full justify-between md:my-5"
        sx={{
          ".MuiPagination-ul": {
            gap: "5px 0"
          }
        }}
      >
        <PaginationNaka
          totalCount={totalCount}
          limit={limit}
          page={page}
          setPage={setPage}
        />
        <DropdownLimit
          className="m-0 w-[160px] flex-row"
          defaultValue={30}
          list={pager}
          onChangeSelect={setLimit}
        />
      </Box> */}
    </>
  )
}

export default CatogoriesListPage
