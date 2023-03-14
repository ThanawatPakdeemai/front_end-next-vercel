import { IGetPlayerInfoByPlayerId } from "@feature/profile/interfaces/IProfileService"
import { useQuery } from "@tanstack/react-query"
import { getPlayerInfoByPlayerId } from "../services/profile.service"

const useGetProfileInfo = ({
  _playerId,
  _limit,
  _page,
  _sort,
  _cheat,
  _rewards_send_status
}: IGetPlayerInfoByPlayerId) => {
  const {
    data: getProfileInfo,
    error,
    isLoading,
    isError,
    isFetching,
    isPreviousData,
    refetch: refetchGetProfile
  } = useQuery({
    queryKey: ["getPlayerInfo", _playerId],
    queryFn: () =>
      getPlayerInfoByPlayerId({
        _playerId,
        _limit,
        _page,
        _sort,
        _cheat,
        _rewards_send_status
      }),
    staleTime: Infinity,
    enabled: !!_playerId && !!_playerId.length,
    keepPreviousData: false,
    retry: false
  })
  return {
    getProfileInfo,
    error,
    isLoading,
    isError,
    isFetching,
    isPreviousData,
    refetchGetProfile
  }
}

export default useGetProfileInfo
