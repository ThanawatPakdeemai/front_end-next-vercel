import { useQuery } from "@tanstack/react-query"
import { getHomeSlide } from "../../services/home.service"

const useGetGames = () => {
  /**
   * @description Get game list slide. Set cache time 1 day
   */
  const {
    data: slideGames,
    error,
    isLoading,
    isError
  } = useQuery(["slideGames"], getHomeSlide, {
    cacheTime: 1000 * 60 * 60 * 24
  })
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
  if (slideGames && slideGames.length > 0) {
    return {
      // Filter game has image banner
      slideGames
    }
  }
  return {
    slideGames: []
  }
}

export default useGetGames
