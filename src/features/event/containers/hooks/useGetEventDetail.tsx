import { useQuery } from "@tanstack/react-query"
import { getEventDetail } from "../services/events.service"

const useGetEventDetail = (eventId: string) => {
  const {
    data: getEventDetailData,
    error,
    isLoading,
    isError
  } = useQuery({
    queryKey: ["getEventDetail", eventId],
    queryFn: () => getEventDetail(eventId),
    staleTime: Infinity
  })
  return {
    getEventDetailData,
    error,
    isLoading,
    isError
  }
}

export default useGetEventDetail
