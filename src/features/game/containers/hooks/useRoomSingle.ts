import { useEffect, useMemo } from "react"
import useGetAllGameRooms from "@feature/game/containers/hooks/useGetAllGameRooms"
import useProfileStore from "@stores/profileStore"
import { useRouter } from "next/dist/client/router"
import useGameStore from "@stores/game"
import {
  IGameCurrentPlayer,
  IGameRoomDetail
} from "@feature/game/interfaces/IGameService"
import { useToast } from "@feature/toast/containers"
import { MESSAGES } from "@constants/messages"
import useGetAllGameRoomsById from "@feature/game/containers/hooks/useGetAllGameRoomsById"
import useBuyGameItemController from "@feature/buyItem/containers/hooks/useBuyGameItemController"
import useGetGameByPath from "./useFindGameByPath"

const useRoomSingle = () => {
  const profile = useProfileStore((state) => state.profile.data)

  const router = useRouter()
  const { id, GameHome } = router.query
  const { gameData } = useGetGameByPath(GameHome ? GameHome.toString() : "")
  const { data, itemSelected, onSetGameData } = useGameStore()

  const itemSizeId = id as string
  const { errorToast } = useToast()
  const { balanceofItem } = useBuyGameItemController()
  const item = useMemo(() => {
    if (gameData) {
      if (
        (gameData.play_to_earn && gameData.play_to_earn_status === "free") ||
        gameData.tournament
      ) {
        return gameData.item[0]._id
      }
      if (itemSelected) {
        return itemSelected._id
      }
      if (itemSizeId) {
        return itemSizeId
      }
    } else {
      return ""
    }
  }, [gameData, itemSelected, itemSizeId])

  const { allGameRooms, isLoading: loadingAllroom } = useGetAllGameRooms({
    _gameId: gameData ? gameData._id : "",
    _email: profile ? profile.email : "",
    _itemId: itemSizeId || (item ?? "")
  })

  const { allGameRoomsById, isLoading: loadingAllroomById } =
    useGetAllGameRoomsById({
      _gameId: !profile && gameData ? gameData._id : ""
    })

  useEffect(() => {
    let load = false

    if (!load) {
      if (gameData) onSetGameData(gameData)
    }

    return () => {
      load = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameData])

  const intoRoomGame = (
    data_player_me: IGameCurrentPlayer,
    _roomId: string
  ) => {
    if (data_player_me) {
      if (data_player_me && data_player_me.status !== "played") {
        router.push(`${router.asPath}/${_roomId}`)
      } else if (data && data_player_me && data_player_me.status === "played") {
        router.push(
          `/${router?.query?.typeGame}/${data.path}/summary/${_roomId}`
        )
        errorToast(MESSAGES["you-played"])
      } else {
        errorToast(MESSAGES["error-something"])
      }
    } else if (router.asPath.includes("?id=")) {
      router.push(`${router.asPath.split("?id=")[0]}/${_roomId}`)
    } else {
      router.push(`${router.asPath}/${_roomId}`)
    }
  }

  const handleJoinRoom = (_dataRoom: IGameRoomDetail) => {
    const data_player_me = _dataRoom.current_player.find((ele) => {
      if (profile) {
        return ele.player_id === profile.id
      }
      return undefined
    })
    const _roomId = _dataRoom._id
    if (profile) {
      if (
        itemSelected &&
        itemSelected.qty > 0 &&
        balanceofItem &&
        balanceofItem?.data > 0 &&
        new Date() <= new Date(_dataRoom.end_time) &&
        _dataRoom.amount_current_player < _dataRoom.max_players
      ) {
        intoRoomGame(data_player_me as IGameCurrentPlayer, _roomId)
      } else if (new Date() > new Date(_dataRoom.end_time)) {
        errorToast(MESSAGES["room-timeout"])
      } else if (
        data &&
        ((data.play_to_earn && data.play_to_earn_status === "free") ||
          data.game_mode === "free-to-earn" ||
          data.tournament)
      ) {
        intoRoomGame(data_player_me as IGameCurrentPlayer, _roomId)
      } else if (_dataRoom.amount_current_player >= _dataRoom.max_players) {
        if (data && data_player_me && data_player_me.status === "played") {
          router.push(
            `/${router?.query?.typeGame}/${data.path}/summary/${_roomId}`
          )
        } else {
          errorToast(MESSAGES["room-full"])
        }
      } else if (
        (balanceofItem && balanceofItem?.data < 1) ||
        balanceofItem === undefined ||
        !balanceofItem?.status
      ) {
        if (data && data_player_me && data_player_me.status === "played") {
          router.push(
            `/${router?.query?.typeGame}/${data.path}/summary/${_roomId}`
          )
        } else {
          errorToast(MESSAGES["you-don't-have-item"])
        }
      } else {
        errorToast(MESSAGES["error-something"])
      }
    } else {
      errorToast(MESSAGES["please_login"])
    }
  }

  const roomData = useMemo(() => {
    if (profile) {
      return allGameRooms
    }
    return allGameRoomsById
  }, [allGameRooms, allGameRoomsById, profile])

  const loadRoom = useMemo(() => {
    if (profile) {
      return loadingAllroom
    }
    return loadingAllroomById
  }, [loadingAllroom, loadingAllroomById, profile])

  return {
    allGameRooms,
    allGameRoomsById,
    profile,
    gameData: data,
    itemSelected,
    handleJoinRoom,
    roomData,
    loadingAllroomById,
    loadingAllroom,
    loadRoom
  }
}

export default useRoomSingle
