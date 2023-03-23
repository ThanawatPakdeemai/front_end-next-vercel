import { useQuery } from "@tanstack/react-query"
import { getEventDetail } from "../services/events.service"

const useGetEventDetail = (event_id: string) => {
  const {
    data: eventDetailData,
    error,
    isLoading: eventDetailIsLoading,
    isError
  } = useQuery({
    queryKey: ["getEventDetail", event_id],
    queryFn: () => getEventDetail(event_id),
    staleTime: Infinity
  })
  return {
    eventDetailData,
    error,
    eventDetailIsLoading,
    isError
  }
}

export default useGetEventDetail
