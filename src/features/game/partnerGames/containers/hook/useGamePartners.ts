import { IPartnerGameData } from "@feature/game/interfaces/IPartnerGame"
import useGameStore from "@stores/game"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { getGamePartnerAllReview } from "../services/gamePartners.service"

const useGamePartners = (_limit: number, _skip: number) => {
  const { dataGamePartner } = useGameStore()
  const [gameData, setGameData] = useState<IPartnerGameData>()

  const {
    data: allReviewsData,
    isLoading: allReviewsDataLoading,
    isFetching: allReviewsDataFetching,
    isPreviousData: allReviewsPreviousData,
    isError: allReviewsDataError,
    error: allReviewsDataErrorData
  } = useQuery({
    queryKey: ["gameAllReviews", _limit, _skip, gameData?.id || ""],
    queryFn: () =>
      gameData ? getGamePartnerAllReview(_limit, _skip, gameData.id) : null,
    keepPreviousData: true,
    staleTime: Infinity,
    enabled: gameData?.id !== "" && gameData?.id !== undefined
  })

  useEffect(() => {
    if (dataGamePartner) {
      setGameData(dataGamePartner)
    }
  }, [dataGamePartner])

  return {
    allReviewsData,
    allReviewsDataLoading,
    allReviewsDataFetching,
    allReviewsPreviousData,
    allReviewsDataError,
    allReviewsDataErrorData
  }
}

export default useGamePartners
