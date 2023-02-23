import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import { TStaking } from "@src/types/staking"
import { useTranslation } from "react-i18next"

interface IStakingStartEnd {
  startDate: string
  startTime: string
  endDate: string
  endTime: string
  className?: string
  type?: TStaking
}

const StakingStartEnd = ({
  startDate,
  startTime,
  endDate,
  endTime,
  className
}: IStakingStartEnd) => {
  const { t } = useTranslation()
  return (
    <div
      className={`period border-b-solid flex w-full items-center justify-between border-b border-b-neutral-800 py-3 font-neue-machina-semi text-sm uppercase text-neutral-500 ${className}`}
    >
      <div className="start max-w-[35%] text-left">
        <p className="mb-2 mr-auto">{t("start")}</p>
        <p className="text-neutral-300">{startDate}</p>
        <p className="ml-auto">{startTime}</p>
      </div>
      <div className="arrow rounded-[8px] border border-neutral-800 p-[5px]">
        <ArrowForwardIcon className="scale-[0.5] text-[#E1E2E2]" />
      </div>
      <div className="end max-w-[35%] text-right">
        <p className="mb-2 mr-auto">{t("end")}</p>
        <p className="text-neutral-300">{endDate}</p>
        <p className="ml-auto">{endTime}</p>
      </div>
    </div>
  )
}

export default StakingStartEnd
