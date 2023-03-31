import { PaginationNaka } from "@components/atoms/pagination"
import SkeletonCard from "@components/atoms/skeleton/SkeletonCard"
import { P2EHeaderMenu } from "@constants/gameSlide"
import React, { memo, useEffect, useState } from "react"
import { v4 as uuid } from "uuid"
import useGlobal from "@hooks/useGlobal"
import useFilterStore from "@stores/blogFilter"
import { IGame } from "@feature/game/interfaces/IGameService"
import useFilterGameList from "@feature/dropdown/containers/hooks/useFilterGameList"
import GameCard from "@feature/game/components/molecules/GameCard"

const PlayToEarnGamesPage = () => {
  const limit = 20
  const [page, setPage] = useState<number>(1)
  const [gameFilter, setGameFilter] = useState<IGame[]>()
  const [totalCount, setTotalCount] = useState<number>(20)
  // const queryClient = useQueryClient()
  const { onHandleSetGameStore, getTypeGamePathFolder } = useGlobal(limit)
  // const { clearGameData } = useGameStore()
  const {
    category: categoryDropdown,
    gameItem: gameItemDropdown,
    device: deviceDropdown,
    search: searchDropdown
    // clearSearch,
    // clearCategory,
    // clearGameItem,
    // clearDevice
  } = useFilterStore()

  // const {
  //   isLoading,
  //   // isPreviousData,
  //   data: gameData
  // } = useGamesByTypes({
  //   _type: type,
  //   _limit: limit,
  //   _page: page
  // })

  // useEffect(() => {
  //   let load = false

  //   if (!load) {
  //     // totalCount
  //     if (!fetchRef.current && gameData) {
  //       fetchRef.current = true
  //       setTotalCount(gameData.info.totalCount)
  //     }
  //   }

  //   return () => {
  //     load = true
  //   }
  // }, [gameData])

  // useEffect(() => {
  //   let load = false

  //   if (!load) {
  //     if (!isPreviousData && gameData) {
  //       queryClient.prefetchQuery({
  //         queryKey: ["games", type, page + 1],
  //         queryFn: () =>
  //           getGameByTypes({ _type: type, _limit: limit, _page: page + 1 })
  //       })
  //       setGameFilter(gameData.data)
  //     }
  //     clearGameData()
  //     clearSearch()
  //     clearCategory()
  //     clearGameItem()
  //     clearDevice()
  //   }

  //   return () => {
  //     load = true
  //   }
  // }, [
  //   clearCategory,
  //   clearDevice,
  //   clearGameData,
  //   clearGameItem,
  //   clearSearch,
  //   gameData,
  //   isPreviousData,
  //   page,
  //   queryClient
  // ])

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
        game_type: "play-to-earn-games",
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
    limit
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
                menu={P2EHeaderMenu}
                data={game}
                href={`/${getTypeGamePathFolder(game)}/${game.path}`}
                onHandleClick={() =>
                  onHandleSetGameStore(getTypeGamePathFolder(game), game)
                }
                // onHandleClick={() =>
                //   onHandleClick("play-to-earn", game.path, game)
                // }
              />
            ))}
      </div>

      {totalCount === 0 && (
        <div className="d-flex  justify-center text-center">No data</div>
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

export default memo(PlayToEarnGamesPage)
