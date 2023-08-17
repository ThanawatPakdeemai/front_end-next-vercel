import React, { memo, useState } from "react"
import { Chip, Typography } from "@mui/material"
import { v4 as uuidv4 } from "uuid"
import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"
import dynamic from "next/dynamic"
import Helper from "@utils/helper"
import { IPlayerInfoResponse } from "@src/types/profile"

const NumberRank = dynamic(
  () => import("@feature/ranking/components/atoms/NumberRank"),
  {
    suspense: true,
    ssr: true
  }
)
const RankIcon = dynamic(() => import("../atoms/RankIcon"), {
  suspense: true,
  ssr: true
})
const SliderGameStat = dynamic(() => import("./SliderGameStat"), {
  suspense: true,
  ssr: true
})
const Image = dynamic(() => import("@components/atoms/image/Image"), {
  suspense: true,
  ssr: true
})

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

  const { t } = useTranslation()

  return (
    <div className="w-full">
      <SliderGameStat
        openBadges={openBadges}
        handleOnExpandClick={handleOnExpandClick}
      />
      {openBadges ? null : (
        <div
          key={uuidv4()}
          className="mb-10 grid w-full gap-2 rounded-[26px] bg-neutral-800 p-2 "
        >
          {data.data.game_data.map((item, index) => (
            <div
              key={uuidv4()}
              className="grid w-full  grid-cols-4 gap-4 rounded-[18px] bg-neutral-900 p-8 sm:min-w-min md:grid-cols-8 "
            >
              {/* sm:min-w-min md:max-w-max sm:min-w-[720px] */}
              <div className="col-span-2 overflow-hidden md:col-span-3">
                <NumberRank
                  className="m-0 h-6 w-8 !rounded-[4px]"
                  index={index + limit * (page - 1)}
                />
                <h1 className="py-5 text-neutral-300">{item.name}</h1>
                <Typography
                  variant="body1"
                  className="truncate text-xs text-neutral-500"
                  dangerouslySetInnerHTML={{
                    __html: `${item.story}`
                  }}
                />
              </div>
              <div className="col-span-2 grid grid-cols-2 gap-2 md:gap-4">
                <div>
                  <Typography className="text-xs uppercase text-neutral-600">
                    {t("rank")}
                  </Typography>
                  <Chip
                    label={item.rank}
                    variant="outlined"
                    size="small"
                    className="mt-2 cursor-pointer uppercase"
                  />
                </div>
                <div>
                  <Typography className="text-xs uppercase text-neutral-600">
                    {t("rank_score")}
                  </Typography>
                  <Chip
                    label={Helper.formatNumber(item.rankScore)}
                    variant="outlined"
                    size="small"
                    className="mt-2 cursor-pointer uppercase"
                  />
                </div>
                <div>
                  <Typography className="text-xs uppercase text-neutral-600">
                    {t("played")}
                  </Typography>
                  <Chip
                    label={Helper.formatNumber(item.played)}
                    variant="outlined"
                    size="small"
                    className="mt-2 cursor-pointer uppercase"
                  />
                </div>
                <div>
                  <Typography className="text-xs uppercase text-neutral-600">
                    {t("winrate")}
                  </Typography>
                  <Chip
                    label={item.winrate}
                    variant="outlined"
                    size="small"
                    className="mt-2 cursor-pointer uppercase"
                  />
                </div>
              </div>
              <div className="col-span-4 flex flex-col items-center justify-between md:col-span-3 md:flex-row">
                <Image
                  className="mb-2 h-40 w-40 rounded-[15px] object-cover md:mb-0 md:mr-4"
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
                    {item.rank === "-" ? (
                      "-"
                    ) : (
                      <RankIcon
                        width={70}
                        height={70}
                        icon={item.rank}
                      />
                    )}
                  </motion.div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default memo(GameStatOverview)
