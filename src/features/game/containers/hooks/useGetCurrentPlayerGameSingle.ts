import { useQuery, useMutation } from "@tanstack/react-query"
import { IGetPlayerInRoom } from "@feature/game/interfaces/IGameService"
import { getPlayerInRoom } from "../services/game.service"

const useGetCurrentPlayerGameSingle = () => {
  const {
    data: playerGameSingle,
    error,
    isLoading,
    isError,
    mutate: fetchPlayerGameSingle
  } = useMutation({
    mutationFn: ({ _roomId, _playerId, _type }: IGetPlayerInRoom) =>
      getPlayerInRoom({ _roomId, _playerId, _type }),
    retry: false
  })
  return {
    playerGameSingle: playerGameSingle || undefined,
    isLoading,
    isError,
    error,
    fetchPlayerGameSingle
  }
}

export default useGetCurrentPlayerGameSingle
