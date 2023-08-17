/* eslint-disable no-nested-ternary */
import { Chip, Typography } from "@mui/material"
import { memo } from "react"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import Link from "next/link"
import dynamic from "next/dynamic"
import Helper from "@utils/helper"

const Image = dynamic(() => import("@components/atoms/image/Image"), {
  suspense: true,
  ssr: true
})

interface IProp {
  avatar: string
  username: string
  index: number
  score?: number
  className?: string
  reward?: number
  rate?: number
  id?: string
  naka_earn?: number
}

const PlayerList = ({
  avatar,
  username,
  index,
  className,
  score,
  reward,
  rate,
  id,
  naka_earn
}: IProp) => {
  const { formatNumber } = Helper
  return (
    <div className={`${className} flex items-center player-item__${index}`}>
      <div className="flex flex-col items-center gap-1">
        <Typography className="!text-right !font-neue-machina-semi !text-sm !uppercase !text-white-primary">
          {username}
        </Typography>
        <div className="flex items-center gap-2 whitespace-nowrap uppercase">
          {/* Display Score */}
          {score ? (
            <Chip
              size="small"
              variant="outlined"
              label={`SCORE ${formatNumber(score, {
                maximumFractionDigits: 4
              })}`}
              className="text-xs text-neutral-400"
            />
          ) : null}
          {/* Display Reward */}
          {reward ? (
            <Chip
              size="small"
              variant="outlined"
              label={`Reward ${formatNumber(reward, {
                maximumFractionDigits: 4
              })}`}
              className="text-xs text-neutral-400"
            />
          ) : null}
          {/* Display Rate */}
          {rate ? (
            <Chip
              size="small"
              variant="outlined"
              label={`Rate ${rate}%`}
              className="text-xs text-neutral-400"
            />
          ) : null}
          {naka_earn ? (
            <Chip
              size="small"
              variant="outlined"
              label={`${formatNumber(naka_earn, {
                maximumFractionDigits: 4
              })}`}
              className="text-xs text-neutral-400"
            />
          ) : null}
        </div>
      </div>
      <div className="animation-image !ml-2 h-[58px] w-[58px]">
        <Image
          src={
            avatar.search("https") > -1
              ? avatar
              : avatar.search("/") === 0
              ? avatar
              : `/${avatar}`
          }
          width="200"
          height="200"
          alt={username}
          className="h-[58px] w-full rounded-sm object-cover object-center"
        />
      </div>
      <div className="show-arrow ml-3 hidden">
        <Link href={`/profile/${id}`}>
          <ArrowForwardIcon />
        </Link>
      </div>
    </div>
  )
}

export default memo(PlayerList)
