import HeaderWaitingRoom from "@components/organisms/HeaderWaitingRoom"
import React, { memo, useEffect, useMemo, useState } from "react"
import useProfileStore from "@stores/profileStore"
import useGameStore from "@stores/game"
import { useRouter } from "next/router"
import useSocketWaitingRoom from "@feature/game/containers/hooks/useSocketWaitingRoom"
import helper from "@utils/helper"
import {
  CurrentPlayer,
  IGameRoomListSocket
} from "@feature/game/interfaces/IGameService"
import SeatPlayers from "@feature/game/components/organisms/SeatPlayers"
import { Box } from "@mui/material"
import { IPropWaitingSingle } from "../singlePlayer/SingleWaiting"

export interface IPropWaitingMulti extends IPropWaitingSingle {}

const GameMultiPlayer = ({ _roomId }: IPropWaitingMulti) => {
  const profile = useProfileStore((state) => state.profile.data)
  const gameData = useGameStore((state) => state.data)
  const [dataPlayers, setDataPlayers] = useState<
    IGameRoomListSocket | undefined
  >()
  const router = useRouter()

  const propsSocketWaitingRoom = useMemo(
    () => ({
      _path: gameData?.socket_info?.url_room ?? "",
      _roomId,
      _profileId: profile?.id ?? "",
      _gameId: gameData?._id ?? "",
      _itemId: gameData?.play_to_earn ? undefined : "61976479dffe844091ab8df1" // 1$ mock
    }),
    [
      _roomId,
      gameData?._id,
      gameData?.play_to_earn,
      gameData?.socket_info?.url_room,
      profile?.id
    ]
  )
  const {
    onSetConnectedSocket,
    isConnected,
    socketWaitingRoom,
    getPlayersMulti,
    handleKick
  } = useSocketWaitingRoom({
    ...propsSocketWaitingRoom
  })

  useEffect(() => {
    if (profile) {
      const token = helper.getTokenFromLocal()

      if (token) {
        socketWaitingRoom.auth = { token }
        socketWaitingRoom.connect()
      }
    }

    return () => {
      if (socketWaitingRoom.connected === false) return
      socketWaitingRoom.disconnect()
    }
  }, [onSetConnectedSocket, profile, socketWaitingRoom])

  useMemo(async () => {
    if (isConnected) {
      const _dataPlayers = await getPlayersMulti()
      if (_dataPlayers) {
        const uniquePlayerIn = (
          _dataPlayers as IGameRoomListSocket
        ).current_player.filter(
          (thing, index, self) =>
            index === self.findIndex((t) => t?.player_id === thing?.player_id)
        )
        const data = _dataPlayers as IGameRoomListSocket

        if (_dataPlayers && uniquePlayerIn) {
          const _p = uniquePlayerIn.map((ele) => {
            const owner =
              data.create_room_detail.player_create === ele.player_id
            return {
              ...ele,
              owner
            }
          })
          const player_blank = Array(
            (data.max_players <= 8 ? 8 : data.max_players) - _p.length
          ).map((ele) => ele)
          setDataPlayers({ ...data, current_player: [..._p, ...player_blank] })
        }
      }
    }
  }, [getPlayersMulti, isConnected])

  const outRoom = () => {}

  // if (value.room_status === "playing") {
  //   // send owner burn item
  //   setBurnStart(true)
  // }

  // if (value.room_status === "ready_play") {
  //   // SEND ALL PLAYER TO GAME
  //   setSendToGame(true)
  // }

  // console.log(dataPlayers)

  return (
    <>
      <Box className=" gap-3 md:flex">
        <Box className="w-full shrink  rounded-3xl border border-neutral-800">
          {dataPlayers && (
            <HeaderWaitingRoom
              roomTag={dataPlayers.create_room_detail.no_room}
              roomName="#ROOM NAME"
              timer={{
                time: new Date(dataPlayers.end_time)
              }}
              player={{
                currentPlayer: dataPlayers.amount_current_player,
                maxPlayer: dataPlayers.max_players
              }}
              onOutRoom={outRoom}
            />
          )}

          {dataPlayers && dataPlayers.current_player && (
            <SeatPlayers players={dataPlayers?.current_player} />
          )}
        </Box>
        <Box className="w-[333px]  flex-none rounded-3xl border border-neutral-800">
          right box
        </Box>
      </Box>
    </>
  )
}

export default memo(GameMultiPlayer)
