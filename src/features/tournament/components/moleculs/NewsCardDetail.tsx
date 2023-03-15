import { Grid, Typography } from "@mui/material"
import { Image } from "@components/atoms/image"
import React from "react"
import ButtonLink from "@components/atoms/button/ButtonLink"
import AddIcon from "@mui/icons-material/Add"

export interface INewsCardDetail {
  title: string
  description: string
  image: string
  path: string
}

const NewsCardDetail = ({
  title,
  description,
  image,
  path
}: INewsCardDetail) => (
  <Grid
    container
    spacing={2}
  >
    <Grid
      item
      xs={12}
      md={6}
    >
      <div className="flex flex-col gap-6 p-4">
        <Typography className="font-neue-machina-bold !text-default uppercase text-neutral-300">
          {title}
        </Typography>
        <Typography className="!text-sm text-neutral-500">
          {description}
        </Typography>
        <ButtonLink
          href={path}
          text="Read More"
          icon={<AddIcon className="text-neutral-300" />}
          size="small"
          variant="outlined"
          className="!bg-neutral-800 !text-sm text-neutral-200"
        />
      </div>
    </Grid>
    <Grid
      item
      xs={12}
      md={6}
      className="hidden lg:block"
    >
      <div className="relative p-4">
        <Image
          src={image}
          width={280}
          height={280}
          alt="news image"
          className="m-auto"
        />
      </div>
    </Grid>
  </Grid>
)

export default NewsCardDetail
