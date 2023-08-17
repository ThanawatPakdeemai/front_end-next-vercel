import React, { memo, useEffect, useState } from "react"
import { v4 as uuid } from "uuid"
import { useQueryClient } from "@tanstack/react-query"
import dynamic from "next/dynamic"
import { P2EHeaderMenu } from "@constants/gameSlide"
import useGameStore from "@stores/game/index"
import usePartnerGame from "@feature/game/containers/hooks/usePartnerGame"
import useGlobal from "@hooks/useGlobal"
import { getAllPartnerGames } from "@feature/game/partnerGames/containers/services/gamePartners.service"
import useFilterStore from "@stores/blogFilter"
import { IPartnerGameData } from "@feature/game/interfaces/IPartnerGame"
import useFilterGamePartnerList from "@feature/partner/containers/hooks/useFilterGamePartnerList"

const PaginationNaka = dynamic(
  () => import("@components/atoms/pagination/PaginationNaka"),
  {
    suspense: true,
    ssr: false
  }
)
const SkeletonCard = dynamic(
  () => import("@components/atoms/skeleton/SkeletonCard"),
  {
    suspense: true,
    ssr: false
  }
)
const GameCard = dynamic(
  () => import("@feature/game/components/molecules/GameCard"),
  {
    suspense: true,
    ssr: false
  }
)
const NoData = dynamic(() => import("@components/molecules/NoData"), {
  suspense: true,
  ssr: true
})

const PartnerGames = () => {
  const search = ""
  const limit = 10
  const [page, setPage] = useState<number>(1)
  const [totalCount, setTotalCount] = useState<number>(0)
  const [gameFilter, setGameFilter] = useState<IPartnerGameData[]>()
  const queryClient = useQueryClient()
  const { clearGamePartnersData } = useGameStore()
  const { onHandleSetGameStore } = useGlobal()
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
  } = usePartnerGame({
    _search: search,
    _limit: limit,
    _page: page
  })

  useEffect(() => {
    let load = false

    if (!load) {
      if (gameData?.info && gameData) {
        setTotalCount(gameData.info?.totalCount)
      }
    }

    return () => {
      load = true
    }
  }, [gameData])

  useEffect(() => {
    let load = false

    if (!load) {
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
        setGameFilter(gameData.data)
      }
      clearGamePartnersData()
      clearSearch()
      clearCategory()
      clearGameItem()
      clearDevice()
    }

    return () => {
      load = true
    }
  }, [
    clearCategory,
    clearDevice,
    clearGameItem,
    clearGamePartnersData,
    clearSearch,
    gameData,
    isPreviousData,
    page,
    queryClient
  ])
  const { mutateFilterGamePartner, isLoading: loadFilter } =
    useFilterGamePartnerList()
  useEffect(() => {
    let load = false

    if (!load) {
      const filterData = {
        "limit": limit,
        "skip": page,
        "search": searchDropdown,
        "type": "",
        "genres_filter": categoryDropdown
      }

      mutateFilterGamePartner(filterData).then((res) => {
        if (res) {
          const { data, info } = res
          setGameFilter(data.data)
          setTotalCount(info ? info.totalCount : 1)
        }
      })
    }

    return () => {
      load = true
    }
  }, [
    categoryDropdown,
    gameItemDropdown,
    deviceDropdown,
    searchDropdown,
    page,
    limit,
    mutateFilterGamePartner
  ])

  return (
    <div className="flex flex-col">
      <div className="mx-2 mb-6 grid grid-cols-2 gap-x-2 gap-y-4 md:mx-0 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {isLoading ||
          (loadFilter &&
            [...Array(limit)].map(() => <SkeletonCard key={uuid()} />))}
        {gameFilter && gameFilter.length > 0 ? (
          gameFilter.map((game) => (
            <GameCard
              key={game.id}
              menu={P2EHeaderMenu}
              partnerdata={game}
              imgPartner={game.image_thumbnail}
              href={`/partner-game/${game.slug}`}
              onHandleClick={() => onHandleSetGameStore("partner-game", game)}
              gameType="partner-game"
            />
          ))
        ) : (
          <NoData className="mt-4 w-[300px]" />
        )}
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
