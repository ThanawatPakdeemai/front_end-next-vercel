import PaginationNaka from "@components/atoms/pagination/PaginationNaka"
import SkeletonCard from "@components/atoms/skeleton/SkeletonCard"
import { StoryModeHeaderMenu } from "@constants/gameSlide"
import GameCard from "@feature/game/components/molecules/GameCard"
import useGlobal from "@hooks/useGlobal"
import { memo, useEffect, useState } from "react"
import { v4 as uuid } from "uuid"
import useFilterStore from "@stores/blogFilter"
import { IGame } from "@feature/game/interfaces/IGameService"
import useFilterGameList from "@feature/dropdown/containers/hooks/useFilterGameList"

const StoryModeGamesPage = () => {
  const limit = 30
  const staminaRecovery = new Date("2023-01-07T22:24:00.000Z")
  const [gameFilter, setGameFilter] = useState<IGame[]>()
  const [page, setPage] = useState<number>(1)
  const [cooldown, setCooldown] = useState<boolean>(true)
  const [totalCount, setTotalCount] = useState<number>(0)
  const { getTypeGamePathFolder, onHandleSetGameStore } = useGlobal()
  const {
    category: categoryDropdown,
    gameItem: gameItemDropdown,
    device: deviceDropdown,
    search: searchDropdown
  } = useFilterStore()

  const { mutateGetGamesByCategoryId, isLoading: loadingFilterGame } =
    useFilterGameList()
  useEffect(() => {
    let load = false

    if (!load) {
      if (loadingFilterGame) {
        setGameFilter([])
      }
      const filterData = {
        limit,
        skip: page,
        sort: "name",
        search: searchDropdown,
        category: categoryDropdown,
        item: gameItemDropdown,
        device: deviceDropdown,
        game_type: "storymode",
        tournament: false,
        nftgame: "all"
      }
      mutateGetGamesByCategoryId(filterData).then((res) => {
        if (res) {
          const { data, info } = res
          setGameFilter(data)
          setTotalCount(info ? info.totalCount : 1)
        }
      })
    }

    return () => {
      load = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    categoryDropdown,
    gameItemDropdown,
    deviceDropdown,
    searchDropdown,
    page,
    limit,
    mutateGetGamesByCategoryId
  ])

  return (
    <div className="flex flex-col">
      <div className="mx-2 mb-6 grid grid-cols-2 gap-y-4 gap-x-2 md:mx-0 md:grid-cols-5">
        {loadingFilterGame
          ? [...Array(limit)].map(() => <SkeletonCard key={uuid()} />)
          : gameFilter &&
            gameFilter.map((game) => (
              <GameCard
                key={game.id}
                menu={StoryModeHeaderMenu}
                data={game}
                checkTimer
                staminaRecovery={staminaRecovery}
                cooldown={cooldown}
                setCooldown={setCooldown}
                href={`/${getTypeGamePathFolder(game)}/${game.path}`}
                onHandleClick={() =>
                  onHandleSetGameStore(getTypeGamePathFolder(game), game)
                }
                // onHandleClick={() =>
                //   onHandleClick("story-mode", game.path, game)
                // }
              />
            ))}
      </div>

      {totalCount === 0 && (
        <div className="d-flex justify-center text-center">No data</div>
      )}

      <PaginationNaka
        totalCount={totalCount}
        limit={limit}
        page={page}
        setPage={setPage}
      />
    </div>
  )
}

export default memo(StoryModeGamesPage)
