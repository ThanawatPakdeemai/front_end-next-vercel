import React, { memo, useState } from "react"
import { Card, Chip } from "@mui/material"
import NumberRank from "@feature/ranking/components/atoms/NumberRank"
import { Image } from "@components/atoms/image"
import { v4 as uuidv4 } from "uuid"
import Helper from "@utils/helper"
import TooltipsCustom from "@components/atoms/TooltipsCustom"
import { motion } from "framer-motion"
import { IPlayerInfoResponse } from "@src/types/profile"
import RankIcon from "../atoms/RankIcon"
import SliderGameStat from "./SliderGameStat"

interface IProp {
  data: IPlayerInfoResponse
  limit: number
  page: number
}

const GameStatOverview = ({ data, limit, page }: IProp) => {
  const [openBadges, setOpenBadges] = useState<boolean>(false)
  const handleOnExpandClick = () => {
    setOpenBadges(!openBadges)
  }

  return (
    <div className="w-full">
      <SliderGameStat
        openBadges={openBadges}
        handleOnExpandClick={handleOnExpandClick}
      />
      {openBadges ? null : (
        <div className="">
          <div
            key={uuidv4()}
            className="mb-10 grid max-w-[1000px]  gap-2 overflow-x-scroll rounded-[26px] bg-neutral-800 p-2"
          >
            {data.data.game_data.map((item, index) => (
              <Card
                key={uuidv4()}
                className="grid grid-cols-3 grid-rows-1 rounded-[18px]"
                // className="grid  grid-rows-1 rounded-[18px] md:grid-cols-2 lg:grid-cols-3"
                // className="flex flex-wrap"
                sx={{
                  backgroundImage: "none",
                  backgroundColor: "#010101"
                }}
              >
                <div className="py-10 px-10">
                  <NumberRank
                    className="m-0 h-6 w-8 !rounded-[4px]"
                    index={index + limit * (page - 1)}
                  />
                  <h1 className="py-5 text-neutral-300">{item.name}</h1>
                  <p className=" text-xs text-neutral-500">
                    <TooltipsCustom
                      className="truncate hover:text-clip"
                      placement="bottom"
                      title={item.story}
                      color="error"
                    >
                      <span>{item.story}</span>
                    </TooltipsCustom>
                  </p>
                </div>
                <div className="my-7 mx-10 grid grid-cols-2 grid-rows-2 gap-5">
                  <div>
                    <p className="text-xs text-neutral-600">RANK</p>
                    <Chip
                      label={item.rank}
                      variant="outlined"
                      size="small"
                      className="mt-2 cursor-pointer uppercase"
                    />
                  </div>
                  <div>
                    <p className="text-xs text-neutral-600">RANK SCORE</p>
                    <Chip
                      label={Helper.formatNumber(item.rankScore)}
                      variant="outlined"
                      size="small"
                      className="mt-2 cursor-pointer uppercase"
                    />
                  </div>
                  <div>
                    <p className="text-xs text-neutral-600">PLAYED</p>
                    <Chip
                      label={Helper.formatNumber(item.played)}
                      variant="outlined"
                      size="small"
                      className="mt-2 cursor-pointer uppercase"
                    />
                  </div>
                  <div>
                    <p className="text-xs text-neutral-600">WINRATE</p>
                    <Chip
                      label={item.winrate}
                      variant="outlined"
                      size="small"
                      className="mt-2 cursor-pointer uppercase"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Image
                    className="h-40 w-40 rounded-[15px] object-cover"
                    src={item.image}
                    alt={item.name}
                    width={160}
                    height={160}
                  />
                  <div className="flex h-40 w-40 items-center justify-center rounded-[10px] border-[1px] border-solid border-neutral-700 ">
                    <motion.div
                      whileHover={{ rotate: 15 }}
                      transition={{
                        type: "spring",
                        stiffness: 100,
                        damping: 4
                      }}
                    >
                      <RankIcon
                        width={70}
                        height={70}
                        icon={item.rank}
                      />
                    </motion.div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default memo(GameStatOverview)
