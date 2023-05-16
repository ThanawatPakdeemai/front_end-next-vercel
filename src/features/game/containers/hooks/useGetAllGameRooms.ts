import { IGetAllGameRooms } from "@feature/game/interfaces/IGameService"
import { useQuery } from "@tanstack/react-query"
import useProfileStore from "@stores/profileStore"
import { getAllGameRooms } from "../services/game.service"

const useGetAllGameRooms = ({ _gameId, _email, _itemId }: IGetAllGameRooms) => {
  const { profile } = useProfileStore()
  const {
    data: allGameRooms,
    error,
    isLoading,
    isError,
    refetch: refetchAllGameRooms
  } = useQuery({
    queryKey: ["getAllGameRooms", { _gameId, _email, _itemId }, profile],
    queryFn: () => getAllGameRooms({ _gameId, _email, _itemId }),
    retry: false,
    enabled: !!_gameId || !!_email || !!_itemId,
    cacheTime: 0
  })

  return {
    allGameRooms: allGameRooms ? allGameRooms.gameRoomDetail : undefined,
    isLoading,
    isError,
    error,
    refetchAllGameRooms
  }
}

export default useGetAllGameRooms
