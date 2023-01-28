import { PaginationNaka } from "@components/atoms/pagination"
import SkeletonCard from "@components/atoms/skeleton/SkeletonCard"
import { P2EHeaderMenu } from "@constants/gameSlide"
import { getGameByTypes } from "@feature/game/containers/services/game.service"
import { useQueryClient } from "@tanstack/react-query"
import React, { memo, useEffect, useRef, useState } from "react"
import { v4 as uuid } from "uuid"
import useGameStore from "@stores/game/index"
import useGamesByTypes from "@feature/game/containers/hooks/useGamesByTypes"
import GameCard from "@feature/game/containers/components/molecules/GameCard"
import useGlobal from "@hooks/useGlobal"

const PlayToEarnGamesPage = () => {
  const type = "play-to-earn"
  const limit = 10
  const [page, setPage] = useState<number>(1)
  const fetchRef = useRef(false)
  const [totalCount, setTotalCount] = useState<number>(0)
  const queryClient = useQueryClient()
  const { onHandleClick } = useGlobal()
  const { clearGameData } = useGameStore()

  const {
    isLoading,
    isPreviousData,
    data: gameData
  } = useGamesByTypes({
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
    clearGameData()
  }, [clearGameData, gameData, isPreviousData, page, queryClient])

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
                menu={P2EHeaderMenu}
                data={game}
                onHandleClick={() => onHandleClick(game.path, game)}
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

export default memo(PlayToEarnGamesPage)
