import { useQuery } from "@tanstack/react-query"
import { getNotificationById } from "../services/notification.service"

const useGetNotificationById = (_notificationId: string) => {
  const {
    data: dataNotificationItem,
    error: errorNotificationItem,
    isLoading: isLoadingNotificationItem,
    isError: isErrorNotificationItem,
    isFetching: isFetchingNotificationItem,
    isPreviousData: isPreviousDataNotificationItem
  } = useQuery({
    queryKey: ["getNotificationById", _notificationId],
    queryFn: () => getNotificationById(_notificationId),
    keepPreviousData: true,
    staleTime: Infinity
  })

  return {
    dataNotificationItem,
    errorNotificationItem,
    isLoadingNotificationItem,
    isErrorNotificationItem,
    isFetchingNotificationItem,
    isPreviousDataNotificationItem
  }
}

export default useGetNotificationById
