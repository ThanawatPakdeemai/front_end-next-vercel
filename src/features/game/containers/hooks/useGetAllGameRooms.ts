import { IGetAllGameRooms } from "@feature/game/interfaces/IGameService"
import { useQuery } from "@tanstack/react-query"
import { getAllGameRooms } from "../services/game.service"

const useGetAllGameRooms = ({ _gameId, _email, _itemId }: IGetAllGameRooms) => {
  const {
    data: allGameRooms,
    error,
    isLoading,
    isError
  } = useQuery(
    ["getAllGameRooms"],
    () => getAllGameRooms({ _gameId, _email, _itemId }),
    {
      /* prevent hook state problem */
      staleTime: Infinity
    }
  )

  return {
    allGameRooms:
      allGameRooms && allGameRooms.gameRoomDetail.length > 0
        ? allGameRooms.gameRoomDetail
        : undefined,
    isLoading,
    isError,
    error
  }
}

export default useGetAllGameRooms
