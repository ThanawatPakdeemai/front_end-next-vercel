import { useEffect, useState } from "react"
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

  const handleFavouriteData = () => {
    const mapData = gameFavourite.map((_elm) => ({ ..._elm, favorite: true }))
    setDataFavorite(mapData)
  }

  useEffect(() => {
    let load = false

    if (!load) handleFavouriteData()

    return () => {
      load = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameFavourite])

  return {
    gameFavorite: dataFavorite.length > 0 ? dataFavorite : [],
    loading: isLoadingGameFavourite
  }
}

export default useFavoriteGameControllerMobile
