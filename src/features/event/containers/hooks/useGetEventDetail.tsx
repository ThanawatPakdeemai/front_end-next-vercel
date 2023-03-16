import { useQuery } from "@tanstack/react-query"
import { getEventDetail } from "../services/events.service"

const useGetEventDetail = (event_id) => {
  const {
    data: eventDetailData,
    error,
    isLoading,
    isError
  } = useQuery({
    queryKey: ["getEventDetail", event_id],
    queryFn: () => getEventDetail(event_id),
    staleTime: Infinity
  })
  return {
    eventDetailData,
    error,
    isLoading,
    isError
  }
}

export default useGetEventDetail
