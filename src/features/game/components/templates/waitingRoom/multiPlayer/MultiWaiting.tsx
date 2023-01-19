import HeaderWaitingRoom from "@components/organisms/HeaderWaitingRoom"
import React, { memo, useEffect, useMemo, useState, useCallback } from "react"
import useProfileStore from "@stores/profileStore"
import useGameStore from "@stores/game"
import { useRouter } from "next/router"
import useSocketWaitingRoom from "@feature/game/containers/hooks/useSocketWaitingRoom"
import helper from "@utils/helper"
import { IGameRoomListSocket } from "@feature/game/interfaces/IGameService"
import { Box } from "@mui/material"
import SocketProvider from "@providers/SocketProviderWaiting"
import SeatPlayersMulti from "@feature/game/components/organisms/SeatPlayersMulti"
import { useToast } from "@feature/toast/containers"
import { MESSAGES } from "@constants/messages"
import { IPropWaitingSingle } from "../singlePlayer/SingleWaiting"

const GameMultiPlayer = ({ _roomId }: IPropWaitingSingle) => {
  const profile = useProfileStore((state) => state.profile.data)
  const gameData = useGameStore((state) => state.data)
  const router = useRouter()
  const { errorToast } = useToast()
  const [dataPlayers, setDataPlayers] = useState<
    IGameRoomListSocket | undefined
  >()

  const propsSocketWaitingRoom = useMemo(
    () => ({
      path: gameData?.socket_info?.url_room ?? "",
      room_id: _roomId,
      player_id: profile?.id ?? "",
      game_id: gameData?._id ?? "",
      item_id: gameData?.play_to_earn
        ? gameData.item[0]._id
        : "61976479dffe844091ab8df1" // TODO YUI 1$ mock
    }),
    [
      _roomId,
      gameData?._id,
      gameData?.item,
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
    kickRoom,
    cancelReady
  } = useSocketWaitingRoom({ ...propsSocketWaitingRoom })

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
        const _play = _dataPlayers as IGameRoomListSocket
        if ("current_player" in _play) {
          const uniquePlayerIn = _play.current_player.filter(
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
            setDataPlayers({
              ...data,
              current_player: [..._p, ...player_blank]
            })
          }
        } else {
          errorToast(MESSAGES["no-player"])
        }
      }
    }
  }, [errorToast, getPlayersMulti, isConnected])

  const outRoom = useCallback(() => {
    if (gameData) router.push(`/${gameData.path}/roomlist`)
  }, [gameData, router])

  useEffect(() => {
    router.beforePopState(({ as }) => {
      if (as !== router.asPath) {
        // Will run when leaving the current page; on back/forward actions
        // out room this game
        outRoom()
      }
      return true
    })

    return () => {
      router.beforePopState(() => true)
    }
  }, [outRoom, router])

  return (
    <>
      <SocketProvider propsSocket={{ kickRoom, cancelReady }}>
        <Box className=" gap-3 md:flex">
          <Box className="w-full shrink  rounded-3xl border border-neutral-800">
            {dataPlayers && gameData && (
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
                onOutRoom={() => {
                  outRoom()
                }}
              />
            )}

            {dataPlayers && dataPlayers.current_player && (
              <SeatPlayersMulti players={dataPlayers?.current_player} />
            )}
          </Box>
          <Box className="w-[333px]  flex-none rounded-3xl border border-neutral-800">
            right box
          </Box>
        </Box>
      </SocketProvider>
    </>
  )
}

export default memo(GameMultiPlayer)
