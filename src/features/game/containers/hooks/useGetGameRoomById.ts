import { useQuery } from "@tanstack/react-query"
import { getGameRoomById } from "../services/game.service"

const useGetGameRoomById = (_roomId: string) => {
  const {
    data: gameRoomById,
    error,
    isLoading,
    isError
  } = useQuery(["getGameRoom", _roomId], () => getGameRoomById(_roomId), {
    /* prevent hook state problem */
    staleTime: Infinity,
    retry: false,
    enabled: _roomId !== "" && _roomId !== undefined
  })

  return {
    gameRoomById: gameRoomById || undefined,
    isLoading,
    isError,
    error
  }
}

export default useGetGameRoomById