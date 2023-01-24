import { useQuery } from "@tanstack/react-query"
import { getSummaryGameByRoomId } from "../services/game.service"

const useGetSummaryGameByRoomId = (_roomId: string) => {
  const {
    data: summaryGameData,
    error,
    isLoading,
    isError
  } = useQuery(
    ["getSummaryGame", _roomId],
    () => getSummaryGameByRoomId(_roomId),
    {
      /* prevent hook state problem */
      staleTime: Infinity,
      retry: false,
      enabled: _roomId !== "" && _roomId !== undefined
    }
  )

  return {
    summaryGameData: summaryGameData || undefined,
    isLoading,
    isError,
    error
  }
}

export default useGetSummaryGameByRoomId
