import React, { memo } from "react"
import { useRouter } from "next/router"
import { Box, Typography } from "@mui/material"
import SocketProvider from "@providers/SocketProviderWaiting"
import { useTranslation } from "next-i18next"
import useWaitingRoomController from "@feature/game/containers/hooks/useWaitingRoomController"
import dynamic from "next/dynamic"
import { IPropWaitingSingle } from "../singlePlayer/SingleWaiting"

const SeatPlayersMulti = dynamic(
  () => import("@feature/game/components/organisms/SeatPlayersMulti"),
  {
    suspense: true,
    ssr: false
  }
)
const CardButItem = dynamic(
  () => import("@feature/gameItem/components/molecules/CardBuyItem"),
  {
    suspense: true,
    ssr: false
  }
)
const HeaderWaitingRoom = dynamic(
  () => import("@components/organisms/HeaderWaitingRoom"),
  {
    suspense: true,
    ssr: false
  }
)
const BuyItemBody = dynamic(
  () => import("@components/templates/game/BuyItemBody"),
  {
    suspense: true,
    ssr: false
  }
)
const Chat = dynamic(() => import("@feature/chat/components/organisms/Chat"), {
  suspense: true,
  ssr: false
})
const ArrowBackIcon = dynamic(() => import("@mui/icons-material/ArrowBack"), {
  suspense: true,
  ssr: false
})
const ButtonToggleIcon = dynamic(
  () => import("@components/molecules/gameSlide/ButtonToggleIcon"),
  {
    suspense: true,
    ssr: false
  }
)
const SkeletonCardPlayers = dynamic(
  () => import("@components/atoms/skeleton/SkeletonCardPlayers"),
  {
    suspense: true,
    ssr: false
  }
)

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
