import useSWR from "swr"
import { getAllNotification } from "../services/notification.service"

interface IProps {
  limit: number
  skip: number
  player_id?: string
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const useGetNotificationSWR = ({ player_id, limit, skip }: IProps) => {
  const notificationKey = ["notificationPage", limit, skip]

  const { data: dataNotification, error: errorNotification } = useSWR(
    player_id ? notificationKey : null,
    () => getAllNotification(limit, skip),
    {
      dedupingInterval: Infinity,
      revalidateOnFocus: false,
      shouldRetryOnError: false,
      errorRetryCount: 0,
      errorRetryInterval: 0,
      fetcher
    }
  )

  const isLoadingNotification = !dataNotification && !errorNotification
  const isFetchingNotification = !!dataNotification && !errorNotification
  const isErrorNotification = !!errorNotification

  return {
    dataNotification,
    isLoadingNotification,
    isFetchingNotification,
    isErrorNotification,
    errorNotification
  }
}

export default useGetNotificationSWR
