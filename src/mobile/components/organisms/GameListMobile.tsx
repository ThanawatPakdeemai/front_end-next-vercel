import React from "react"
import { IGame } from "@feature/game/interfaces/IGameService"
import { Box, Typography } from "@mui/material"
import { v4 as uuid } from "uuid"
import NoData from "@components/molecules/NoData"
import useScrollToEndStore from "@stores/scrollToEnd"
import SkeletonCardMobile from "../atoms/skeleton/SkeletonCardMobile"
import GameCardMobile from "../molecules/GameCardMobile"

interface IGameList {
  gameData: IGame[] | []
  loading: boolean
}

const GameListMobile = ({ gameData, loading }: IGameList) => {
  const { getScrollToEndScreen: endScreen } = useScrollToEndStore()

  // eslint-disable-next-line no-console
  console.log("test-gameData", gameData)

  return (
    <>
      <Box
        component="section"
        className="game-section grid grid-cols-2 gap-5 sm:grid-cols-4"
      >
        {loading &&
          [...Array(gameData.length)].map(() => (
            <SkeletonCardMobile key={uuid()} />
          ))}
        {gameData && gameData.length === 0 && <NoData className="w-full" />}
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
              favourite={_game.favorite}
              type={_game.category.name}
              gameMode={_game.game_mode}
            />
          ))}
      </Box>
      {endScreen && (
        <Typography
          variant="button"
          display="block"
          gutterBottom
          className="text-center font-bold text-white-default"
        >
          End of The Limit
        </Typography>
      )}
    </>
  )
}

export default GameListMobile
