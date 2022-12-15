import { CATEGORIES } from "@constants/categories"
import { Image } from "@components/atoms/image/index"
import { Grid } from "@mui/material"
import React from "react"
import { motion } from "framer-motion"
import ImageCustom from "@components/atoms/image/Image"
import ButtonToggleIcon from "./gameSlide/ButtonToggleIcon"

const BodyCategories = () => {
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
    <div className="mt-10 mb-10 w-[calc(100%)]">
      <Grid
        container
        spacing={2}
        columns={15}
      >
        {CATEGORIES.map((item) => (
          <Grid
            key={item.text}
            item
            xs={3}
          >
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
                <ImageCustom
                  src={item.img}
                  alt="home-slide"
                  width={264}
                  height={324}
                  className="rounded-md group-hover:h-[250px]"
                />
                <motion.div
                  variants={btnCard}
                  className="absolute bottom-0 flex w-full max-w-[260px]  rounded-[25px] border-[1px] border-solid border-neutral-700  text-white-primary"
                >
                  <ButtonToggleIcon
                    startIcon={
                      <Image
                        src={item.icon}
                        width={18}
                        height={18}
                        alt={item.text}
                      />
                    }
                    text={item.text}
                    handleClick={onHandleClick}
                    className="btn-rainbow-theme z-[2] h-12 w-full bg-primary-main capitalize "
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}
export default BodyCategories
