import { useQuery } from "@tanstack/react-query"
import { getEventLeaderBoard } from "../services/events.service"

const useGetEventLeaderBoard = (event_id: string, isShareAndPlay: boolean) => {
  const {
    data: leaderBoardData,
    error,
    isLoading: leaderBoardIsLoading,
    isError
  } = useQuery({
    queryKey: ["getEventLeaderBoard", event_id],
    queryFn: () => getEventLeaderBoard(event_id),
    enabled: isShareAndPlay && event_id !== "",
    keepPreviousData: true,
    staleTime: Infinity
  })
  return {
    leaderBoardData: leaderBoardData && leaderBoardData.data,
    error,
    leaderBoardIsLoading,
    isError
  }
}

export default useGetEventLeaderBoard
