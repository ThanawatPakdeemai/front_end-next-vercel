import useWaitingMulti from "@feature/game/containers/hooks/useWaitingMulti"
import { CurrentPlayer } from "@feature/game/interfaces/IGameService"
import PlayerCardMobile from "@src/mobile/features/game/components/molecules/PlayerCardMobile"
import ButtonGame from "@src/mobile/features/game/components/atoms/ButtonGame"
import { useTranslation } from "next-i18next"
import SocketProvider from "@providers/SocketProviderWaiting"
import { MESSAGES } from "@constants/messages"
import { useToast } from "@feature/toast/containers"
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty"
import { CircularProgress } from "@mui/material"
import { useRouter } from "next/router"
import TitleOutRoom from "@src/mobile/components/molecules/TitleOutRoom"
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
  const router = useRouter()
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
      <div className="flex items-center justify-between">
        <TitleOutRoom
          name={
            <>
              {`${gameData?.name || "Game"} `}
              <span className=" text-green-lemon ">{`${
                dataPlayers
                  ? ` : [${dataPlayers?.create_room_detail?.no_room}]`
                  : ""
              }`}</span>
            </>
          }
          onOutRoom={() =>
            router.push(router?.asPath?.split("/")?.slice(0, -1).join("/"))
          }
        />
        <ChatMobile
          modalChat={modalChat}
          setModalChat={setModalChat}
        />
      </div>

      {gameData && dataPlayers && (
        <>
          <PlayerCardMobile
            players={
              dataPlayers?.current_player as unknown[] as CurrentPlayer[]
            }
          />

          {playerAllReady &&
            playerAllBurnItem &&
            playerMe?.status === "ready" &&
            // play &&
            dataPlayers?.room_status === "ready_play" && (
              <ButtonGame
                textButton=""
                // time={new Date(new Date().setSeconds(new Date().getSeconds() + 10))}
                time={
                  playerAllReady && playerAllBurnItem
                    ? new Date(time.setSeconds(time.getSeconds() + 10))
                    : new Date()
                }
                url=""
                onClick={() => {}}
                textColor={` ${
                  playerAllReady ? "text-secondary-main " : "text-error-main"
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
                    : errorToast(MESSAGES["please-wait-player-all-ready"])
                }}
                textColor={`text-green-lemon ${"!w-[170px]"}`}
                classCssButton={`!mt-0 ${
                  playerAllReady ? "!bg-green-lemon " : " !bg-error-main "
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
                textColor="text-green-lemon"
                classCssButton="!mt-0 !bg-green-lemon h-[40px] !w-[105px]"
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
                textColor="text-green-lemon "
                classCssButton="!mt-0 !bg-green-lemon h-[40px] !w-[105px]"
                description={checkText}
                buttonIcon={{ show: true, bgColor: "!bg-green-lemon" }}
              />
            )}
        </>
      )}
    </SocketProvider>
  )
}

export default MultiWaiting
