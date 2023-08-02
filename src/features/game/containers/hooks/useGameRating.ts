import { useMutation, useQuery } from "@tanstack/react-query"
import { useToast } from "@feature/toast/containers"
import { IMessage } from "@feature/multichain/interfaces/IMultichain"
import {
  addGameRating,
  getCheckUserRatingGame,
  getGameRatingById,
  updateGameRating
} from "@feature/game/containers/services/gameRating.service"
import { useEffect, useState } from "react"
import {
  IGameRatingData,
  IGameRatingServ
} from "@feature/game/interfaces/IGameRating"
import useProfileStore from "@stores/profileStore"

const useGameRating = (_gameId: string | undefined) => {
  const profile = useProfileStore((state) => state.profile.data)
  const { successToast, errorToast } = useToast()
  const [ratingGame, setRatingGame] = useState<IGameRatingServ | null>(null)
  const [ownerRating, setOwnerRating] = useState<IGameRatingData | null>(null)

  const { mutateAsync: mutateSendGameRating } = useMutation(addGameRating, {
    mutationKey: ["sendGameRating"],
    onSuccess: (res) => {
      successToast(res.message)
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
      onSuccess: (res) => {
        successToast(res.message)
      },
      onError: (_response) => {
        errorToast(
          (_response as IMessage)?.message ??
            "fail to update rating, please try agian"
        )
      }
    }
  )

  const { mutateAsync: checkRatingGame } = useMutation(getCheckUserRatingGame, {
    mutationKey: ["getCheckUserRatingGame"],
    onError: (_response) => {
      errorToast(
        (_response as IMessage)?.message ??
          "fail to update rating, please try agian"
      )
    }
  })

  const handleGetRatingGame = async (_checkRating: boolean) => {
    if (_gameId) {
      const result = await getGameRatingById(_gameId)
      if (result) {
        setRatingGame(result)
      }
      if (_checkRating) {
        const { data } = await checkRatingGame(_gameId)
        setOwnerRating(data)
      }
      return result
    }
    return undefined
  }

  const { isLoading: gameRatingLoading } = useQuery({
    queryKey: ["getGameRating", profile?.id, _gameId],
    queryFn: () => handleGetRatingGame(true),
    keepPreviousData: true,
    staleTime: Infinity,
    enabled: !!_gameId && !!profile?.id
  })

  const onSubmitSendRating = async (_value: boolean) => {
    if (_gameId) {
      let _status: boolean = false
      let _owner: IGameRatingData | null = ownerRating
      let _message: string = ""
      if (!ownerRating) {
        const { status, data, message } = await addGameRating({
          _id: _gameId,
          _type: _value
        })
        _status = status
        _owner = data
        _message = message
      } else if (ownerRating && ownerRating.type !== _value) {
        const { status, data, message } = await updateGameRating({
          _id: ownerRating.id,
          _type: _value
        })
        _status = status
        _owner = data
        _message = message
      }
      if (_status) handleGetRatingGame(false)
      setOwnerRating(_owner)
      if (_message) {
        if (_status) successToast(_message)
        else errorToast(_message)
      }
    }
  }

  return {
    ownerRating,
    ratingGame,
    gameRatingLoading,
    mutateSendGameRating,
    mutateUpdateGameRating,
    onSubmitSendRating
  }
}

export default useGameRating
