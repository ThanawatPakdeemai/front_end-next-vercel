import React from "react"
import dynamic from "next/dynamic"
import Box from "@mui/material/Box"
import { ISocialShareProps } from "./SocialShare"

const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: false
})
const ThumbUpRoundedIcon = dynamic(
  () => import("@mui/icons-material/ThumbUpRounded"),
  {
    suspense: true,
    ssr: false
  }
)
const SocialShare = dynamic(() => import("./SocialShare"), {
  suspense: true,
  ssr: false
})
const ViewCount = dynamic(() => import("../molecoles/ViewCount"), {
  suspense: true,
  ssr: false
})

export interface IBlogFooterProps extends ISocialShareProps {
  view?: number
  shared?: number
  like?: number
}

const BlogFooter = ({ view, shared, like, ...props }: IBlogFooterProps) => (
  <Box
    component="div"
    sx={{
      "&::before": {
        content: "''",
        position: "absolute",
        width: "100%",
        height: "81px",
        left: "-100%",
        borderTop: "1px solid #101013",
        borderBottom: "1px solid #18181C",
        "@media (max-width: 1023px)": {
          display: "none"
        }
      }
    }}
    className="relative flex h-[80px] w-full flex-col items-center border-b-[1px] border-neutral-800 bg-primary-main px-12 md:flex-row"
  >
    <div className="count-wrapper flex flex-1 gap-3">
      <ViewCount
        icon={<Icomoon className="icon-Eye-Open" />}
        count={view || 0}
      />
      {shared ? (
        <ViewCount
          icon={<Icomoon className="icon-Share" />}
          count={shared || 0}
        />
      ) : null}

      {like ? (
        <ViewCount
          icon={<ThumbUpRoundedIcon />}
          count={like || 0}
        />
      ) : null}
    </div>

    <div className="flex-1">
      <SocialShare
        shareTitle={props.shareTitle}
        shareURL={props.shareURL}
      />
    </div>
  </Box>
)

export default BlogFooter
