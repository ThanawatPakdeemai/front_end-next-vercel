/* eslint-disable max-len */
import { v4 as uuid } from "uuid"
import React, { useEffect, useRef } from "react"
import Slider, { Settings } from "react-slick"
import useCategories from "@hooks/useCategories"
import SkeletonCard from "@components/atoms/skeleton/SkeletonCard"
// import AddIcon from "@mui/icons-material/Add"
import CategoryCard from "./cards/CategoryCard"
// import ButtonToggleIcon from "./gameSlide/ButtonToggleIcon"

const BodyCategories = () => {
  const limitPage = 16
  const { getCategoriesAll, isFetchingCategories, onHandleClickCatogory } =
    useCategories()

  useEffect(() => {
    if (!isFetchingCategories && getCategoriesAll) {
      // setTotalCount(getBlogAllData.info.totalCount)
    }
  }, [getCategoriesAll, isFetchingCategories])

  const sliderRef = useRef<Slider>(null)

  const settings: Settings = {
    slidesToShow: 5,
    slidesToScroll: 5,
    dots: true,
    arrows: false
  }

  return (
    <div className="mt-10 mb-10 w-[calc(100%)]">
      {/* <div className="flex h-[40px] w-[150px] justify-end">
        <ButtonToggleIcon
          startIcon={<AddIcon />}
          text="view all"
          handleClick={undefined}
          className="flex items-center justify-center rounded-md border border-neutral-700 font-neue-machina text-sm font-bold capitalize leading-3 text-white-primary"
          type="button"
        />
      </div> */}
      <Slider
        ref={sliderRef}
        {...settings}
      >
        {getCategoriesAll
          ? getCategoriesAll.slice(0, 10).map((item) => (
              <CategoryCard
                key={uuid()}
                img={item.image_list}
                text={item.name}
                onHandleClick={() => onHandleClickCatogory(item.slug, item.id)}
              />
            ))
          : [...Array(limitPage)].map(() => <SkeletonCard key={uuid()} />)}
      </Slider>
    </div>
  )
}
export default BodyCategories
