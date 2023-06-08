import useWaitingMulti from "@feature/game/containers/hooks/useWaitingMulti"
import { CurrentPlayer } from "@feature/game/interfaces/IGameService"
import PlayerCardMobile from "@src/mobile/features/game/components/molecules/PlayerCardMobile"
import ButtonGame from "@src/mobile/features/game/components/atoms/ButtonGame"
import { useTranslation } from "next-i18next"
import SocketProvider from "@providers/SocketProviderWaiting"
import { MESSAGES } from "@constants/messages"
import { useToast } from "@feature/toast/containers"
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty"
import { Box, CircularProgress } from "@mui/material"
import TitleOutRoom from "@src/mobile/components/molecules/TitleOutRoom"
import WaitingSkeleton from "@mobile/components/atoms/skelaton/WaitingSkeleton"
import { StyleWaitingRoom } from "@mobile/styles/muiStyleMobile"
import RoomListBox from "@components/molecules/roomList/RoomListBox"
import ClockIcon2 from "@components/icons/ClockIcon2"
import ChatMobile from "../../organisms/ChatMobile"

const MultiWaiting = () => {
  const {
    gameData,
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
    checkTextCard,
    isOwnerRoom,
    ownerPressPlay,
    playerMe,
    playerPressReady,
    playerAllReady,
    playerAllBurnItem,
    onPlayGame,
    onReady,
    setPlayerPressReady,
    checkText,
    time,
    loading,
    modalChat,
    setModalChat
  } = useWaitingMulti()

  const { t } = useTranslation()
  const { errorToast } = useToast()

  return (
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
        getChat,
        checkTextCard
      }}
    >
      <Box
        component="div"
        className="waiting-room__wrapper flex flex-col gap-4"
        sx={StyleWaitingRoom}
      >
        <TitleOutRoom
          name={
            <Box
              component="div"
              className="waiting-room__header flex items-center whitespace-nowrap text-[12px]"
              sx={{
                ".timer-box": {
                  background: "transparent",
                  border: 0,
                  padding: 0,
                  flex: "none",
                  ".MuiTypography-root": {
                    color: "#F2C94C",
                    fontSize: "12px"
                  }
                }
              }}
            >
              {/* Room ID */}
              {`${gameData?.name || "Game"} `}
              <span className="text-[#ffffff]">{`${
                dataPlayers
                  ? `: #${dataPlayers?.create_room_detail?.no_room}`
                  : ""
              }`}</span>

              {/* Room Timer */}
              {dataPlayers && (
                <div className="waiting-room__header--timer ml-2 flex items-center gap-2">
                  <ClockIcon2 />
                  <RoomListBox
                    type="timer"
                    timer={{
                      time: new Date(dataPlayers.end_time)
                    }}
                    player={{
                      currentPlayer: dataPlayers.amount_current_player,
                      maxPlayer: dataPlayers.max_players
                    }}
                    color="green"
                    shade="lemon"
                  />
                </div>
              )}
            </Box>
          }
          // onOutRoom={() =>
          //   router.push(router?.asPath?.split("/")?.slice(0, -1).join("/"))
          // }
          component={
            <ChatMobile
              modalChat={modalChat}
              setModalChat={setModalChat}
            />
          }
        />

        <Box
          component="div"
          className="waiting-room__playerList flex flex-col gap-6"
          sx={StyleWaitingRoom}
        >
          {gameData && dataPlayers ? (
            <Box
              component="div"
              className="waiting-room__content flex flex-col gap-6"
            >
              <PlayerCardMobile
                players={
                  dataPlayers?.current_player as unknown[] as CurrentPlayer[]
                }
              />
              {playerMe && (
                <div className="game-play-button">
                  {playerAllReady &&
                    playerAllBurnItem &&
                    playerMe?.status === "ready" &&
                    dataPlayers?.room_status === "ready_play" && (
                      <ButtonGame
                        textButton=""
                        time={
                          playerAllReady && playerAllBurnItem
                            ? new Date(time.setSeconds(time.getSeconds() + 10))
                            : new Date()
                        }
                        url=""
                        onClick={() => {}}
                        textColor={` ${
                          playerAllReady
                            ? "text-secondary-main "
                            : "text-error-main"
                        }`}
                        classCssButton="!mt-0 !bg-secondary-main h-[40px] !w-[105px]"
                        description={checkText}
                        buttonIcon={{
                          show: true,
                          bgColor: "!bg-secondary-main",
                          icon: <HourglassEmptyIcon />
                        }}
                      />
                    )}

                  {isOwnerRoom &&
                    !ownerPressPlay &&
                    playerMe?.status === "ready" &&
                    dataPlayers?.room_status !== "ready_play" && (
                      <ButtonGame
                        disabled={!playerAllReady || loading}
                        textButton={
                          loading ? (
                            <CircularProgress
                              color="primary"
                              className="ml-4"
                              size={15}
                            />
                          ) : (
                            t("start")
                          )
                        }
                        url=""
                        onClick={() => {
                          playerAllReady
                            ? onPlayGame()
                            : errorToast(
                                MESSAGES["please-wait-player-all-ready"]
                              )
                        }}
                        textColor={`text-[#F2C94C] ${"!w-[170px]"}`}
                        classCssButton={`!mt-0 ${
                          playerAllReady ? "!bg-[#F2C94C]" : " !bg-error-main "
                        } h-[40px] !w-[105px]`}
                        description={checkText}
                      />
                    )}

                  {!isOwnerRoom &&
                    !playerPressReady &&
                    playerMe?.status === "inroom" && (
                      <ButtonGame
                        disabled={loading}
                        textButton={
                          loading ? (
                            <CircularProgress
                              color="primary"
                              className="ml-4"
                              size={15}
                            />
                          ) : (
                            t("ready")
                          )
                        }
                        url=""
                        onClick={onReady}
                        textColor="text-[#F2C94C]"
                        classCssButton="!mt-0 !bg-[#F2C94C] h-[40px] !w-[105px]"
                        description={checkText}
                      />
                    )}

                  {!isOwnerRoom &&
                    playerPressReady &&
                    playerMe?.status === "ready" &&
                    dataPlayers?.room_status !== "ready_play" && (
                      <ButtonGame
                        textButton={t("You are ready")}
                        url=""
                        onClick={() => {
                          cancelReadyPlayer()
                          setPlayerPressReady(false)
                        }}
                        textColor="text-[#F2C94C]"
                        classCssButton="!mt-0 !bg-[#F2C94C] h-[40px] !w-[105px]"
                        description={checkText}
                        buttonIcon={{ show: true, bgColor: "!bg-[#F2C94C]" }}
                      />
                    )}
                </div>
              )}
            </Box>
          ) : (
            <WaitingSkeleton />
          )}
        </Box>
      </Box>
    </SocketProvider>
  )
}

export default MultiWaiting
