import React from "react"
import PropTypes from "prop-types"
import { Image } from "@components/atoms/image/index"
import { IMAGES } from "@constants/images"
import ButtonLink from "@components/atoms/button/ButtonLink"
import IShoppingCart from "@components/icons/ShoppingCart"

interface ICardMarketplace {
  title: string
  description: string
  src: string
  alt: string
}

const CardMarketplace = ({
  title,
  description,
  src,
  alt
}: ICardMarketplace) => (
  <>
    <div className="flex h-[238px] w-fit max-w-full overflow-hidden rounded-3xl border border-solid border-[#232329]">
      <div className="flex flex-col items-start justify-between py-10 pr-6 pl-10">
        <h6 className="leading-7leading-7 text-[22px] font-bold uppercase text-neutral-300">
          {title}
        </h6>
        <h2 className="text-extend-fontSize-sm mx-0 my-5 w-[16rem] text-sm leading-[1.125rem] tracking-[1px] text-neutral-500">
          {description}
        </h2>
        <ButtonLink
          href="/"
          text="Marketplace"
          icon={<IShoppingCart />}
          size="medium"
          color="secondary"
          variant="contained"
        />
      </div>
      <div className="relative w-full">
        <Image
          src={src}
          alt={alt}
          // eslint-disable-next-line prettier/prettier
          className="h-full w-full max-[480px]:hidden"
        />
      </div>
    </div>
  </>
)

CardMarketplace.defaultProps = {
  title: "MARKET PLACE",
  description: "The Crypto Economy Marketplace, Your Entrance Gate to web3",
  src: IMAGES.marketPlace.src,
  alt: IMAGES.marketPlace.alt
}

CardMarketplace.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  src: PropTypes.string,
  alt: PropTypes.string
}

export default CardMarketplace
