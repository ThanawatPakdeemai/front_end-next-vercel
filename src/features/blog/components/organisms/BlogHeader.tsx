import { Box } from "@mui/material"
import React from "react"
import MetaDate, { IMetaDate } from "../molecoles/MetaDate"
import MetaTags, { IMetaTags } from "../molecoles/MetaTags"
import MetaWriter, { IMetaWriter } from "../molecoles/MetaWriter"

interface IBlogHeaderProps extends IMetaTags, IMetaWriter, IMetaDate {
  className?: string
}

const BlogHeader = ({ className, ...props }: IBlogHeaderProps) => (
  <div className={`flex w-full max-w-[678px] lg:h-[100px] ${className || ""}`}>
    <div className="flex flex-1 items-center">
      <MetaTags tags={props.tags} />
    </div>
    <div className="flex flex-1 items-center">
      <MetaWriter writerName={props.writerName} />
    </div>
    <Box
      className="relative flex flex-1 items-center justify-end"
      sx={{
        "&::before": {
          content: "''",
          position: "absolute",
          width: "1px",
          height: "50px",
          left: "0",
          backgroundColor: "#101013",
          "@media (max-width: 1023px)": {
            display: "none"
          }
        }
      }}
    >
      <MetaDate date={props.date} />
    </Box>
  </div>
)

export default BlogHeader
