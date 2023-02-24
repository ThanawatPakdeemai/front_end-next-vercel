import useGetBlogDetails from "@feature/blog/containers/hook/useGetBlogDetails"
import React from "react"
import Sticker from "@components/icons/BlogIcon/Sticker"
import { iconmotion } from "@components/organisms/Footer"
import BlogCard from "@components/molecules/cards/BlogCard"
import { v4 as uuid } from "uuid"
import dayjs from "dayjs"
import ViewIcon from "@components/icons/BlogIcon/ViewIcon"
import Breadcrumb from "@components/molecules/Breadcrumb"
import Image from "next/image"
import { motion } from "framer-motion"
import useGetBlogTags from "@feature/blog/containers/hook/useGetBlogTags"
import useGetPopularTags from "@feature/blog/containers/hook/useGetPopularTags"
import { Chip, Typography } from "@mui/material"
import { SOCIAL_BLOG_SHARE } from "@configs/socialShare"
import ButtonIcon from "@components/atoms/button/ButtonIcon"

interface IProp {
  _blogId: string
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

const BlogPageDetails = ({ _blogId }: IProp) => {
  const { getBlogDetails } = useGetBlogDetails(_blogId)
  const { getBlogTagData } = useGetBlogTags({
    limit: 10,
    skip: 1,
    sort: "_id",
    search: "",
    tags_id: "63e9efcf2c7a9542bb8a67dc"
  })
  const { getPopularTagsData } = useGetPopularTags()

  return (
    <div>
      <div />
      {getBlogDetails && (
        <div>
          <Breadcrumb />
          <div className="mt-12 flex h-48">
            <p className="w-8/12 font-mondwest text-5xl text-neutral-400">
              {getBlogDetails.data?.title}
            </p>
            <div className="my-12 grid w-4/12 justify-items-end">
              <motion.div
                animate={{ rotate: [220, 135, 45] }}
                transition={{
                  duration: 5,
                  type: "spring",
                  repeat: Infinity,
                  bounce: 2
                }}
              >
                <Sticker />
              </motion.div>
            </div>
          </div>
          <div className="container mx-auto mt-1">
            <div className=" flex ">
              <div className="h-32 w-4/12 border-t-2 border-l-2 border-neutral-780 ">
                <div className="px-6 pt-4 font-neue-machina text-sm text-white-default">
                  TAGS
                </div>
                <div className="px-6 pt-4 pb-2">
                  {getBlogTagData &&
                    getBlogTagData.data.map((item) => (
                      <div key={uuid()}>
                        {item.tags.map((tags) => (
                          <Chip
                            key={uuid()}
                            label={tags.name}
                            variant="filled"
                            color="success"
                            size="small"
                            className="mr-2 !bg-neutral-600 uppercase"
                          />
                        ))}
                      </div>
                    ))}
                </div>
              </div>
              <div className=" max-h-32 w-2/12  border-t-2 border-neutral-780">
                <div className="px-6 pt-4 font-neue-machina text-sm text-white-default">
                  WRITER
                </div>
                <div className="px-6 pt-4 pb-2">
                  <div className="text-default text-neutral-500">
                    NAKAMOTO TEAM
                  </div>
                </div>
              </div>
              <div className=" max-h-32 w-2/12 border-t-2 border-neutral-780">
                <div className=" px-6 pt-4 font-neue-machina text-sm text-white-default">
                  DATE
                </div>
                <div className="border-l-2 border-neutral-780 px-6 pt-4 pb-2">
                  <span className="text-default text-neutral-500">
                    {dayjs(getBlogDetails.data?.date_released).format(
                      "DD MMM YYYY"
                    )}
                  </span>
                </div>
              </div>
              <div className="content-relate max-h-32 w-4/12 bg-neutral-780">
                <div className="px-6 pt-12 text-center font-neue-machina text-sm uppercase text-white-default">
                  Relate Blog
                </div>
              </div>
            </div>
            <div className="flex">
              <div className="relative h-auto w-8/12 bg-neutral-780 ">
                <div className="mx-32 mt-[100px]">
                  <div className="h-auto justify-center">
                    {getBlogDetails.data?.image_list && (
                      <Image
                        src={getBlogDetails.data?.image_list}
                        alt=""
                        width={678}
                        height={422}
                        className="rounded-2xl"
                      />
                    )}
                  </div>
                  <div className="my-[40px] text-left font-neue-machina text-default uppercase text-white-primary text-grey-neutral04">
                    {getBlogDetails.data?.description}
                  </div>
                  <div
                    className="content-blog text-left font-neue-machina text-default text-black-default text-grey-neutral04"
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{
                      __html: getBlogDetails.data?.content || ""
                    }}
                  />
                </div>
                <div className="absolute bottom-0 flex h-auto w-full border-2 border-neutral-780 bg-primary-main">
                  <div className="mx-32 flex grid h-[70px] w-full grid-cols-2 items-center gap-4">
                    <div className="flex items-center gap-3">
                      <ViewIcon />
                      <div className=" text-sm text-neutral-100">
                        {getBlogDetails.data?.info.view}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Typography className="font-neue-machina text-default text-neutral-100">
                        Shere :
                      </Typography>
                      <div className="flex text-sm">
                        {SOCIAL_BLOG_SHARE.map((icon) => (
                          <ButtonIcon
                            key={uuid()}
                            whileHover="hover"
                            transition={{
                              type: "spring",
                              stiffness: 400,
                              damping: 4
                            }}
                            icon={icon.icon}
                            className="flex h-[40px] w-[40px] items-center justify-center !fill-white-default"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-auto w-4/12 border-r-2 border-b-2  border-neutral-780 bg-primary-main">
                <div className="my-[78px] grid w-full justify-center">
                  {getBlogDetails.data?.related.map((item) => (
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
                      className="mt-6"
                    />
                  ))}
                </div>
                <div className=" border-t-2 border-neutral-780">
                  <div className="grid w-full justify-center">
                    <div className="my-[68px] w-[272px]">
                      <Typography className="mb-6 text-sm uppercase text-white-default">
                        Popular Tags
                      </Typography>
                      {getPopularTagsData?.data.map((popularItem) => (
                        <Chip
                          key={uuid()}
                          label={popularItem.name}
                          variant="filled"
                          color="success"
                          size="small"
                          className="mr-2 !bg-neutral-600 uppercase"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
export default BlogPageDetails
