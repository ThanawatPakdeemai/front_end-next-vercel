import React from "react"
import { Tag } from "@feature/blog/interfaces/IBlogTagsService"
import { v4 as uuid } from "uuid"
import { Chip } from "@mui/material"
import { useTranslation } from "react-i18next"

export interface IMetaTags {
  tags: Tag[]
  titleTag?: string
}

const MetaTags = ({ tags, titleTag = "Tags" }: IMetaTags) => {
  const { t } = useTranslation()
  return (
    <div className="tags-wrapper flex h-full w-full flex-col justify-center gap-2">
      {titleTag && (
        <div className="flex items-center font-neue-machina text-sm uppercase text-white-default">
          {t(`${titleTag}`)}
        </div>
      )}
      <div className="">
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
}

export default MetaTags
