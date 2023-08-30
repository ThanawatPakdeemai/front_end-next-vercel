import React, { memo } from "react"
import { P2EHeaderMenu } from "@constants/gameSlide"
import useGlobal from "@hooks/useGlobal"
import useGamePageListController from "@feature/game/containers/hooks/useGamePageListController"
import { IGame } from "@feature/game/interfaces/IGameService"
import dynamic from "next/dynamic"

const GameCard = dynamic(
  () => import("@feature/game/components/molecules/GameCard"),
  {
    suspense: true,
    ssr: false
  }
)

interface IGamesLobbyProps {
  _gameData: IGame[] | undefined
}

const GamesLobby = ({ _gameData }: IGamesLobbyProps) => {
  const { getGameMode } = useGlobal()
  const { onSetGameStore } = useGamePageListController()

  return (
    <div className="mx-2 mb-6 flex flex-wrap">
      {_gameData &&
        _gameData.map((game) => (
          <GameCard
            key={game._id}
            menu={P2EHeaderMenu}
            data={game}
            href={`/${getGameMode(game)}/${game.path}`}
            onHandleClick={() => onSetGameStore(game)}
            gameType={getGameMode(game)}
          />
        ))}
    </div>
  )
}

export default memo(GamesLobby)
