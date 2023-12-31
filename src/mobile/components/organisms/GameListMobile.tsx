/* eslint-disable max-len */
import React from "react"
import { Box } from "@mui/material"
import { v4 as uuid } from "uuid"
import dynamic from "next/dynamic"
import { IGame } from "@feature/game/interfaces/IGameService"

const NoData = dynamic(() => import("@components/molecules/NoData"), {
  suspense: true,
  ssr: true
})
const SkeletonCardMobile = dynamic(
  () => import("../atoms/skeleton/SkeletonCardMobile"),
  {
    suspense: true,
    ssr: true
  }
)
const GameCardMobile = dynamic(() => import("../molecules/GameCardMobile"), {
  suspense: true,
  ssr: true
})

interface IGameList {
  gameData: IGame[]
  loading: boolean
}

const GameListMobile = ({ gameData, loading }: IGameList) => (
  // const { getScrollToEndScreen: endScreen } = useScrollToEndStore()
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
    {gameData && gameData.length === 0 && !loading && (
      <NoData className="w-full" />
    )}

    <Box
      component="section"
      className="game-section grid grid-cols-2 gap-5 sm:grid-cols-4"
    >
      {loading &&
        [...Array((gameData && gameData.length) || 10)].map(() => (
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
    {/*  */}
    {/* {endScreen && (
        <Typography
          variant="button"
          display="block"
          gutterBottom
          className="mt-5 rounded-sm border border-[#35383F] py-3 text-center font-bold text-white-default"
        >
          End of The Limit
        </Typography>
      )} */}
  </Box>
)

export default GameListMobile
