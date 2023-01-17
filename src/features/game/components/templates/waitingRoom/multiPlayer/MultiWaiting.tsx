import HeaderWaitingRoom from "@components/organisms/HeaderWaitingRoom"
import React, { memo, useEffect, useMemo, useState, useCallback } from "react"
import useProfileStore from "@stores/profileStore"
import useGameStore from "@stores/game"
import { useRouter } from "next/router"
import useSocketWaitingRoom from "@feature/game/containers/hooks/useSocketWaitingRoom"
import helper from "@utils/helper"
import {
  CurrentPlayer,
  IGameRoomListSocket
} from "@feature/game/interfaces/IGameService"
import { Box } from "@mui/material"
import SocketProvider from "@providers/SocketProvider"
import SeatPlayersMulti from "@feature/game/components/organisms/SeatPlayersMulti"
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
      _itemId: gameData?.play_to_earn
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
    kickRoom
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

  // const statusReady = useMemo(() => {
  //   if (
  //     dataPlayers &&
  //     dataPlayers.current_player &&
  //     dataPlayers.current_player.length > 0
  //   ) {
  //     const _ready = dataPlayers.current_player.map((player: CurrentPlayer) => {
  //       if (player) {
  //         return player.player_id === profile?.id && player.status === "ready"
  //       }
  //       return undefined
  //     })
  //     return _ready
  //   }
  //   return false
  // }, [dataPlayers, profile?.id])

  // const textButton = () => {
  //   if (profile) {
  //     if (players && players.length > 0) {
  //       const __player = [...players].filter((ele) => ele)
  //       const _player = __player.find((ele) => ele?.player_id === profile.id)
  //       if (_player && __player) {
  //         const playeNotReady = __player.filter(
  //           (ele) => ele?.status !== "ready"
  //         )
  //         const allReady = __player.filter((ele) => ele?.status === "ready")

  //         if ("owner" in _player && _player.owner) {
  //           // owner
  //           if (__player.length === 1) {
  //             return (
  //               <span className=" text-secondary-main">
  //                 The game is starting now, prepare to play!
  //               </span>
  //             )
  //           }
  //           if (playeNotReady.length > 0) {
  //             return (
  //               <span className="text-error-main">
  //                 The game will begin as soon as all players are ready
  //               </span>
  //             )
  //           }
  //           return (
  //             <span className=" text-green-lemon">
  //               Everyone's here and we're ready to go. Let's start the game!
  //             </span>
  //           )
  //         }
  //         if (_player.status === "ready") {
  //           return "Please wait for them to begin"
  //         }
  //         if (allReady.length === __player.length)
  //           return "It's time to play! Press the 'Ready’"

  //         return (
  //           <span className=" text-green-lemon">
  //             The game is starting now, prepare to play!
  //           </span>
  //         )

  //         // player
  //       }
  //     }
  //     return "Don't have Player, please out room"
  //   }
  //   return "Please Login"
  // }

  return (
    <>
      <SocketProvider propsSocket={propsSocketWaitingRoom}>
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
              <SeatPlayersMulti
                players={dataPlayers?.current_player}
                handleKick={kickRoom}
                roomId={_roomId}
              />
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
