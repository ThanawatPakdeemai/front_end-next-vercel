import React from "react"
import { motion } from "framer-motion"
import { Grid } from "@mui/material"
import { Image } from "@components/atoms/image/index"
import ButtonToggleIcon from "../gameSlide/ButtonToggleIcon"

export interface ICategoryCard {
  img: string
  text: string
  icon?: string
  onHandleClick?: (_link?: string) => void
}

const CategoryCard = ({ img, text, icon, onHandleClick }: ICategoryCard) => {
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
    <Grid
      item
      xs={3}
    >
      <motion.div
        className="slick-card-container-cate px-1"
        initial="init"
        whileHover="onHover"
        animate="animate"
      >
        <motion.div
          className="xs:h-[35vw] group relative flex h-[180px] w-full md:h-[324px]"
          variants={cardImg}
        >
          <Image
            src={img}
            alt="home-slide"
            width={264}
            height={324}
            className="rounded-md object-cover group-hover:h-[250px]"
          />
          <motion.div
            variants={btnCard}
            className="absolute bottom-0 flex w-full rounded-[25px]  border-[1px] border-solid border-neutral-700 text-white-primary  md:max-w-[260px]"
          >
            <ButtonToggleIcon
              startIcon={
                icon ? (
                  <Image
                    src={icon}
                    width={18}
                    height={18}
                    alt={text}
                  />
                ) : null
              }
              type="button"
              text={text}
              handleClick={onHandleClick}
              className="z-[2] h-[50px] w-full bg-primary-main capitalize "
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </Grid>
  )
}
export default CategoryCard
