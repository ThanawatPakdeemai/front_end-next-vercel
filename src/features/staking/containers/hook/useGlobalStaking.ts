import {
  IMyLockedResponseData,
  IStakingAll,
  IStakingGroup
} from "@src/types/staking"
import useProfileStore from "@stores/profileStore"
import { useQuery } from "@tanstack/react-query"
import dayjs from "dayjs"
import { useEffect, useState } from "react"
import { getStakingAll } from "../services/staking.service"

const useGlobalStaking = () => {
  const _limit = 9999
  const _skip = 1

  // Redux
  const profile = useProfileStore((state) => state.profile.data)

  // State
  const [fixedStaking, setFixedStaking] = useState<IStakingGroup[]>([])
  const [flexibleStaking, setFlexibleStaking] = useState<IStakingGroup[]>([])

  /**
   * @description Get all staking
   */
  const { data: stakingAll } = useQuery({
    queryKey: ["StakingAll", { _limit, _skip }],
    queryFn: () => getStakingAll({ _limit, _skip }),
    keepPreviousData: true,
    staleTime: Infinity
  })

  const handleGroupStakeByDate = (_staking: IStakingAll[]) => {
    /**
     * @description Group staking by start_stake_time
     */
    const groupByDatetime = _staking.reduce((group, staking) => {
      const { start_stake_time } = staking
      group[start_stake_time] = group[start_stake_time] ?? []
      const date1 = dayjs(staking.start_stake_time)
      const date2 = dayjs(staking.end_stake_time)
      const diff = date2.diff(date1, "day")
      // Note: APR is hardcode (Only for fixed staking)
      let _apr = 0
      switch (diff) {
        case 30:
          _apr = 15
          break
        case 60:
          _apr = 20
          break
        case 90:
          _apr = 25
          break
        default:
          break
      }
      group[start_stake_time].push({
        ...staking,
        "apr": _apr,
        "period": diff && diff > 0 ? diff : 0
      })
      // group[start_stake_time].push(staking)

      return group
    }, {})

    /**
     * @description Convert groupByDatetime to array
     */
    const groupByDatetimeArray: IStakingGroup[] = Object.keys(
      groupByDatetime
    ).map((key, index) => ({
      "locked_status": dayjs(key).isBefore(dayjs()) ? "locked" : "unlocked",
      "datetime": key,
      "data": groupByDatetime[key],
      "type": groupByDatetime[key][index]?.type || "flexible"
    }))

    /**
     * @description Sort groupByDatetimeArray by datetime and set to state
     */
    const groupByDatetimeArraySorted = groupByDatetimeArray.sort(
      (a, b) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime()
    )
    return groupByDatetimeArraySorted
  }

  useEffect(() => {
    if (stakingAll) {
      /**
       * @description Filter staking by type
       */
      const fixedStakeFilter = stakingAll.data.filter((s) => s.type === "fixed")
      const flexibleStakeFilter = stakingAll.data.filter(
        (s) => s.type === "flexible"
      )

      if (fixedStakeFilter && fixedStakeFilter.length > 0) {
        const result = handleGroupStakeByDate(fixedStakeFilter)
        if (result) setFixedStaking(result)
      }

      if (flexibleStakeFilter && flexibleStakeFilter.length > 0) {
        const result = handleGroupStakeByDate(flexibleStakeFilter)
        if (result) setFlexibleStaking(result)
      }
    }
  }, [stakingAll, profile])

  /**
   * @description Withdraw staked NAKA
   */
  const onWithdraw = () => {}

  /**
   * @description Claim staked NAKA
   */
  const onClaim = () => {}

  /**
   * @description Handle claim/withdraw events button
   */
  const handleRedeem = (_staked?: IMyLockedResponseData) => {
    const endDate = _staked ? dayjs(_staked.endDate) : dayjs()
    if (!_staked || endDate.isAfter(dayjs())) return

    const action = _staked.comInterest === 0 ? onWithdraw : onClaim
    action()
  }

  const handleStake = () => {}

  return {
    flexibleStaking,
    fixedStaking,
    handleRedeem,
    handleStake
  }
}

export default useGlobalStaking
