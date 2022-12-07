import { IPlayerRanking } from "@feature/ranking/interfaces/IRanking"
import { Typography } from "@mui/material"
import { memo } from "react"
import { Image } from "@components/atoms/image/index"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import Helper from "@utils/helper"

interface IProp {
  item: IPlayerRanking
  index: number
  className?: string
}

const PlayerList = ({ item, index, className }: IProp) => {
  const { formatNumber } = Helper
  return (
    <div className={`${className} flex items-center`}>
      <div>
        <Typography className="text-right font-neue-machina text-sm uppercase text-white-primary">
          {item.username}
        </Typography>
        <Typography
          className={`rounded-less border border-solid border-black-03 p-2 text-right font-neue-machina text-xs uppercase text-gray-neutral04 ${
            index > 2 && "bg-black-01"
          }`}
        >
          {formatNumber(item.naka_earn, { maximumFractionDigits: 4 })} NAKA
        </Typography>
      </div>
      <div className="ml-2 h-[58px] w-[58px]">
        <Image
          src={item.avatar}
          width="200"
          height="200"
          alt={item.username}
          className="h-[58px] w-full rounded-sm object-fill object-center"
        />
      </div>
      <div className="show-arrow ml-3 hidden">
        <ArrowForwardIcon />
      </div>
    </div>
  )
}

export default memo(PlayerList)
