import { RewardType } from "@feature/notification/interfaces/INotificationService"
import { useQuery } from "@tanstack/react-query"
import {
  getGamePoolRewardByPoolId,
  getRewardByWeeklyPoolId,
  getWeeklyPoolByGameId
} from "../services/rewardWeekly.service"

interface IUseGetReward {
  _poolId: string
  _gameId: string
  _type: RewardType
}

const useGetReward = ({ _poolId, _gameId, _type }: IUseGetReward) => {
  const {
    data: dataGamePoolReward,
    error: errorGamePoolReward,
    isLoading: isLoadingGamePoolReward,
    isPreviousData: isPreviousDataGamePoolReward,
    isError: isErrorGamePoolReward,
    isSuccess: isSuccessGamePoolReward
  } = useQuery({
    queryKey: ["getGamePoolRewardByPoolId", _poolId],
    queryFn: () => getGamePoolRewardByPoolId(_poolId),
    keepPreviousData: true,
    staleTime: Infinity,
    enabled: !!_poolId && _type === "REWARD_GAME_POOL"
  })

  const {
    data: dataWeeklyPool,
    error: errorWeeklyPool,
    isLoading: isLoadingWeeklyPool,
    isPreviousData: isPreviousDataWeeklyPool,
    isError: isErrorWeeklyPool,
    isSuccess: isSuccessWeeklyPool
  } = useQuery({
    queryKey: ["getRewardByWeeklyPoolId", _poolId],
    queryFn: () => getRewardByWeeklyPoolId(_poolId),
    keepPreviousData: true,
    staleTime: Infinity,
    enabled: !!_poolId && _type === "REWARD_WEEKLY"
  })

  const {
    data: dataWeeklyPoolByGameId,
    error: errorWeeklyPoolByGameId,
    isLoading: isLoadingWeeklyPoolByGameId,
    isPreviousData: isPreviousDataWeeklyPoolByGameId,
    isError: isErrorWeeklyPoolByGameId,
    isSuccess: isSuccessWeeklyPoolByGameId,
    refetch: refetchWeeklyPoolByGameId,
    isFetching: isFetchingWeeklyPoolByGameId
  } = useQuery({
    queryKey: ["getWeeklyPoolByGameId", _gameId, _poolId],
    queryFn: () => getWeeklyPoolByGameId(_gameId, _poolId),
    keepPreviousData: true,
    staleTime: Infinity,
    enabled:
      (_gameId !== undefined || _gameId !== "" || _poolId !== undefined) &&
      _type === "REWARD_WEEKLY"
  })

  return {
    dataGamePoolReward: dataGamePoolReward?.data,
    errorGamePoolReward,
    isLoadingGamePoolReward,
    isPreviousDataGamePoolReward,
    isErrorGamePoolReward,
    isSuccessGamePoolReward,
    dataWeeklyPool: dataWeeklyPool?.data,
    errorWeeklyPool,
    isLoadingWeeklyPool,
    isPreviousDataWeeklyPool,
    isErrorWeeklyPool,
    isSuccessWeeklyPool,
    dataWeeklyPoolByGameId: dataWeeklyPoolByGameId?.data,
    errorWeeklyPoolByGameId,
    isLoadingWeeklyPoolByGameId,
    isPreviousDataWeeklyPoolByGameId,
    isErrorWeeklyPoolByGameId,
    isSuccessWeeklyPoolByGameId,
    refetchWeeklyPoolByGameId,
    isFetchingWeeklyPoolByGameId
  }
}
export default useGetReward
