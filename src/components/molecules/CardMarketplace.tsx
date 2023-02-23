import React from "react"
import { IMAGES } from "@constants/images"
import ButtonLink from "@components/atoms/button/ButtonLink"
import { Box, Card, CardMedia } from "@mui/material"
import IShoppingCart from "@components/icons/ShoppingCart"

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
  title = "MARKET PLACE",
  bgImage = IMAGES.marketPlace.src,
  href = "/",
  description = "The Crypto Economy Marketplace, Your Entrance Gate to web3"
}: ICardMarketplace) => (
  <>
    <Card sx={{ width: { width } }}>
      <Box
        sx={{
          "button": {
            maxHeight: "40px"
          }
        }}
        className="absolute flex flex-col items-start justify-between py-10 pr-6 pl-10"
      >
        <h6 className="leading-7leading-7 text-[22px] font-bold uppercase text-neutral-300">
          {title}
        </h6>
        <h2 className="text-extend-fontSize-sm mx-0 my-5 w-[16rem] text-sm leading-[1.125rem] tracking-[1px] text-neutral-300">
          {description}
        </h2>
        <ButtonLink
          href={href}
          text="Marketplace"
          icon={<IShoppingCart />}
          size="medium"
          color="secondary"
          variant="contained"
        />
      </Box>
      <div className="overflow-hidden pl-[50%]">
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
