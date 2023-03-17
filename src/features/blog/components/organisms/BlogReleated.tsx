import React from "react"
import { iconmotion } from "@components/organisms/Footer"
import BlogCard from "@components/molecules/cards/BlogCard"
import { v4 as uuid } from "uuid"
import { IBlogData } from "@feature/blog/interfaces/IBlogService"
import { Chip, Typography } from "@mui/material"
import { IPopularTags } from "@feature/blog/interfaces/IBlogPopularTags"

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
}: IBlogReleatedProps) => (
  <div className="relative flex w-full flex-col lg:w-[512px]">
    <div className="h-[100px] bg-neutral-780">
      <div className="px-6 py-12 text-center font-neue-machina text-sm uppercase text-white-default">
        Relate Blog
      </div>
    </div>
    <div className="border-[1px] border-neutral-780">
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
      <div className="flex h-[80px] items-center border-t-[1px] border-neutral-780">
        <div className="flex w-full flex-wrap justify-center">
          {blogReleatedTitle && (
            <Typography className="mx-2 flex items-center justify-center text-sm uppercase text-white-default">
              {blogReleatedTitle}
            </Typography>
          )}
          <div className="flex gap-2">
            {blogReleatedTag.map((popularItem) => (
              <Chip
                key={uuid()}
                label={popularItem.name}
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

export default BlogReleated
