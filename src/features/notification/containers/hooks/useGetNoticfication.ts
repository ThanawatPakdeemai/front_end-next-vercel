import { useQuery } from "@tanstack/react-query"
import { getNotificationById } from "../services/notification.service"
import { INotification } from "../../interfaces/INotificationService"

const useGetNoticfication = ({ player_id }: INotification) => {
  const { data, isLoading, isFetching, isPreviousData, isError, error } =
    useQuery({
      queryKey: ["noticficationPage", player_id],
      queryFn: () => getNotificationById(player_id),
      keepPreviousData: true,
      staleTime: Infinity
    })
  return { data, isLoading, isFetching, isPreviousData, isError, error }
}

export default useGetNoticfication
