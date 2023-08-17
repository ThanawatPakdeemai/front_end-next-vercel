import React from "react"
import { Box } from "@mui/material"
import { useTranslation } from "react-i18next"
import dynamic from "next/dynamic"
import CONFIGS from "@configs/index"
import { IMAGES } from "@constants/images"

const ButtonLink = dynamic(
  () => import("@components/atoms/button/ButtonLink"),
  {
    suspense: true,
    ssr: false
  }
)
const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: false
})
const ImageCustom = dynamic(() => import("@components/atoms/image/Image"), {
  suspense: true,
  ssr: false
})

interface ICardMarketplace {
  title?: string
  href?: string
  description?: string
}

const CardMarketplace = ({
  title = "MARKETPLACE",
  href = "/",
  description = "market_des_card"
}: ICardMarketplace) => {
  const { t } = useTranslation()

  return (
    <div className="relative flex w-full flex-1 overflow-hidden rounded-md border border-solid border-neutral-700 bg-neutral-900 md:w-auto">
      <Box
        component="div"
        sx={{
          "button": {
            maxHeight: "40px"
          }
        }}
        className="flex h-full w-[50%] flex-col items-start justify-between p-4 md:absolute md:py-10 md:pl-10 md:pr-6 xl:w-full"
      >
        <h6 className="text-[22px] font-bold uppercase leading-7 text-neutral-300">
          {t(title.toLowerCase())}
        </h6>
        <h2 className="font m-0 w-[16rem] text-sm text-neutral-500 lg:w-full xl:w-[16rem]">
          {t(description)}
        </h2>
        <ButtonLink
          className="flex items-center"
          href={CONFIGS.BASE_URL.MARKETPLACE}
          // eslint-disable-next-line no-return-assign
          onClick={() => (window.location.href = href)}
          text={t("marketplace")}
          icon={<Icomoon className="icon-Shopping-Cart-01" />}
          size="medium"
          color="secondary"
          variant="contained"
        />
      </Box>
      <div className="hidden flex-auto overflow-hidden sm:block md:pl-[46%]">
        <ImageCustom
          className="h-full w-full object-cover object-center"
          src={IMAGES.marketPlace.src}
          alt="green iguana"
          width={IMAGES.marketPlace.width || 393}
          height={IMAGES.marketPlace.height || 238}
          srcWebp={IMAGES.marketPlace.srcWebp}
        />
      </div>
    </div>
  )
}

export default CardMarketplace
