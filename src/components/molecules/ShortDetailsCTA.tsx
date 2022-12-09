import ButtonLink from "@components/atoms/button/ButtonLink"
import DownloadIcon from "@components/icons/DownloadIcon"
import { CardContent, Typography } from "@mui/material"
import React from "react"

export interface IShortDetailsCTA {
  description: string
  link: string
  linkIcon?: React.ReactNode
  startIcon?: React.ReactNode
  className?: string
}

const ShortDetailsCTA = ({
  description,
  link,
  linkIcon,
  startIcon,
  className
}: IShortDetailsCTA) => (
  <CardContent
    className={`carousel-slide__item__content absolute bottom-0 left-0 z-[1] w-full ${className}`}
  >
    <div className="flex w-full items-center justify-between gap-4 rounded-xl bg-grey-A100 py-4 px-6">
      <div className="flex items-center">
        {startIcon && (startIcon as React.ReactElement)}
        <Typography
          className="mb-0 text-white-primary line-clamp-1"
          variant="body1"
          dangerouslySetInnerHTML={{
            __html: description
          }}
        />
      </div>
      <ButtonLink
        href={link}
        text="Download"
        className="carousel-slide__item__content__link !min-w-0 p-0 font-neue-machina"
        icon={linkIcon || <DownloadIcon />}
      />
    </div>
  </CardContent>
)

export default ShortDetailsCTA
