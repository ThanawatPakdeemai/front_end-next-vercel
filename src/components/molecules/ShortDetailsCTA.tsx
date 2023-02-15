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
    className={`carousel-slide__item__content absolute left-0 bottom-4 z-[1] w-full ${className}`}
  >
    <div className="flex w-full items-center justify-between gap-4 rounded-xl bg-neutral-800 py-4 px-6">
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
        className="carousel-slide__item__content__link max-h-[24.5px] !min-w-0 p-0 font-neue-machina"
        icon={linkIcon || <DownloadIcon />}
      />
    </div>
  </CardContent>
)

export default ShortDetailsCTA
