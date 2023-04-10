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
    keepPreviousData: true,
    staleTime: Infinity,
    enabled: event_id !== ""
  })
  return {
    eventDetailData:
      eventDetailData && eventDetailData.data && eventDetailData.data.length > 0
        ? eventDetailData.data[0]
        : undefined,
    error,
    eventDetailIsLoading,
    isError
  }
}

export default useGetEventDetail
