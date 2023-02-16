import { IGetHistory } from "@feature/history/interfaces/IHistoryService"
import { useQuery } from "@tanstack/react-query"
import { getHistory } from "../services/history.service"

const useHistory = ({ limit, skip, player_id }: IGetHistory) => {
  const {
    data: historyData,
    error: historyError,
    isLoading: historyIsLoading,
    isPreviousData: historyIsPreviousData,
    isError: historyIsError,
    isFetching: historyIsFetching
  } = useQuery({
    queryKey: ["getHistory", { limit, skip, player_id }],
    queryFn: () => getHistory({ limit, skip, player_id }),
    keepPreviousData: true,
    staleTime: Infinity
  })
  return {
    historyData,
    historyError,
    historyIsLoading,
    historyIsPreviousData,
    historyIsError,
    historyIsFetching
  }
}

export default useHistory
