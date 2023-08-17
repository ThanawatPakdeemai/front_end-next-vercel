import React, { memo, useEffect, useState } from "react"
import useGlobal from "@hooks/useGlobal"
import useFilterStore from "@stores/blogFilter"
import { IPartnerGameData } from "@feature/game/interfaces/IPartnerGame"
import { publisherAllPartner } from "@feature/partner/containers/services/dropdownPartner.service"
import { P2EHeaderMenu } from "@constants/gameSlide"
import dynamic from "next/dynamic"

const PaginationNaka = dynamic(
  () => import("@components/atoms/pagination/PaginationNaka"),
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

const PublisherPage = () => {
  const { limit } = useGlobal()
  const {
    category: categoryDropdown,
    gameItem: gameItemDropdown,
    device: deviceDropdown,
    search: searchDropdown
  } = useFilterStore()
  const { onHandleSetGameStore } = useGlobal()
  const [gameFilter, setGameFilter] = useState<IPartnerGameData[]>()
  const [page, setPage] = useState<number>(1)
  const [totalCount, setTotalCount] = useState<number>(0)

  useEffect(() => {
    let load = false

    if (!load) {
      publisherAllPartner().then((res) => {
        if (res) {
          const { data, info } = res
          // eslint-disable-next-line no-console
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
              href={`/partner-publisher/${game.slug}`}
              onHandleClick={() =>
                onHandleSetGameStore("partner-publisher", game)
              }
              gameType="partner-publisher" // onHandleClick={() =>
              //   onHandleClick("partner-publisher", game.slug, game)
              // }
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
