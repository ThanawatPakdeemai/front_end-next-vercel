import React from "react"
import { IMAGES } from "@constants/images"
import ButtonLink from "@components/atoms/button/ButtonLink"
import { Box, Card, CardMedia } from "@mui/material"
import IShoppingCart from "@components/icons/ShoppingCart"
import CONFIGS from "@configs/index"

interface ICardMarketplace {
  title?: string
  bgImage?: string
  href?: string
  description?: string
  width?: string | number
  height?: string | number
}

const CardMarketplace = ({
  width = 678,
  height = 238,
  title = "MARKETPLACE",
  bgImage = IMAGES.marketPlace.src,
  href = "/",
  description = "Nakamoto Games Marketplace. Your Gateway to the Web3 Economy. "
}: ICardMarketplace) => (
  <>
    <Card
      sx={{ width: { width } }}
      className="relative flex w-full border border-solid border-neutral-700 bg-primary-main md:w-auto"
    >
      <Box
        sx={{
          "button": {
            maxHeight: "40px"
          }
        }}
        className="flex w-[50%] flex-col items-start justify-between p-4 md:absolute md:py-10 md:pr-6 md:pl-10 xl:w-full"
      >
        <h6 className="leading-7leading-7 text-[22px] font-bold uppercase text-neutral-300">
          {title}
        </h6>
        <h2 className="text-extend-fontSize-sm mx-0 my-5 w-[16rem] text-sm leading-[1.125rem] tracking-[1px] text-neutral-300 lg:w-full xl:w-[16rem]">
          {description}
        </h2>
        <ButtonLink
          className="flex items-center "
          href={CONFIGS.BASE_URL.MARKETPLACE}
          // eslint-disable-next-line no-return-assign
          onClick={() => (window.location.href = href)}
          text="Marketplace"
          icon={<IShoppingCart />}
          size="medium"
          color="secondary"
          variant="contained"
        />
      </Box>
      <div className="hidden flex-auto overflow-hidden sm:block md:pl-[46%]">
        <CardMedia
          sx={{ height: { height } }}
          image={bgImage}
          title="green iguana"
        />
      </div>
    </Card>
  </>
)

export default CardMarketplace
