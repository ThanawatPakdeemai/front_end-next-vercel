import HeaderWaitingRoom from "@components/organisms/HeaderWaitingRoom"
import React, { memo } from "react"
import { useRouter } from "next/router"
import { Box, Typography } from "@mui/material"
import SocketProvider from "@providers/SocketProviderWaiting"
import SeatPlayersMulti from "@feature/game/components/organisms/SeatPlayersMulti"
import Chat from "@feature/chat/components/organisms/Chat"
import CardButItem from "@feature/gameItem/components/molecules/CardBuyItem"
import { useTranslation } from "next-i18next"
import BuyItemBody from "@components/templates/game/BuyItemBody"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import ButtonToggleIcon from "@components/molecules/gameSlide/ButtonToggleIcon"
import SkeletonCardPlayers from "@components/atoms/skeleton/SkeletonCardPlayers"
import useWaitingRoomController from "@feature/game/containers/hooks/useWaitingRoomController"
import { IPropWaitingSingle } from "../singlePlayer/SingleWaiting"

const GameMultiPlayer = ({ _roomId }: IPropWaitingSingle) => {
  const {
    kickRoom,
    cancelReadyPlayer,
    onSendMessage,
    onReadyPlayerBurnItem,
    room_id,
    onOwnerBurnItem,
    dataPlayers,
    waitingRoomPlay,
    startGame,
    getChat,
    gameData,
    outRoom
  } = useWaitingRoomController({ _roomId })
  const router = useRouter()
  const { t } = useTranslation()

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
        <Box
          component="div"
          className="block gap-3 lg:flex "
        >
          {/* <Box className=" block gap-3 lg:grid lg:grid-flow-col"> */}
          {/* <Box className=" block gap-3 lg:grid lg:grid-flow-col"> */}
          <Box
            component="div"
            className="w-full gap-3 md:flex"
          >
            <Box
              component="div"
              className="w-full shrink rounded-3xl border border-neutral-800"
            >
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
