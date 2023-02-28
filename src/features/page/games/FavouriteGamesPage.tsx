import React, { useEffect, useRef, useState } from "react"
import { IGame } from "@src/types/games"
import useProfileStore from "@stores/profileStore"
import { useRouter } from "next/router"
import { getFavoriteGameByUser } from "@feature/favourite/containers/services/favourite.service"
import { v4 as uuid } from "uuid"
import SkeletonCard from "@components/atoms/skeleton/SkeletonCard"
import { PaginationNaka } from "@components/atoms/pagination"
import { useToast } from "@feature/toast/containers"
import { MESSAGES } from "@constants/messages"
import { P2EHeaderMenu } from "@constants/gameSlide"
import GameCard from "@feature/game/containers/components/molecules/GameCard"
import useFilterStore from "@stores/blogFilter"

const FavouriteGamesPage = () => {
  const router = useRouter()
  // Don't Delete this **************************
  // const pathActive = router.pathname
  // const lang = pathActive.search("lang")
  // const { onSetGameData } = useGameStore()
  const { errorToast } = useToast()
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getData = async () => {
    if (profile) {
      await getFavoriteGameByUser(
        profile.id,
        pageSize,
        currentPage,
        categoryDropdown.toLocaleLowerCase(),
        deviceDropdown.toLocaleLowerCase(),
        gameItemDropdown.toLocaleLowerCase(),
        searchDropdown.toLocaleLowerCase()
      ).then((res) => {
        const { data, info } = res

        if (data && info) {
          setGameFavourite(data)
          setTotalCount(info.totalCount)
          setPageSize(info.limit)
          setCurrentPage(info.pages)
          setLoading(false)
        }
      })
    }
  }

  const onHandleClick = async (_gameUrl: string, _gameData: IGame) => {
    if (profile) {
      // onSetGameData(_gameData)
      await router.push(`/${_gameUrl}`)
    } else {
      errorToast(MESSAGES.please_login)
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
      <div className="mb-6 grid grid-cols-2 gap-y-4 gap-x-2 md:grid-cols-5">
        {loading
          ? [...Array(pageSize)].map(() => <SkeletonCard key={uuid()} />)
          : null}
        {gameFavourite
          ? gameFavourite.map((game) => (
              <GameCard
                key={game.id}
                menu={P2EHeaderMenu}
                onHandleClick={() => onHandleClick(game.path, game)}
                data={game}
              />
            ))
          : null}
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
