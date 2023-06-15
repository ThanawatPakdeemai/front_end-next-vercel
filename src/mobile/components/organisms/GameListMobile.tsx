import React from "react"
import { IGame } from "@feature/game/interfaces/IGameService"
import { Box, Typography } from "@mui/material"
import { v4 as uuid } from "uuid"
import useScrollToEndStore from "@stores/scrollToEnd"
import SkeletonCardMobile from "../atoms/skeleton/SkeletonCardMobile"
import GameCardMobile from "../molecules/GameCardMobile"

interface IGameList {
  gameData: IGame[] | []
  loading: boolean
}

const GameListMobile = ({ gameData, loading }: IGameList) => {
  const { getScrollToEndScreen: endScreen } = useScrollToEndStore()
  return (
    <Box
      component="section"
      sx={{
        ".no-data": {
          ".MuiTypography-root": {
            border: "1px solid #35383F",
            borderRadius: "14px"
          }
        }
      }}
    >
      {/* {gameData && gameData.length === 0 && !loading && (
        <NoData className="w-full" />
      )} */}

      <Box
        component="section"
        className={`game-section grid gap-5 sm:grid-cols-4 ${
          gameData.length > 0 && "grid-cols-2"
        }`}
      >
        {loading &&
          [...Array(gameData.length)].map(() => (
            <SkeletonCardMobile key={uuid()} />
          ))}
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
          className="mt-5 rounded-sm border border-[#35383F] py-3 text-center font-bold text-white-default"
        >
          End of The Limit
        </Typography>
      )}
    </Box>
  )
}

export default GameListMobile
