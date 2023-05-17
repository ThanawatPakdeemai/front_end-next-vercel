import React from "react"
import { motion } from "framer-motion"
import { IPlayerPlayToEarnRanking } from "@feature/ranking/interfaces/IRanking"
import Helper from "@utils/helper"
import NumberRank from "@feature/ranking/components/atoms/NumberRank"
import { ImageCustom } from "@components/atoms/image/Image"

interface IProp {
  index: number
  itemSrc: string
  itemName: string
  itemPrice: number
  player: IPlayerPlayToEarnRanking
}

const CardRankFreeToEarn = ({
  player,
  index,
  itemName,
  itemSrc,
  itemPrice
}: IProp) => (
  <motion.div
    initial="rest"
    whileHover="hover"
    animate="rest"
    className="card-ranking__item grid w-full grid-cols-[35px_150px_40px_1fr]  items-center justify-between gap-2 border-b-[1px] border-neutral-800 py-3"
    key={player.playerId}
  >
    <NumberRank
      className="font m-0 h-[35px] w-[35px] px-[16px] font-neue-machina-semi text-[14px]"
      index={index}
    />

    <div className="flex flex-1 items-center gap-3">
      <div className="h-[35px] w-[35px] overflow-hidden rounded-lg">
        <ImageCustom
          src={Helper.convertAvatar(player.avatar)}
          alt="profile"
          width={35}
          height={35}
          className="h-full w-full object-cover"
        />
      </div>
      <h1 className="max-w-[100px] overflow-hidden font-neue-machina-semi text-[12px] uppercase text-neutral-300">
        {player.username}
      </h1>
    </div>
    <div className="flex items-center justify-center gap-1">
      <div className="flex h-[16px] w-[16px] items-center justify-center">
        <ImageCustom
          src={itemSrc}
          alt={itemName}
          width={40}
          height={40}
          className="h-full w-full object-contain opacity-40"
        />
      </div>
      <span className="font-neue-machina-semi text-xs">{itemPrice}$</span>
    </div>
    <div className="ml-auto pr-2">
      <h1 className="font-neue-machina-semi text-[12px] text-info-main">
        {Helper.formatNumber(player.bestScore, {
          maximumFractionDigits: 2
        })}
      </h1>
    </div>
  </motion.div>
)

export default CardRankFreeToEarn
