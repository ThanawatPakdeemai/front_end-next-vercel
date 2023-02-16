import { IGetType } from "@feature/game/interfaces/IGameService"
import { IPartnerGameData } from "@feature/game/interfaces/IPartnerGame"
import {
  getGamePartnerAllReview,
  getGamePartnerNewVersion
} from "@feature/game/partnerGames/containers/services/gamePartners.service"
import useGlobal from "@hooks/useGlobal"
import useGameStore from "@stores/game"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"

const useGameWhatsNew = (gameType: IGetType) => {
  const limit = 5
  const { page } = useGlobal()
  const { dataGamePartner } = useGameStore()
  const [gameData, setGameData] = useState<IPartnerGameData>()

  const handleQueryFunction = (_gameType: IGetType, _gameId: string) => {
    switch (_gameType) {
      case "partner-game":
        return getGamePartnerAllReview(limit, page, _gameId)
      default:
        return null
    }
  }

  /**
   * @description Get all reviews of game
   */
  const {
    data: allReviewsData,
    isLoading: allReviewsDataLoading,
    isFetching: allReviewsDataFetching,
    isPreviousData: allReviewsPreviousData,
    isError: allReviewsDataError,
    error: allReviewsDataErrorData
  } = useQuery({
    queryKey: ["gameAllReviews", limit, page, gameData?.id || ""],
    queryFn: () =>
      gameData ? handleQueryFunction(gameType, gameData.id) : null,
    keepPreviousData: true,
    staleTime: Infinity,
    enabled: gameData?.id !== "" && gameData?.id !== undefined
  })

  /**
   * @description Get new version of game
   */
  const {
    data: newVersionData,
    isLoading: newVersionDataLoading,
    isFetching: newVersionDataFetching,
    isPreviousData: newVersionPreviousData,
    isError: newVersionDataError,
    error: newVersionDataErrorData
  } = useQuery({
    queryKey: ["gameNewVersion", gameData?.id || ""],
    queryFn: () =>
      gameType === "partner-game"
        ? gameData && getGamePartnerNewVersion(gameData.id)
        : null,
    keepPreviousData: true,
    staleTime: Infinity,
    enabled: gameData?.id !== "" && gameData?.id !== undefined
  })

  /**
   * @description Set game data
   */
  useEffect(() => {
    if (dataGamePartner) {
      setGameData(dataGamePartner)
    }
  }, [dataGamePartner])

  return {
    limit,
    allReviewsData,
    allReviewsDataLoading,
    allReviewsDataFetching,
    allReviewsPreviousData,
    allReviewsDataError,
    allReviewsDataErrorData,
    newVersionData,
    newVersionDataLoading,
    newVersionDataFetching,
    newVersionPreviousData,
    newVersionDataError,
    newVersionDataErrorData
  }
}

export default useGameWhatsNew
