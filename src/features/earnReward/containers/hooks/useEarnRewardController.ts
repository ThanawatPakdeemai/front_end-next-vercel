import useClaimReward from "@feature/game/containers/hooks/useClaimEarnedRewardByPlayerId"
import useGetP2ERewardByPlayerId from "@feature/game/containers/hooks/useGetP2ERewardByPlayerId"
import { useToast } from "@feature/toast/containers"
import { IPlayToEarnRewardData } from "@src/types/games"
import useProfileStore from "@stores/profileStore"
import { useEffect, useState } from "react"

const useEarnRewardController = () => {
  const { profile } = useProfileStore()
  const [earnReward, setEarnRewardList] = useState<IPlayToEarnRewardData[]>([])
  const [isLoadingReward, setIsLoadingReward] = useState(true)
  const { mutateClaimReward } = useClaimReward()
  const { earnRewardData, refetchRewardData } = useGetP2ERewardByPlayerId(
    profile.data ? profile.data.id : ""
  )
  const { successToast, errorToast, warnToast } = useToast()

  const countUnClaim = earnReward ? earnReward.length : 0

  /**
   * @description When click claim reward
   * @param reward_id
   */
  const handleClaimReward = (reward_id: string) => {
    if (profile.data && profile.data.id) {
      mutateClaimReward({
        _playerId: profile.data.id,
        _rewardId: reward_id
      })
        .then((res) => {
          if (res.status && earnReward) {
            const updateData = earnReward.filter(
              (_item) => _item._id !== reward_id
            )
            setEarnRewardList(updateData)
            successToast(res.data)
          }
        })
        .catch((err) => {
          errorToast(err.message)
        })
      setTimeout(() => {
        refetchRewardData()
      }, 1000)
    }
  }

  const onClaimAll = () => warnToast("Claim all is not available yet")

  useEffect(() => {
    let load = false

    if (!load) {
      if (earnRewardData && earnRewardData.data.length > 0) {
        setEarnRewardList(earnRewardData.data)
        setIsLoadingReward(false)
      } else {
        setEarnRewardList([])
        setIsLoadingReward(false)
      }
    }

    return () => {
      load = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [earnRewardData, refetchRewardData])

  return {
    isLoadingReward,
    earnReward,
    countUnClaim,
    handleClaimReward,
    onClaimAll
  }
}

export default useEarnRewardController
