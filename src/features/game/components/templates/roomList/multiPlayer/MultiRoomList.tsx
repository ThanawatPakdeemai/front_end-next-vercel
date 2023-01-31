import ReloadIcon from "@components/icons/ReloadIcon"
import ButtonSticky from "@components/molecules/ButtonSticky"
import RoomListBar from "@components/molecules/roomList/RoomListBar"
import HeaderRoomList from "@components/organisms/HeaderRoomList"
import { MESSAGES } from "@constants/messages"
import useSocketRoomList from "@feature/game/containers/hooks/useSocketRoomList"
import {
  IGameRoomListSocket,
  IResSocketRoomList
} from "@feature/game/interfaces/IGameService"
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
  const { data, itemSelected } = useGameStore()

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

  const { socketRoomList, isConnected, getRoomListMultiPlayer } =
    useSocketRoomList({
      ...propsSocketRoomlist
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

  const fetchRoom = useCallback(async () => {
    if (isConnected) {
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
    }
  }, [getRoomListMultiPlayer, isConnected])

  useEffect(() => {
    fetchRoom()
  }, [fetchRoom])

  const handleJoinRoom = (_data: IGameRoomListSocket) => {
    if (profile) {
      if (new Date() > new Date(_data.end_time)) {
        errorToast(MESSAGES["room-timeout"])
      } else if (
        _data.amount_current_player < _data.max_players &&
        new Date() < new Date(_data.end_time)
      ) {
        router.push(`${router.asPath}/${_data._id}`)
      } else {
        errorToast(MESSAGES["room-full"])
      }
    } else {
      errorToast(MESSAGES["please_login"])
    }
  }

  return (
    <>
      <SocketProviderRoom propsSocket={{ getRoomListMultiPlayer }}>
        <Box className="rounded-3xl border border-neutral-700">
          {data && <HeaderRoomList lobby={data.name} />}
          <Divider />

          <div className="custom-scroll flex h-[666px] flex-col items-center gap-[27px] overflow-y-scroll bg-room-list bg-contain p-[43px]">
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
    </>
  )
}

export default memo(MultiRoomList)
