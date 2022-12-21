/* eslint-disable prettier/prettier */
import React from "react"
import PropTypes from "prop-types"
import { Image } from "@components/atoms/image/index"
import { IMAGES } from "@constants/images"
import ButtonLink from "@components/atoms/button/ButtonLink"
import IShoppingCart from "@components/icons/ShoppingCart"
import { Card, CardContent } from "@mui/material"

interface ICardNakaverse {
  title: string
  image: string
  href: string
  btnText: string
}

const CardNakaverse = ({ title, image, href, btnText }: ICardNakaverse) => (
  <>
    <Card
      variant="outlined"
      className="flex h-[218px] w-[678px] max-w-full overflow-hidden"
      sx={{ backgroundImage: `url(${image})`, backgroundColor: "none" }}
    >
      <CardContent className="py-[30px] pr-0 pl-[45px] max-[226px]:p-[30px]">
        <h6 className="m-0 py-[35px] px-0 font-neue-machina text-[22px] font-bold not-italic tracking-[1px] text-white-default">
          {title}
        </h6>
        <ButtonLink
          href={href}
          text={btnText}
          icon={<IShoppingCart />}
          size="medium"
          color="secondary"
          variant="contained"
        />
      </CardContent>
      <CardContent className="relative w-full">
        <div className="absolute left-[10%] top-[10.5%] h-[239.32px] w-[238.62px] max-[480px]:hidden max-[226px]:hidden">
          <Image
            src={IMAGES.nakaVerseMascot.src}
            alt={IMAGES.nakaVerseMascot.alt}
            className="h-full w-full"
          />
        </div>
        <div className="absolute right-[12%] top-[15%] max-[480px]:top-[20%] max-[480px]:w-[70%] max-[226px]:hidden">
          <Image
            src={IMAGES.worldNakaverse.src}
            alt={IMAGES.worldNakaverse.alt}
            className="rotate-world-nakaverse relative h-full w-full"
          />
        </div>
        <div className="absolute right-[10%] top-[13%] max-[480px]:top-[17%] max-[480px]:right-[6%] max-[480px]:w-[80%] max-[226px]:hidden">
          <Image
            src={IMAGES.ringNakaverse.src}
            alt={IMAGES.ringNakaverse.alt}
            className="h-full w-full"
          />
        </div>
      </CardContent>
    </Card>
  </>
)

CardNakaverse.defaultProps = {
  title: "NAKAVERSE",
  image: IMAGES.nakaVerse.src,
  href: "/",
  btnText: "Visit Now"
}

CardNakaverse.propTypes = {
  title: PropTypes.string,
  image: PropTypes.string,
  href: PropTypes.string,
  btnText: PropTypes.string
}

export default CardNakaverse
