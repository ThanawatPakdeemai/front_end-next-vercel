import { IOwnerCommission } from "@feature/game/interfaces/IGameService"
import { useQuery } from "@tanstack/react-query"
import { checkGameOwner } from "../services/game.service"

const useCheckGameOwner = ({ game_id, start, end }: IOwnerCommission) => {
  const {
    data: checkOwnerData,
    error,
    isLoading,
    isError,
    isFetching
  } = useQuery({
    queryKey: ["checkOwner", { game_id, start, end }],
    queryFn: () => checkGameOwner({ game_id, start, end }),
    staleTime: Infinity,
    enabled: !!game_id
  })
  return {
    checkOwnerData,
    error,
    isLoading,
    isError,
    isFetching
  }
}

export default useCheckGameOwner
