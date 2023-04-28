import React from "react"
import { IMAGES } from "@constants/images"
import ButtonLink from "@components/atoms/button/ButtonLink"
import { Box } from "@mui/material"
import IShoppingCart from "@components/icons/ShoppingCart"
import CONFIGS from "@configs/index"
import { useTranslation } from "react-i18next"
import { ImageCustom } from "@components/atoms/image/Image"

interface ICardMarketplace {
  title?: string
  bgImage?: string
  href?: string
  description?: string
  width?: string | number
  height?: string | number
}

const CardMarketplace = ({
  width = 1356,
  height = 476,
  title = "MARKETPLACE",
  bgImage = IMAGES.marketPlace.src,
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
          icon={<IShoppingCart />}
          size="medium"
          color="secondary"
          variant="contained"
        />
      </Box>
      <div className="hidden flex-auto overflow-hidden sm:block md:pl-[46%]">
        <ImageCustom
          className="h-full w-full object-cover object-center"
          src={bgImage}
          alt="green iguana"
          width={(width as number) || 1356}
          height={(height as number) || 476}
        />
      </div>
    </div>
  )
}

export default CardMarketplace
