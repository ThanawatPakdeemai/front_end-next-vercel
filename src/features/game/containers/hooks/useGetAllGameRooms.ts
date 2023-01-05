import {
  IGameRoomDetailService,
  IGetAllGameRooms
} from "@feature/game/interfaces/IGameService"
import { useQuery } from "@tanstack/react-query"
import { getAllGameRooms } from "../services/game.service"

const useGetAllGameRooms = ({ _gameId, _email, _itemId }: IGetAllGameRooms) => {
  const {
    data: allGameRooms,
    error,
    isLoading,
    isError
  } = useQuery(["getAllGameRooms"], () =>
    getAllGameRooms({ _gameId, _email, _itemId })
  )

  if (isLoading) {
    return {
      isLoading
    }
  }
  if (isError) {
    return {
      isError,
      error
    }
  }
  if (allGameRooms && allGameRooms.gameRoomDetail.length > 0) {
    return {
      allGameRooms: allGameRooms.gameRoomDetail
    }
  }
  return {
    allGameRooms: undefined
  }
}

export default useGetAllGameRooms
