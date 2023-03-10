import { IGetType } from "@feature/game/interfaces/IGameService"
import {
  getGamePartnerAllReview,
  getGamePartnerNewVersion
} from "@feature/game/partnerGames/containers/services/gamePartners.service"
import useGlobal from "@hooks/useGlobal"
import { useQuery } from "@tanstack/react-query"

const useGameWhatsNew = (_gameType: IGetType, _gameId: string) => {
  const limit = 5
  const { page } = useGlobal()

  const handleQueryFunction = () => {
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
    queryKey: ["gameAllReviews", limit, page, _gameId || ""],
    queryFn: () => handleQueryFunction(),
    keepPreviousData: true,
    staleTime: Infinity,
    enabled: !!_gameId
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
    queryKey: ["gameNewVersion", _gameId || ""],
    queryFn: () =>
      _gameType === "partner-game" ? getGamePartnerNewVersion(_gameId) : null,
    keepPreviousData: true,
    staleTime: Infinity,
    enabled: !!_gameId
  })

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
