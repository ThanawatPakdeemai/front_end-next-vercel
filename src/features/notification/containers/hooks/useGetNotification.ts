import { useQuery } from "@tanstack/react-query"
import { getNotificationById } from "../services/notification.service"
// import { INotification } from "../../interfaces/INotificationService"

interface IProps {
  player_id: string
}
const useGetNotification = ({ player_id }: IProps) => {
  const { data, isLoading, isFetching, isPreviousData, isError, error } =
    useQuery({
      queryKey: ["notificationPage", player_id],
      queryFn: () => getNotificationById(player_id),
      keepPreviousData: true,
      staleTime: Infinity,
      enabled: player_id !== "" || player_id !== undefined
    })
  return { data, isLoading, isFetching, isPreviousData, isError, error }
}

export default useGetNotification
