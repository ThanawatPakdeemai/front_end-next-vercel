import { useQuery } from "@tanstack/react-query"
import { getNotificationById } from "../services/notification.service"

interface IProps {
  player_id: string
}
const useGetNotification = ({ player_id }: IProps) => {
  const {
    data: dataNotification,
    isLoading: isLoadingNotification,
    isFetching: isFetchingNotification,
    isPreviousData: isPreviousDataNotification,
    isError: isErrorNotification,
    error: errorNotification
  } = useQuery({
    queryKey: ["notificationPage", player_id],
    queryFn: () => getNotificationById(player_id),
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
