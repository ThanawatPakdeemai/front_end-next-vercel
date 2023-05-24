import { Typography } from "@mui/material"
import { v4 as uuid } from "uuid"
import { IGame, IGetType } from "@feature/game/interfaces/IGameService"
import useGamesByTypes from "@feature/game/containers/hooks/useGamesByTypes"
import { F2PHeaderMenu } from "@constants/gameSlide"
import SkeletonCard from "@components/atoms/skeleton/SkeletonCard"
import { useEffect, useState } from "react"
import useGlobal from "@hooks/useGlobal"
import GameCard from "./GameCard"

interface IProps {
  _gameMode: IGetType
}

const ReleatedGames = ({ _gameMode }: IProps) => {
  const [gamesByType, setgamesByType] = useState<IGame[]>()
  const [curType] = useState<IGetType>("free-to-play")
  const { page, setPage } = useGlobal()

  const { data: _gamesData, isFetching } = useGamesByTypes({
    _type: curType,
    _limit: 6,
    _page: page
  })

  useEffect(() => {
    let load = false
    if (!load) {
      // FIXME -  บัค ลูป API game{type} ปิดไว้ก่อนนะ
      // setCurType(_gameMode)
      setgamesByType(_gamesData?.data)
      setPage(Math.floor(Math.random() * 3) + 1)
    }
    return () => {
      load = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
        <div className="grid grid-cols-2 gap-y-4 md:grid-cols-3 lg:grid-cols-6">
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
