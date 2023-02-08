import React, { useEffect } from "react"
import { IStakingAll } from "@src/types/staking"
import useGlobalStaking from "@feature/staking/containers/hook/useGlobalStaking"
import SkeletonStake from "@components/atoms/skeleton/SkeletonStake"
import PeriodLabel from "../molecules/PeriodLabel"
import TotalStaked from "../molecules/TotalStaked"
import StakingPeriod from "../molecules/StakingPeriod"
import NumberBadge from "../atoms/NumberBadge"
import ActionBar from "../molecules/ActionBar"

export interface IStakingDetails {
  dataStaking: IStakingAll
  className?: string
}

const StakingDetails = ({ dataStaking, className = "" }: IStakingDetails) => {
  const { fetchStakingInfo, basicStakeInfo, userStakedInfo, onRefresh } =
    useGlobalStaking()

  const { handleClaimWithdraw } = useGlobalStaking()

  /**
   * @description Get staking locked data by wallet address
   * @returns
   */

  useEffect(() => {
    fetchStakingInfo(dataStaking.contract_address, dataStaking.type)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={`${className}`}>
      {basicStakeInfo ? (
        <div className="grid grid-flow-row-dense grid-cols-4 gap-3 rounded-[13px] bg-neutral-800 p-3 uppercase">
          <div className="row-span-2 rounded-lg shadow-xl">
            <PeriodLabel
              days={basicStakeInfo?.period || 0}
              className="h-full"
              type={dataStaking.type}
            />
          </div>
          <div className="col-span-3 shadow-xl">
            <TotalStaked
              totalPoolStake={basicStakeInfo?.totalStake || 0}
              poolLimit={basicStakeInfo?.poolLimit || 0}
              type={dataStaking.type}
            />
          </div>
          <div className="col-span-3 shadow-xl">
            <StakingPeriod
              startDatetime={basicStakeInfo?.startDate || "00:00:00"}
              endDatetime={basicStakeInfo?.endDate || "00:00:00"}
              est={basicStakeInfo?.APR || 0}
              type={dataStaking.type}
            />
          </div>
          <div className="col-span-2 shadow-xl">
            <NumberBadge
              title="Your NAKA Staked"
              color="red"
              value={userStakedInfo?.stakeAmount ?? 0}
            />
          </div>
          <div className="col-span-2 shadow-xl">
            <NumberBadge
              title="Your rewards Unclaimed"
              color="purple"
              value={userStakedInfo?.comInterest ?? 0}
            />
          </div>
        </div>
      ) : (
        <SkeletonStake />
      )}

      <ActionBar
        className="flex w-full justify-end"
        status="locked"
        label="Open until"
        redeemDatetime={basicStakeInfo?.startDate || "00:00:00"}
        type={dataStaking.type}
        onClickRedeem={() => handleClaimWithdraw(userStakedInfo)}
        onRefresh={() =>
          onRefresh(dataStaking.contract_address, dataStaking.type)
        }
        basicStakeInfo={basicStakeInfo}
        userStakedInfo={userStakedInfo}
      />
    </div>
  )
}
export default StakingDetails
