import React, { useCallback, useEffect, useState } from "react"
import useGameStore from "@stores/game"
import { useRouter } from "next/router"
import useGetGameByPath from "@feature/game/containers/hooks/useFindGameByPath"
import { IGame } from "@feature/game/interfaces/IGameService"
import GameDetailLayoutMobile from "../templates/GameDetailLayoutMobile"

const GameLobbyMobile = () => {
  const router = useRouter()
  const { onSetGameData, allGame } = useGameStore()
  const { GameHome, typeGame } = router.query
  const [gameData, setGameData] = useState<IGame>()
  const { gameData: gameDataFound } = useGetGameByPath(
    GameHome ? GameHome.toString() : ""
  )

  const fetchGame = useCallback(async () => {
    if (allGame && allGame.length > 0) {
      // Find game in local storage first
      const _game = allGame?.find(
        (game) => game.path === GameHome && typeGame === game.game_mode
      )
      if (_game) {
        onSetGameData(_game)
        setGameData(_game)
      } else {
        // If not found, using found game in API
        if (!gameDataFound) return
        onSetGameData(gameDataFound)
        setGameData(gameDataFound)
      }
    }
  }, [GameHome, onSetGameData, typeGame, allGame, gameDataFound])

  useEffect(() => {
    let load = false

    if (!load) {
      fetchGame()
    }

    return () => {
      load = true
    }
  }, [fetchGame])

  return gameData ? <GameDetailLayoutMobile gameData={gameData} /> : <></>
}

export default GameLobbyMobile
