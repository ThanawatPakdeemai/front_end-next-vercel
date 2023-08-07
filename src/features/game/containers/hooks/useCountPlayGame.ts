import { useMutation } from "@tanstack/react-query"
import { updatePlayCounting } from "../services/game.service"

const useCountPlayGame = () => {
  const {
    data: dataCountPlayGame,
    error: errorCountPlayGame,
    isLoading: isLoadingCountPlayGame,
    isError: isErrorCountPlayGame,
    mutateAsync: mutateUpdateCountPlayGame
  } = useMutation(updatePlayCounting, {
    mutationKey: ["updatePlayCounting"],
    retry: false
  })

  return {
    dataCountPlayGame,
    errorCountPlayGame,
    isLoadingCountPlayGame,
    isErrorCountPlayGame,
    mutateUpdateCountPlayGame
  }
}

export default useCountPlayGame
