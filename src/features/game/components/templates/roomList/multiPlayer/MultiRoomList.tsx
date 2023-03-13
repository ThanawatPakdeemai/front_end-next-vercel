import ReloadIcon from "@components/icons/ReloadIcon"
import ButtonSticky from "@components/molecules/ButtonSticky"
import RoomListBar from "@components/molecules/roomList/RoomListBar"
import HeaderRoomList from "@components/organisms/HeaderRoomList"
import BuyItemBody from "@components/templates/game/BuyItemBody"
import { MESSAGES } from "@constants/messages"
import useSocketRoomList from "@feature/game/containers/hooks/useSocketRoomList"
import {
  IGameRoomListSocket,
  IResSocketRoomList
} from "@feature/game/interfaces/IGameService"
import CardBuyItem from "@feature/gameItem/components/molecules/CardBuyItem"
import useGetBalanceOf from "@feature/inventory/containers/hooks/useGetBalanceOf"
import { useToast } from "@feature/toast/containers"
import { Box, Divider } from "@mui/material"
import SocketProviderRoom from "@providers/SocketProviderRoom"
import useGameStore from "@stores/game"
import useProfileStore from "@stores/profileStore"
import helper from "@utils/helper"
import { useRouter } from "next/router"
import React, { memo, useEffect, useMemo, useState, useCallback } from "react"

const MultiRoomList = () => {
  const profile = useProfileStore((state) => state.profile.data)
  const router = useRouter()
  const { errorToast } = useToast()
  const { data, itemSelected, qtyItemOfRoom } = useGameStore()

  const [dataRoom, setDataRoom] = useState<IGameRoomListSocket[]>()

  const item_id = useMemo(() => {
    if (data) {
      if (data.play_to_earn || data.tournament) {
        return data.item[0]._id
      }
      if (itemSelected) {
        return itemSelected._id
      }
    } else {
      return ""
    }
  }, [data, itemSelected])

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

  const { balanceofItem } = useGetBalanceOf({
    _address: profile?.address ?? "",
    _item_id: itemSelected?.item_id_smartcontract ?? 0
  })

  useEffect(() => {
    if (profile) {
      const token = helper.getTokenFromLocal()

      if (token) {
        socketRoomList.auth = { token }
        socketRoomList.connect()
      }
    }

    return () => {
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
    if (isConnected) {
      fetchRoom()
    }
  }, [fetchRoom, fetchRoomFromSearch, isConnected, search])

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
        balanceofItem?.data >= qtyItemOfRoom
      ) {
        if (player_me && player_me.status === "played") {
          errorToast(MESSAGES["you-played"])
        } else {
          router.push(`${router.asPath}/${_data._id}`)
        }
      } else if (
        data &&
        ((data.play_to_earn && data.play_to_earn_status === "free") ||
          data.tournament)
      ) {
        router.push(`${router.asPath}/${_data.id}`)
      } else if (new Date() > new Date(_data.end_time)) {
        errorToast(MESSAGES["room-timeout"])
      } else if (!balanceofItem || balanceofItem?.data < qtyItemOfRoom) {
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

  return (
    <>
      <Box className=" block gap-3 lg:flex">
        <SocketProviderRoom
          propsSocket={{ getRoomListMultiPlayer, fetchRoom, searchRoom }}
        >
          <Box className="relative w-full rounded-3xl border border-neutral-700">
            {data && <HeaderRoomList lobby={data.name} />}
            <Divider />

            <div className="custom-scroll md:0 m-4 flex h-96 flex-col gap-[27px] overflow-y-scroll bg-room-list bg-contain md:h-[666px] md:items-center lg:p-[43px]">
              {profile &&
                dataRoom &&
                dataRoom.length > 0 &&
                dataRoom.map((_data) => {
                  const initEndTime = new Date(_data.end_time)
                  const player = _data.current_player.find(
                    (ele) => ele.player_id === profile.id
                  )
                  return (
                    <RoomListBar
                      key={Number(_data.id)}
                      timer={{
                        time: initEndTime,
                        onExpire: () => null
                      }}
                      btnText={
                        player && player.status === "played" ? "played" : "join"
                      }
                      player={{
                        currentPlayer: _data.amount_current_player,
                        maxPlayer: _data.max_players
                      }}
                      roomId={_data.create_room_detail.no_room}
                      roomName="Room Name"
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
        {data && (!data?.play_to_earn || !data.tournament) && (
          <BuyItemBody>
            <CardBuyItem />
          </BuyItemBody>
        )}
      </Box>
    </>
  )
}

export default memo(MultiRoomList)
