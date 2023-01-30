import { IMAGES } from "@constants/images"
import { memo } from "react"
import { Image } from "@components/atoms/image"
import { Box } from "@mui/material"

const LogoNaka = () => (
  <Box className="group ">
    <Image
      src={IMAGES.nakaBand.src}
      width={IMAGES.nakaBand.width}
      height={IMAGES.nakaBand.height}
      alt={IMAGES.nakaBand.alt}
      className="logo-band animate-right-to-left transition-transform duration-300 group-hover:hidden group-hover:ease-out"
    />
    <Image
      src={IMAGES.nakaBannerHover.src}
      width={IMAGES.nakaBannerHover.width}
      height={IMAGES.nakaBannerHover.height}
      alt={IMAGES.nakaBannerHover.alt}
      className="logo-band-hover hidden animate-right-to-left duration-75  group-hover:block"
    />
  </Box>
)
export default memo(LogoNaka)
