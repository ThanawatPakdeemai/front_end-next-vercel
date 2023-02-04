import { IStakingAll, IStakingGroup } from "@src/types/staking"
import { useQuery } from "@tanstack/react-query"
import dayjs from "dayjs"
import { useEffect, useState } from "react"
import { getStakingAll } from "../services/staking.service"

const useGlobalStaking = () => {
  const _limit = 9999
  const _skip = 1

  // State
  const [fixedAPRStaking, setFixedAPRStaking] = useState<IStakingAll[]>([])
  const [fixedAPRGroupByDate, setFixedAPRGroupByDate] = useState<
    IStakingGroup[]
  >([])
  const [flexibleAPRStaking, setFlexibleARPStaking] = useState<IStakingAll[]>(
    []
  )

  /**
   * @description Get all staking
   */
  const { data: stakingAll } = useQuery({
    queryKey: ["StakingAll", { _limit, _skip }],
    queryFn: () => getStakingAll({ _limit, _skip }),
    keepPreviousData: true,
    staleTime: Infinity
  })

  useEffect(() => {
    if (stakingAll) {
      /**
       * @description Filter staking by type
       */
      const fixedStaking = stakingAll.data.filter((s) => s.type === "fixed")
      const variableAPRStaking = stakingAll.data.filter(
        (s) => s.type === "flexible"
      )
      setFixedAPRStaking(fixedStaking)
      setFlexibleARPStaking(variableAPRStaking)

      if (fixedStaking && fixedStaking.length > 0) {
        /**
         * @description Group staking by start_stake_time
         */
        const groupByDatetime = fixedStaking.reduce((group, staking) => {
          const { start_stake_time } = staking
          group[start_stake_time] = group[start_stake_time] ?? []
          group[start_stake_time].push(staking)
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
          "type": groupByDatetime[key][index].type
        }))

        /**
         * @description Sort groupByDatetimeArray by datetime and set to state
         */
        const groupByDatetimeArraySorted = groupByDatetimeArray.sort(
          (a, b) =>
            new Date(b.datetime).getTime() - new Date(a.datetime).getTime()
        )
        setFixedAPRGroupByDate(groupByDatetimeArraySorted)
      }
    }
  }, [stakingAll])

  return {
    fixedAPRStaking,
    flexibleAPRStaking,
    fixedAPRGroupByDate
  }
}

export default useGlobalStaking
