import LogoIcon from "@components/icons/LogoIcon"
import { Divider } from "@mui/material"
import Image from "next/image"
import React from "react"
import { motion } from "framer-motion"

const expandMotion = {
  rest: {
    x: 0,
    transition: {
      duration: 2,
      type: "spring",
      stiffness: 300
    }
  },
  hover: {
    width: "55px",
    color: "#000",
    transition: {
      duration: 0.8,
      stiffness: 300,
      type: "spring"
    }
  }
}

const CardRank = () => (
  <>
    <div className="p-4">
      <motion.div
        initial="rest"
        whileHover="hover"
        animate="rest"
        className="flex pb-2"
      >
        <motion.div
          variants={expandMotion}
          className="h-[40px] w-[70px]"
        >
          <motion.div
            variants={expandMotion}
            transition={{ type: "spring", stiffness: 400, damping: 5 }}
            className="flex h-[35px]  w-[35px]  items-center justify-center rounded-lg bg-error-main	text-primary-main"
          >
            1
          </motion.div>
        </motion.div>
        <div className="flex w-full">
          <div className="w-4/5 self-center">
            <div className="flex items-center">
              <Image
                className="rounded-lg"
                src="/images/home/table-com.svg"
                alt="profile"
                width={35}
                height={35}
              />
              <h1 className="text-[12px]">Birgit Smith</h1>
            </div>
          </div>
          <div className="w-3/5 self-center pl-4 text-[12px]">40.34%</div>
          <div className="w-3/6 self-center">
            <div className="flex items-center">
              <LogoIcon
                fill="#232329"
                className="mr-2"
              />
              {/* <Image
                className="rounded-lg"
                src="/images/home/table-com.svg"
                alt="profile"
                width={35}
                height={35}
              /> */}
              <h1 className="text-[12px] text-info-main">120,000</h1>
            </div>
          </div>
        </div>
      </motion.div>
      <Divider />
    </div>
  </>
)

export default CardRank
