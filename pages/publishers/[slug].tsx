import { ReactElement, useEffect, useState } from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
// import { v4 as uuid } from "uuid"
import dynamic from "next/dynamic"
import useGlobal from "@hooks/useGlobal"
import useFilterStore from "@stores/blogFilter"
import { IPartnerGameData } from "@feature/game/interfaces/IPartnerGame"
import GameCard from "@feature/game/components/molecules/GameCard"
import { P2EHeaderMenu } from "@constants/gameSlide"
import { publisherGamePartner } from "@feature/partner/containers/services/dropdownPartner.service"
import { PaginationNaka } from "@components/atoms/pagination"
import { useRouter } from "next/router"

const GamePageLayout = dynamic(
  () => import("@components/templates/PartnerPageLayout"),
  {
    suspense: true
  }
)
// const SkeletonPublisherCard = dynamic(
//   () => import("@components/atoms/skeleton/SkeletonPublisherCard"),
//   {
//     suspense: true
//   }
// )

export default function PublisherDetails() {
  const { limit } = useGlobal()
  const {
    category: categoryDropdown,
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
  const router = useRouter()
  const { slug } = router.query
  // const queryClient = useQueryClient()
  // const { onHandleClick } = useGlobal()
  // const { clearGameData } = useGameStore()
  // const type: IGetType = "play-to-earn"
  // const fetchRef = useRef(false)
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
  // eslint-disable-next-line no-console
  // console.log("slug", slug)

  useEffect(() => {
    const filterData = {
      "limit": limit,
      "skip": page,
      "sort": "slug",
      "search": searchDropdown,
      "active": true,
      "search_option": "name",
      "genres_filter": categoryDropdown
    }
    publisherGamePartner(slug, filterData).then((res) => {
      if (res) {
        const { data, info } = res
        setGameFilter(data.data)
        setTotalCount(info ? info.totalCount : 1)
      }
    })
  }, [categoryDropdown, searchDropdown, page, limit, slug])

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
                onHandleClick("partner-game", game.slug, game)
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

PublisherDetails.getLayout = function getLayout(page: ReactElement) {
  return <GamePageLayout>{page}</GamePageLayout>
}

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"]))
    }
  }
}
