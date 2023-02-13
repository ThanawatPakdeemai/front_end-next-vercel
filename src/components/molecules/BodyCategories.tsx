import { Grid } from "@mui/material"
import { v4 as uuid } from "uuid"
import React, { useEffect } from "react"
import useCategories from "@hooks/useCategories"
import SkeletonCard from "@components/atoms/skeleton/SkeletonCard"
import CategoryCard from "./cards/CategoryCard"

const BodyCategories = () => {
  const limitPage = 16
  const { getCategoriesAll, isFetchingCategories, onHandleClickCatogory } =
    useCategories()

  useEffect(() => {
    if (!isFetchingCategories && getCategoriesAll) {
      // setTotalCount(getBlogAllData.info.totalCount)
    }
  }, [getCategoriesAll, isFetchingCategories])

  return (
    <div className="mt-10 mb-10 w-[calc(100%)]">
      <Grid
        container
        spacing={2}
        columns={15}
      >
        {getCategoriesAll
          ? getCategoriesAll.slice(0, 5).map((item) => (
              <CategoryCard
                key={uuid()}
                img={item.image_list}
                text={item.name}
                onHandleClick={() => onHandleClickCatogory(item.slug, item.id)}
              />
            ))
          : [...Array(limitPage)].map(() => <SkeletonCard key={uuid()} />)}
      </Grid>
    </div>
  )
}
export default BodyCategories
