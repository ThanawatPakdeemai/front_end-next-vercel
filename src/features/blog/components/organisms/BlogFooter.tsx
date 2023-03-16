import React from "react"
import ViewIcon from "@components/icons/BlogIcon/ViewIcon"
import ShareIcon from "@mui/icons-material/Share"
import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded"
import { Box } from "@mui/material"
import SocialShare, { ISocialShareProps } from "./SocialShare"
import ViewCount from "../molecoles/ViewCount"

export interface IBlogFooterProps extends ISocialShareProps {
  view?: number
  shared?: number
  like?: number
}

const BlogFooter = ({ view, shared, like, ...props }: IBlogFooterProps) => (
  <Box
    sx={{
      "&::before": {
        content: "''",
        position: "absolute",
        width: "100%",
        height: "80px",
        left: "-100%",
        borderTop: "1px solid #101013",
        borderBottom: "1px solid #101013",
        "@media (max-width: 1023px)": {
          display: "none"
        }
      }
    }}
    className="relative flex h-[80px] w-full items-center border-b-[1px] border-t-[1px] border-neutral-780 bg-primary-main px-12"
  >
    <div className="count-wrappe flex-1">
      {view && (
        <ViewCount
          icon={<ViewIcon />}
          count={view || 0}
        />
      )}

      {shared && (
        <ViewCount
          icon={<ShareIcon />}
          count={shared || 0}
        />
      )}
      {like && (
        <ViewCount
          icon={<ThumbUpRoundedIcon />}
          count={like || 0}
        />
      )}
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
