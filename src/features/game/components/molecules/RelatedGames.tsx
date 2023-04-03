import { Typography } from "@mui/material"
import { v4 as uuid } from "uuid"
import { IGame, IGetType } from "@feature/game/interfaces/IGameService"
import useGamesByTypes from "@feature/game/containers/hooks/useGamesByTypes"
import { F2PHeaderMenu } from "@constants/gameSlide"
import SkeletonCard from "@components/atoms/skeleton/SkeletonCard"
import { useEffect, useState } from "react"
import GameCard from "./GameCard"

interface IProps {
  _gameType: IGetType
}

const ReleatedGames = ({ _gameType }: IProps) => {
  const [gamesByType, setgamesByType] = useState<IGame[]>()
  const [curType, setCurType] = useState<IGetType>("free-to-play")

  const { data: _gamesData, isFetching } = useGamesByTypes({
    _type: curType,
    _limit: 6,
    _page: 1
  })

  useEffect(() => {
    let load = false
    if (!load) {
      setCurType(_gameType)
      setgamesByType(_gamesData?.data)
    }
    return () => {
      load = true
    }
  }, [_gamesData, _gameType])

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
        <div className="grid grid-flow-row grid-cols-2 gap-y-2 md:grid-cols-3 lg:grid-cols-6">
          {gamesByType && !isFetching ? (
            gamesByType?.map((game) => (
              <GameCard
                key={game._id}
                data={game}
                gameType={curType}
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
