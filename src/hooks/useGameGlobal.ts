// import { getGameByPath } from "@feature/game/containers/services/game.service"
import { IGame } from "@feature/game/interfaces/IGameService"
import useGameStore from "@stores/game"
import { useRouter } from "next/router"
import { useEffect, useMemo, useState } from "react"

const useGameGlobal = () => {
  const { itemSelected, onSetGameData, data } = useGameStore()
  const router = useRouter()
  const [gameData, setGameData] = useState<IGame>(data as IGame)
  const { id, GameHome } = router.query

  // useMemo(() => {
  //   let load = false
  //   if (!load) {
  //     if (!gameData && GameHome && GameHome !== "") {
  //       getGameByPath(GameHome ? GameHome.toString() : "").then((_res) => {
  //         setGameData(_res?.data?.[0])
  //       })
  //     }
  //   }

  //   return () => {
  //     load = true
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  // const { gameData } = useGetGameByPath(GameHome ? GameHome.toString() : "")
  const itemSizeId = id as string

  const conditionPlayToEarn = useMemo(
    () => gameData && gameData.play_to_earn === true,
    [gameData]
  )

  const conditionGameFree = useMemo(
    () =>
      gameData &&
      (gameData?.game_mode !== "play-to-earn" || gameData.tournament),
    [gameData]
  )
  // const conditionPlayToEarn = gameData && gameData.play_to_earn === true

  // const conditionGameFree =
  //   gameData && (gameData?.game_mode !== "play-to-earn" || gameData.tournament)

  useEffect(() => {
    let load = false

    if (!load) {
      if (gameData) onSetGameData(gameData)
    }

    return () => {
      load = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameData])

  const item = useMemo(() => {
    if (gameData) {
      if (conditionGameFree) {
        return gameData.item && gameData.item.length > 0 && gameData.item[0]._id
      }
      if (itemSelected) {
        return itemSelected._id
      }
      if (itemSizeId) {
        return itemSizeId
      }
    } else {
      return ""
    }
  }, [conditionGameFree, gameData, itemSelected, itemSizeId])

  return {
    conditionGameFree,
    item,
    gameData,
    itemSizeId,
    onSetGameData,
    itemSelected,
    conditionPlayToEarn,
    setGameData,
    GameHome
  }
}

export default useGameGlobal
