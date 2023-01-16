import ReloadIcon from "@components/icons/ReloadIcon"
import ButtonSticky from "@components/molecules/ButtonSticky"
import RoomListBar from "@components/molecules/roomList/RoomListBar"
import HeaderRoomList from "@components/organisms/HeaderRoomList"
import useSocketRoomList from "@feature/game/containers/hooks/useSocketRoomList"
import {
  IGameRoomListSocket,
  IResSocketRoomList
} from "@feature/game/interfaces/IGameService"
import { Box, Divider } from "@mui/material"
import useGameStore from "@stores/game"
import useProfileStore from "@stores/profileStore"
import helper from "@utils/helper"
import { useRouter } from "next/router"
import React, { memo, useEffect, useMemo, useState } from "react"

const MultiRoomList = () => {
  const profile = useProfileStore((state) => state.profile.data)
  const router = useRouter()

  const gameData = useGameStore((state) => state.data)
  const [room, setRoom] = useState<IGameRoomListSocket[]>()
  const propsSocketRoomlist = useMemo(
    () => ({
      _path: gameData?.socket_info?.url_lobby ?? "",
      _profileId: profile?.id ?? "",
      _gameId: gameData?._id ?? "",
      _itemId: gameData?.play_to_earn ? undefined : "61976479dffe844091ab8df1" // 1$ mock
    }),
    [
      gameData?._id,
      gameData?.play_to_earn,
      gameData?.socket_info?.url_lobby,
      profile?.id
    ]
  )
  const {
    onSetConnectedSocket,
    isConnected,
    socketRoomList,
    getRoomListMultiPlayer
  } = useSocketRoomList({
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
  }, [onSetConnectedSocket, profile, socketRoomList])

  useMemo(async () => {
    if (isConnected) {
      const roomMulti = await getRoomListMultiPlayer()
      if (roomMulti) {
        const uniquePlayerIn = (
          roomMulti as IResSocketRoomList
        ).data.gameRoomDetail.filter(
          (thing, index, self) =>
            index === self.findIndex((t) => t?._id === thing?._id)
        )
        setRoom(uniquePlayerIn)
      }
      return []
    }
  }, [getRoomListMultiPlayer, isConnected])

  const handleJoinRoom = (_roomId: string) => {
    router.push(`${router.asPath}/${_roomId}`)
  }

  return (
    <>
      <Box className="rounded-3xl border border-neutral-700">
        {gameData && <HeaderRoomList lobby={gameData.name} />}
        <Divider />

        <div className="custom-scroll flex h-[666px] flex-col items-center gap-[27px] overflow-y-scroll bg-room-list bg-contain p-[43px]">
          {profile &&
            room &&
            room.length > 0 &&
            room.map((_data) => {
              const initEndTime = new Date(_data.end_time)
              return (
                <RoomListBar
                  key={_data.id}
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
                  onClick={() => handleJoinRoom(_data._id)}
                />
              )
            })}
          <ButtonSticky
            icon={<ReloadIcon />}
            className="mt-10"
            multi
            onClick={getRoomListMultiPlayer}
          />
        </div>
      </Box>
    </>
  )
}

export default memo(MultiRoomList)
