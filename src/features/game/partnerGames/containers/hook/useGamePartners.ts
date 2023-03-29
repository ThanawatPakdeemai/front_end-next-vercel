import { IPartnerGameData } from "@feature/game/interfaces/IPartnerGame"
import useGlobal from "@hooks/useGlobal"
import useGameStore from "@stores/game"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import {
  getGamePartnerAllReview,
  getGamePartnerNewVersion
} from "../services/gamePartners.service"

const useGamePartners = () => {
  const limit = 5
  const { page } = useGlobal()
  const { dataGamePartner } = useGameStore()
  const [gameData, setGameData] = useState<IPartnerGameData>()

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
      gameData ? getGamePartnerAllReview(limit, page, gameData.id) : null,
    keepPreviousData: true,
    staleTime: Infinity,
    enabled: !!gameData?.id
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
    queryFn: () => (gameData ? getGamePartnerNewVersion(gameData.id) : null),
    keepPreviousData: true,
    staleTime: Infinity,
    enabled: !!gameData?.id
  })

  /**
   * @description Set game data
   */
  useEffect(() => {
    let load = false

    if (!load) {
      if (dataGamePartner) {
        setGameData(dataGamePartner)
      }
    }

    return () => {
      load = true
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

export default useGamePartners
