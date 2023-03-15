import React, { memo, useEffect, useState } from "react"
// import { v4 as uuid } from "uuid"
import useGlobal from "@hooks/useGlobal"
// import SkeletonPublisherCard from "@components/atoms/skeleton/SkeletonPublisherCard"
import useFilterStore from "@stores/blogFilter"
import { IPartnerGameData } from "@feature/game/interfaces/IPartnerGame"
import { publisherAllPartner } from "@feature/partner/containers/services/dropdownPartner.service"
import GameCard from "@feature/game/components/molecules/GameCard"
import { PaginationNaka } from "@components/atoms/pagination"
import { P2EHeaderMenu } from "@constants/gameSlide"

const PublisherPage = () => {
  const { limit } = useGlobal()
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
  const { onHandleClick } = useGlobal()
  const [gameFilter, setGameFilter] = useState<IPartnerGameData[]>()
  const [page, setPage] = useState<number>(1)
  const [totalCount, setTotalCount] = useState<number>(0)
  // const type: IGetType = "play-to-earn"
  // const fetchRef = useRef(false)
  // const queryClient = useQueryClient()
  // const { onHandleClick } = useGlobal()
  // const { clearGameData } = useGameStore()

  // const {
  //   isLoading,
  //   isPreviousData,
  //   data: gameData
  // } = useGamesByTypes({
  //   _type: type,
  //   _limit: limit,
  //   _page: page
  // })

  // useEffect(() => {
  //   if (!fetchRef.current && gameData) {
  //     fetchRef.current = true
  //     setTotalCount(gameData.info.totalCount)
  //   }
  //   clearGameData()
  // }, [clearGameData, gameData])

  // useEffect(() => {
  //   if (!isPreviousData && gameData) {
  //     queryClient.prefetchQuery({
  //       queryKey: ["games", type, page + 1],
  //       queryFn: () =>
  //         getGameByTypes({ _type: type, _limit: limit, _page: page + 1 })
  //     })
  //   }
  // }, [gameData, isPreviousData, page, queryClient])

  useEffect(() => {
    publisherAllPartner().then((res) => {
      if (res) {
        const { data, info } = res
        // eslint-disable-next-line no-console
        console.log("partner_data", data)
        setGameFilter(data.data)
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
      <div className="mb-6 grid grid-cols-4 gap-4">
        {/* {[...Array(limit)].map(() => (
          <SkeletonPublisherCard key={uuid()} />
        ))} */}
        {/* {isLoading
          ? [...Array(limit)].map(() => <SkeletonCard key={uuid()} />)
          : null} */}
        {gameFilter &&
          gameFilter.map((game) => (
            <GameCard
              key={game.id}
              menu={P2EHeaderMenu}
              partnerdata={game}
              imgPartner={game.image_thumbnail}
              onHandleClick={() =>
                onHandleClick("partner-publisher", game.slug, game)
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

export default memo(PublisherPage)
