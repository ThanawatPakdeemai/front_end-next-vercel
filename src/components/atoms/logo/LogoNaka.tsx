import { IMAGES } from "@constants/images"
import { memo } from "react"
import { Image } from "@components/atoms/image"
import { Box } from "@mui/material"
import useGlobal from "@hooks/useGlobal"

const LogoNaka = () => {
  const { isMarketplace } = useGlobal()
  return (
    <Box className="group hover:ease-linear">
      {isMarketplace ? (
        <>
          <Image
            src={IMAGES.nakaMarketplaceLogo.src}
            width={IMAGES.nakaMarketplaceLogo.width}
            height={IMAGES.nakaMarketplaceLogo.height}
            alt={IMAGES.nakaMarketplaceLogo.alt}
            className="logo-band transition duration-75 ease-linear hover:ease-linear group-hover:hidden"
          />
          <Image
            src={IMAGES.nakaMarketplaceLogoHover.src}
            width={IMAGES.nakaMarketplaceLogoHover.width}
            height={IMAGES.nakaMarketplaceLogoHover.height}
            alt={IMAGES.nakaMarketplaceLogoHover.alt}
            className="logo-band-hover hidden animate-expand-right transition duration-75 ease-linear group-hover:block"
          />
        </>
      ) : (
        <>
          <Image
            src={IMAGES.nakaBand.src}
            width={IMAGES.nakaBand.width}
            height={IMAGES.nakaBand.height}
            alt={IMAGES.nakaBand.alt}
            className="logo-band transition duration-75 ease-linear hover:ease-linear group-hover:hidden"
          />
          <Image
            src={IMAGES.nakaBannerHover.src}
            width={IMAGES.nakaBannerHover.width}
            height={IMAGES.nakaBannerHover.height}
            alt={IMAGES.nakaBannerHover.alt}
            className="logo-band-hover hidden animate-expand-right transition duration-75 ease-linear group-hover:block"
          />
        </>
      )}
    </Box>
  )
}

export default memo(LogoNaka)
