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
import useFilterStore from "@stores/blogFilter"
import { IGame } from "@feature/game/interfaces/IGameService"
import { getGamesByCategoryId } from "@feature/dropdown/containers/services/dropdown.service"

const PlayToEarnGamesPage = () => {
  const type = "play-to-earn"
  const limit = 20
  const [page, setPage] = useState<number>(1)
  const [gameFilter, setGameFilter] = useState<IGame[]>()
  const fetchRef = useRef(false)
  const [totalCount, setTotalCount] = useState<number>(0)
  const queryClient = useQueryClient()
  const { onHandleClick } = useGlobal(limit)
  const { clearGameData } = useGameStore()
  const {
    category: categoryDropdown,
    gameItem: gameItemDropdown,
    device: deviceDropdown,
    search: searchDropdown,
    clearSearch,
    clearCategory,
    clearGameItem,
    clearDevice
  } = useFilterStore()

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
      setGameFilter(gameData.data)
    }
    clearGameData()
    clearSearch()
    clearCategory()
    clearGameItem()
    clearDevice()
  }, [
    clearCategory,
    clearDevice,
    clearGameData,
    clearGameItem,
    clearSearch,
    gameData,
    isPreviousData,
    page,
    queryClient
  ])

  useEffect(() => {
    const filterData = {
      limit,
      skip: page,
      sort: "name",
      search: searchDropdown,
      category: categoryDropdown,
      item: gameItemDropdown,
      device: deviceDropdown,
      game_type: "play-to-earn-games",
      tournament: false,
      nftgame: "all"
    }
    getGamesByCategoryId(filterData).then((res) => {
      if (res) {
        const { data, info } = res
        setGameFilter(data)
        setTotalCount(info ? info.totalCount : 1)
      }
    })
  }, [
    categoryDropdown,
    gameItemDropdown,
    deviceDropdown,
    searchDropdown,
    page,
    limit
  ])

  return (
    <div className="flex flex-col">
      <div className="mx-2 mb-6 grid grid-cols-2 gap-y-4 gap-x-2 md:mx-0 md:grid-cols-5">
        {isLoading
          ? [...Array(limit)].map(() => <SkeletonCard key={uuid()} />)
          : null}
        {gameFilter
          ? gameFilter.map((game) => (
              <GameCard
                key={game.id}
                menu={P2EHeaderMenu}
                data={game}
                onHandleClick={() =>
                  onHandleClick("play-to-earn", game.path, game)
                }
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
