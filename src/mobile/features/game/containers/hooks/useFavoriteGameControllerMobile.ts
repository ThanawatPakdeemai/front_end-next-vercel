import { useCallback, useEffect, useState } from "react"
import useFavoriteGame from "@feature/favourite/containers/hooks/useFavoriteGame"
import useGlobal from "@hooks/useGlobal"
import { IGame } from "@feature/game/interfaces/IGameService"

const useFavoriteGameControllerMobile = () => {
  const { stateProfile, defaultBody } = useGlobal()
  const [dataFavorite, setDataFavorite] = useState<IGame[]>([])

  const { gameFavourite, isLoadingGameFavourite } = useFavoriteGame({
    playerId: stateProfile?.id || "",
    ...defaultBody
  })

  const handleFavouriteData = useCallback(() => {
    const mapData = gameFavourite.map((_elm) => ({ ..._elm, favorite: true }))
    if (mapData && mapData.length > 0) setDataFavorite(mapData)
  }, [gameFavourite])

  useEffect(() => {
    let load = false

    if (!load) {
      handleFavouriteData()
    }

    return () => {
      load = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    gameFavorite: dataFavorite.length > 0 ? dataFavorite : [],
    loading: isLoadingGameFavourite
  }
}

export default useFavoriteGameControllerMobile
