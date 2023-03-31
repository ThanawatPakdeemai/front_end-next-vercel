import React from "react"
import { Tag } from "@feature/blog/interfaces/IBlogTagsService"
import { v4 as uuid } from "uuid"
import { Chip } from "@mui/material"

export interface IMetaTags {
  tags: Tag[]
  titleTag?: string
}

const MetaTags = ({ tags, titleTag = "Tags" }: IMetaTags) => (
  <div className="grid h-full w-full grid-rows-2 flex-wrap">
    {titleTag && (
      <div className="items-middle flex  px-6 pt-4 font-neue-machina text-sm uppercase text-white-default">
        {titleTag}
      </div>
    )}
    <div className="px-6 pt-4 pb-2">
      {tags &&
        tags.map((item) => (
          <Chip
            key={uuid()}
            label={item.name}
            variant="filled"
            color="success"
            size="small"
            className="mr-2 !bg-neutral-600 uppercase"
          />
        ))}
    </div>
  </div>
)

export default MetaTags
