import { Typography } from "@mui/material"
import { v4 as uuid } from "uuid"
import { IGetType } from "@feature/game/interfaces/IGameService"
import useGamesByTypes from "@feature/game/containers/hooks/useGamesByTypes"
import { F2PHeaderMenu } from "@constants/gameSlide"
import SkeletonCard from "@components/atoms/skeleton/SkeletonCard"
import GameCard from "./GameCard"

interface IProps {
  _gameType: IGetType
}

const ReleatedGames = ({ _gameType }: IProps) => {
  const { data: gamesData, isFetching } = useGamesByTypes({
    _type: _gameType,
    _limit: 6,
    _page: Math.floor(Math.random() * 3) + 1
  })
  return (
    <div>
      <Typography
        align="left"
        className="my-2 uppercase md:my-4 lg:my-8"
        component="h2"
      >
        Related Games
      </Typography>
      <div className="overflow-hidden">
        <div className="grid grid-flow-row grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {gamesData && !isFetching ? (
            gamesData?.data?.map((game) => (
              <GameCard
                key={game.id}
                data={game}
                gameType={_gameType}
                menu={F2PHeaderMenu}
                href={`/${game.game_type}/${game.game_url}`}
              />
            ))
          ) : (
            <div className="flex gap-x-3">
              {[...Array(6)].map(() => (
                <SkeletonCard key={uuid()} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ReleatedGames
