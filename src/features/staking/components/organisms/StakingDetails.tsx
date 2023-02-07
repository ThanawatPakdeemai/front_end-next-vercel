import React, { useState, useEffect, useCallback } from "react"
import { IMyLockedResponseData, IStakingAll } from "@src/types/staking"
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
  const [stakedData, setStakedData] = useState<IMyLockedResponseData>()
  const profile = useProfileStore((state) => state.profile.data)
  const { getMyLocked, getBasicStakingData } = useContractStaking(
    dataStaking.contract_address,
    dataStaking.type
  )
  const { handleRedeem } = useGlobalStaking()

  /**
   * @description Get staking locked data by wallet address
   * @returns
   */

  const fetchStakingFromSmartContract = useCallback(async () => {
    // Basic Information
    const resultBasic = await getBasicStakingData(dataStaking.contract_address)
    if (!profile?.address) {
      setStakedData(resultBasic || {})
      return
    }
    const result = await getMyLocked(
      dataStaking.contract_address,
      profile.address
    )
    setStakedData(result || {})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    fetchStakingFromSmartContract()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={`${className}`}>
      <div className="grid grid-flow-row-dense grid-cols-4 gap-3 rounded-[13px] bg-neutral-800 p-3 uppercase">
        <div className="row-span-2 rounded-lg shadow-xl">
          <PeriodLabel
            days={stakedData?.period || 0}
            label={dataStaking.type}
            className="h-full"
          />
        </div>
        <div className="col-span-3 shadow-xl">
          <TotalStaked
            totalPoolStake={stakedData?.totalStake || 0}
            totalPoolReward={stakedData?.totalReward || 0}
          />
        </div>
        <div className="col-span-3 shadow-xl">
          <StakingPeriod
            startDatetime={stakedData?.startDate || "00:00:00"}
            endDatetime={stakedData?.endDate || "00:00:00"}
            est={stakedData?.APR || 0}
            type={dataStaking.type}
          />
        </div>
        <div className="col-span-2 shadow-xl">
          <NumberBadge
            title="Your NAKA Staked"
            color="red"
            value={stakedData?.stakeAmount || 0}
          />
        </div>
        <div className="col-span-2 shadow-xl">
          <NumberBadge
            title="Your rewards Unclaimed"
            color="purple"
            value={stakedData?.comInterest || 0}
          />
        </div>
      </div>

      <ActionBar
        label="Redemption date"
        redeemDatetime={stakedData?.endDate || "00:00:00"}
        textColor="purple"
        className="flex w-full justify-end"
        stakedData={stakedData}
        onClickRedeem={() => handleRedeem(stakedData)}
      />
    </div>
  )
}
export default StakingDetails
