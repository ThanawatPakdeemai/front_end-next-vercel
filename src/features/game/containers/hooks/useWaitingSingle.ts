import useProfileStore from "@stores/profileStore"
import { useRouter } from "next/dist/client/router"
import useGameStore from "@stores/game"
import useBuyGameItemController from "@feature/buyItem/containers/hooks/useBuyGameItemController"
import { useCallback, useMemo, useEffect, useState } from "react"
import useGlobal from "@hooks/useGlobal"
import { unstable_batchedUpdates } from "react-dom"
import { isMobile } from "react-device-detect"
import Helper from "@utils/helper"
import { useToast } from "@feature/toast/containers"
import { MESSAGES } from "@constants/messages"
import { useWeb3Provider } from "@providers/Web3Provider"
import CONFIGS from "@configs/index"
import { IResGetIp } from "@interfaces/IGetIP"
import useGameGlobal from "@hooks/useGameGlobal"
import useGetCurrentPlayerGameSingle from "./useGetCurrentPlayerGameSingle"
import useGetGameRoomById from "./useGetGameRoomById"

const baseUrlGame = CONFIGS.BASE_URL.GAME
const baseUrlApi = CONFIGS.BASE_URL.API
const baseUrlFront = CONFIGS.BASE_URL.FRONTEND

const useWaitingSingle = () => {
  const profile = useProfileStore((state) => state.profile.data)
  const { data, itemSelected } = useGameStore()
  const router = useRouter()
  const { id: roomId, GameHome } = router.query
  const { gameRoomById } = useGetGameRoomById(roomId as string)

  const { balanceofItem } = useBuyGameItemController()
  const { errorToast } = useToast()
  const { address } = useWeb3Provider()
  const [gameUrl, setGameUrl] = useState<string>("")
  const [ip, setIp] = useState("")
  const { getTypeGamePathFolder } = useGlobal()

  // TODO: Refactor later
  const detectDevice = isMobile ? "mobile" : "desktop"

  const {
    item: item_id,
    // conditionGameFree
    // itemSelected,
    conditionPlayToEarn
  } = useGameGlobal()

  useEffect(() => {
    let load = false

    if (!load) {
      if (data && data.type_code === "survival_01")
        Helper.getIP().then((res) => {
          setIp((res as IResGetIp).ip)
        })
    }

    return () => {
      setIp("")
      load = true
    }
  }, [data])

  // const item_id = useMemo(() => {
  //   if (data) {
  //     if (data.play_to_earn || data.tournament) {
  //       return data?.item[0]._id
  //     }
  //     if (itemSelected) {
  //       return itemSelected._id
  //     }
  //     return undefined
  //   }
  //   return undefined
  // }, [data, itemSelected])

  const {
    isLoading: loadingPlayer,
    playerGameSingle,
    fetchPlayerGameSingle
  } = useGetCurrentPlayerGameSingle()

  const fetchPlayers = useCallback(
    (_type: "in" | "out") => {
      if (data && profile && roomId && fetchPlayerGameSingle) {
        unstable_batchedUpdates(() => {
          fetchPlayerGameSingle({
            _roomId: roomId as string,
            _playerId: profile.id,
            _type
          })
        })
      }
    },
    [roomId, fetchPlayerGameSingle, data, profile]
  )

  useEffect(() => {
    let load = false

    if (!load) fetchPlayers("in")

    return () => {
      load = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    let load = false

    if (!load) {
      router.beforePopState(({ as }) => {
        if (as !== router.asPath) {
          // Will run when leaving the current page; on back/forward actions
          // out room this game
          fetchPlayers("out")
        }
        return true
      })
    }

    return () => {
      load = true
      router.beforePopState(() => true)
    }
  }, [fetchPlayers, router])

  const playersMap = useMemo(() => {
    const player_in = playerGameSingle?.current_player ?? []
    const uniquePlayerIn = player_in.filter(
      (thing, index, self) =>
        index === self.findIndex((t) => t.player_id === thing.player_id)
    )

    const playerMe = uniquePlayerIn.find((ele) => ele.player_id === profile?.id)

    const playerMeIndex = uniquePlayerIn.findIndex(
      (ele) => ele.player_id === profile?.id
    )
    if (playerMeIndex !== 0) {
      uniquePlayerIn.splice(playerMeIndex, 1)
      if (playerMe) uniquePlayerIn.splice(0, 0, playerMe)
    }

    const player_blank = Array(
      (playerGameSingle?.max_players ?? 8) - uniquePlayerIn.length
    ).map((ele) => ele)
    const itemPlayer = [...uniquePlayerIn, ...player_blank]
    return itemPlayer
  }, [
    playerGameSingle?.current_player,
    playerGameSingle?.max_players,
    profile?.id
  ])

  const playersMe = useMemo(() => {
    if (playersMap)
      return playersMap?.find((ele) => ele?.player_id === profile?.id)
  }, [playersMap, profile?.id])

  const outRoomLink = useCallback(async () => {
    if (data)
      await router.push(`/${router.query.typeGame}/${data.path}/roomlist`)
  }, [data, router])

  const outRoom = async () => {
    if (roomId && profile) {
      await fetchPlayerGameSingle({
        _roomId: roomId as string,
        _playerId: profile.id,
        _type: "out"
      })
      await outRoomLink()
    }
  }

  useEffect(() => {
    let load = false

    if (!load) {
      if (playersMe) {
        if (playersMe.status === "played") {
          outRoomLink()
        }
      }
    }

    return () => {
      load = true
    }
  }, [outRoomLink, playersMe])

  useEffect(() => {
    let load = false

    if (!load) {
      if (
        gameRoomById &&
        profile &&
        roomId &&
        item_id &&
        data &&
        data.game_type === "singleplayer"
      ) {
        const frontendUrl = `${baseUrlFront}/${router.query.typeGame}/${data.path}/summary/${roomId}`

        if (data.type_code === "survival_01") {
          if (ip) {
            const data_game = `${roomId}:|:${profile.id}:|:${
              itemSelected?._id
            }:|:${profile.email}:|:${Helper.getLocalStorage(
              "token"
            )}:|:${frontendUrl}:|:${CONFIGS.BASE_URL.API}:|:${
              isMobile ? detectDevice : gameRoomById.rank_name
            }:|:${gameRoomById.room_number}:|:${new Date(
              gameRoomById.start_time
            ).getTime()}:|:${profile.username}:|:${
              gameRoomById.max_players
            }:|:${gameRoomById.stage_id}:|:${ip}:|:${
              conditionPlayToEarn ? "free" : "not_free"
            }:|:${profile.country}`
            const gameURL = `${CONFIGS.BASE_URL.GAME}/${
              data.id
            }/?query=${Helper.makeID(8)}${btoa(data_game)}`
            setGameUrl(gameURL)
          }
        } else {
          const url_data = `${roomId}:|:${profile.id}:|:${item_id}:|:${
            profile.email
          }:|:${Helper.getLocalStorage(
            "token"
          )}:|:${frontendUrl}:|:${baseUrlApi}:|:${
            isMobile ? detectDevice : gameRoomById.rank_name
          }:|:${gameRoomById.room_number}:|:${new Date(
            gameRoomById.start_time
          ).getTime()}${
            gameRoomById.stage_id !== undefined
              ? `:|:${gameRoomById.stage_id}`
              : ":|:0"
          }:|:${profile.username}:|:${
            conditionPlayToEarn ? "free" : "not_free"
          }`

          const gameURL = `${baseUrlGame}/${data.id}/?${Helper.makeID(8)}${btoa(
            url_data
          )}`
          setGameUrl(gameURL)
        }
      }
    }
    return () => {
      setGameUrl("")
      load = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    data,
    gameRoomById,
    ip,
    itemSelected?._id,
    item_id,
    profile,
    roomId,
    router?.query?.typeGame,
    detectDevice
  ])

  const checkRoomTimeout = useCallback(() => {
    if (!gameRoomById) return false

    const endTime = new Date(gameRoomById.end_time)
    const currentTime = new Date()

    return currentTime >= endTime
  }, [gameRoomById])

  useEffect(() => {
    let load = false

    if (!load) {
      const statueTimout = checkRoomTimeout()
      if (statueTimout) {
        router.push(`/${data?.path}/roomlist`)
        errorToast(MESSAGES["room-timeout"])
      }
    }

    return () => {
      load = true
    }
  }, [checkRoomTimeout, errorToast, data?.path, gameRoomById, router])

  const checkReadyPlayer = () => {
    if (playersMe) {
      if (
        playersMe.status === "inroom" ||
        playersMe.status === "ready" ||
        playersMe.status === "playing"
      ) {
        return true
      }
      errorToast(MESSAGES["you-played"])
      return false
    }
    return false
  }

  const checkPlayerMe = () => {
    if (playersMe) {
      return true
    }
    errorToast(MESSAGES["you_out_room_in_to_again"])
    return false
  }

  const checkBalanceOfItem = () => {
    if (balanceofItem && balanceofItem.data > 0) {
      return true
    }
    errorToast(MESSAGES["you-don't-have-item"])
    return false
  }

  const checkPlayerIsNotBanned = () => {
    if (
      !profile ||
      (profile && profile.role === "BACKLIST") ||
      (profile && profile.role === "BANNED")
    ) {
      errorToast(MESSAGES["you-are-banned"])
      return false
    }
    return true
  }

  const checkGameFree = () => {
    if (
      (data?.play_to_earn && data?.play_to_earn_status === "free") ||
      data?.game_mode === "free-to-earn"
    ) {
      return true
    }
    return false
  }

  const checkAccountProfile = () => {
    if (profile && address === profile.address) {
      return true
    }
    errorToast(MESSAGES["please-connect-wallet"])
    return false
  }

  const onPlayGame = () => {
    if (
      checkGameFree() ||
      (checkPlayerIsNotBanned() &&
        checkAccountProfile() &&
        checkBalanceOfItem() &&
        checkReadyPlayer() &&
        checkPlayerMe())
    ) {
      window.location.href = gameUrl
    } else if (!item_id) {
      errorToast(MESSAGES["please_item"])
    } else if (!roomId) {
      errorToast(MESSAGES["room-id-not-found"])
    }
  }

  return {
    balanceofItem,
    profile,
    gameData: data,
    itemSelected,
    outRoom,
    playerGameSingle,
    GameHome,
    getTypeGamePathFolder,
    loadingPlayer,
    gameUrl,
    onPlayGame,
    playersMap,
    playersMe
  }
}

export default useWaitingSingle
