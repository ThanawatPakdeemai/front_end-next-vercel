import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"
import useGlobal from "@hooks/useGlobal"
import { IGame } from "@feature/game/interfaces/IGameService"
import { getGameByPath } from "../services/game.service"

const useGetGameByPath = (_gamePath: string) => {
  const router = useRouter()
  const { typeGame } = router.query
  const { getTypeGamePathFolder } = useGlobal()
  const {
    data: gameDataByPath,
    error,
    isLoading,
    isError
  } = useQuery({
    queryKey: ["getGameByPath", { _gamePath }],
    queryFn: () => getGameByPath(_gamePath),
    retry: false,
    keepPreviousData: true,
    staleTime: Infinity,
    enabled: !!_gamePath
  })

  /**
   * @description Get current game data
   * @returns
   */
  const getCurrentGameData = () => {
    if (gameDataByPath && gameDataByPath.data.length > 0) {
      // When API reture more than 2 values
      const _foundedGame = gameDataByPath.data.find(
        (item: IGame) => getTypeGamePathFolder(item) === typeGame
      )
      if (_foundedGame) {
        return _foundedGame
      }
      // When API reture only 1 value
      return (gameDataByPath && gameDataByPath.data[0]) || undefined
    }
  }

  return {
    gameData: getCurrentGameData(),
    error,
    isLoading,
    isError
  }
}

export default useGetGameByPath
