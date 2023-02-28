import React, { useEffect, useRef, useState } from "react"
import { IGame } from "@feature/game/interfaces/IGameService"
import useProfileStore from "@stores/profileStore"
import { getFavoriteGameByUser } from "@feature/favourite/containers/services/favourite.service"
import { v4 as uuid } from "uuid"
import SkeletonCard from "@components/atoms/skeleton/SkeletonCard"
import { PaginationNaka } from "@components/atoms/pagination"
import {
  F2PHeaderMenu,
  NFTHeaderMenu,
  P2EHeaderMenu,
  StoryModeHeaderMenu
} from "@constants/gameSlide"
import GameCard from "@feature/game/containers/components/molecules/GameCard"
import useFilterStore from "@stores/blogFilter"
import useGlobal from "@hooks/useGlobal"

const FavouriteGamesPage = () => {
  // Don't Delete this **************************
  // const pathActive = router.pathname
  // const lang = pathActive.search("lang")
  // const { onSetGameData } = useGameStore()
  const profile = useProfileStore((state) => state.profile.data)
  const [pageSize, setPageSize] = useState<number>(25)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const {
    category: categoryDropdown,
    gameItem: gameItemDropdown,
    device: deviceDropdown,
    search: searchDropdown
  } = useFilterStore()
  const [gameFavourite, setGameFavourite] = useState<IGame[]>()
  const [loading, setLoading] = useState<boolean>(true)
  const [page, setPage] = useState<number>(1)
  const [totalCount, setTotalCount] = useState<number>(0)
  const fetchRef = useRef(false)
  const { onHandleClick } = useGlobal()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getData = async () => {
    if (profile) {
      await getFavoriteGameByUser(
        pageSize,
        currentPage,
        "",
        searchDropdown,
        categoryDropdown,
        gameItemDropdown,
        deviceDropdown,
        "all",
        false,
        "all"
      ).then((res) => {
        const { data, info } = res
        if (data && info) {
          setGameFavourite(data)
          setTotalCount(info.totalCount)
          setPageSize(info.limit)
          setCurrentPage(info.pages)
          setLoading(false)
        }
        setLoading(false)
      })
    }
  }

  // useEffect(() => {
  // getData()
  // if (
  //   lang !== "en" &&
  //   lang !== undefined &&
  //   lang !== null &&
  //   languageLists.includes(lang)
  // ) {
  //   i18n.changeLanguage(lang)
  //   localStorage.setItem("language", lang)
  //   history.push(location.pathname + location.search)
  // } else {
  //   i18n.changeLanguage("en")
  //   localStorage.setItem("language", "en")
  //   if (
  //     location.search !== "" &&
  //     location !== null &&
  //     location !== undefined
  //   ) {
  //     if (
  //       lang !== "en" &&
  //       lang !== undefined &&
  //       lang !== null &&
  //       languageLists.includes(lang)
  //     ) {
  //       history.push(location.pathname + location.search)
  //     } else if (location.search.includes("&lang")) {
  //       history.push(location.pathname + location.search.split("&lang", 1))
  //     } else if (location.search.includes("?lang")) {
  //       history.push(location.pathname + location.search.split("?lang", 1))
  //     } else {
  //       history.push(location.pathname + location.search)
  //     }
  //   } else {
  //     history.push(location.pathname)
  //   }
  // }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [stateProfile])

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

  const getGameClickHandler = (game) => {
    if (game.game_free_status) {
      return () => onHandleClick("free-to-play", game.path, game)
    }
    if (game.play_to_earn) {
      return () => onHandleClick("play-to-earn", game.path, game)
    }
    if (game.game_type === "storymode") {
      return () => onHandleClick("story-mode", game.path, game)
    }
    if (game.is_NFT) {
      return () => onHandleClick("arcade-emporium", game.path, game)
    }
  }

  useEffect(() => {
    getData()
    let load = true
    if (load) {
      setLoading(true)
    }
    return () => {
      load = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    currentPage,
    searchDropdown,
    categoryDropdown,
    gameItemDropdown,
    deviceDropdown
  ])

  useEffect(() => {
    if (!fetchRef.current && gameFavourite) {
      fetchRef.current = true
      setTotalCount(gameFavourite.length)
    }
  }, [gameFavourite])

  return (
    <div className="flex flex-col">
      <div className="mx-2 mb-6 grid grid-cols-2 gap-y-4 gap-x-2 md:mx-0 md:grid-cols-5">
        {loading
          ? [...Array(pageSize)].map(() => <SkeletonCard key={uuid()} />)
          : null}
        {gameFavourite ? (
          gameFavourite.map((game) => {
            const menu = getGameMenu(game)
            const handleClick = getGameClickHandler(game)

            return (
              <GameCard
                key={game.id}
                menu={menu || F2PHeaderMenu}
                onHandleClick={handleClick}
                data={game}
              />
            )
          })
        ) : (
          <>No Data</>
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
