import { useQuery } from "@tanstack/react-query"
import { IGetAllEventsProps } from "../../interface/IEventsService"
import { getEventAll } from "../services/events.service"

const useGetEvents = ({ limit, skip, sort, search }: IGetAllEventsProps) => {
  const {
    data: getEventAllData,
    error,
    isLoading,
    isPreviousData,
    isError,
    isFetching
  } = useQuery({
    queryKey: ["getEventAll", { limit, skip, sort, search }],
    queryFn: () => getEventAll({ limit, skip, sort, search }),
    keepPreviousData: true,
    staleTime: Infinity
  })

  return {
    getEventAllData,
    error,
    isLoading,
    isPreviousData,
    isError,

    isFetching
  }
}

export default useGetEvents
