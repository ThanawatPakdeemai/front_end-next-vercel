import useGetBlogDetails from "@feature/blog/containers/hook/useGetBlogDetails"
import React, { useEffect } from "react"
import Sticker from "@components/icons/BlogIcon/Sticker"

import Breadcrumb from "@components/molecules/Breadcrumb"
import { motion } from "framer-motion"
import useGetBlogTags from "@feature/blog/containers/hook/useGetBlogTags"
import useGetPopularTags from "@feature/blog/containers/hook/useGetPopularTags"
import useLoadingStore from "@stores/loading"
import BlogHeader from "@feature/blog/components/organisms/BlogHeader"
import BlogContent from "@feature/blog/components/organisms/BlogContent"
import BlogFooter from "@feature/blog/components/organisms/BlogFooter"
import BlogReleated from "@feature/blog/components/organisms/BlogReleated"
import { Box } from "@mui/material"
import useCrumbStore from "@stores/crumb"
import { BLOG_CRUMB } from "@configs/crumb"

interface IProp {
  _blogId: string
}

const BlogPageDetails = ({ _blogId }: IProp) => {
  const { getBlogDetails, isLoading } = useGetBlogDetails(_blogId)
  const { setCrumbData } = useCrumbStore()
  const { setOpen, setClose } = useLoadingStore()
  const { getBlogTagData } = useGetBlogTags({
    limit: 10,
    skip: 1,
    sort: "_id",
    search: "",
    tags_id: "63e9efcf2c7a9542bb8a67dc"
  })
  const { getPopularTagsData } = useGetPopularTags()

  useEffect(() => {
    let load = false

    if (!load) {
      if (isLoading) {
        setOpen()
      } else {
        setClose()
      }
    }

    return () => {
      load = true
    }
  }, [isLoading, setOpen, setClose])

  useEffect(() => {
    let load = false
    if (!load) {
      if (getBlogDetails) {
        setCrumbData({
          title: getBlogDetails.title,
          _id: _blogId
        })
      }
    }
    return () => {
      load = true
    }
  }, [getBlogDetails, setCrumbData, _blogId])

  return (
    <>
      <Breadcrumb
        isCustom
        _breadcrumbs={BLOG_CRUMB() || ""}
      />
      <div className="flex h-48 items-center overflow-hidden">
        <p className="w-8/12 font-mondwest text-5xl text-neutral-400">
          {getBlogDetails?.title}
        </p>
        <div className="my-12 grid w-4/12 justify-items-end">
          <motion.div
            animate={{ rotate: [0, -45, -90, -135, -180] }}
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
      <div className="grid lg:flex">
        <Box
          sx={{
            "&::before": {
              content: "''",
              position: "absolute",
              width: "100%",
              height: "calc(100% - 181px)",
              left: "-100%",
              marginTop: "102px",
              backgroundColor: "#101013",
              "@media (max-width: 1023px)": {
                display: "none"
              }
            }
          }}
          className="relative flex h-auto w-full flex-col bg-neutral-780 lg:w-[calc(100%-512px)]"
        >
          <Box
            sx={{
              "&::before": {
                content: "''",
                position: "absolute",
                width: "100%",
                height: "102px",
                left: "-100%",
                borderTop: "1px solid #101013",
                borderBottom: "1px solid #101013",
                marginTop: "-1px",
                "@media (max-width: 1023px)": {
                  display: "none"
                }
              }
            }}
            className="border-b-[1px] border-t-[1px] border-neutral-780 bg-primary-main"
          >
            <div className="relative w-full">
              <BlogHeader
                tags={getBlogTagData?.tags || []}
                writerName="Nakamoto Team"
                date={getBlogTagData?.date_released || ""}
              />
            </div>
          </Box>
          <BlogContent
            image={getBlogDetails?.image_list}
            description={getBlogDetails?.description}
            content={getBlogDetails?.content}
          />
          <div className="mt-auto">
            <BlogFooter
              shareTitle={getBlogDetails?.title || ""}
              shareURL={getBlogDetails?.slug || ""}
              view={getBlogDetails?.info.view || 0}
              shared={getBlogDetails?.info.shared || 0}
              like={getBlogDetails?.info.like || 0}
            />
          </div>
        </Box>
        <BlogReleated
          blogReleatedItems={getBlogDetails?.related || []}
          blogReleatedTag={getPopularTagsData?.data || []}
        />
      </div>
    </>
  )
}
export default BlogPageDetails
