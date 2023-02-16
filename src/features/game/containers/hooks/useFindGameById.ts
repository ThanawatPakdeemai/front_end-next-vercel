import { getGameById } from "@feature/game/containers/services/game.service"
import {
  IGamePartnerService,
  IGameService,
  IGetType
} from "@feature/game/interfaces/IGameService"
import { getGamePartnerById } from "@feature/game/partnerGames/containers/services/gamePartners.service"
import { useQuery } from "@tanstack/react-query"

/**
 * @description Find game by id available for all game types
 * @param gameId
 * @param gameType - game type
 * @returns gameDataById: IGameService | undefined
 */
const useFindGameById = (gameId: string, gameType: IGetType) => {
  const {
    data: gamePartner,
    isLoading: isLoadingPartner,
    isFetching: isFetchingPartner,
    isPreviousData: isPreviousDataPartner,
    isError: isErrorPartner,
    error: errorPartner,
    isFetched: isFetchedPartner
  } = useQuery<IGamePartnerService>({
    queryKey: ["getGamePartnerById", gameId],
    queryFn: () => getGamePartnerById(gameId),
    keepPreviousData: true,
    staleTime: Infinity,
    enabled: gameType === "partner-game"
  })

  const {
    data: gameDataById,
    isLoading: isLoadingGameData,
    isFetching: isFetchingGameData,
    isPreviousData: isPreviousDataGameData,
    isError: isErrorGameData,
    error: errorGameData,
    isFetched: isFetchedGameData
  } = useQuery<IGameService>({
    queryKey: ["getGameById", gameId],
    queryFn: () => getGameById(gameId),
    keepPreviousData: true,
    staleTime: Infinity,
    enabled:
      gameType !== "hot-game" &&
      gameType !== "must-try" &&
      gameType !== "partner-game"
  })

  return {
    gameData: gameDataById?.data[0],
    partnerGames: gamePartner?.data,
    isFetchingGameData,
    isLoadingGameData,
    isPreviousDataGameData,
    isErrorGameData,
    errorGameData,
    isFetchingPartner,
    isLoadingPartner,
    isPreviousDataPartner,
    isErrorPartner,
    errorPartner,
    isFetchedGameData,
    isFetchedPartner
  }
}

export default useFindGameById
