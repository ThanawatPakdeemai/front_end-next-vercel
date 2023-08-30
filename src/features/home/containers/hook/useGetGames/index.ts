import { useQuery } from "@tanstack/react-query"
import { getHomeSlide } from "@src/features/home/containers/services/home.service"

const useGetGames = () => {
  const {
    data: slideGames,
    error,
    isLoading,
    isError
  } = useQuery(["slideGames"], getHomeSlide, {
    staleTime: Infinity,
    cacheTime: 5 * 60 * 1000,
    onError: (_error) => {
      // eslint-disable-next-line no-console
      console.log("test-onError", _error)
    }
  })

  return {
    slideGames: slideGames && slideGames.length > 0 ? slideGames : undefined,
    error,
    isLoading,
    isError
  }
}

export default useGetGames
