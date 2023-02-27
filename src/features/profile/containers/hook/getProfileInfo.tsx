import { IGetPlayerInfoByPlayerId } from "@feature/profile/interfaces/IProfileService"
import { useQuery } from "@tanstack/react-query"
import { getPlayerInfoByPlayerId } from "../services/profile.service"

// const useGetProfileInfo = () => {
//   const {
//     data: response,
//     isLoading,
//     mutateAsync: mutateGetPlayerInfo
//   } = useMutation(getPlayerInfoByPlayerId, {
//     mutationKey: ["getPlayerInfoByPlayerId"],
//     retry: false
//   })

//   return {
//     response,
//     isLoading,
//     mutateGetPlayerInfo
//   }
// }

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
    enabled: _playerId !== "" && _playerId !== undefined,
    keepPreviousData: true
    // retry: false
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
