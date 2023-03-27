import { MESSAGES } from "@constants/messages"
import { useToast } from "@feature/toast/containers"
import useLoadingStore from "@stores/loading"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { useState } from "react"
import { saveFavoriteGame } from "../services/favourite.service"
import useFavoriteGame from "./useFavoriteGame"

interface IGameFavoriteBody {
  playerId: string
  gameId: string
}
const useSaveFavoriteGame = ({ playerId, gameId }: IGameFavoriteBody) => {
  const { setClose } = useLoadingStore()
  const { refetchGameFavourite } = useFavoriteGame({
    limit: 10000,
    playerId
  })
  const { errorToast, successToast } = useToast()
  const [active, setActive] = useState<boolean>(false)
  const {
    data: dataSaveFavoriteGame,
    error: errorSaveFavoriteGame,
    isLoading: isLoadingSaveFavoriteGame,
    isError: isErrorSaveFavoriteGame,
    mutateAsync: mutateSaveFavoriteGame
  } = useMutation(() => saveFavoriteGame(playerId ?? "", gameId ?? ""), {
    mutationKey: ["saveFavoriteGame"],
    retry: false,
    onSuccess(res) {
      if (res) {
        setClose()
        successToast(MESSAGES.success)
        refetchGameFavourite()
        if (res && res.data.length > 0) {
          const findGame = res.data.find((item) => item.id === gameId)
          if (findGame) {
            setActive(true)
          } else {
            setActive(false)
          }
        }
      }
    },
    onError(err: AxiosError) {
      if (err) errorToast(err.message)
    }
  })

  return {
    dataSaveFavoriteGame,
    errorSaveFavoriteGame,
    isLoadingSaveFavoriteGame,
    isErrorSaveFavoriteGame,
    mutateSaveFavoriteGame,
    favouriteStatus: active,
    setActive
  }
}

export default useSaveFavoriteGame
