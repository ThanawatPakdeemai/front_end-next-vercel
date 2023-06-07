/* eslint-disable no-nested-ternary */
import ReloadIcon from "@components/icons/ReloadIcon"
import ButtonSticky from "@components/molecules/ButtonSticky"
import RoomListBar, {
  TRoomStatus
} from "@components/molecules/roomList/RoomListBar"
import HeaderRoomList from "@components/organisms/HeaderRoomList"
import useRoomMulti from "@feature/game/containers/hooks/useRoomMulti"
import useSocketRoomList from "@feature/game/containers/hooks/useSocketRoomList"
import {
  IGameRoomListSocket,
  IResSocketRoomList
} from "@feature/game/interfaces/IGameService"
import useGameGlobal from "@hooks/useGameGlobal"
import { Box, Divider } from "@mui/material"
import SocketProviderRoom from "@providers/SocketProviderRoom"
import useProfileStore from "@stores/profileStore"
import helper from "@utils/helper"
import React, { memo, useEffect, useMemo, useState, useCallback } from "react"

const MultiRoomList = () => {
  const profile = useProfileStore((state) => state.profile.data)
  // const router = useRouter()
  // const { errorToast } = useToast()
  // const { data, itemSelected, qtyItemOfRoom } = useGameStore()

  const [dataRoom, setDataRoom] = useState<IGameRoomListSocket[]>()
  // const { balanceofItem } = useBuyGameItemController()
  const { item: item_id, gameData: data } = useGameGlobal()

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

  const { handleJoinRoom } = useRoomMulti()

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

  // const intoRoomGame = (player_me: CurrentPlayer, _roomId: string) => {
  //   if (data) {
  //     if (player_me && player_me.status === "played") {
  //       router.push(
  //         `/${router?.query?.typeGame}/${data.path}/summary/${_roomId}`
  //       )
  //       errorToast(MESSAGES["you-played"])
  //     } else if (router.asPath.includes("?id=")) {
  //       router.push(`${router.asPath.split("?id=")[0]}/${_roomId}`)
  //     } else {
  //       router.push(`${router.asPath}/${_roomId}`)
  //     }
  //   }
  // }
  // const handleJoinRoom = (_data: IGameRoomListSocket) => {
  //   if (profile) {
  //     const player_me = _data.current_player.find(
  //       (ele) => ele.player_id === profile.id
  //     )
  //     if (
  //       _data.amount_current_player < _data.max_players &&
  //       new Date() < new Date(_data.end_time) &&
  //       itemSelected &&
  //       balanceofItem &&
  //       balanceofItem?.data >= qtyItemOfRoom &&
  //       data
  //     ) {
  //       intoRoomGame(player_me as CurrentPlayer, _data._id)
  //     } else if (conditionGameFree) {
  //       intoRoomGame(player_me as CurrentPlayer, _data._id)
  //     } else if (new Date() > new Date(_data.end_time)) {
  //       errorToast(MESSAGES["room-timeout"])
  //     } else if (!balanceofItem || balanceofItem?.data < qtyItemOfRoom) {
  //       errorToast(MESSAGES["you-don't-have-item"])
  //     } else if (player_me && player_me.status === "played") {
  //       errorToast(MESSAGES["you-played"])
  //     } else if (_data.amount_current_player >= _data.max_players) {
  //       errorToast(MESSAGES["room-full"])
  //     } else {
  //       errorToast(MESSAGES["error-something"])
  //     }
  //   } else {
  //     errorToast(MESSAGES["please_login"])
  //   }
  // }

  const getRoomStatus = (_data: IGameRoomListSocket): TRoomStatus => {
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

  return (
    <>
      <Box
        component="div"
        className=" block gap-3 lg:flex"
      >
        <SocketProviderRoom
          propsSocket={{ getRoomListMultiPlayer, fetchRoom, searchRoom }}
        >
          <Box
            component="div"
            className="relative w-full rounded-3xl border border-neutral-700"
          >
            {data && <HeaderRoomList lobby={data.name} />}
            <Divider />

            <div className="custom-scroll md:0 m-4 flex h-96 flex-col gap-[27px] overflow-y-scroll bg-room-list bg-contain md:h-[666px] md:items-center lg:p-[43px]">
              {profile &&
                dataRoom &&
                dataRoom.length > 0 &&
                dataRoom.map((_data) => {
                  const initEndTime = new Date(_data.end_time)
                  return (
                    <RoomListBar
                      key={Number(_data.id)}
                      timer={{
                        time: initEndTime,
                        onExpire: () => null
                      }}
                      btnText={getRoomStatus(_data)}
                      player={{
                        currentPlayer: _data.amount_current_player,
                        maxPlayer: _data.max_players
                      }}
                      roomId={_data.create_room_detail.no_room}
                      roomName="Room Naka"
                      onClick={() => handleJoinRoom(_data)}
                    />
                  )
                })}
              <ButtonSticky
                icon={<ReloadIcon />}
                className="mt-10"
                multi
                // onClick={() => fetch()}
              />
            </div>
          </Box>
        </SocketProviderRoom>
        {/* {data && (
          <BuyItemBody>
            <OverviewContent
              gameId={data.id}
              gameType={getTypeGamePathFolder(data)}
              gameIdNFT={data.NFT_Owner}
            />
            {data?.play_to_earn_status !== "free" && !data.tournament && (
              <CardBuyItem gameObject={data} />
            )}
          </BuyItemBody>
        )} */}
      </Box>
    </>
  )
}

export default memo(MultiRoomList)
