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
import { Box } from "@mui/material"
import { v4 as uuid } from "uuid"

interface IProp {
  topPlayerGameId: IPlayerRanking[] | IWeeklyPoolByGameIdDataRecord[]
}

const StyledCardRankingFontFamily = {
  fontFamily: "Urbanist, Helvetica, Arial, sans-serif",
  fontWeight: "bold"
}

const StyledCardRanking = {
  "@media screen and (max-width: 991px)": {
    ".card-ranking": {
      "&__wrapper": {
        gap: "0",
        gridTemplateColumns: "40px 1fr 30px 90px"
      },
      "&__number": {
        fontSize: "70%",
        width: "24px",
        height: "24px",
        borderRadius: "4px",
        padding: "3px",
        ...StyledCardRankingFontFamily
      },
      "&__avatar": {
        width: "25px",
        height: "25px"
      },
      "&__percent": {
        textAlign: "center",
        fontSize: "60%",
        ...StyledCardRankingFontFamily
      },
      "&__naka-earn": {
        marginLeft: "auto",
        paddingRight: "10px",
        maxWidth: "90px",
        "svg": {
          width: "15px",
          margin: "0"
        },
        "h1": {
          fontSize: "12px",
          whiteSpace: "normal",
          ...StyledCardRankingFontFamily
        }
      }
    },
    ".card-rank__username": {
      fontFamily: "Urbanist, Helvetica, Arial, sans-serif",
      fontWeight: "bold"
    }
  }
}

const CardRank = ({ topPlayerGameId }: IProp) => (
  <Box
    component="div"
    sx={StyledCardRanking}
    className="custom-scroll h-[270px] overflow-y-scroll"
  >
    {topPlayerGameId ? (
      topPlayerGameId.map((data, index) => (
        <motion.div
          initial="rest"
          whileHover="hover"
          animate="rest"
          className="card-ranking__wrapper grid grid-cols-[35px_165px_1fr_1fr] items-center gap-5 border-b-[1px] border-neutral-800 py-3"
          key={uuid()}
        >
          <NumberRank
            className="font card-ranking__number m-0 h-[35px] w-[35px] px-[16px] font-neue-machina-semi text-[14px]"
            index={index}
          />

          <div className="flex items-center gap-3">
            <div className="card-ranking__avatar h-[35px] w-[35px] overflow-hidden rounded-lg">
              <Image
                src={Helper.convertAvatar(data.avatar)}
                alt="profile"
                width={35}
                height={35}
                className="h-full w-full object-cover"
              />
            </div>
            <h1 className="card-rank__username max-w-[80px] truncate font-neue-machina-semi text-[12px] uppercase text-neutral-300 lg:max-w-none">
              {data.username}
            </h1>
          </div>
          <h1 className="card-ranking__percent font-neue-machina-semi text-[12px] text-neutral-500">
            {Helper.formatNumber(data.percent, {
              maximumFractionDigits: 2
            })}
            %
          </h1>
          <div className="card-ranking__naka-earn flex items-center gap-2">
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
  </Box>
)

export default CardRank
