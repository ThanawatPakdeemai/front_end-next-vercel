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
import { MESSAGES } from "@constants/messages"
import CardButItem from "@feature/gameItem/components/molecules/CardBuyItem"
import { useTranslation } from "next-i18next"
import BuyItemBody from "@components/templates/game/BuyItemBody"
import useBuyGameItemController from "@feature/buyItem/containers/hooks/useBuyGameItemController"
import { IGameItemListData } from "@feature/gameItem/interfaces/IGameItemService"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import ButtonToggleIcon from "@components/molecules/gameSlide/ButtonToggleIcon"
import SkeletonCardPlayers from "@components/atoms/skeleton/SkeletonCardPlayers"
import { IPropWaitingSingle } from "../singlePlayer/SingleWaiting"

const GameMultiPlayer = ({ _roomId }: IPropWaitingSingle) => {
  const profile = useProfileStore((state) => state.profile.data)
  const { data: gameData, itemSelected, onSetGameItemSelectd } = useGameStore()
  const router = useRouter()
  const { t } = useTranslation()
  const { errorToast } = useToast()
  const { gameItemList } = useBuyGameItemController()
  const [dataPlayers, setDataPlayers] = useState<
    IGameRoomListSocket | undefined
  >()

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
    onSendMessage,
    cancelReadyPlayer,
    onReadyPlayerBurnItem,
    onOwnerBurnItem,
    getPlayersCheckItemOfPlayerListen,
    getPlayersCheckRoomRollbackListen,
    room_id,
    waitingRoomPlay,
    startGame,
    getChat
  } = useSocketWaitingRoom({ ...propsSocketWaitingRoom })

  useEffect(() => {
    let load = false

    if (!load) {
      if (profile) {
        const token = helper.getTokenFromLocal()

        if (token) {
          socketWaitingRoom.auth = { token }
          socketWaitingRoom.connect()
        }
      }
    }

    return () => {
      load = false
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

  const checkItemSelected = useCallback(() => {
    if (gameItemList && dataPlayers) {
      const item = gameItemList?.find(
        (_item: IGameItemListData) => _item.id === dataPlayers.item_id
      )
      if (item) {
        onSetGameItemSelectd(item)
      }
    }
  }, [gameItemList, dataPlayers, onSetGameItemSelectd])

  useEffect(() => {
    let load = false

    if (!load) {
      if (profile) {
        checkItemSelected()
      }
    }

    return () => {
      load = true
    }
  }, [checkItemSelected, profile])

  useEffect(() => {
    let load = false

    if (!load) {
      if (isConnected) {
        getPlayersMulti().then((res) => {
          if (res) {
            const data = res as IGameRoomListSocket
            mapPlayer(data)
            checkItemSelected()
          }
        })
      }
    }

    return () => {
      load = true
    }
  }, [checkItemSelected, getPlayersMulti, isConnected, mapPlayer])

  const outRoom = useCallback(() => {
    if (gameData)
      router.push(`/${router.query.typeGame}/${gameData.path}/roomlist`)
  }, [gameData, router])

  /**
   *@description Will run when leaving the current page; on back/forward actions out room this game
   */
  useEffect(() => {
    let load = false

    if (!load) {
      router.beforePopState(({ as }) => {
        if (as !== router.asPath) {
          outRoom()
        }
        return true
      })
    }

    return () => {
      load = true
      router.beforePopState(() => true)
    }
  }, [outRoom, router])

  /**
   * @description Calling chatting function
   */
  // const onChat = useCallback(async () => {
  //   const _dataChat = await getChat()
  //   if (_dataChat) {
  //     setChat((oldData) => [_dataChat as IChat, ...oldData])
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  // useEffect(() => {
  //   if (isConnected) {
  //     getChat()
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [onSendMessage])

  useEffect(() => {
    let load = false

    if (!load) {
      if (isConnected) {
        getPlayersCheckItemOfPlayerListen().then((res) => {
          if (res) {
            const data = res as IGameRoomListSocket
            mapPlayer(data)
            checkItemSelected()
          }
        })
      }
    }

    return () => {
      load = true
    }
  }, [
    getPlayersCheckItemOfPlayerListen,
    isConnected,
    mapPlayer,
    onReadyPlayerBurnItem,
    onOwnerBurnItem,
    gameItemList,
    checkItemSelected
  ])

  useEffect(() => {
    let load = false

    if (!load) {
      if (isConnected) {
        getPlayersCheckRoomRollbackListen().then((res) => {
          if (res) {
            const data = res as IGameRoomListSocket
            checkItemSelected()
            mapPlayer(data)
          }
        })
      }
    }

    return () => {
      load = true
    }
  }, [
    getPlayersCheckRoomRollbackListen,
    isConnected,
    mapPlayer,
    onReadyPlayerBurnItem,
    onOwnerBurnItem,
    checkItemSelected
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
          dataPlayers,
          waitingRoomPlay,
          startGame,
          getChat
        }}
      >
        <Box className="block gap-3 lg:flex ">
          {/* <Box className=" block gap-3 lg:grid lg:grid-flow-col"> */}
          {/* <Box className=" block gap-3 lg:grid lg:grid-flow-col"> */}
          <Box className="w-full gap-3 md:flex">
            <Box className="w-full shrink rounded-3xl border border-neutral-800">
              {dataPlayers && gameData && (
                <>
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
                </>
              )}
              {dataPlayers && dataPlayers.current_player ? (
                <>
                  <SeatPlayersMulti players={dataPlayers?.current_player} />
                </>
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
                  <SkeletonCardPlayers />
                  <Typography className="my-5 text-center">
                    {t("no-player")}
                  </Typography>
                  {gameData && (
                    <div className="mb-5 flex w-full items-center justify-center">
                      <ButtonToggleIcon
                        startIcon=""
                        endIcon={<ArrowBackIcon />}
                        text="Back"
                        handleClick={() =>
                          router.push(
                            `/${router.query.typeGame}/${gameData?.path}/`
                          )
                        }
                        className="flex h-[40px] !w-[100px] items-center justify-center rounded-md border border-neutral-700 font-neue-machina text-sm font-bold capitalize leading-3 text-white-primary"
                        type="button"
                      />
                    </div>
                  )}
                </>
              )}
            </Box>
          </Box>
          {gameData &&
            gameData?.play_to_earn_status !== "free" &&
            !gameData.tournament && (
              <BuyItemBody>
                <CardButItem gameObject={gameData} />
                <Chat />
              </BuyItemBody>
            )}
        </Box>
      </SocketProvider>
    </>
  )
}

export default memo(GameMultiPlayer)
