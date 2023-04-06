import React from "react"
import { iconmotion } from "@components/organisms/Footer"
import BlogCard from "@components/molecules/cards/BlogCard"
import { v4 as uuid } from "uuid"
import { IBlogData } from "@feature/blog/interfaces/IBlogService"
import { Chip, Typography } from "@mui/material"
import { IPopularTags } from "@feature/blog/interfaces/IBlogPopularTags"
import { useTranslation } from "react-i18next"

export interface IBlogReleatedProps {
  blogReleatedItems: IBlogData[]
  blogReleatedTag: IPopularTags[]
  blogReleatedTitle?: string
}

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

const BlogReleated = ({
  blogReleatedItems,
  blogReleatedTitle = "Popular Tags",
  blogReleatedTag
}: IBlogReleatedProps) => {
  const { t } = useTranslation()
  return (
    <div className="relative flex w-full flex-col  xl:w-[512px]">
      <div className="h-[100px] bg-neutral-780">
        <div className="px-6 py-12 text-center font-neue-machina text-sm uppercase text-white-default">
          {t("Relate Blog")}
        </div>
      </div>
      <div className="w-full border-[1px] border-neutral-780  ">
        <div className="flex flex-wrap justify-center gap-3 lg:grid lg:flex-nowrap">
          {blogReleatedItems.map((item) => (
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
              className="m-6"
            />
          ))}
        </div>
        <div className="flex h-auto w-full items-center border-t-[1px] border-neutral-780 xl:h-[80px] ">
          <div className=" mx-auto h-auto w-full justify-center xl:flex  xl:w-full xl:flex-wrap">
            {blogReleatedTitle && (
              <Typography className="mx-2 my-2 flex items-center justify-center text-sm uppercase text-white-default xl:my-0">
                {t(`${blogReleatedTitle}`)}
              </Typography>
            )}
            <div className="m-4 grid w-full grid-cols-3 gap-2 md:grid-cols-4 xl:flex xl:h-[35px] xl:overflow-x-auto">
              {blogReleatedTag.map((popularItem) => (
                <Chip
                  key={uuid()}
                  label={t(popularItem.name)}
                  variant="filled"
                  color="success"
                  size="small"
                  className="!bg-neutral-600 uppercase"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogReleated
