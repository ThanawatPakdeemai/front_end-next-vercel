import { useQuery } from "@tanstack/react-query"
import { IGetAllEventsProps } from "../../interface/IEventsService"
import { getEventList } from "../services/events.service"

const useGetEventList = ({ limit, skip, sort, search }: IGetAllEventsProps) => {
  const {
    data: eventListData,
    error,
    isLoading,
    isPreviousData,
    isError,
    isFetching
  } = useQuery({
    queryKey: ["getEventList", { limit, skip, sort, search }],
    queryFn: () => getEventList({ limit, skip, sort, search }),
    keepPreviousData: true,
    staleTime: Infinity
  })

  return {
    eventListData,
    error,
    isLoading,
    isPreviousData,
    isError,

    isFetching
  }
}

export default useGetEventList
