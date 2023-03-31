import { useEffect } from "react"
import { MESSAGES } from "@constants/messages"
import { useToast } from "@feature/toast/containers"
import useLoadingStore from "@stores/loading"
import useProfileStore from "@stores/profileStore"
import useFavoriteGame from "./useFavoriteGame"
import useSaveFavoriteGame from "./useSaveFavoriteGame"

interface IProps {
  playerId: string
  gameId?: string
}

const useFavoriteGameContoller = ({ playerId, gameId }: IProps) => {
  // provider
  const { setOpen } = useLoadingStore()

  // Hooks
  const { errorToast } = useToast()

  // Store
  const profile = useProfileStore((state) => state.profile.data)

  /**
   * @description Get favourite game
   */
  const { refetchGameFavourite, gameFavourite } = useFavoriteGame({
    limit: 10000,
    playerId
  })

  /**
   * @description Mutate save favourite game
   */
  const { mutateSaveFavoriteGame, favouriteStatus, setActive } =
    useSaveFavoriteGame({
      playerId: playerId ?? "",
      gameId: gameId ?? ""
    })

  /**
   * @description Check status favourite
   */
  const checkStatusFavourite = () => {
    if (gameFavourite && gameFavourite.length > 0) {
      const findGame = gameFavourite.find((item) => item.id === gameId ?? "")
      if (findGame) {
        setActive(true)
      } else {
        setActive(false)
      }
    }
  }

  useEffect(() => {
    let load = false

    if (!load) checkStatusFavourite()

    return () => {
      load = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameFavourite, favouriteStatus])

  /**
   * @description Click favourite button
   */
  const onClickFavouriteButton = () => {
    if (!profile) {
      errorToast(MESSAGES.please_login)
      return
    }
    setOpen()
    if (profile) {
      mutateSaveFavoriteGame()
    } else {
      errorToast(MESSAGES.please_login)
    }
  }

  return {
    refetchGameFavourite,
    onClickFavouriteButton,
    gameFavourite,
    mutateSaveFavoriteGame,
    checkStatusFavourite,
    favouriteStatus
  }
}

export default useFavoriteGameContoller
