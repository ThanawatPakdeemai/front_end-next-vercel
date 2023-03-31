import React from "react"
import { Tag } from "@feature/blog/interfaces/IBlogTagsService"
import { v4 as uuid } from "uuid"
import { Chip } from "@mui/material"

export interface IMetaTags {
  tags: Tag[]
  titleTag?: string
}

const MetaTags = ({ tags, titleTag = "Tags" }: IMetaTags) => (
  <div className="flex w-full flex-col flex-wrap">
    {titleTag && (
      <div className=" m-auto font-neue-machina text-sm uppercase text-white-default">
        {titleTag}
      </div>
    )}
    <div className="mt-4 gap-3">
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
