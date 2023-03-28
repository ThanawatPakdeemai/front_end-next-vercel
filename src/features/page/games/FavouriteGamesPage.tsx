import React, { useCallback, useEffect, useRef, useState } from "react"
import { IGame } from "@feature/game/interfaces/IGameService"
import { v4 as uuid } from "uuid"
import SkeletonCard from "@components/atoms/skeleton/SkeletonCard"
import { PaginationNaka } from "@components/atoms/pagination"
import {
  F2PHeaderMenu,
  NFTHeaderMenu,
  P2EHeaderMenu,
  StoryModeHeaderMenu
} from "@constants/gameSlide"
import GameCard from "@feature/game/components/molecules/GameCard"
import useFilterStore from "@stores/blogFilter"
import useGlobal from "@hooks/useGlobal"
import useFavoriteGame from "@feature/favourite/containers/hooks/useFavoriteGame"
import NoData from "@components/molecules/NoData"

const FavouriteGamesPage = () => {
  // Don't Delete this **************************
  // const pathActive = router.pathname
  // const lang = pathActive.search("lang")
  // const { onSetGameData } = useGameStore()
  const [pageSize, setPageSize] = useState<number>(25)
  const [currentPage, setCurrentPage] = useState<number>(1)
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
  const [gameFavouriteState, setGameFavouriteState] = useState<IGame[]>()
  const [page, setPage] = useState<number>(1)
  const [totalCount, setTotalCount] = useState<number>(0)
  const fetchRef = useRef(false)

  const {
    stateProfile,
    getTypeGamePathFolder,
    onHandleSetGameStore,
    isRedirectRoomlist
  } = useGlobal()
  const { gameFavourite, gameFavouriteInfo, isLoadingGameFavourite } =
    useFavoriteGame({
      playerId: stateProfile?.id ?? ""
    })

  const fetchGameFavorite = useCallback(async () => {
    if (gameFavourite && gameFavourite.length > 0) {
      setGameFavouriteState(gameFavourite)
      setTotalCount(gameFavouriteInfo.totalCount)
      setPageSize(gameFavouriteInfo.limit)
      setCurrentPage(gameFavouriteInfo.pages)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    gameFavourite,
    gameFavouriteInfo,
    gameFavouriteInfo.totalCount,
    gameFavouriteInfo.limit,
    gameFavouriteInfo.pages
  ])

  const getGameMenu = (game) => {
    if (game.game_free_status) {
      return F2PHeaderMenu
    }
    if (game.play_to_earn) {
      return P2EHeaderMenu
    }
    if (game.game_type === "storymode") {
      return StoryModeHeaderMenu
    }
    if (game.is_NFT) {
      return NFTHeaderMenu
    }
  }

  useEffect(() => {
    let load = false

    if (!load) fetchGameFavorite()
    // let load = true
    // if (load) {
    //   setLoading(true)
    // }
    // return () => {
    //   load = false
    // }

    return () => {
      load = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    pageSize,
    currentPage,
    searchDropdown,
    categoryDropdown,
    gameItemDropdown,
    deviceDropdown,
    fetchGameFavorite
  ])

  useEffect(() => {
    let load = false

    if (!load) {
      if (!fetchRef.current && gameFavouriteState) {
        fetchRef.current = true
        setTotalCount(gameFavouriteState.length)
      }
      clearSearch()
      clearCategory()
      clearGameItem()
      clearDevice()
    }

    return () => {
      load = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    clearCategory,
    clearDevice,
    clearGameItem,
    clearSearch,
    gameFavouriteState
  ])

  return (
    <div className="flex flex-col">
      <div className="mx-2 mb-6 grid grid-cols-2 gap-y-4 gap-x-2 md:mx-0 md:grid-cols-5">
        {isLoadingGameFavourite
          ? [...Array(pageSize)].map(() => <SkeletonCard key={uuid()} />)
          : null}
        {gameFavouriteState && gameFavouriteState.length > 0 ? (
          gameFavouriteState.map((game) => {
            const menu = getGameMenu(game)
            return (
              <GameCard
                key={game.id}
                menu={menu || F2PHeaderMenu}
                href={`/${getTypeGamePathFolder(game)}-games/${
                  game.path
                }${isRedirectRoomlist(game).toString()}`}
                onHandleClick={() =>
                  onHandleSetGameStore(getTypeGamePathFolder(game), game)
                }
                data={game}
              />
            )
          })
        ) : (
          <NoData className="" />
        )}
      </div>
      <PaginationNaka
        totalCount={totalCount}
        limit={pageSize}
        page={page}
        setPage={setPage}
      />
    </div>
  )
}
export default FavouriteGamesPage
