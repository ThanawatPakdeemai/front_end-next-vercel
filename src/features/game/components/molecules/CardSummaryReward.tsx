import ArrowDownIcon from "@components/icons/ArrowDownIcon"
import IconArrowRight from "@components/icons/arrowRightIcon"
import LogoIcon from "@components/icons/LogoIcon"
import ButtonToggleIcon from "@components/molecules/gameSlide/ButtonToggleIcon"
import CONFIGS from "@configs/index"
import useGlobal from "@hooks/useGlobal"
import { Box } from "@mui/material"
import Helper from "@utils/helper"
import React from "react"
import { useTranslation } from "react-i18next"

export interface ICardSummaryRewardProps {
  myReward?: number
  hash?: string
}

const CardSummaryReward = ({ myReward, hash }: ICardSummaryRewardProps) => {
  const { t } = useTranslation()
  const { openInNewTab } = useGlobal()
  return (
    <div className="flex w-full flex-col items-center justify-center gap-[10px] ">
      <Box
        component="div"
        className="card-my-reward__wrapper bg-neutral-750 flex w-full flex-col gap-[10px] rounded border-[1px] border-neutral-780 bg-neutral-800 p-[10px] text-sm"
      >
        <div className="flex w-full items-center rounded border-[1px] border-neutral-780 bg-primary-main px-6 py-5">
          <span className="flex-1 uppercase text-neutral-500">MY Reward:</span>
          <span className="mr-3 text-lg uppercase text-green-lemon">
            {myReward &&
              Helper.formatNumber(myReward, {
                maximumFractionDigits: 4
              })}
          </span>
          <LogoIcon fill="#A0ED61" />
        </div>
        <ButtonToggleIcon
          startIcon={<ArrowDownIcon />}
          endIcon={<IconArrowRight stroke="#010101" />}
          text={t("view_transaction")}
          className="btn-green-rainbow bg-green-lemon font-bold text-neutral-900"
          handleClick={() =>
            openInNewTab(`${CONFIGS.CHAIN.POLYGON_SCAN}/tx/${hash}`)
          }
          disabled={hash === ""}
          type="button"
        />
      </Box>
    </div>
  )
}

export default CardSummaryReward
