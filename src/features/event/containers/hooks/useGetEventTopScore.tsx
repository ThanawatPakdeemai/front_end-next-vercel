import { useQuery } from "@tanstack/react-query"
import { getEventTopScore } from "../services/events.service"

const useGetEventTopScore = (event_id: string, isTopScore: boolean) => {
  const {
    data: topScoreData,
    error,
    isFetched,
    isError
  } = useQuery({
    queryKey: ["getEventTopScore", event_id],
    queryFn: () => getEventTopScore(event_id),
    enabled: isTopScore,
    staleTime: Infinity
  })
  return {
    topScoreData,
    error,
    isFetched,
    isError
  }
}

export default useGetEventTopScore
