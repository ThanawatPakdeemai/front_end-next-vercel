import { PaginationNaka } from "@components/atoms/pagination"
import SkeletonCard from "@components/atoms/skeleton/SkeletonCard"
import { P2EHeaderMenu } from "@constants/gameSlide"
import { getMyGameNFT } from "@feature/game/containers/services/game.service"
import { useQueryClient } from "@tanstack/react-query"
import React, { memo, useEffect, useRef } from "react"
import { v4 as uuid } from "uuid"
import useGameStore from "@stores/game/index"
import useGlobal from "@hooks/useGlobal"
import { IGetType } from "@feature/game/interfaces/IGameService"
import useGetMyGame from "@feature/game/containers/hooks/useGetMyGame"
import NoData from "@components/molecules/NoData"
import GameCard from "@feature/game/components/molecules/GameCard"

const MyGamesPage = () => {
  const type: IGetType = "play-to-earn-games"
  const {
    limit,
    setPage,
    page,
    totalCount,
    setTotalCount,
    onHandleSetGameStore,
    getTypeGamePathFolder,
    defaultBody,
    isRedirectRoomlist
  } = useGlobal()
  const fetchRef = useRef(false)
  const queryClient = useQueryClient()
  const { clearGameData } = useGameStore()

  const {
    myGamesData,
    myGamesIsFetching,
    myGamesIsLoading,
    myGamesIsPreviousData
  } = useGetMyGame()

  useEffect(() => {
    let load = false

    if (!load) {
      // totalCount
      if (!fetchRef.current && myGamesData) {
        fetchRef.current = true
        setTotalCount(myGamesData.info.totalCount)
      }
    }

    return () => {
      load = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myGamesData])

  useEffect(() => {
    let load = false

    if (!load) {
      if (!myGamesIsPreviousData && myGamesData) {
        queryClient.prefetchQuery({
          queryKey: ["games", type, page + 1],
          queryFn: () =>
            getMyGameNFT({
              ...defaultBody,
              nftgame: true
            }),
          staleTime: Infinity
        })
      }
      clearGameData()
    }

    return () => {
      load = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clearGameData, myGamesData, myGamesIsPreviousData, page, queryClient])

  return (
    <div className="flex flex-col">
      <div className="mb-6 grid grid-cols-5 gap-x-2 gap-y-4">
        {myGamesIsPreviousData || myGamesIsLoading || myGamesIsFetching
          ? [...Array(limit)].map(() => <SkeletonCard key={uuid()} />)
          : null}
        {myGamesData && myGamesData.data.length > 0
          ? myGamesData.data.map((game) => (
              <GameCard
                key={game.id}
                menu={P2EHeaderMenu}
                data={game}
                href={`/${getTypeGamePathFolder(game)}/${
                  game.path
                }${isRedirectRoomlist(game).toString()}`}
                onHandleClick={() =>
                  onHandleSetGameStore(getTypeGamePathFolder(game), game)
                }
                gameType={
                  game.is_NFT ? "arcade-emporium" : getTypeGamePathFolder(game)
                }
                play_total_count={game?.play_total_count}
              />
            ))
          : null}
      </div>
      {myGamesData && myGamesData.data.length === 0 && (
        <NoData className="mt-4 max-w-[300px]" />
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

export default memo(MyGamesPage)
