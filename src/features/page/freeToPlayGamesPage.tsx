import { PaginationNaka } from "@components/atoms/pagination"
import SkeletonCard from "@components/atoms/skeleton/SkeletonCard"
import { F2PHeaderMenu } from "@constants/gameSlide"
import GameCard from "@feature/game/containers/components/molecules/GameCard"
import useGames from "@feature/game/containers/hook/useGames"
import { getGameByTypes } from "@feature/game/containers/services/game.service"
import { useQueryClient } from "@tanstack/react-query"
import { memo, useEffect, useRef, useState } from "react"
import { v4 as uuid } from "uuid"

const FreeToPlayGamesPage = () => {
  const type = "free-to-play"
  const limit = 30
  const staminaRecovery = new Date("2023-01-07T22:24:00.000Z")
  const [page, setPage] = useState<number>(1)
  const [cooldown, setCooldown] = useState<boolean>(true)
  const fetchRef = useRef(false)
  const [totalCount, setTotalCount] = useState<number>(0)
  const queryClient = useQueryClient()

  const {
    isLoading,
    isFetching,
    isPreviousData,
    data: gameData
  } = useGames({
    _type: type,
    _limit: limit,
    _page: page
  })

  useEffect(() => {
    // totalCount
    if (!fetchRef.current && gameData) {
      fetchRef.current = true
      setTotalCount(gameData.info.totalCount)
    }
  }, [gameData])

  useEffect(() => {
    if (!isPreviousData && gameData) {
      queryClient.prefetchQuery({
        queryKey: ["games", type, page + 1],
        queryFn: () =>
          getGameByTypes({ _type: type, _limit: limit, _page: page + 1 })
      })
    }
  }, [gameData, isPreviousData, page, queryClient])

  const onHandleClick = () => {}

  return (
    <div className="flex flex-col">
      <div className="mb-6 grid grid-cols-5 gap-y-4 gap-x-2">
        {isLoading
          ? [...Array(limit)].map(() => <SkeletonCard key={uuid()} />)
          : null}
        {gameData
          ? gameData.data.map((game) => (
              <GameCard
                key={game.id}
                menu={F2PHeaderMenu}
                data={{
                  id: game._id,
                  image: game.image_category_list,
                  desc: game.name
                }}
                checkTimer
                staminaRecovery={staminaRecovery}
                cooldown={cooldown}
                setCooldown={setCooldown}
                onHandleClick={onHandleClick}
              />
            ))
          : null}
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

export default memo(FreeToPlayGamesPage)
