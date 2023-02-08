import { useQuery } from "@tanstack/react-query"
import { IGetPropNakaPass } from "@feature/nakaPass/interfaces/INakaPassService"
import { getNakaPass } from "../services/nakaPass.service"

const useGetNakaPass = ({ player_id, game_id }: IGetPropNakaPass) => {
  const {
    data: balanceofItem,
    isLoading,
    isFetching,
    isPreviousData,
    isError,
    error
  } = useQuery({
    queryKey: ["getGetNakaPass", player_id, game_id],
    queryFn: () => getNakaPass({ player_id, game_id }),
    keepPreviousData: true,
    staleTime: Infinity,
    enabled:
      player_id !== "" ||
      game_id !== "" ||
      player_id !== undefined ||
      game_id !== undefined
  })

  return {
    balanceofItem,
    isLoading,
    isFetching,
    isPreviousData,
    isError,
    error
  }
}

export default useGetNakaPass
