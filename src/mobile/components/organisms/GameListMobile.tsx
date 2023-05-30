import React from "react"
import { IGame } from "@feature/game/interfaces/IGameService"
import { Box } from "@mui/material"
import { v4 as uuid } from "uuid"
import NoData from "@components/molecules/NoData"
import useHomeControllerMobile from "@mobile/features/game/containers/hooks/useHomeControllerMobile"
import SkeletonCardMobile from "../skeleton/SkeletonCardMobile"
import GameCardMobile from "../molecules/GameCardMobile"

interface IGameList {
  gameData: IGame[]
  loading: boolean
  limit: number
}

const GameListMobile = ({ gameData, loading, limit }: IGameList) => {
  const { gameLink } = useHomeControllerMobile()

  return (
    <Box
      component="section"
      className="game-section grid grid-cols-2 gap-5 sm:grid-cols-4"
    >
      {gameData && gameData.length === 0 && <NoData className="w-full" />}
      {loading &&
        [...Array(limit)].map(() => <SkeletonCardMobile key={uuid()} />)}
      {!loading &&
        gameData.map((_game) => (
          <GameCardMobile
            key={_game.id}
            gameId={_game.id}
            name={_game.name}
            imageCategoryList={_game.image_category_list}
            categoryList={_game.category_list}
            href={gameLink(_game)}
          />
        ))}
    </Box>
  )
}

export default GameListMobile
