import useNotiStore from "@stores/notification"
import { useMutation } from "@tanstack/react-query"
import { updateNotiStatusById } from "../services/notification.service"

const useNotificationRead = (_notificationId: string) => {
  const { notificationAll } = useNotiStore()
  const { setNotificationCount } = useNotiStore()
  const {
    data: dataUpdateNotiStatusById,
    error: errorUpdateNotiStatusById,
    isLoading: isLoadingUpdateNotiStatusById,
    isError: isErrorUpdateNotiStatusById,
    mutateAsync: mutateUpdateNotiStatusById
  } = useMutation(() => updateNotiStatusById(_notificationId), {
    mutationKey: ["updateNotiStatusById"],
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
    dataUpdateNotiStatusById,
    errorUpdateNotiStatusById,
    isLoadingUpdateNotiStatusById,
    isErrorUpdateNotiStatusById,
    mutateUpdateNotiStatusById
  }
}

export default useNotificationRead
