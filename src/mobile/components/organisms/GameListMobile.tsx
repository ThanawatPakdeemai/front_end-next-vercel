import React from "react"
import { IGame } from "@feature/game/interfaces/IGameService"
import { Box } from "@mui/material"
import { v4 as uuid } from "uuid"
import NoData from "@components/molecules/NoData"
import SkeletonCardMobile from "../atoms/skeleton/SkeletonCardMobile"
import GameCardMobile from "../molecules/GameCardMobile"

interface IGameList {
  gameData: IGame[] | []
  loading: boolean
  limit: number
}

const GameListMobile = ({ gameData, loading, limit }: IGameList) => (
  <Box
    component="section"
    className="game-section"
  >
    {gameData && gameData.length === 0 && !loading && (
      <NoData className="w-full" />
    )}
    <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
      {loading &&
        [...Array(limit)].map(() => <SkeletonCardMobile key={uuid()} />)}
      {!loading &&
        gameData &&
        gameData.length > 0 &&
        gameData.map((_game) => (
          <GameCardMobile
            key={_game.id}
            gameId={_game.id}
            name={_game.name}
            imageCategoryList={_game.image_category_list}
            categoryList={_game.category_list}
            href={`/${_game.game_mode}/${_game.path}`}
          />
        ))}
    </div>
  </Box>
)

export default GameListMobile
