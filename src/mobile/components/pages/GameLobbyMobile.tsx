import React, { useEffect } from "react"
import useGameStore from "@stores/game"
import { useRouter } from "next/router"
import GameDetailLayoutMobile from "../templates/GameDetailLayoutMobile"

const GameLobbyMobile = () => {
  const router = useRouter()
  const { onSetGameData, allGame } = useGameStore()
  const { GameHome, typeGame } = router.query
  const gameData = allGame?.find(
    (game) => game.path === GameHome && typeGame === game.game_mode
  )

  useEffect(() => {
    let load = false

    if (!load) {
      if (!gameData) return
      onSetGameData(gameData)
    }

    return () => {
      load = true
    }
  }, [gameData, onSetGameData])

  return gameData ? <GameDetailLayoutMobile gameData={gameData} /> : <></>
}

export default GameLobbyMobile
