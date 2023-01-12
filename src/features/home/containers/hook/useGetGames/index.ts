import { useQuery } from "@tanstack/react-query"
import { getHomeSlide } from "../../services/home.service"

const useGetGames = () => {
  const {
    data: slideGames,
    error,
    isLoading,
    isError
  } = useQuery(["slideGames"], getHomeSlide, {
    cacheTime: 1000 * 60 * 60 * 24
  })

  return {
    slideGames: slideGames && slideGames.length > 0 ? slideGames : undefined,
    error,
    isLoading,
    isError
  }
}

export default useGetGames
