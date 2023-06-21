import { useCallback, useEffect, useState } from "react"
import useFavoriteGame from "@feature/favourite/containers/hooks/useFavoriteGame"
import {
  IGame,
  IPayloadGameFilter
} from "@feature/game/interfaces/IGameService"

interface IDefaultBody extends IPayloadGameFilter {
  defaultBody: IPayloadGameFilter
  profileId: string
}

const useFavoriteGameControllerMobile = ({
  defaultBody,
  profileId
}: IDefaultBody) => {
  const [dataFavorite, setDataFavorite] = useState<IGame[]>([])

  const { gameFavourite, isLoadingGameFavourite } = useFavoriteGame({
    playerId: profileId,
    ...defaultBody
  })

  const handleFavouriteData = useCallback(() => {
    if (!profileId) return []
    const mapData = gameFavourite.map((_elm) => ({ ..._elm, favorite: true }))
    setDataFavorite(mapData)
  }, [gameFavourite, profileId])

  useEffect(() => {
    let load = false

    if (!load) handleFavouriteData()

    return () => {
      load = true
    }
  }, [handleFavouriteData, profileId, gameFavourite, isLoadingGameFavourite])

  return {
    gameFavorite: dataFavorite.length > 0 ? dataFavorite : [],
    isLoadingGameFavourite
  }
}

export default useFavoriteGameControllerMobile
