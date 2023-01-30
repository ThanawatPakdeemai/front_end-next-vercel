import {
  getGameById,
  getGamePartnerById
} from "@feature/game/containers/services/game.service"
import { IGetType } from "@feature/game/interfaces/IGameService"
import { useQuery } from "@tanstack/react-query"

interface IProps {
  _gameId: string
  _type?: IGetType
}

const useGamesById = ({ _gameId, _type }: IProps) => {
  const {
    data: dataGame,
    isLoading,
    isFetching,
    isPreviousData,
    isError,
    error
  } = useQuery({
    queryKey: ["getGameById", _gameId],
    queryFn:
      _type === "partner-game"
        ? () => getGamePartnerById(_gameId)
        : () => getGameById(_gameId),
    keepPreviousData: true,
    staleTime: Infinity,
    enabled: _gameId !== "" && _gameId !== undefined
  })

  return { dataGame, isLoading, isFetching, isPreviousData, isError, error }
}

export default useGamesById
