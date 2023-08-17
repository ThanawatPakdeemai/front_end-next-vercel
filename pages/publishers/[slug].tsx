import { ReactElement, useEffect, useState } from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { v4 as uuid } from "uuid"
import dynamic from "next/dynamic"
import useGlobal from "@hooks/useGlobal"
import useFilterStore from "@stores/blogFilter"
import { IPartnerGameData } from "@feature/game/interfaces/IPartnerGame"
import GameCard from "@feature/game/components/molecules/GameCard"
import { P2EHeaderMenu } from "@constants/gameSlide"
import { publisherGamePartner } from "@feature/partner/containers/services/dropdownPartner.service"
import { useRouter } from "next/router"

const PaginationNaka = dynamic(
  () => import("@components/atoms/pagination/PaginationNaka"),
  {
    suspense: true,
    ssr: false
  }
)
const GamePageLayout = dynamic(
  () => import("@components/templates/PartnerPageLayout"),
  {
    suspense: true,
    ssr: false
  }
)
const SkeletonPublisherCard = dynamic(
  () => import("@components/atoms/skeleton/SkeletonPublisherCard"),
  {
    suspense: true,
    ssr: false
  }
)

export default function PublisherDetails() {
  const { limit, onHandleClick } = useGlobal()
  const { category: categoryDropdown, search: searchDropdown } =
    useFilterStore()

  const [gameFilter, setGameFilter] = useState<IPartnerGameData[]>()
  const [page, setPage] = useState<number>(1)
  const [totalCount, setTotalCount] = useState<number>(0)
  const router = useRouter()
  const { slug } = router.query

  useEffect(() => {
    let load = false

    if (!load) {
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
    }

    return () => {
      load = true
    }
  }, [categoryDropdown, searchDropdown, page, limit, slug])

  return (
    <div className="flex flex-col">
      <div className="mb-6 grid grid-cols-4 gap-4">
        {gameFilter
          ? gameFilter.map((game) => (
              <GameCard
                key={game.id}
                menu={P2EHeaderMenu}
                partnerdata={game}
                imgPartner={game.image_thumbnail}
                href={`/partner-game/${game.slug}`}
                onHandleClick={() =>
                  onHandleClick("partner-game", game.slug, game)
                }
                gameType="partner-game"
              />
            ))
          : [...Array(limit)].map(() => <SkeletonPublisherCard key={uuid()} />)}
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
