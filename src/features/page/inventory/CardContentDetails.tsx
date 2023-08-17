import { Divider, Typography } from "@mui/material"
import React from "react"

import dynamic from "next/dynamic"

const Video = dynamic(() => import("@components/atoms/Video"), {
  suspense: true,
  ssr: true
})
const Image = dynamic(() => import("@components/atoms/image/Image"), {
  suspense: true,
  ssr: true
})

interface IProp {
  detail?: string
  image?: string
  children: React.ReactNode
  video?: string
  alt?: string
  poster?: string
}

const CardContentDetails = ({ ...props }: IProp) => {
  const { children, detail = "-", image, alt, video, poster } = props
  return (
    <div className="h-fit rounded-[24px] border-[1px] border-neutral-800 bg-neutral-780">
      <div className="p-2">
        <div className="grid h-fit w-full content-center justify-center rounded-[24px] border-[1px] border-neutral-800 bg-neutral-900 p-2">
          {image ? (
            <Image
              src={image as string}
              alt={alt as string}
              width={563}
              height={563}
              className="rounded-2xl"
            />
          ) : (
            <Video
              src={video as string}
              poster={poster as string}
              className="rounded-2xl"
            />
          )}
        </div>
      </div>
      {children}
      <Divider
        sx={{ width: "100%", marginBottom: "20px", marginTop: "20px" }}
      />
      <div className="px-8 py-6">
        <Typography className="text-sm uppercase text-black-default">
          details
        </Typography>
        <Typography className="text-sm uppercase text-neutral-600">
          {detail}
        </Typography>
      </div>
    </div>
  )
}

export default CardContentDetails
