import { IGetAllGameRooms } from "@feature/game/interfaces/IGameService"
import { useQuery } from "@tanstack/react-query"
import { getAllGameRooms } from "../services/game.service"

const useGetAllGameRooms = ({ _gameId, _email, _itemId }: IGetAllGameRooms) => {
  const {
    data: allGameRooms,
    error,
    isLoading,
    isError,
    refetch
  } = useQuery(
    ["getAllGameRooms"],
    () => getAllGameRooms({ _gameId, _email, _itemId }),
    {
      /* prevent hook state problem */
      staleTime: Infinity,
      retry: false,
      refetchInterval: 10000
    }
  )

  if (!allGameRooms) {
    refetch()
  }

  return {
    allGameRooms:
      allGameRooms && allGameRooms.gameRoomDetail.length > 0
        ? allGameRooms.gameRoomDetail
        : undefined,
    isLoading,
    isError,
    error,
    refetch
  }
}

export default useGetAllGameRooms
