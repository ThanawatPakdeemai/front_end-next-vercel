import { IGetAllGameRooms } from "@feature/game/interfaces/IGameService"
import { useQuery } from "@tanstack/react-query"
import { getAllGameRooms } from "../services/game.service"

const useGetAllGameRooms = ({ _gameId, _email, _itemId }: IGetAllGameRooms) => {
  const {
    data: allGameRooms,
    error,
    isLoading,
    isError,
    refetch: refetchAllGameRooms
  } = useQuery({
    queryKey: ["getAllGameRooms", { _gameId, _email, _itemId }],
    queryFn: () => getAllGameRooms({ _gameId, _email, _itemId }),
    retry: false,
    enabled: _gameId !== "" && _email !== "" && _itemId !== ""
  })

  return {
    allGameRooms:
      allGameRooms && allGameRooms.gameRoomDetail.length > 0
        ? allGameRooms.gameRoomDetail
        : undefined,
    isLoading,
    isError,
    error,
    refetchAllGameRooms
  }
}

export default useGetAllGameRooms
