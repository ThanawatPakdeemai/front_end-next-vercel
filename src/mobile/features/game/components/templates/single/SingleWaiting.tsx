// import PlayerCard from "@feature/game/components/molecules/PlayerCard"
import ButtonGame from "@src/mobile/features/game/components/atoms/ButtonGame"
import useWaitingSingle from "@feature/game/containers/hooks/useWaitingSingle"
import { CurrentPlayer } from "@feature/game/interfaces/IGameService"
import PlayerCardMobile from "@src/mobile/features/game/components/molecules/PlayerCardMobile"
import { useTranslation } from "react-i18next"

const SingleWaiting = () => {
  const { t } = useTranslation()
  const { gameData, playersMap, onPlayGame } = useWaitingSingle()
  return (
    <>
      {gameData && playersMap && (
        <>
          <PlayerCardMobile
            players={playersMap as unknown[] as CurrentPlayer[]}
          />
          <ButtonGame
            textButton={t("start")}
            url=""
            onClick={onPlayGame}
            textColor="text-green-lemon"
            classCssButton="!mt-0 !bg-green-lemon h-[40px] !w-[105px]"
            description="Everyone's here and we're ready to go. Let's start the game!"
          />
        </>
      )}
    </>
  )
}

export default SingleWaiting
