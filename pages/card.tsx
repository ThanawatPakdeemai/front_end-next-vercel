import React, { useState } from "react"
import CardHoverLink from "@components/molecules/CardHoverLink"
import ButtonToggleIcon from "@components/molecules/gameSlide/ButtonToggleIcon"
import { motion } from "framer-motion"
import Image from "next/image"
import { IMAGES } from "@constants/images"

const Card = () => {
  const [cooldown, setCooldown] = useState<boolean>(false)

  const onHandleClick = () => {}

  const cardImg = {
    init: {
      scale: 1
    },
    onHover: {
      scale: [1, 0.94, 0.96, 0.94],
      transition: {
        duration: 0.4
      }
    }
  }

  const btnCard = {
    init: {
      y: -8,
      opacity: 1
    },
    onHover: {
      y: -8,
      opacity: 1,
      transition: {
        duration: 0.1,
        type: "spring",
        stiffness: 600
      }
    }
  }
  return (
    <>
      <CardHoverLink />
      <motion.div
        className="slick-card-container"
        initial="init"
        whileHover="onHover"
        animate="animate"
      >
        <motion.div
          className="group relative flex h-[324px] w-full "
          variants={cardImg}
        >
          <Image
            src="https://res.cloudinary.com/colateam/image/upload/v1589426372/material/finishes_white__drv9fwq9vzwy_small_2x.png"
            width={18}
            height={18}
            alt="item.text"
          />
          <motion.div
            variants={btnCard}
            className="absolute bottom-0 flex w-full max-w-[260px]  rounded-[25px] border-[1px] border-solid border-neutral-700  text-white-primary"
          >
            <ButtonToggleIcon
              startIcon={
                <Image
                  src="https://res.cloudinary.com/colateam/image/upload/v1589426372/material/finishes_white__drv9fwq9vzwy_small_2x.png"
                  width={18}
                  height={18}
                  alt="item.text"
                />
              }
              text="item.text"
              handleClick={onHandleClick}
              className="btn-rainbow-theme z-[2] h-12 w-full bg-primary-main capitalize "
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  )
}

export default Card
