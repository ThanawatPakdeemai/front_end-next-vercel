import React from "react"
import { motion } from "framer-motion"
import CrumbCustom from "@components/atoms/CrumbCustom"
import ILogoMaster from "@components/icons/LogoMaster"
import { Chip, Typography } from "@mui/material"

const CardItemMarketPlace = () => {
  const text = 2.8
  const imgMotion = {
    visible: {
      scale: 0.5,
      transition: { delay: 2.8 }
    },
    rest: {
      color: "#98A0B5",
      x: 0,
      transition: {
        duration: 2,
        type: "spring",
        stiffness: 300
      }
    },
    hover: {
      scale: 1.2,
      rotate: 10,
      ease: "easeIn"
      // transition: {
      //   duration: 0.4,
      //   stiffness: 500,
      //   type: "spring"
      // }
    }
  }

  return (
    <motion.div
      whileHover="hover"
      className="group h-fit w-[218px] cursor-pointer rounded-2xl border border-neutral-700 bg-neutral-780 p-2 hover:bg-neutral-900"
    >
      <div className="relative">
        <div className="absolute m-[5px] flex">
          <CrumbCustom
            text="item name"
            background="bg-neutral-900 text-neutral-400 border border-solid border-neutral-700 p-[20px] mr-1"
          />
          <CrumbCustom
            text="item"
            background="bg-neutral-900 text-neutral-400 border border-solid border-neutral-700 p-[20px]"
          />
          {/* <Chip
          label={339}
          variant="outlined"
          size="small"
          className="cursor-pointer uppercase"
        /> */}
        </div>

        <div className="flex h-[202px] items-center justify-center rounded-lg border border-neutral-700 bg-neutral-900 p-6 group-hover:border-secondary-main">
          <motion.div
            transition={{ type: "spring", stiffness: 100, damping: 6 }}
            variants={imgMotion}
          >
            <ILogoMaster
              width="100"
              height="48"
            />
          </motion.div>
        </div>
      </div>
      <div className="mx-2 mt-[14px] flex items-center justify-between">
        <Typography className="text-sm uppercase text-white-default">
          naka Stone
        </Typography>
        <Chip
          label="Size XL"
          variant="filled"
          size="small"
          className="cursor-pointer uppercase"
          color="error"
        />
      </div>
      {/* <div className="" /> */}
      <div className="my-[10px] border-b border-neutral-700 border-opacity-80" />
      <div className="mx-2 flex items-center justify-between">
        <div className="flex items-center">
          <ILogoMaster
            width="24"
            height="11"
            color="#ffff"
          />
          <Typography className="ml-[11px] text-sm uppercase text-white-default">
            {text}
          </Typography>
        </div>
        <Chip
          label="= 0.8409 busd"
          variant="outlined"
          size="small"
          className="cursor-pointer uppercase"
        />
      </div>
    </motion.div>
  )
}

export default CardItemMarketPlace
