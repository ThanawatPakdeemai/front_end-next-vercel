import { Grid, Typography } from "@mui/material"
import React from "react"
import AddIcon from "@mui/icons-material/Add"
import dynamic from "next/dynamic"

const ButtonLink = dynamic(
  () => import("@components/atoms/button/ButtonLink"),
  {
    suspense: true,
    ssr: true
  }
)
const Image = dynamic(() => import("@components/atoms/image/Image"), {
  suspense: true,
  ssr: true
})

export interface INewsCardDetail {
  title: string
  description: string
  image: string
  path: string
}

const CardTournamentNewsSlide = ({
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
      md={8.5}
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
          size="medium"
          className="h-[40px] !min-w-[108px] border border-solid border-neutral-700 text-sm hover:h-[45px]"
        />
      </div>
    </Grid>
    <Grid
      item
      xs={12}
      md={3.5}
      className="hidden lg:block"
    >
      <div className="relative pl-8 pt-4">
        <Image
          src={image}
          width={280}
          height={280}
          alt="news image"
          className="rounded-[14px]"
        />
      </div>
    </Grid>
  </Grid>
)

export default CardTournamentNewsSlide
