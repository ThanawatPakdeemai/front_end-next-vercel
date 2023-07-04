import { useMutation, useQuery } from "@tanstack/react-query"
import { useToast } from "@feature/toast/containers"
import { IMessage } from "@feature/multichain/interfaces/IMultichain"
import {
  addGameRating,
  getGameRatingById,
  updateGameRating
} from "@feature/game/containers/services/gameRating.service"

const useGameRating = (_gameId: string) => {
  const { successToast, errorToast } = useToast()

  const { data: gameRatingData, isLoading: gameRatingLoading } = useQuery({
    queryKey: ["getGameRating"],
    queryFn: () => getGameRatingById(_gameId),
    keepPreviousData: true,
    staleTime: Infinity,
    enabled: !!_gameId
  })

  const { mutateAsync: mutateSendGameRating } = useMutation(addGameRating, {
    mutationKey: ["sendGameRating"],
    onSuccess: () => {
      successToast("send rating success")
    },
    onError: (_response) => {
      errorToast(
        (_response as IMessage)?.message ??
          "fail to send rating, please try agian"
      )
    }
  })

  const { mutateAsync: mutateUpdateGameRating } = useMutation(
    updateGameRating,
    {
      mutationKey: ["updateGameRating"],
      onSuccess: () => {
        successToast("update rating success")
      },
      onError: (_response) => {
        errorToast(
          (_response as IMessage)?.message ??
            "fail to update rating, please try agian"
        )
      }
    }
  )

  return {
    gameRatingData,
    gameRatingLoading,
    mutateSendGameRating,
    mutateUpdateGameRating
  }
}

export default useGameRating
