import ButtonGame from "@src/mobile/features/game/components/atoms/ButtonGame"
import useWaitingSingle from "@feature/game/containers/hooks/useWaitingSingle"
import { CurrentPlayer } from "@feature/game/interfaces/IGameService"
import PlayerCardMobile from "@src/mobile/features/game/components/molecules/PlayerCardMobile"
import { useTranslation } from "react-i18next"
import WaitingSkeleton from "@mobile/components/atoms/skelaton/WaitingSkeleton"
import { Box } from "@mui/material"
import { StyleWaitingRoom } from "@mobile/styles/muiStyleMobile"

const SingleWaiting = () => {
  const { t } = useTranslation()
  const { gameData, playersMap, onPlayGame, playersMe, loadingPlayer } =
    useWaitingSingle()

  return (
    <Box
      component="div"
      className="waiting-room__wrapper"
      sx={StyleWaitingRoom}
    >
      {!loadingPlayer ? (
        <>
          {gameData && playersMap && (
            <Box
              component="div"
              className="waiting-room__content flex flex-col gap-6 font-urbanist"
            >
              <PlayerCardMobile
                players={playersMap as unknown[] as CurrentPlayer[]}
              />
              <div className="game-play-button">
                {playersMe && (
                  <ButtonGame
                    textButton={t("start")}
                    url=""
                    onClick={onPlayGame}
                    textColor="text-green-lemon"
                    classCssButton="!mt-0 !bg-green-lemon h-[40px] !w-[105px]"
                    description="Everyone's here and we're ready to go. Let's start the game!"
                  />
                )}
              </div>
            </Box>
          )}
        </>
      ) : (
        <WaitingSkeleton />
      )}
    </Box>
  )
}

export default SingleWaiting
