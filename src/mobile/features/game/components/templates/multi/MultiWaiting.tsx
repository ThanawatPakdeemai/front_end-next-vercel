import useWaitingMulti from "@feature/game/containers/hooks/useWaitingMulti"
import {
  CurrentPlayer
  // IGameRoomListSocket
} from "@feature/game/interfaces/IGameService"
import PlayerCardMobile from "@src/mobile/features/game/components/molecules/PlayerCardMobile"
import ButtonGame from "@src/mobile/features/game/components/atoms/ButtonGame"
import { useTranslation } from "next-i18next"
import SocketProvider from "@providers/SocketProviderWaiting"
// import { useEffect } from "react"

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
    checkTextCard
    // isConnected,
    // checkItemSelected,
    // getPlayersMulti,
    // mapPlayer
  } = useWaitingMulti()

  const { t } = useTranslation()

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
      {gameData && dataPlayers && (
        <>
          <PlayerCardMobile
            players={
              dataPlayers?.current_player as unknown[] as CurrentPlayer[]
            }
          />
          <ButtonGame
            textButton={t("start")}
            url=""
            // onClick={onPlayGame}
            textColor="text-green-lemon"
            classCssButton="!mt-0 !bg-green-lemon h-[40px] !w-[105px]"
            description="Everyone's here and we're ready to go. Let's start the game!"
          />
        </>
      )}
    </SocketProvider>
  )
}

export default MultiWaiting
