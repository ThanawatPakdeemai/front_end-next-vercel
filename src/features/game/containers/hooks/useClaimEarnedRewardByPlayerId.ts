import { useMutation } from "@tanstack/react-query"
import { claimEarnedRewardByPlayerId } from "../services/game.service"

const useClaimReward = () => {
  const {
    data: resClaimReward,
    error,
    isLoading,
    isError,
    isSuccess,
    mutateAsync: mutateClaimReward
  } = useMutation(claimEarnedRewardByPlayerId, {
    mutationKey: ["claimEarnedRewardBy"],
    retry: false
  })

  return {
    resClaimReward,
    error,
    isLoading,
    isError,
    isSuccess,
    mutateClaimReward
  }
}

export default useClaimReward
