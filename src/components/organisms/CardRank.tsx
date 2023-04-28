import React from "react"
import LogoIcon from "@components/icons/LogoIcon"
import { Image } from "@components/atoms/image"
import { motion } from "framer-motion"
import { IPlayerRanking } from "@feature/ranking/interfaces/IRanking"
import Helper from "@utils/helper"
import NumberRank from "@feature/ranking/components/atoms/NumberRank"
import NoDataIcon from "@components/icons/NoDataIcon"
import NoData from "@components/molecules/NoData"
import { IWeeklyPoolByGameIdDataRecord } from "@feature/rewardWeekly/interfaces/IRewardWeeklyService"

interface IProp {
  topPlayerGameId: IPlayerRanking[] | IWeeklyPoolByGameIdDataRecord[]
}

// const expandMotion = {
//   rest: {
//     x: 0,
//     transition: {
//       duration: 2,
//       type: "spring",
//       stiffness: 300
//     }
//   },
//   hover: {
//     width: "55px",
//     marginRight: "14px",
//     transition: {
//       duration: 0.8,
//       stiffness: 300,
//       type: "spring"
//     }
//   }
// }

const CardRank = ({ topPlayerGameId }: IProp) => (
  <div className="custom-scroll h-[270px] overflow-y-scroll">
    {topPlayerGameId ? (
      topPlayerGameId.map((data, index) => (
        <motion.div
          initial="rest"
          whileHover="hover"
          animate="rest"
          className="card-ranking__wrapper grid grid-cols-[35px_165px_1fr_1fr] items-center gap-5 border-b-[1px] border-neutral-800 py-3"
          key={data.id}
        >
          <NumberRank
            className="font m-0 h-[35px] w-[35px] px-[16px] font-neue-machina-semi text-[14px]"
            index={index}
          />

          <div className="flex items-center gap-3">
            <div className="h-[35px] w-[35px] overflow-hidden rounded-lg">
              <Image
                src={Helper.convertAvatar(data.avatar)}
                alt="profile"
                width={35}
                height={35}
                className="h-full w-full object-cover"
              />
            </div>
            <h1 className="font-neue-machina-semi text-[12px] uppercase text-neutral-300">
              {data.username}
            </h1>
          </div>
          <h1 className="font-neue-machina-semi text-[12px] text-neutral-500">
            {Helper.formatNumber(data.percent, {
              maximumFractionDigits: 2
            })}
            %
          </h1>
          <div className="flex items-center gap-2">
            <LogoIcon
              fill="#232329"
              className="mr-2"
            />
            <h1 className="font-neue-machina-semi text-[12px] text-info-main">
              {Helper.formatNumber(data.naka_earn || data.reward, {
                maximumFractionDigits: 2
              })}
            </h1>
          </div>
        </motion.div>
      ))
    ) : (
      <NoData
        className="m-4 grid justify-items-center"
        icon={<NoDataIcon />}
      />
    )}
  </div>
)

export default CardRank
