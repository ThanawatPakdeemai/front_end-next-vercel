import { useQuery } from "@tanstack/react-query"
import { IRoomAvaliableDataChannel } from "@feature/home/interfaces/IHomeService"
import { getGameRoomAvailable } from "../services/home.service"

const useGetRoomAvailable = () => {
  const { data, error, isLoading, isError } = useQuery(
    ["getRoomAvailable"],
    getGameRoomAvailable,
    {
      staleTime: Infinity
    }
  )

  return {
    gamesAvailble: data as unknown as IRoomAvaliableDataChannel[],
    error,
    isLoading,
    isError
  }
}

export default useGetRoomAvailable
