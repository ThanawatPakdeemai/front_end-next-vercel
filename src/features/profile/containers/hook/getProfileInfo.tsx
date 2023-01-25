import { IGetPlayerInfoByPlayerId } from "@feature/profile/interfaces/IProfileService"
import { useQuery } from "@tanstack/react-query"
import { getPlayerInfoByPlayerId } from "../services/profile.service"

const useGetProfileInfo = ({
  _playerId,
  _limit,
  _page,
  _sort
}: IGetPlayerInfoByPlayerId) => {
  const {
    data: getProfileInfo,
    error,
    isLoading,
    isError,
    isFetching
  } = useQuery({
    queryKey: ["getPlayerInfo", _playerId],
    queryFn: () => getPlayerInfoByPlayerId({ _playerId, _limit, _page, _sort }),
    staleTime: Infinity,
    enabled: _playerId !== "" && _playerId !== undefined
  })
  return {
    getProfileInfo,
    error,
    isLoading,
    isError,
    isFetching
  }
}

export default useGetProfileInfo
