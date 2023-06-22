import React, { memo } from "react"
import { Box, CardHeader, SxProps, Theme } from "@mui/material"
import Helper from "@utils/helper"
import dayjs from "dayjs"
import duration from "dayjs/plugin/duration"
import { useTranslation } from "react-i18next"

dayjs.extend(duration)

interface Iprop {
  width: string
  icon: string | React.ReactNode
  title: string | React.ReactNode
  rightTitle?: React.ReactNode
  background?: "purple" | "red" | "neutral"
  subtitle?: boolean
  elevation?: number
  sumTotal?: number
  className?: string
  rightContent?: React.ReactNode
  startDate?: string
  endDate?: string
}

const StyledCardTitle: SxProps<Theme> = {
  ".dropdown-custom__wrapper": {
    width: "auto",
    flex: "1",
    justifyContent: "flex-end",
    "button": {
      width: "190px"
    }
  },
  "@media screen and (max-width: 991px)": {
    textAlign: "center",
    flexDirection: "column",
    ".card-title__span": {
      whiteSpace: "nowrap"
    }
  }
}

const CardTitle = ({
  icon,
  title,
  rightTitle,
  background = "purple",
  subtitle = false,
  elevation,
  sumTotal,
  className,
  rightContent,
  startDate,
  endDate
}: Iprop) => {
  const dayjsFormat = "DD MMM YYYY MM:HH A"
  const startWeekly = startDate
    ? dayjs(startDate).format(dayjsFormat)
    : dayjs().startOf("week").format(dayjsFormat)
  const endWeekly = endDate
    ? dayjs(endDate).format(dayjsFormat)
    : dayjs().endOf("week").format(dayjsFormat)
  const { t } = useTranslation()

  const rankTitle = "font-neue-machina-semi text-neutral-500"

  return (
    <div className="card-title__wrapper flex w-full flex-col">
      <div
        className={`card-title-page m-2 mb-0 flex h-[50px] max-w-full items-center overflow-hidden rounded-2xl p-[10px_10px_10px_20px] sm:flex-[1_1_100%] lg:flex-none ${elevation} ${className} ${
          background === "purple" && "!bg-purple-primary"
        } ${background === "red" && "!bg-red-card"}
       ${background === "neutral" && "!bg-neutral-800"}
      `}
      >
        {subtitle ? (
          <Box
            component="div"
            className="card-subtitle__wrapper flex w-full items-center justify-between lg:justify-between"
            sx={StyledCardTitle}
          >
            <div className="card-subtitle__text flex-1 uppercase">
              <h1 className="card-title__h1 col-span-2 font-neue-machina-semi text-[14px] text-neutral-300">
                {t("weekly_prize_pool")} :{" "}
                <span className="card-title__span text-info-main">
                  {sumTotal &&
                    Helper.formatNumber(sumTotal, {
                      maximumFractionDigits: 2
                    })}{" "}
                  naka
                </span>
              </h1>
              <h1 className="font-neue-machina-semi text-[10px] text-neutral-600">
                {startWeekly} - {endWeekly}
              </h1>
            </div>
            {rightContent}
          </Box>
        ) : (
          <CardHeader
            title={
              <div className="flex items-center">
                <div>{icon}</div>
                <div>{title}</div>
              </div>
            }
            action={rightTitle ?? ""}
            className="!p-0"
          />
        )}
      </div>
      {subtitle ? (
        <div className="card-header__ranking grid grid-cols-[35px_165px_1fr_1fr] gap-1 border-b-[1px] border-neutral-800 p-[15px_10px_15px_30px] text-[10px] uppercase">
          <h1 className={`card-header__ranking--no ${rankTitle}`}>
            {t("rank")}
          </h1>
          <h1 className={`card-header__ranking--username-avatar ${rankTitle}`}>
            {t("player")}
          </h1>
          <h1 className={`card-header__ranking--est ${rankTitle}`}>
            {t("prize_pool")} EST. %
          </h1>
          <h1 className={`card-header__ranking--earn ${rankTitle}`}>
            {t("total")} naka :{" "}
            <span className="card-header__ranking-span text-info-main">
              {sumTotal
                ? Helper.formatNumber(sumTotal, {
                    maximumFractionDigits: 2
                  })
                : "-"}
            </span>
          </h1>
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}

export default memo(CardTitle)
