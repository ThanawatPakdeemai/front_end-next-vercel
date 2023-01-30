import { PaginationNaka } from "@components/atoms/pagination"
import SkeletonCard from "@components/atoms/skeleton/SkeletonCard"
import { P2EHeaderMenu } from "@constants/gameSlide"
import GameCard from "@feature/game/containers/components/molecules/GameCard"
import { getAllPartnerGames } from "@feature/game/containers/services/game.service"
import { useQueryClient } from "@tanstack/react-query"
import React, { memo, useEffect, useRef, useState } from "react"
import { v4 as uuid } from "uuid"
import useGameStore from "@stores/game/index"
import usePartnerGame from "@feature/game/containers/hooks/usePartnerGame"
import useGlobal from "@hooks/useGlobal"

const PartnerGames = () => {
  const search = ""
  const limit = 10
  const [page, setPage] = useState<number>(1)
  const fetchRef = useRef(false)
  const [totalCount, setTotalCount] = useState<number>(0)
  const queryClient = useQueryClient()
  const { clearGameData } = useGameStore()
  const { onHandleClick } = useGlobal()

  const {
    isLoading,
    isPreviousData,
    data: gameData
  } = usePartnerGame({
    _search: search,
    _limit: limit,
    _page: page
  })
  useEffect(() => {
    if (!fetchRef.current && gameData?.info && gameData) {
      fetchRef.current = true
      setTotalCount(gameData.info?.totalCount)
    }
  }, [gameData])

  useEffect(() => {
    if (!isPreviousData && gameData) {
      queryClient.prefetchQuery({
        queryKey: ["partner-games", limit, search, page + 1],
        queryFn: () =>
          getAllPartnerGames({
            _search: search,
            _limit: limit,
            _page: page + 1
          })
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
        {gameData &&
          gameData.data &&
          gameData.data.map((game) => (
            <GameCard
              key={game.id}
              menu={P2EHeaderMenu}
              partnerdata={game}
              imgPartner={game.image_thumbnail}
              onHandleClick={() =>
                onHandleClick(`partner-games/${game.slug}`, game)
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
export default memo(PartnerGames)
