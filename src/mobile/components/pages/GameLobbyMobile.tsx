import React, { useCallback, useEffect, useState } from "react"
import useGameStore from "@stores/game"
import { useRouter } from "next/router"
import useGetGameByPath from "@feature/game/containers/hooks/useFindGameByPath"
import { IGame } from "@feature/game/interfaces/IGameService"
import dynamic from "next/dynamic"

const GameDetailLayoutMobile = dynamic(
  () => import("../templates/GameDetailLayoutMobile"),
  {
    suspense: true,
    ssr: false
  }
)

const GameLobbyMobile = () => {
  const router = useRouter()
  const { onSetGameData, allGame } = useGameStore()
  const { GameHome } = router.query
  const [gameData, setGameData] = useState<IGame>()
  const { gameData: gameDataFound } = useGetGameByPath(
    GameHome ? GameHome.toString() : ""
  )

  const fetchGame = useCallback(async () => {
    if (allGame && allGame.length > 0) {
      if (!gameDataFound) return
      onSetGameData(gameDataFound)
      setGameData(gameDataFound)
    }
  }, [onSetGameData, allGame, gameDataFound])

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
