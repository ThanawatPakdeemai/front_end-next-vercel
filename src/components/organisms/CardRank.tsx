import LogoIcon from "@components/icons/LogoIcon"
import { Divider } from "@mui/material"
import Image from "next/image"
import React from "react"
import { motion } from "framer-motion"
import { IPlayerRanking } from "@feature/ranking/interfaces/IRanking"
import Helper from "@utils/helper"
import NumberRank from "@feature/ranking/components/atoms/NumberRank"
import Nodata from "@components/molecules/Nodata"
import NodataIcon from "@components/icons/NodataIcon"

interface IProp {
  topPlayerGameId: IPlayerRanking[]
}

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
    marginRight: "14px",
    transition: {
      duration: 0.8,
      stiffness: 300,
      type: "spring"
    }
  }
}

const CardRank = ({ topPlayerGameId }: IProp) => (
  <div className="custom-scroll h-[375px] overflow-y-scroll">
    {topPlayerGameId ? (
      topPlayerGameId.map((data, index) => (
        <div
          className="p-4"
          key={data._id}
        >
          <motion.div
            initial="rest"
            whileHover="hover"
            animate="rest"
            className="flex pb-2"
          >
            <motion.div
              variants={expandMotion}
              transition={{ type: "spring", stiffness: 400, damping: 5 }}
            >
              <motion.div
                variants={expandMotion}
                transition={{ type: "spring", stiffness: 400, damping: 5 }}
              >
                <NumberRank
                  className="m-0 p-2 px-[16px]"
                  index={index}
                />
              </motion.div>
            </motion.div>
            <div className="ml-4 flex w-full">
              <div className="w-4/5 self-center">
                <div className="flex items-center">
                  <Image
                    className="rounded-lg"
                    src={data.avatar}
                    alt="profile"
                    width={35}
                    height={35}
                  />
                  <h1 className="pl-2 text-[12px]">{data.username}</h1>
                </div>
              </div>
              <div className="w-3/5 self-center pl-4 text-[12px]">40.34%</div>
              <div className="w-3/6 self-center">
                <div className="flex items-center">
                  <LogoIcon
                    fill="#232329"
                    className="mr-2"
                  />
                  <h1 className="text-[12px] text-info-main">
                    {Helper.formatNumber(data.naka_earn, {
                      maximumFractionDigits: 2
                    })}
                  </h1>
                </div>
              </div>
            </div>
          </motion.div>
          <Divider />
        </div>
      ))
    ) : (
      <Nodata
        className="m-4 grid justify-items-center"
        icon={<NodataIcon />}
      />
    )}
  </div>
)

export default CardRank
