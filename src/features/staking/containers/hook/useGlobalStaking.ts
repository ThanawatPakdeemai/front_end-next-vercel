import {
  IStakingAll,
  IStakingGroup,
  IUserStakedInfo,
  TStaking
} from "@src/types/staking"
import { useQuery } from "@tanstack/react-query"
import { useMemo, useState } from "react"
import { getStakingAll } from "../services/staking.service"

const useGlobalStaking = () => {
  const _limit = 9999
  const _skip = 1

  // Hooks

  // const { getBasicStakingData, getUserStakedInfo, handleAPR } =
  //   useContractStaking()

  // State
  const [fixedStaking, setFixedStaking] = useState<IStakingGroup[]>([])
  const [flexibleStaking, setFlexibleStaking] = useState<IStakingGroup[]>([])
  // const [basicData, setBasicData] = useState<IStakingBasicData[]>([])

  // const fetchBasicStakingInfo = async (
  //   _contractAddress: string,
  //   _stakingTypes: TStaking
  // ) => {
  //   const resultBasic = await getBasicStakingData(
  //     _contractAddress,
  //     _stakingTypes
  //   )
  //   return resultBasic
  // }

  // const fecthDataBasicStake = async (_staking: IStakingAll[]) => {
  //   const stakeWithInfo: IStakingBasicData[] = []
  //   for (let index = 0; index < _staking.length; index++) {
  //     const result = await getBasicStakingData(
  //       _staking[index].contract_address,
  //       _staking[index].type
  //     )
  //     if (result) stakeWithInfo.push(result)
  //   }
  //   return stakeWithInfo
  // }

  // const fecthDataBasicStake = async (_staking: IStakingAll[]) => {
  //   const stakeWithInfo: IStakingBasicData[] = []
  //   for (let index = 0; index < _staking.length; index++) {
  //     const result = await getBasicStakingData(
  //       _staking[index].contract_address,
  //       _staking[index].type
  //     )
  //     if (result) stakeWithInfo.push(result)
  //   }
  //   return stakeWithInfo
  // }

  // const fecthUserStakedInfo = async (_staking: IStakingAll[]) => {
  //   const userStakedInfo: IUserStakedInfo[] = []
  //   for (let index = 0; index < _staking.length; index++) {
  //     const result = await getUserStakedInfo(
  //       _staking[index].contract_address,
  //       "0x75c3c967b26526b3a7775f1594bfB906C2739E43",
  //       _staking[index].type
  //     )
  //     if (result) userStakedInfo.push(result)
  //   }
  //   return userStakedInfo
  // }

  /**
   * @description Get all staking
   */
  const { data: stakingAll } = useQuery({
    queryKey: ["StakingAll", { _limit, _skip }],
    queryFn: () => getStakingAll({ _limit, _skip }),
    keepPreviousData: true,
    staleTime: Infinity
  })

  const handleGroupStakeByDate = async (_staking: IStakingAll[]) => {
    // const dataBasic = await fecthDataBasicStake(_staking)
    // console.log("dataBasic", dataBasic)

    /**
     * @description Group staking by start_stake_time
     */
    const groupByDatetime = _staking.reduce((group, staking) => {
      const { start_stake_time } = staking
      group[start_stake_time] = group[start_stake_time] ?? []
      // const date1 = dayjs(staking.start_stake_time)
      // const date2 = dayjs(staking.end_stake_time)
      // const diff = date2.diff(date1, "day")
      // console.log("diff", diff)
      // const _period = handleAPR(diff)
      // dataBasic
      //     ? dataBasic.find(
      //         (item) => item.addressContract === staking.contract_address
      //       )
      group[start_stake_time].push({
        ...staking
        // "period": _period || 0,
        // "dataBasicStake": null,
        // "userStakedInfo": null
      })

      return group
    }, {})

    /**
     * @description Convert groupByDatetime to array
     */
    const groupByDatetimeArray: IStakingGroup[] = Object.keys(
      groupByDatetime
    ).map((key, index) => ({
      "datetime": key,
      "dataAPI": groupByDatetime[key],
      "type":
        groupByDatetime[key][index] &&
        (groupByDatetime[key][index].type as TStaking)
    }))

    /**
     * @description Sort groupByDatetimeArray by datetime and set to state
     */
    const groupByDatetimeArraySorted = groupByDatetimeArray.sort(
      (a, b) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime()
    )

    return groupByDatetimeArraySorted
  }

  /**
   * @description Withdraw staked NAKA
   */
  // const onWithdraw = () => {}

  /**
   * @description Claim staked NAKA
   */
  // const onClaim = () => {}

  /**
   * @description Handle claim/withdraw events button
   */
  const handleClaimWithdraw = (_userStakedInfo?: IUserStakedInfo) => {
    // const endDate = _staked ? dayjs(_staked.endDate) : dayjs()
    // if (!_staked || endDate.isAfter(dayjs())) return
    // const action = _staked.comInterest === 0 ? onWithdraw : onClaim
    // action()
  }

  const handleStake = () => {}

  useMemo(async () => {
    if (stakingAll) {
      /**
       * @description Filter staking by type
       */
      const fixedStakeFilter = stakingAll.data.filter((s) => s.type === "fixed")
      const flexibleStakeFilter = stakingAll.data.filter(
        (s) => s.type === "flexible"
      )

      if (fixedStakeFilter && fixedStakeFilter.length > 0) {
        const result = await handleGroupStakeByDate(fixedStakeFilter)
        if (result) setFixedStaking(result)
      }

      if (flexibleStakeFilter && flexibleStakeFilter.length > 0) {
        const result = await handleGroupStakeByDate(flexibleStakeFilter)
        if (result) {
          setFlexibleStaking(result)
        }
      }
    }
  }, [stakingAll])

  return {
    flexibleStaking,
    fixedStaking,
    handleClaimWithdraw,
    handleStake
  }
}

export default useGlobalStaking
