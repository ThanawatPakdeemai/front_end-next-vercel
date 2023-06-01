import useFavoriteGame from "@feature/favourite/containers/hooks/useFavoriteGame"
import { IGame } from "@feature/game/interfaces/IGameService"
import useGlobal from "@hooks/useGlobal"
import { useCallback, useEffect, useState } from "react"

const useFavoriteGameControllerMobile = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [gameFavouriteState, setGameFavouriteState] = useState<IGame[]>([])

  const { stateProfile, defaultBody, setLimit, limit } = useGlobal()
  const { gameFavourite, gameFavouriteInfo, isLoadingGameFavourite } =
    useFavoriteGame({
      playerId: stateProfile?.id ?? "",
      ...defaultBody
    })

  const fetchGameFavorite = useCallback(async () => {
    if (gameFavourite && gameFavourite.length > 0) {
      setGameFavouriteState(gameFavourite)
      setLimit(gameFavouriteInfo.limit)
      setCurrentPage(gameFavouriteInfo.pages)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    gameFavourite,
    gameFavouriteInfo,
    gameFavouriteInfo.totalCount,
    gameFavouriteInfo.limit,
    gameFavouriteInfo.pages
  ])

  useEffect(() => {
    let load = false

    if (!load) fetchGameFavorite()

    return () => {
      load = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit, currentPage, fetchGameFavorite])

  return {
    gameFavouriteState,
    isLoadingGameFavourite,
    limit
  }
}

export default useFavoriteGameControllerMobile
