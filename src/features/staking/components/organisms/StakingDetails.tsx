import React, { useState, useEffect, useCallback } from "react"
import {
  IStakingAll,
  IStakingBasicData,
  IUserStakedInfo
} from "@src/types/staking"
import useContractStaking from "@feature/contract/containers/hooks/useContractStaking"
import useProfileStore from "@stores/profileStore"
import useGlobalStaking from "@feature/staking/containers/hook/useGlobalStaking"
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
  const [basicStakeInfo, setBasicStakeInfo] = useState<IStakingBasicData>()
  const [userStakedInfo, setUserStakedInfo] = useState<IUserStakedInfo>()

  const profile = useProfileStore((state) => state.profile.data)
  const { getBasicStakingData, getUserStakedInfo } = useContractStaking()
  const { handleClaimWithdraw } = useGlobalStaking()

  /**
   * @description Get staking locked data by wallet address
   * @returns
   */
  const fetchStakingInfo = useCallback(async () => {
    const resultBasic = await getBasicStakingData(
      dataStaking.contract_address,
      dataStaking.type
    )
    setBasicStakeInfo(resultBasic || {})

    if (profile?.address) {
      const resultStakedInfo = await getUserStakedInfo(
        dataStaking.contract_address,
        profile.address,
        dataStaking.type
      )
      setUserStakedInfo(resultStakedInfo || {})
    }
  }, [dataStaking, profile, getBasicStakingData, getUserStakedInfo])

  useEffect(() => {
    fetchStakingInfo()
  }, [fetchStakingInfo])

  return (
    <div className={`${className}`}>
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

      <ActionBar
        className="flex w-full justify-end"
        status="locked"
        label="Open until"
        redeemDatetime={basicStakeInfo?.startDate || "00:00:00"}
        type={dataStaking.type}
        onClickRedeem={() => handleClaimWithdraw(userStakedInfo)}
        onRefresh={fetchStakingInfo}
        basicStakeInfo={basicStakeInfo}
        userStakedInfo={userStakedInfo}
      />
    </div>
  )
}
export default StakingDetails
