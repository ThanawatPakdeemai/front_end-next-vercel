import { PaginationNaka } from "@components/atoms/pagination"
import SkeletonCard from "@components/atoms/skeleton/SkeletonCard"
import { NFTHeaderMenu } from "@constants/gameSlide"
import GameCard from "@feature/game/components/molecules/GameCard"
import useArcadeEmporiumGames from "@feature/game/containers/hooks/useArcadeEmporiumGames"
import { IGame } from "@feature/game/interfaces/IGameService"
import useGlobal from "@hooks/useGlobal"
import { memo, useEffect, useState } from "react"
import { v4 as uuid } from "uuid"

const ArcadeEmporiumGamesPage = () => {
  // Hooks

  const {
    setTotalCount,
    limit,
    onHandleSetGameStore,
    totalCount,
    page,
    setPage,
    getTypeGamePathFolder
  } = useGlobal()
  const {
    getGamesFilterByNftgame,
    isLoadingGamesFilterByNftgame,
    isPreviousGamesFilterByNftgame
  } = useArcadeEmporiumGames()

  // States
  const [gameData, setGameData] = useState<IGame[]>()
  useEffect(() => {
    let load = false

    if (!load) {
      if (getGamesFilterByNftgame && getGamesFilterByNftgame.data) {
        setGameData(getGamesFilterByNftgame.data)
      }
      if (getGamesFilterByNftgame && getGamesFilterByNftgame.info) {
        setTotalCount(getGamesFilterByNftgame.info.totalCount)
      }
    }

    return () => {
      load = true
    }
  }, [getGamesFilterByNftgame, setTotalCount])

  return (
    <div className="flex flex-col">
      <div className="mx-2 mb-6 grid grid-cols-2 gap-y-4 gap-x-2 md:mx-0 md:grid-cols-5">
        {isLoadingGamesFilterByNftgame || isPreviousGamesFilterByNftgame
          ? [...Array(limit)].map(() => <SkeletonCard key={uuid()} />)
          : gameData &&
            gameData.map((game) => (
              <GameCard
                key={game.id}
                menu={NFTHeaderMenu}
                data={game}
                href={`/${getTypeGamePathFolder(game)}-games/${game.path}`}
                onHandleClick={() =>
                  onHandleSetGameStore(getTypeGamePathFolder(game), game)
                }
              />
            ))}
      </div>
      <PaginationNaka
        totalCount={totalCount}
        limit={limit}
        page={page}
        setPage={setPage}
      />
    </div>
  )
}

export default memo(ArcadeEmporiumGamesPage)
