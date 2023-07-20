import { useMemo } from "react"
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
import useGameGlobal from "@hooks/useGameGlobal"
import { TRoomStatus } from "@components/molecules/roomList/RoomListBar"

const useRoomSingle = () => {
  const profile = useProfileStore((state) => state.profile.data)

  const router = useRouter()
  const { data, itemSelected } = useGameStore()

  // const itemSizeId = id as string
  const { errorToast } = useToast()
  const { balanceofItem } = useBuyGameItemController()
  const { item, gameData, itemSizeId, conditionGameFree } = useGameGlobal()

  const { allGameRooms, isLoading: loadingAllroom } = useGetAllGameRooms({
    _gameId: gameData ? gameData._id : "",
    _email: profile ? profile.email : "",
    _itemId: (itemSizeId as string) || ((item as string) ?? "")
  })

  const { allGameRoomsById, isLoading: loadingAllroomById } =
    useGetAllGameRoomsById({
      _gameId: !profile && gameData ? gameData._id : ""
    })

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
      } else if (conditionGameFree) {
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

  const textJoin = (_room: IGameRoomDetail) => {
    if (_room) {
      const room = _room?.current_player?.find(
        (ele) => ele.player_id === profile?.id
      )
      if (room?.status === "played") {
        return "played"
      }
      if (data && _room?.amount_current_player >= data?.max_players) {
        return "full"
      }
      return "join"
    }
  }

  /**
   * @description Get room status
   */
  const getRoomStatus = (_data: IGameRoomDetail): TRoomStatus => {
    if (!profile) return "unavailable"

    const _played = _data.current_player.find(
      (ele) => ele.player_id === profile.id
    )

    if (_played && _played.status === "played") {
      return "played"
    }
    if (_data.amount_current_player >= _data.max_players) {
      return "full"
    }
    return "join"
  }

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
    loadRoom,
    textJoin,
    getRoomStatus
  }
}

export default useRoomSingle
