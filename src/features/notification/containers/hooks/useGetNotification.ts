import { useQuery } from "@tanstack/react-query"
import { getAllNotification } from "../services/notification.service"

interface IProps {
  limit: number
  skip: number
  player_id?: string
}
const useGetNotification = ({ player_id, limit, skip }: IProps) => {
  const {
    data: dataNotification,
    isLoading: isLoadingNotification,
    isFetching: isFetchingNotification,
    isPreviousData: isPreviousDataNotification,
    isError: isErrorNotification,
    error: errorNotification
  } = useQuery({
    queryKey: ["notificationPage", limit, skip],
    queryFn: () => getAllNotification(limit, skip),
    keepPreviousData: true,
    staleTime: Infinity,
    enabled: !!player_id
  })

  return {
    dataNotification,
    isLoadingNotification,
    isFetchingNotification,
    isPreviousDataNotification,
    isErrorNotification,
    errorNotification
  }
}

export default useGetNotification
