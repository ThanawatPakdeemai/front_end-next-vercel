import useChatContext from "@feature/chat/containers/contexts/useChatContext"
import HeaderWaitingRoom from "@components/organisms/HeaderWaitingRoom"
import React, { memo, useEffect, useMemo, useState, useCallback } from "react"
import useProfileStore from "@stores/profileStore"
import useGameStore from "@stores/game"
import { useRouter } from "next/router"
import useSocketWaitingRoom from "@feature/game/containers/hooks/useSocketWaitingRoom"
import helper from "@utils/helper"
import { IGameRoomListSocket } from "@feature/game/interfaces/IGameService"
import { Box, Typography } from "@mui/material"
import SocketProvider from "@providers/SocketProviderWaiting"
import SeatPlayersMulti from "@feature/game/components/organisms/SeatPlayersMulti"
import { useToast } from "@feature/toast/containers"
import Chat from "@feature/chat/components/organisms/Chat"
import { IChat } from "@feature/chat/interface/IChat"
import { MESSAGES } from "@constants/messages"
import CardButItem from "@feature/gameItem/components/molecules/CardBuyItem"
import ButtonLink from "@components/atoms/button/ButtonLink"
import { useTranslation } from "next-i18next"
import { IPropWaitingSingle } from "../singlePlayer/SingleWaiting"

const GameMultiPlayer = ({ _roomId }: IPropWaitingSingle) => {
  const profile = useProfileStore((state) => state.profile.data)
  const { data: gameData, itemSelected } = useGameStore()
  const router = useRouter()
  const { t } = useTranslation()
  const { errorToast } = useToast()
  const [dataPlayers, setDataPlayers] = useState<
    IGameRoomListSocket | undefined
  >()
  const { setChat } = useChatContext()

  const item_id = useMemo(() => {
    if (gameData) {
      if (gameData.play_to_earn || gameData.tournament) {
        return gameData.item[0]._id
      }
      if (itemSelected) {
        return itemSelected._id
      }
    } else {
      return ""
    }
  }, [gameData, itemSelected])

  const propsSocketWaitingRoom = useMemo(
    () => ({
      path: gameData?.socket_info?.url_room ?? "",
      room_id: _roomId,
      player_id: profile?.id ?? "",
      game_id: gameData?._id ?? "",
      item_id
    }),
    [
      _roomId,
      gameData?._id,
      gameData?.socket_info?.url_room,
      item_id,
      profile?.id
    ]
  )
  const {
    onSetConnectedSocket,
    isConnected,
    socketWaitingRoom,
    getPlayersMulti,
    kickRoom,
    getChat,
    onSendMessage,
    cancelReadyPlayer,
    onReadyPlayerBurnItem,
    onOwnerBurnItem,
    getPlayersCheckItemOfPlayerListen,
    getPlayersCheckRoomRollbackListen,
    room_id
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

  const mapPlayer = useCallback(
    (_dataPlayers: IGameRoomListSocket) => {
      if (_dataPlayers) {
        const _play = _dataPlayers as IGameRoomListSocket
        if ("current_player" in _play) {
          const uniquePlayerIn = _play.current_player.filter(
            (thing, index, self) =>
              index ===
              self.findIndex((_self) => _self?.player_id === thing?.player_id)
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
    },
    [errorToast]
  )

  useEffect(() => {
    if (isConnected) {
      getPlayersMulti().then((res) => {
        if (res) {
          const data = res as IGameRoomListSocket
          mapPlayer(data)
        }
      })
    }
  }, [getPlayersMulti, isConnected, mapPlayer])

  const outRoom = useCallback(() => {
    if (gameData) router.push(`/${gameData.path}/roomlist`)
  }, [gameData, router])

  /**
   *@description Will run when leaving the current page; on back/forward actions out room this game
   */
  useEffect(() => {
    router.beforePopState(({ as }) => {
      if (as !== router.asPath) {
        outRoom()
      }
      return true
    })

    return () => {
      router.beforePopState(() => true)
    }
  }, [outRoom, router])

  /**
   * @description call check owner burn item after create room and into waiting room
   */
  // useEffect(() => {
  //   if (dataPlayers) {
  //     if (dataPlayers.room_status === "online") {
  //       // send owner burn item
  //       if (player && player.owner && itemSelected) {
  //         onOwnerBurnItem(player.item_burn, itemSelected?._id, qtyItemOfRoom)
  //       }
  //     }
  //   }
  // }, [dataPlayers, itemSelected, onOwnerBurnItem, player, qtyItemOfRoom])

  /**
   * @description Calling chatting function
   */
  const onChat = useCallback(async () => {
    const _dataChat = await getChat()
    if (_dataChat) {
      setChat((oldData) => [_dataChat as IChat, ...oldData])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getChat])

  useEffect(() => {
    if (isConnected) {
      onChat()
    }
  }, [isConnected, onChat])

  useEffect(() => {
    if (isConnected) {
      getPlayersCheckItemOfPlayerListen().then((res) => {
        if (res) {
          const data = res as IGameRoomListSocket
          // console.log("ItemP", data)

          mapPlayer(data)
        }
      })
    }
  }, [
    getPlayersCheckItemOfPlayerListen,
    isConnected,
    mapPlayer,
    onReadyPlayerBurnItem,
    onOwnerBurnItem
  ])

  useEffect(() => {
    if (isConnected) {
      getPlayersCheckRoomRollbackListen().then((res) => {
        if (res) {
          const data = res as IGameRoomListSocket
          // console.log("ItemPRollback", data)

          mapPlayer(data)
        }
      })
    }
  }, [
    getPlayersCheckRoomRollbackListen,
    isConnected,
    mapPlayer,
    onReadyPlayerBurnItem,
    onOwnerBurnItem
  ])

  return (
    <>
      <SocketProvider
        propsSocket={{
          kickRoom,
          cancelReadyPlayer,
          onSendMessage,
          onReadyPlayerBurnItem,
          room_id,
          onOwnerBurnItem,
          dataPlayers
        }}
      >
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

            {dataPlayers && dataPlayers.current_player ? (
              <SeatPlayersMulti players={dataPlayers?.current_player} />
            ) : (
              <>
                <HeaderWaitingRoom
                  roomTag="0000"
                  roomName="#ROOM NAME"
                  timer={{
                    time: new Date()
                  }}
                  player={{
                    currentPlayer: 0,
                    maxPlayer: 0
                  }}
                  onOutRoom={() => {
                    outRoom()
                  }}
                />
                <Typography className="my-5 text-center">
                  {t("no-player")}
                </Typography>
                {gameData && (
                  <ButtonLink
                    href={`/${gameData?.path}/roomlist`}
                    text={t("out-room")}
                    icon=""
                    size="medium"
                    className="m-auto"
                    color="secondary"
                    variant="contained"
                  />
                )}
              </>
            )}
          </Box>
          <Box className=" w-[333px] flex-none gap-2">
            <CardButItem />
            <Chat />
          </Box>
        </Box>
      </SocketProvider>
    </>
  )
}

export default memo(GameMultiPlayer)
