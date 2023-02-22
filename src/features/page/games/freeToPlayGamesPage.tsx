import { PaginationNaka } from "@components/atoms/pagination"
import SkeletonCard from "@components/atoms/skeleton/SkeletonCard"
import { F2PHeaderMenu } from "@constants/gameSlide"
import { getGamesByCategoryId } from "@feature/dropdown/containers/services/dropdown.service"
import GameCard from "@feature/game/components/molecules/GameCard"
import useGamesByTypes from "@feature/game/containers/hooks/useGamesByTypes"
import { getGameByTypes } from "@feature/game/containers/services/game.service"
import { IGame } from "@feature/game/interfaces/IGameService"
import useGlobal from "@hooks/useGlobal"
import useFilterStore from "@stores/blogFilter"
import useGameStore from "@stores/game"
import { useQueryClient } from "@tanstack/react-query"
import { memo, useEffect, useRef, useState } from "react"
import { v4 as uuid } from "uuid"

const FreeToPlayGamesPage = () => {
  const type = "free-to-play"
  const limit = 20
  const staminaRecovery = new Date("2023-01-07T22:24:00.000Z")
  const [gameFilter, setGameFilter] = useState<IGame[]>()
  const [page, setPage] = useState<number>(1)
  const [cooldown, setCooldown] = useState<boolean>(true)
  const fetchRef = useRef(false)
  const [totalCount, setTotalCount] = useState<number>(0)
  const queryClient = useQueryClient()
  const { onHandleClick } = useGlobal()
  const { clearGameData } = useGameStore()
  const {
    category: categoryDropdown,
    gameItem: gameItemDropdown,
    device: deviceDropdown,
    search: searchDropdown
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
    clearGameData()
  }, [clearGameData, gameData])

  useEffect(() => {
    if (!isPreviousData && gameData) {
      queryClient.prefetchQuery({
        queryKey: ["games", type, page + 1],
        queryFn: () =>
          getGameByTypes({ _type: type, _limit: limit, _page: page + 1 })
      })
      setGameFilter(gameData.data)
    }
  }, [gameData, isPreviousData, page, queryClient])

  useEffect(() => {
    const filterData = {
      limit,
      skip: page,
      sort: "name",
      search: searchDropdown,
      category: categoryDropdown,
      item: gameItemDropdown,
      device: deviceDropdown,
      game_type: "free-to-play-games",
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
      <div className="mb-6 grid grid-cols-5 gap-y-4 gap-x-2">
        {isLoading
          ? [...Array(limit)].map(() => <SkeletonCard key={uuid()} />)
          : null}
        {gameFilter
          ? gameFilter.map((game) => (
              <GameCard
                key={game.id}
                menu={F2PHeaderMenu}
                data={game}
                checkTimer
                staminaRecovery={staminaRecovery}
                cooldown={cooldown}
                setCooldown={setCooldown}
                onHandleClick={() =>
                  onHandleClick("free-to-play", game.game_url, game)
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

export default memo(FreeToPlayGamesPage)
