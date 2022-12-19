import React, { useState } from "react"
import ButtonToggleIcon from "@components/molecules/gameSlide/ButtonToggleIcon"
import { motion } from "framer-motion"
// import Image from "next/image"
import { Image } from "@components/atoms/image/index"
import { IMAGES } from "@constants/images"
import MarketPlace from "public/assets/icons/marketplace.svg"
import ButtonLink from "@components/atoms/button/ButtonLink"
import IShoppingCart from "@components/icons/ShoppingCart"

const Card = () => (
  <>
    <div className="test-card">
      <div className="courses-container">
        <div className="course">
          <div className="course-preview">
            <h6 className="leading-7leading-7 text-[22px] font-bold uppercase text-neutral-300">
              MARKET PLACE
            </h6>
            <h2 className="w-[16rem]">
              The Crypto Economy Marketplace, Your Entrance Gate to web3
            </h2>
            <a href="#">
              <ButtonLink
                href="/"
                text="Marketplace"
                icon={<IShoppingCart />}
                size="medium"
                color="secondary"
                variant="contained"
              />
            </a>
          </div>
          <div className="relative w-full">
            <Image
              src={IMAGES.marketPlace.src}
              alt="market"
              className="h-full w-full"
            />
          </div>
        </div>
      </div>
    </div>
  </>
)

export default Card
