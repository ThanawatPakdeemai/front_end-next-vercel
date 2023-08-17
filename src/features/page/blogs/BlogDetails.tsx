import React, { useEffect } from "react"
import { motion } from "framer-motion"
import dynamic from "next/dynamic"
import Box from "@mui/material/Box"
import { BLOG_CRUMB } from "@configs/crumb"
import useBlogController from "@feature/blog/containers/hook/useBlogController"
import useCrumbStore from "@stores/crumb"

const IcomoonSticker = dynamic(
  () => import("@components/atoms/icomoon/IcomoonSticker"),
  {
    suspense: true,
    ssr: false
  }
)
const Breadcrumb = dynamic(() => import("@components/molecules/Breadcrumb"), {
  suspense: true,
  ssr: false
})
const BlogHeader = dynamic(
  () => import("@feature/blog/components/organisms/BlogHeader"),
  {
    suspense: true,
    ssr: false
  }
)
const BlogContent = dynamic(
  () => import("@feature/blog/components/organisms/BlogContent"),
  {
    suspense: true,
    ssr: false
  }
)
const BlogFooter = dynamic(
  () => import("@feature/blog/components/organisms/BlogFooter"),
  {
    suspense: true,
    ssr: false
  }
)
const BlogReleated = dynamic(
  () => import("@feature/blog/components/organisms/BlogReleated"),
  {
    suspense: true,
    ssr: false
  }
)
const SkeletonBlogDetail = dynamic(
  () => import("@components/atoms/skeleton/SkeletonBlogDetail"),
  {
    suspense: true,
    ssr: false
  }
)

interface IProp {
  _blogId: string
}

const BlogPageDetails = ({ _blogId }: IProp) => {
  const { blogDetailState, popularTagsState } = useBlogController(_blogId)
  const { setCrumbData } = useCrumbStore()

  useEffect(() => {
    let load = false
    if (!load) {
      if (blogDetailState) {
        setCrumbData({
          title: blogDetailState.title || "",
          _id: _blogId
        })
      }
    }
    return () => {
      load = true
    }
  }, [blogDetailState, _blogId, setCrumbData])

  return blogDetailState ? (
    <div className="blog-detail__wrapper mb-8 md:mb-16">
      <Breadcrumb
        isCustom
        _breadcrumbs={BLOG_CRUMB() || ""}
      />
      <div className="mx-5 flex h-full min-h-[100px] flex-col items-center justify-center md:h-48 md:flex-row md:overflow-hidden">
        <p className="w-full text-center font-mondwest text-3xl text-neutral-400 md:w-8/12 md:text-left md:text-6xl">
          {blogDetailState.title}
        </p>
        <div className="my-12 hidden w-4/12 justify-items-center md:grid lg:justify-items-end">
          <motion.div
            animate={{ rotate: [0, -45, -90, -135, -180] }}
            transition={{
              duration: 5,
              type: "spring",
              repeat: Infinity,
              bounce: 2
            }}
          >
            <IcomoonSticker className="icon-Circle-sphere-pink" />
          </motion.div>
        </div>
      </div>
      <div className="mx-5 grid grid-cols-1 lg:grid-cols-4 xl:flex">
        <Box
          component="div"
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
          className="relative col-span-3 flex h-auto w-full flex-col bg-neutral-780 lg:w-[95%] xl:w-[calc(100%-512px)]"
        >
          <Box
            component="div"
            sx={{
              "&::before": {
                content: "''",
                position: "absolute",
                width: "100%",
                height: "102px",
                left: "-100%",
                borderTop: "1px solid #18181C",
                borderBottom: "1px solid #18181C",
                marginTop: "-1px",
                "@media (max-width: 1023px)": {
                  display: "none"
                }
              }
            }}
            className="border-b-[1px] border-t-[1px] border-neutral-800 bg-primary-main"
          >
            <div className="relative w-full">
              <BlogHeader
                writerName="Nakamoto Team"
                date={blogDetailState.date_released || ""}
                tags={blogDetailState.tags || []}
              />
            </div>
          </Box>
          <BlogContent
            image={blogDetailState.image_list}
            description={blogDetailState.description}
            content={blogDetailState.content}
          />
          <div className="mt-auto">
            <BlogFooter
              shareTitle={blogDetailState.title || ""}
              shareURL={blogDetailState.slug || ""}
              view={(blogDetailState.info && blogDetailState.info.view) || 0}
              // shared={blogDetailState.info.shared}
              // like={blogDetailState.info.like}
            />
          </div>
        </Box>
        <BlogReleated
          blogReleatedItems={blogDetailState.related || []}
          blogReleatedTag={popularTagsState || []}
        />
      </div>
    </div>
  ) : (
    <SkeletonBlogDetail />
  )
}
export default BlogPageDetails
