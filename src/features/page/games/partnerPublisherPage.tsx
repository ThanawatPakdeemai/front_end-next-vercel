import { PaginationNaka } from "@components/atoms/pagination"
import { P2EHeaderMenu } from "@constants/gameSlide"
import React, { memo, useEffect, useState } from "react"
import useGlobal from "@hooks/useGlobal"
import useFilterStore from "@stores/blogFilter"
import { IPartnerGameData } from "@feature/game/interfaces/IPartnerGame"
import { publisherAllPartner } from "@feature/partner/containers/services/dropdownPartner.service"
import GameCard from "@feature/game/components/molecules/GameCard"

const PartnerGames = () => {
  // const search = ""
  const limit = 10
  const [page, setPage] = useState<number>(1)
  // const fetchRef = useRef(false)
  const [totalCount, setTotalCount] = useState<number>(0)
  const [gameFilter, setGameFilter] = useState<IPartnerGameData[]>()
  const { onHandleSetGameStore } = useGlobal()
  const {
    category: categoryDropdown,
    gameItem: gameItemDropdown,
    device: deviceDropdown,
    search: searchDropdown
  } = useFilterStore()

  useEffect(() => {
    let load = false

    if (!load) {
      publisherAllPartner().then((res) => {
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
    limit
  ])

  return (
    <div className="flex flex-col">
      <div className="mx-2 mb-6 grid grid-cols-2 gap-y-4 gap-x-2 md:mx-0 md:grid-cols-5">
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
              href={`/partner-game/${game.slug}`}
              onHandleClick={() => onHandleSetGameStore("partner-game", game)}
              // onHandleClick={() =>
              //   onHandleClick("partner-game", game.slug, game)
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
export default memo(PartnerGames)
