import React from "react"
import { Image } from "@components/atoms/image"
import { Box } from "@mui/material"

interface IProp {
  src: string
  alt: string
}
const BannerSingle = ({ src, alt }: IProp) => (
  <Box
    component="div"
    className="relative mb-3 flex h-[60px] flex-row items-center overflow-hidden rounded-sm border-[1px] border-neutral-800 bg-primary-main uppercase sm:h-[180px] sm:rounded-[24px]"
    sx={{
      "picture": {
        width: "100%",
        height: "100%"
      }
    }}
  >
    <Image
      src={src}
      alt={alt}
      width={1368}
      height={180}
      className="h-full w-full rounded-sm object-cover object-center sm:rounded-[24px]"
    />
  </Box>
)
export default BannerSingle
