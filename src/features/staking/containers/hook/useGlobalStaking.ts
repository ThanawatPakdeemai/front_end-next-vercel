import { MESSAGES } from "@constants/messages"
import {
  DEFAULT_STAKING_BASIC_DATA,
  DEFAULT_USER_STAKED_INFO
} from "@constants/staking"
import useContractStaking from "@feature/contract/containers/hooks/useContractStaking"
import { useToast } from "@feature/toast/containers"
import { useWeb3Provider } from "@providers/Web3Provider"
import {
  IStakingAll,
  IStakingBasicData,
  IStakingGroup,
  IUserStakedInfo,
  TStaking
} from "@src/types/staking"
import useProfileStore from "@stores/profileStore"
import { useQuery } from "@tanstack/react-query"
import dayjs from "dayjs"
import { useCallback, useMemo, useState } from "react"
import { getStakingAll } from "../services/staking.service"

const useGlobalStaking = () => {
  const _limit = 9999
  const _skip = 1

  const profile = useProfileStore((state) => state.profile.data)
  const { address } = useWeb3Provider()
  const { errorToast, successToast } = useToast()

  // Hooks
  const { getBasicStakingData, getUserStakedInfo, claimReward, withdrawNaka } =
    useContractStaking()

  // State
  const [fixedStaking, setFixedStaking] = useState<IStakingGroup[]>([])
  const [flexibleStaking, setFlexibleStaking] = useState<IStakingGroup[]>([])

  const [basicStakeInfo, setBasicStakeInfo] = useState<IStakingBasicData>()
  const [userStakedInfo, setUserStakedInfo] = useState<IUserStakedInfo>()

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
      const date1 = dayjs(staking.start_stake_time)
      const date2 = dayjs(staking.end_stake_time)
      const diff = date2.diff(date1, "day")
      // dataBasic
      //     ? dataBasic.find(
      //         (item) => item.addressContract === staking.contract_address
      //       )
      group[start_stake_time].push({
        ...staking,
        "period": diff
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
   * @description Fetch staking info
   */
  const fetchStakingInfo = useCallback(
    async (_contractAddress: string, _stakingTypes: TStaking) => {
      const resultBasic = await getBasicStakingData(
        _contractAddress,
        _stakingTypes
      )
      setBasicStakeInfo(resultBasic || {})

      if (profile?.address) {
        const resultStakedInfo = await getUserStakedInfo(
          _contractAddress,
          profile.address,
          _stakingTypes
        )
        setUserStakedInfo(resultStakedInfo || {})
      }
    },
    [profile, getBasicStakingData, getUserStakedInfo]
  )

  /**
   * @description When click refresh staking info
   * @param _contractAddress
   * @param _stakingTypes
   */
  const onRefresh = (_contractAddress: string, _stakingTypes: TStaking) => {
    setBasicStakeInfo(DEFAULT_STAKING_BASIC_DATA)
    setUserStakedInfo(DEFAULT_USER_STAKED_INFO)
    fetchStakingInfo(_contractAddress, _stakingTypes)
  }

  /**
   * @description Withdraw staked NAKA
   */
  const onWithdraw = async (
    _basicStakeInfo?: IStakingBasicData,
    _userStakedInfo?: IUserStakedInfo
  ) => {
    if (
      profile &&
      profile.address === address &&
      _basicStakeInfo &&
      _userStakedInfo
    ) {
      const result = await withdrawNaka(
        _basicStakeInfo.addressContract,
        _basicStakeInfo.stakeType
      )
      if (result) {
        successToast(MESSAGES.withdraw_success)
        onRefresh(_basicStakeInfo.addressContract, _basicStakeInfo.stakeType)
      } else {
        errorToast(MESSAGES.withdraw_error)
      }
    }
  }

  /**
   * @description Claim staked NAKA
   */
  const onClaim = async (
    _basicStakeInfo?: IStakingBasicData,
    _userStakedInfo?: IUserStakedInfo
  ) => {
    if (
      profile &&
      profile.address === address &&
      _basicStakeInfo &&
      _userStakedInfo
    ) {
      // console.log("account", account)
      const result = await claimReward(
        _userStakedInfo.comInterestBN.toString(),
        _basicStakeInfo.addressContract,
        _basicStakeInfo.stakeType
      )
      if (result) {
        successToast(MESSAGES.claim_success)
        onRefresh(_basicStakeInfo.addressContract, _basicStakeInfo.stakeType)
      } else {
        errorToast(MESSAGES.claim_error)
      }
      // console.log("resultBasic", resultBasic)
    }
  }

  /**
   * @description Handle claim/withdraw events button
   */
  const handleClaimWithdraw = (
    _basicStakeInfo?: IStakingBasicData,
    _userStakedInfo?: IUserStakedInfo
  ) => {
    if (_userStakedInfo && _userStakedInfo.comInterest === 0) {
      onWithdraw(_basicStakeInfo, _userStakedInfo)
    } else {
      onClaim(_basicStakeInfo, _userStakedInfo)
    }
  }

  const handleStake = () => {}

  /**
   * @description Handle group staking by date
   */
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
    handleStake,
    basicStakeInfo,
    userStakedInfo,
    fetchStakingInfo,
    onRefresh
  }
}

export default useGlobalStaking
