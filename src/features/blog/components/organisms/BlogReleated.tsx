import React from "react"
import { iconmotion } from "@components/organisms/Footer"
import { v4 as uuid } from "uuid"
import { IBlogData } from "@feature/blog/interfaces/IBlogService"
import { Chip, Typography } from "@mui/material"
import { IPopularTags } from "@feature/blog/interfaces/IBlogPopularTags"
import { useTranslation } from "react-i18next"
import BlogCardHorizontal from "@components/molecules/cards/BlogCardHorizontal"

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
    <div className="relative flex w-full flex-col border-[1px] border-neutral-800 xl:w-[512px]">
      <div className="flex h-[100px] items-center justify-center bg-neutral-780 p-6 text-center font-neue-machina text-sm uppercase text-white-default">
        {t("Relate Blog")}
      </div>
      <div className="w-full border-[1px] border-neutral-800 bg-neutral-800">
        <div className="flex flex-wrap justify-center gap-3 lg:grid lg:flex-nowrap">
          {blogReleatedItems.map((item) => (
            <BlogCardHorizontal
              key={uuid()}
              image={item.image_list}
              title={item.title}
              description={item.description}
              date_released={item.date_released}
              iconmotion={iconmotion}
              arrowMotion={arrowMotion}
              imgMotion={imgMotion}
              blog_id={item._id}
              tags={item.tags}
            />
          ))}
        </div>
      </div>
      <div className="flex h-auto min-h-[80px] w-full items-center p-14">
        <div className="mx-auto h-auto w-full">
          {blogReleatedTitle && (
            <Typography className="my-2 text-sm uppercase text-white-default xl:my-0">
              {t(`${blogReleatedTitle}`)}
            </Typography>
          )}
          <div className="my-4 flex min-h-[35px] w-full flex-wrap gap-2">
            {blogReleatedTag.map((popularItem) => (
              <Chip
                key={uuid()}
                label={t(popularItem.name)}
                variant="filled"
                color="success"
                size="small"
                className="!bg-neutral-500 uppercase"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogReleated
