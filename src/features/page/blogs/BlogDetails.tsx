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
  const { getBlogDetails } = useGetBlogDetails("633d591c536eb346ab32942a")
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
            <p className="w-8/12 font-neue-machina-bold text-5xl text-neutral-400">
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
              <div className="h-32 w-4/12 border-t-2 border-l-2 border-neutral-700 ">
                <div className="px-6 pt-4 font-neue-machina text-base text-white-default">
                  TAGS
                </div>
                <div className="px-6 pt-4 pb-2">
                  {getBlogTagData &&
                    getBlogTagData.data.map((item) => (
                      <div key={uuid()}>
                        {item.tags.map((tags) => (
                          <span
                            className=" mr-2 rounded-lg bg-neutral-600 py-2 px-4 text-sm  text-neutral-900"
                            key={uuid()}
                          >
                            {tags.name}
                          </span>
                        ))}
                      </div>
                    ))}
                </div>
              </div>
              <div className=" max-h-32 w-2/12  border-t-2 border-neutral-700">
                <div className="px-6 pt-4 font-neue-machina text-base text-white-default">
                  WRITER
                </div>
                <div className="px-6 pt-4 pb-2">
                  <div className="text-neutral-500">NAKAMOTO TEAM</div>
                </div>
              </div>
              <div className=" max-h-32 w-2/12 border-t-2 border-neutral-700">
                <div className=" px-6 pt-4 font-neue-machina text-base text-white-default">
                  DATE
                </div>
                <div className="border-l-2 border-neutral-700 px-6 pt-4 pb-2">
                  <span className="text-neutral-500">
                    {dayjs(getBlogDetails.data?.date_released).format(
                      "DD MMM YYYY"
                    )}
                  </span>
                </div>
              </div>
              <div className="content-relate max-h-32 w-4/12 bg-neutral-700">
                <div className="px-6 pt-12 text-center font-neue-machina text-base uppercase text-white-default">
                  Relate Blog
                </div>
              </div>
            </div>
            <div className="flex">
              <div className="h-auto w-8/12 bg-neutral-700 ">
                <div className="my-16 mx-32 h-auto justify-center">
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
                <div className="my-4 mx-32 text-left  font-neue-machina text-base text-grey-neutral04">
                  {getBlogDetails.data?.description}
                </div>
                <div
                  className="content-blog my-16 mx-32 text-left  font-neue-machina text-base text-grey-neutral04"
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{
                    __html: getBlogDetails.data?.content || ""
                  }}
                />
                <div className="flex h-auto border-2 border-neutral-700 bg-primary-main ">
                  <div className="mx-14 my-8 flex gap-3">
                    <ViewIcon />
                    <div className="mt-1 text-sm">
                      {getBlogDetails.data?.info.view}
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-auto w-4/12 border-r-2 border-b-2  border-neutral-700 bg-primary-main">
                <div className="static mx-24 my-16 space-y-4">
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
                    />
                  ))}
                </div>
                <div className=" border-t-2 border-neutral-700">
                  <div className="mx-32 my-16 justify-center uppercase text-white-default ">
                    Popular Tags
                  </div>
                  <div className="mx-16 my-4 grid w-max grid-cols-4 gap-2">
                    {getPopularTagsData?.data.map((popularItem) => (
                      <span
                        className=" rounded-lg bg-neutral-600 py-2 px-4  text-sm text-neutral-900"
                        key={uuid()}
                      >
                        {popularItem.name}
                      </span>
                    ))}
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
