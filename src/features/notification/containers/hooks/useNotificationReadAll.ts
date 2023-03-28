import useNotiStore from "@stores/notification"
import { useMutation } from "@tanstack/react-query"
import { updateAllNotiStatus } from "../services/notification.service"

const useNotificationReadAll = (_playerId: string) => {
  const { notificationAll, setNotificationCount } = useNotiStore()
  const {
    data: dataUpdateAllNotiStatus,
    error: errorUpdateAllNotiStatus,
    isLoading: isLoadingUpdateAllNotiStatus,
    isError: isErrorUpdateAllNotiStatus,
    mutateAsync: mutateUpdateAllNotiStatus
  } = useMutation(() => updateAllNotiStatus(_playerId), {
    mutationKey: ["updateAllNotiStatus"],
    retry: false,
    onSuccess() {
      if (notificationAll) {
        const _count = notificationAll.filter(
          (data) => data.read === false
        ).length
        setNotificationCount(_count)
      }
    }
  })

  return {
    dataUpdateAllNotiStatus,
    errorUpdateAllNotiStatus,
    isLoadingUpdateAllNotiStatus,
    isErrorUpdateAllNotiStatus,
    mutateUpdateAllNotiStatus
  }
}

export default useNotificationReadAll
