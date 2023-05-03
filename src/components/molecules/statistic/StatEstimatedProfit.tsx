import { Typography } from "@mui/material"
import TrendingUpIcon from "@mui/icons-material/TrendingUp"
import React from "react"
import { useTranslation } from "react-i18next"
import { BrowserView, MobileView } from "react-device-detect"
import CONFIGS from "@configs/index"

interface IProp {
  minValue: number | string
  maxValue: number | string
}

const StatEstimatedProfit = ({ minValue, maxValue }: IProp) => {
  const { t } = useTranslation()
  return (
    <>
      <BrowserView>
        <div className="flex h-[264px] flex-col gap-2 rounded-2xl bg-neutral-800 p-2 uppercase text-neutral-500">
          <div className="flex flex-col items-center justify-center rounded-lg bg-neutral-700 py-6">
            <TrendingUpIcon
              color="success"
              className="h-6 w-6"
            />
            <Typography className="mt-3 whitespace-pre-wrap text-center text-default font-bold text-neutral-300">
              {`${t("potential_profit")}${"\n"}${t("per_game")}`}
            </Typography>
          </div>
          <div className="flex gap-2">
            <div className="flex h-[87px] w-full flex-auto flex-col justify-center rounded-lg border-[1px] border-varidian-default text-varidian-default md:w-[130px]">
              <Typography className="mb-[10px] text-center text-xs font-bold">
                {t("min")}
              </Typography>
              <Typography className="text-center text-default font-bold">
                {minValue}
              </Typography>
            </div>
            <div className="flex h-[87px] w-full flex-auto flex-col justify-center rounded-lg bg-varidian-default text-primary-main md:w-[130px]">
              <Typography className="mb-[10px] text-center text-xs font-bold">
                {t("max")}
              </Typography>
              <Typography className="text-center text-default font-bold">
                {maxValue}
              </Typography>
            </div>
          </div>
          <Typography className="mt-2 text-center text-xs font-bold text-neutral-600">
            {t("estimated_profit")}
          </Typography>
        </div>
      </BrowserView>
      {CONFIGS.DISPLAY_MOBILE_MODE === "true" && (
        <MobileView>
          <div className="flex h-auto flex-col gap-2 rounded-2xl bg-neutral-800 p-2 uppercase text-neutral-500">
            <div className="flex flex-col items-center justify-center rounded-lg bg-neutral-700 py-2">
              <TrendingUpIcon
                color="success"
                className="h-5 w-5"
              />
              <Typography className="mt-3 whitespace-pre-wrap text-center text-default font-bold text-neutral-300">
                {`${t("potential_profit")}${"\n"}${t("per_game")}`}
              </Typography>
            </div>
            <div className="flex gap-2">
              <div className="flex h-[87px] w-full flex-auto flex-col justify-center rounded-lg border-[1px] border-varidian-default text-varidian-default md:w-[130px]">
                <Typography className="mb-[10px] text-center text-xs font-bold">
                  {t("min")}
                </Typography>
                <Typography className="text-center text-default font-bold">
                  {minValue}
                </Typography>
              </div>
              <div className="flex h-[87px] w-full flex-auto flex-col justify-center rounded-lg bg-varidian-default text-primary-main">
                <Typography className="mb-[10px] text-center text-xs font-bold">
                  {t("max")}
                </Typography>
                <Typography className="text-center text-default font-bold">
                  {maxValue}
                </Typography>
              </div>
            </div>
          </div>
        </MobileView>
      )}
    </>
  )
}

export default StatEstimatedProfit
