import { useQuery } from "@tanstack/react-query"
import { getHomeSlide } from "@src/features/home/containers/services/home.service"
import { useOfflineNotification } from "@hooks/worker"
import { use } from "react"

const useGetGames = () => {
  // Destructure the result of useOfflineNotification directly
  const [isOnline] = useOfflineNotification()

  const {
    data: slideGames,
    error,
    isLoading,
    isError
  } = useQuery(["slideGames"], getHomeSlide, {
    staleTime: Infinity
  })

  // Function to determine the appropriate data based on online/offline status
  const determineData = () => {
    const cachedData = JSON.parse(localStorage.getItem("homeSlide") || "{}")

    if (!isOnline && cachedData && cachedData.length > 0) {
      return cachedData
    }
    if (slideGames && slideGames.length > 0) {
      return slideGames
    }
    return undefined
  }

  const slideGamesData = determineData()

  // eslint-disable-next-line no-console
  console.log("test-slideGamesData", slideGamesData)

  return {
    slideGames: slideGamesData,
    error,
    isLoading,
    isError
  }
}

export default useGetGames
