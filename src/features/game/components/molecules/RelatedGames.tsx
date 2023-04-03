import { Typography } from "@mui/material"
import { v4 as uuid } from "uuid"
import { IGame, IGetType } from "@feature/game/interfaces/IGameService"
import useGamesByTypes from "@feature/game/containers/hooks/useGamesByTypes"
import GameCarousel from "@components/molecules/gameSlide/GameCarousel"
import { F2PHeaderMenu } from "@constants/gameSlide"
import { useEffect, useState } from "react"
import SkeletonCard from "@components/atoms/skeleton/SkeletonCard"

interface IProps {
  gameType: IGetType
}

const ReleatedGames = ({ gameType }: IProps) => {
  const [relatedGames, setRelatedGames] = useState<IGame[]>()
  const [relatedType, setRelatedType] = useState<IGetType>("must-try")

  const { data: gamesData, isFetching } = useGamesByTypes({
    _type: relatedType,
    _limit: 6,
    _page: 1
  })

  useEffect(() => {
    let load = false

    if (!load) {
      if (gamesData) {
        setRelatedGames(gamesData.data)
        setRelatedType(gameType)
      }
    }
    return () => {
      load = true
    }
  }, [gamesData, relatedType, gameType])

  return (
    <div>
      <Typography
        align="left"
        className="uppercase"
        component="h2"
      >
        Related Games
      </Typography>
      <div className="my-2 h-full w-full lg:my-20">
        {relatedGames && !isFetching ? (
          <GameCarousel
            menu={F2PHeaderMenu}
            list={relatedGames}
            curType={gameType}
            setCurType={setRelatedType}
          />
        ) : (
          <div className="flex gap-x-3">
            {[...Array(6)].map(() => (
              <SkeletonCard key={uuid()} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ReleatedGames
