import { IMAGES } from "@constants/images"
import { memo } from "react"
import { Image } from "@components/atoms/image"
import { Box } from "@mui/material"

const LogoNaka = () => (
  <Box className="group hover:ease-linear">
    <Image
      src={IMAGES.nakaBand.src}
      width={IMAGES.nakaBand.width}
      height={IMAGES.nakaBand.height}
      alt={IMAGES.nakaBand.alt}
      className="logo-band transition hover:ease-linear group-hover:hidden"
    />
    <Image
      src={IMAGES.nakaBannerHover.src}
      width={IMAGES.nakaBannerHover.width}
      height={IMAGES.nakaBannerHover.height}
      alt={IMAGES.nakaBannerHover.alt}
      className="logo-band-hover hidden animate-expand-right duration-75 ease-linear group-hover:block"
    />
  </Box>
)
export default memo(LogoNaka)
