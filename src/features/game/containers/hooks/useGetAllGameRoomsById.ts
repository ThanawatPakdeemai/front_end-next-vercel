import { IGameId } from "@feature/game/interfaces/IGameService"
import { useQuery } from "@tanstack/react-query"
import { getGameRoomWithoutEmail } from "../services/game.service"

const useGetAllGameRoomsById = ({ _gameId }: IGameId) => {
  const {
    data: allGameRoomsById,
    error,
    isLoading,
    isError,
    refetch: refetchAllGameRooms
  } = useQuery({
    queryKey: ["getAllGameRooms", { _gameId }],
    queryFn: () => getGameRoomWithoutEmail(_gameId),
    retry: false,
    enabled: !!_gameId,
    cacheTime: 0
  })

  return {
    allGameRoomsById: allGameRoomsById
      ? allGameRoomsById.gameRoomDetail
      : undefined,
    isLoading,
    isError,
    error,
    refetchAllGameRooms
  }
}

export default useGetAllGameRoomsById
