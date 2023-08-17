/* eslint-disable max-len */
import { v4 as uuid } from "uuid"
import React, { useEffect, useRef } from "react"
import Slider, { Settings } from "react-slick"
import dynamic from "next/dynamic"
import useCategories from "@hooks/useCategories"
import { CATEGORY_ICON } from "@constants/categoryIcon"

const SkeletonCard = dynamic(
  () => import("@components/atoms/skeleton/SkeletonCard"),
  {
    suspense: true,
    ssr: false
  }
)
const CategoryCard = dynamic(() => import("./cards/CategoryCard"), {
  suspense: true,
  ssr: false
})

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
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }
    ]
  }

  return (
    <div className="my-2 w-[calc(100%)] md:my-10">
      {getCategoriesAll?.length && (
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
                  href={onHandleClickCatogory(item.slug, item.id)}
                  icon={
                    CATEGORY_ICON.find((_item) => _item.id === item.slug)
                      ?.icon || ""
                  }
                />
              ))
            : [...Array(limitPage)].map(() => <SkeletonCard key={uuid()} />)}
        </Slider>
      )}
    </div>
  )
}
export default BodyCategories
