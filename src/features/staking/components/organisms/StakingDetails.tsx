import React, { useMemo } from "react"
import { IStakingAll } from "@src/types/staking"
import useGlobalStaking from "@feature/staking/containers/hook/useStakingController"
import SkeletonStake from "@components/atoms/skeleton/SkeletonStake"
import { useTranslation } from "react-i18next"
import PeriodLabel from "../molecules/PeriodLabel"
import TotalStaked from "../molecules/TotalStaked"
import StakingPeriod from "../molecules/StakingPeriod"
import NumberBadge from "../atoms/NumberBadge"
import ActionBar from "../molecules/ActionBar"

export interface IStakingDetails {
  dataStaking: IStakingAll
  className?: string
  handleOpen?: () => void
}

const StakingDetails = ({
  dataStaking,
  className = "",
  handleOpen
}: IStakingDetails) => {
  const { fetchStakingInfo, basicStakeInfo, userStakedInfo, onRefresh } =
    useGlobalStaking()
  const { handleClaimWithdraw } = useGlobalStaking()
  const { t } = useTranslation()

  useMemo(() => {
    fetchStakingInfo(dataStaking.contract_address, dataStaking.type)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      className={`${className} font-neue-machina-semi text-[10px] uppercase`}
    >
      {basicStakeInfo ? (
        <div className="grid grid-flow-row-dense grid-cols-1 gap-3 rounded-[13px] bg-neutral-800 p-3 sm:grid-cols-4">
          <div className="row-span-2 rounded-lg shadow-xl">
            <PeriodLabel
              days={basicStakeInfo?.period || 0}
              className="h-full"
              type={dataStaking.type}
            />
          </div>
          <div className="sm-max:row-span-2 shadow-xl sm:col-span-3">
            <TotalStaked
              totalPoolStake={basicStakeInfo?.totalStake || 0}
              poolLimit={basicStakeInfo?.poolLimit || 0}
              type={dataStaking.type}
            />
          </div>
          <div className="shadow-xl sm:col-span-3">
            <StakingPeriod
              startDatetime={basicStakeInfo?.startDate || "00:00:00"}
              endDatetime={basicStakeInfo?.endDate || "00:00:00"}
              est={basicStakeInfo?.APR || 0}
              type={dataStaking.type}
            />
          </div>
          <div className="shadow-xl sm:col-span-2">
            <NumberBadge
              title={t("your_naka_staked")}
              color="red"
              value={userStakedInfo?.stakeAmount ?? 0}
            />
          </div>
          <div className="shadow-xl sm:col-span-2">
            <NumberBadge
              title={t("your_naka_unclaimed")}
              color="purple"
              value={userStakedInfo?.comInterest ?? 0}
            />
          </div>
        </div>
      ) : (
        <SkeletonStake />
      )}

      <ActionBar
        className="flex w-full justify-center sm:justify-end"
        status="locked"
        type={dataStaking.type}
        onClickRedeem={() =>
          handleClaimWithdraw(basicStakeInfo, userStakedInfo)
        }
        onRefresh={() =>
          onRefresh(dataStaking.contract_address, dataStaking.type)
        }
        basicStakeInfo={basicStakeInfo}
        userStakedInfo={userStakedInfo}
        handleOpen={handleOpen}
      />
    </div>
  )
}
export default StakingDetails
