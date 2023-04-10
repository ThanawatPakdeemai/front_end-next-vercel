import { useQuery } from "@tanstack/react-query"
import { getEventTopScore } from "../services/events.service"

const useGetEventTopScore = (event_id: string, isTopScore: boolean) => {
  const {
    data: topScoreData,
    error,
    isLoading: topScoreIsLoading,
    isError
  } = useQuery({
    queryKey: ["getEventTopScore", event_id],
    queryFn: () => getEventTopScore(event_id),
    enabled: isTopScore && event_id !== "",
    keepPreviousData: true,
    staleTime: Infinity
  })
  return {
    topScoreData: topScoreData && topScoreData.data && topScoreData.data.data,
    error,
    topScoreIsLoading,
    isError
  }
}

export default useGetEventTopScore
