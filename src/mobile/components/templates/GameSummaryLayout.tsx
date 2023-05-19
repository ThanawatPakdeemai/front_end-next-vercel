import React from "react"
import { Box } from "@mui/material"

import { IGame, IGetType } from "@feature/game/interfaces/IGameService"
import GameSummaryRewardPage from "@feature/page/games/gameSummaryRewardPage"
import Header from "@components/organisms/Header"

interface IProps {
  data: IGame
  gameId: string
  gameType: IGetType
}

// eslint-disable-next-line no-unused-vars
const GameSummaryLayout = ({ data, gameId, gameType }: IProps) => (
  // const { topPlayerGameId } = useTopPlayerByGameId()

  <>
    <Header />
    <Box
      component="div"
      className="my-[90px] w-full"
    >
      {/* <TitleOutRoom
          name={data?.name || "Game"}
          onOutRoom={() =>
            router.push(router?.asPath?.split("/")?.slice(0, -2).join("/"))
          }
        /> */}
      {/* <HeaderForWardBackWardMobile
          label="game_details"
          forwardIcon={<SearchIcon stroke="#E1E2E2" />}
          forwardHref="/"
        /> */}
      <GameSummaryRewardPage />
    </Box>
  </>
)

export default GameSummaryLayout
