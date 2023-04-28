import useProfileStore from "@stores/profileStore"
import { useQuery } from "@tanstack/react-query"
import { getNotificationById } from "../services/notification.service"

const useGetNotificationById = (_notificationId: string) => {
  const profile = useProfileStore((state) => state.profile.data)
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
    staleTime: Infinity,
    enabled: !!profile && !!_notificationId,
    retry: 3
  })

  return {
    dataNotificationItem: dataNotificationItem?.data,
    errorNotificationItem,
    isLoadingNotificationItem,
    isErrorNotificationItem,
    isFetchingNotificationItem,
    isPreviousDataNotificationItem
  }
}

export default useGetNotificationById
