import { IGetAllGameRooms } from "@feature/game/interfaces/IGameService"
import { useMutation } from "@tanstack/react-query"
import { getAllGameRooms } from "../services/game.service"

const useGetAllGameRooms = () => {
  const {
    data: allGameRooms,
    error,
    isLoading,
    isError,
    mutate: fetchAllGameRoom
  } = useMutation(
    ({ _gameId, _email, _itemId }: IGetAllGameRooms) =>
      getAllGameRooms({ _gameId, _email, _itemId }),
    {
      retry: false
    }
  )

  return {
    allGameRooms:
      allGameRooms && allGameRooms.gameRoomDetail.length > 0
        ? allGameRooms.gameRoomDetail
        : undefined,
    isLoading,
    isError,
    error,
    fetchAllGameRoom
  }
}

export default useGetAllGameRooms
