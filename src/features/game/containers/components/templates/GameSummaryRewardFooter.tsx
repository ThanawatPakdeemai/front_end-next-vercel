import React from "react"
import { Image } from "@components/atoms/image"
import { Skeleton } from "@mui/material"

interface IGameSummaryRewardFooterProps {
  gameImage: string
  children?: React.ReactNode
}

const GameSummaryRewardFooter = ({
  gameImage,
  children
}: IGameSummaryRewardFooterProps) => (
  <div className="game-summary-reward-footer">
    <div className="flex flex-wrap gap-[10px] p-[10px] lg:flex-nowrap">
      <div className="flex w-full max-w-[264px] flex-1 items-center justify-center rounded border border-neutral-800 p-2 px-[14px]">
        {gameImage ? (
          <div className="overflow-hidden rounded-2xl">
            <Image
              width={300}
              height={300}
              src={gameImage}
              alt="img-profile"
              className="h-full w-full object-cover object-center"
            />
          </div>
        ) : (
          <Skeleton className="h-[240px] w-[250px] transform-none rounded-2xl" />
        )}
      </div>
      {children}
    </div>
  </div>
)

export default GameSummaryRewardFooter
