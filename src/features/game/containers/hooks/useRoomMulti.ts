import { useCallback, useEffect, useMemo, useState } from "react"
import useProfileStore from "@stores/profileStore"
import { useRouter } from "next/dist/client/router"
import {
  CurrentPlayer,
  IGameRoomListSocket,
  IResSocketRoomList
} from "@feature/game/interfaces/IGameService"
import { useToast } from "@feature/toast/containers"
import { MESSAGES } from "@constants/messages"
import useBuyGameItemController from "@feature/buyItem/containers/hooks/useBuyGameItemController"
import helper from "@utils/helper"
import useGameGlobal from "@hooks/useGameGlobal"
import useSocketRoomList from "./useSocketRoomList"

const useRoomMulti = () => {
  const profile = useProfileStore((state) => state.profile.data)
  const router = useRouter()
  const { errorToast } = useToast()
  const { balanceofItem } = useBuyGameItemController()
  const [dataRoom, setDataRoom] = useState<IGameRoomListSocket[]>()
  const {
    item: item_id,
    gameData,
    // eslint-disable-next-line no-unused-vars
    itemSizeId,
    onSetGameData,
    itemSelected,
    conditionGameFree
  } = useGameGlobal()
  const data = gameData

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

  const propsSocketRoomlist = useMemo(
    () => ({
      path: data?.socket_info?.url_lobby ?? "",
      player_id: profile?.id ?? "",
      game_id: data?._id ?? "",
      item_id
    }),
    [data?._id, data?.socket_info?.url_lobby, item_id, profile?.id]
  )

  const {
    socketRoomList,
    isConnected,
    getRoomListMultiPlayer,
    searchRoom,
    getRoomFromSearch,
    search
  } = useSocketRoomList({
    ...propsSocketRoomlist
  })

  useEffect(() => {
    let load = false

    if (!load) {
      if (profile) {
        const token = helper.getTokenFromLocal()

        if (token) {
          socketRoomList.auth = { token }
          socketRoomList.connect()
        }
      }
    }

    return () => {
      load = true
      if (socketRoomList.connected === false) return
      socketRoomList.disconnect()
    }
  }, [profile, socketRoomList])

  const getRooms = useCallback(async () => {
    const roomMulti = await getRoomListMultiPlayer()
    if (roomMulti) {
      const uniquePlayerIn = (
        roomMulti as IResSocketRoomList
      ).data.gameRoomDetail.filter(
        (thing, index, self) =>
          index === self.findIndex((t) => t?._id === thing?._id)
      )
      setDataRoom(uniquePlayerIn)
    }
  }, [getRoomListMultiPlayer])

  const fetchRoomFromSearch = useCallback(() => {
    getRoomFromSearch().then((_room) => {
      const room = _room as IResSocketRoomList
      const uniquePlayerIn = (
        room as IResSocketRoomList
      ).data.gameRoomDetail.filter(
        (thing, index, self) =>
          index === self.findIndex((t) => t?._id === thing?._id)
      )
      setDataRoom(uniquePlayerIn)
    })
  }, [getRoomFromSearch])

  const fetchRoom = useCallback(async () => {
    if (isConnected) {
      if (search === "") {
        getRooms()
      } else {
        fetchRoomFromSearch()
      }
    }
  }, [fetchRoomFromSearch, getRooms, isConnected, search])

  useEffect(() => {
    let load = false

    if (!load) {
      if (isConnected) {
        fetchRoom()
      }
    }

    return () => {
      load = true
    }
  }, [fetchRoom, fetchRoomFromSearch, isConnected, search])

  const intoRoomGame = (player_me: CurrentPlayer, _roomId: string) => {
    if (data) {
      if (player_me && player_me.status === "played") {
        router.push(
          `/${router?.query?.typeGame}/${data.path}/summary/${_roomId}`
        )
        errorToast(MESSAGES["you-played"])
      } else if (router.asPath.includes("?id=")) {
        router.push(`${router.asPath.split("?id=")[0]}/${_roomId}`)
      } else {
        router.push(`${router.asPath}/${_roomId}`)
      }
    }
  }
  const handleJoinRoom = (_data: IGameRoomListSocket) => {
    if (profile) {
      const player_me = _data.current_player.find(
        (ele) => ele.player_id === profile.id
      )
      if (
        _data.amount_current_player < _data.max_players &&
        new Date() < new Date(_data.end_time) &&
        itemSelected &&
        balanceofItem &&
        balanceofItem?.data >= _data.create_room_detail.number_of_item &&
        data
      ) {
        intoRoomGame(player_me as CurrentPlayer, _data._id)
      } else if (conditionGameFree) {
        intoRoomGame(player_me as CurrentPlayer, _data._id)
      } else if (new Date() > new Date(_data.end_time)) {
        errorToast(MESSAGES["room-timeout"])
      } else if (!balanceofItem?.status) {
        errorToast(MESSAGES["you-don't-have-item"])
      } else if (player_me && player_me.status === "played") {
        errorToast(MESSAGES["you-played"])
      } else if (_data.amount_current_player >= _data.max_players) {
        errorToast(MESSAGES["room-full"])
      } else {
        errorToast(MESSAGES["error-something"])
      }
    } else {
      errorToast(MESSAGES["please_login"])
    }
  }
  return {
    profile,
    gameData: data,
    itemSelected,
    handleJoinRoom,
    dataRoom,
    searchRoom,
    data
  }
}

export default useRoomMulti
