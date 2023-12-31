import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined"
import dayjs from "dayjs"
import { t } from "i18next"
import React from "react"
import dynamic from "next/dynamic"
import { TStakingStatus } from "@src/types/staking"

const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: false
})

interface IPeriodDate {
  datetime: string
  className?: string
  lockStatus: TStakingStatus
}

const PeriodDate = ({ datetime, className, lockStatus }: IPeriodDate) => (
  <div className={`${className} h-full whitespace-nowrap`}>
    <div className="flex h-full min-h-[68px] w-full items-center justify-between rounded-[10px] bg-primary-main pr-3 font-neue-machina-semi sm:pl-10 sm:pr-8">
      <div className="flex items-center text-lg">
        <p className="text-red-card">{t("staking_start")}</p>
        <p className="mx-3 text-neutral-300">
          {dayjs(datetime).format("DD MMM YYYY")}
        </p>
        <p className="text-neutral-600">{dayjs(datetime).format("h:mm A")}</p>
      </div>

      <div className=" w-fit rounded-lg border border-neutral-700 bg-neutral-800 p-3">
        {lockStatus === "locked" ? (
          <Icomoon className="icon-Lock" />
        ) : (
          <LockOpenOutlinedIcon />
        )}
      </div>
    </div>
  </div>
)

export default PeriodDate
