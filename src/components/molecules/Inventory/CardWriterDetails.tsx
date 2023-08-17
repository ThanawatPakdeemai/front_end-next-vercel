import { Chip, Typography } from "@mui/material"
import dayjs from "dayjs"
import React from "react"
import dynamic from "next/dynamic"
import Helper from "@utils/helper"

const CopyButton = dynamic(() => import("@components/atoms/CopyButton"), {
  suspense: true,
  ssr: false
})
const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: false
})
const Image = dynamic(() => import("@components/atoms/image/Image"), {
  suspense: true,
  ssr: true
})

interface IProp {
  textHead?: string
  name?: string
  link?: string
  date?: string
  image?: string
  alt?: string
}

const CardWriterDetails = ({
  name,
  link,
  date,
  image,
  textHead,
  alt
}: IProp) => (
  <div>
    {textHead && (
      <Typography className="text-sm uppercase text-black-default">
        {textHead}
      </Typography>
    )}
    <div className="my-2 flex">
      <div
        className={`image grid h-[45px] w-[45px] content-center justify-center rounded bg-error-main ${
          image ? " bg-neutral-800" : "bg-error-main"
        }`}
      >
        {image ? (
          <Image
            src={image}
            alt={alt as string}
            width={450}
            height={450}
          />
        ) : (
          <Icomoon className="icon-Naka text-white-default" />
        )}
      </div>
      <div className="ml-2 grid content-between">
        <Typography className="text-xs uppercase text-white-primary">
          {name}
        </Typography>
        {link && (
          <div className="flex">
            <Chip
              label={Helper.textWithDots(link, 6)}
              variant="outlined"
              size="small"
              className="max-w-[129px] cursor-pointer uppercase"
            />
            <CopyButton text={link} />
          </div>
        )}
      </div>
    </div>
    {date && (
      <Typography className="text-sm uppercase text-neutral-600">
        {dayjs(date).format("DD MMM YYYY")}
      </Typography>
    )}
  </div>
)

export default CardWriterDetails
