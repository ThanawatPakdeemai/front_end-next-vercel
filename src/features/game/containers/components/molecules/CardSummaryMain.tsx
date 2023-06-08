import SaveIcon from "@components/icons/SaveIcon"
import TableIcon from "@components/icons/TableIcon"
import SocialShare from "@feature/blog/components/organisms/SocialShare"
import { isMobile } from "@hooks/useGlobal"
import { Typography } from "@mui/material"
import Helper from "@utils/helper"
import dayjs from "dayjs"
import React from "react"

interface IGameCardSummaryMainProps {
  title?: string
  value?: number
  gameName?: string
  gameURLtoShare?: string
  date?: string | Date
}

const CardSummaryMain = ({
  title,
  date,
  gameName,
  gameURLtoShare,
  value
}: IGameCardSummaryMainProps) => (
  <>
    {isMobile ? (
      <div className="relative mt-4 flex w-full  flex-col items-center justify-center text-error-main">
        <TableIcon className="absolute z-[1] block w-full" />
        <span className="mb-4 text-sm font-bold uppercase">{title}</span>
        <span className="text-neon font-mondwest text-[50px] ">
          {value &&
            Helper.formatNumber(value, {
              maximumFractionDigits: 4
            })}
          ✨
        </span>
        {gameURLtoShare && (
          <div className="relative z-[1] my-2  flex w-full flex-col items-center justify-center">
            <span className="mb-1 text-xs font-bold uppercase ">
              Send to friends
            </span>
            <div className="flex">
              <SocialShare
                variant="large"
                shareTitle={gameName || "Nanamoto.games"}
                shareURL={gameURLtoShare}
              />
            </div>
          </div>
        )}
      </div>
    ) : (
      <div className="m-[10px] flex flex-row ">
        <Typography
          className="relative flex h-[328px] rotate-180 items-center justify-between rounded border border-neutral-800 bg-transparent"
          sx={{
            textOrientation: "sideways",
            writingMode: "vertical-rl"
          }}
        >
          <span className="pt-20 text-sm font-bold uppercase text-error-main">
            {date && dayjs(date).format("DD MMM YYYY")}
          </span>
          <SaveIcon />
        </Typography>
        <div className="flex w-full flex-col items-center justify-center text-error-main">
          <TableIcon className="absolute z-[1] hidden sm:block" />
          <span className="mb-11 text-sm font-bold uppercase">{title}</span>
          <span className="font-mondwest text-[100px]">
            {value &&
              Helper.formatNumber(value, {
                maximumFractionDigits: 4
              })}
            ✨
          </span>
          {gameURLtoShare && (
            <>
              <span className="mb-1 text-sm font-bold uppercase">
                Send to friends
              </span>
              <div className="flex">
                <SocialShare
                  variant="large"
                  shareTitle={gameName || "Nanamoto.games"}
                  shareURL={gameURLtoShare}
                />
              </div>
            </>
          )}
        </div>
      </div>
    )}
  </>
)

export default CardSummaryMain
