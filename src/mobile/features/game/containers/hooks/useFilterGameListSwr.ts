import useSWR from "swr"
import { IPayloadGameFilter } from "@feature/game/interfaces/IGameService"
import { getGameAllFilter } from "@feature/game/containers/services/game.service"

const useFilterGameListSwr = (body: IPayloadGameFilter) => {
  const fetchGameAllFilter = async () => {
    const response = await getGameAllFilter(body)
    return response.data
  }

  const { data, isLoading, error, mutate } = useSWR(
    "gameAllFilter",
    fetchGameAllFilter,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      shouldRetryOnError: false
    }
  )

  return {
    gameAllFilterData: data,
    gameAllFilterIsLoading: isLoading,
    gameAllFilterError: error,
    mutateGameAllFilter: mutate
  }
}

export default useFilterGameListSwr
