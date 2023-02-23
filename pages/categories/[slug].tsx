import dynamic from "next/dynamic"
import { PaginationNaka } from "@components/atoms/pagination"
import { P2EHeaderMenu } from "@constants/gameSlide"
import { IGame } from "@feature/game/interfaces/IGameService"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useRouter } from "next/router"
import { ReactElement, useEffect, useState } from "react"
import { v4 as uuid } from "uuid"
import useCategories from "@hooks/useCategories"
import useGlobal from "@hooks/useGlobal"

const SkeletonCard = dynamic(
  () => import("@components/atoms/skeleton/SkeletonCard"),
  {
    suspense: true
  }
)
const GamePageWithBreadcrumb = dynamic(
  () => import("@components/templates/GamePageWithBreadcrumb"),
  {
    suspense: true
  }
)
const GameCard = dynamic(
  () => import("@feature/game/components/molecules/GameCard"),
  {
    suspense: true
  }
)

export default function CatogoriesPageDetails() {
  const router = useRouter()
  const pathId = router.query.id

  const [gameData, setGameData] = useState<IGame[]>([])
  const {
    onHandleClick,
    setPage,
    page,
    setTotalCount,
    totalCount,
    limit,
    defaultBody
  } = useGlobal()

  // const body: IFilterGamesByKey = {
  //   "limit": limit,
  //   "skip": page,
  //   "sort": "_id",
  //   "search": "",
  //   "item": "all",
  //   "device": "all",
  //   "game_type": "all",
  //   "tournament": false
  // }
  const {
    getGamesFilterByCategoryId,
    isFetchingGamesFilterByCategoryId,
    isLoadingGamesFilterByCategoryId,
    isPreviousGamesFilterByCategoryId
  } = useCategories({
    ...defaultBody,
    "category": pathId || ""
  })

  useEffect(() => {
    if (!isFetchingGamesFilterByCategoryId && getGamesFilterByCategoryId) {
      setGameData(getGamesFilterByCategoryId.data)
      if (getGamesFilterByCategoryId.info) {
        setTotalCount(getGamesFilterByCategoryId.info.totalCount)
      }
    }
  }, [
    getGamesFilterByCategoryId,
    isPreviousGamesFilterByCategoryId,
    page,
    isFetchingGamesFilterByCategoryId,
    setTotalCount
  ])

  return (
    <div className="flex flex-col">
      <div className="mb-6 grid grid-cols-5 gap-y-4 gap-x-2">
        {isFetchingGamesFilterByCategoryId || isLoadingGamesFilterByCategoryId
          ? [...Array(limit)].map(() => <SkeletonCard key={uuid()} />)
          : null}
        {gameData
          ? gameData.map((game) => (
              <GameCard
                key={game.id}
                menu={P2EHeaderMenu}
                data={game}
                onHandleClick={() =>
                  onHandleClick("play-to-earn", game.path, game)
                }
              />
            ))
          : [...Array(limit)].map(() => <SkeletonCard key={uuid()} />)}
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

CatogoriesPageDetails.getLayout = function getLayout(page: ReactElement) {
  return <GamePageWithBreadcrumb>{page}</GamePageWithBreadcrumb>
}

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"]))
    }
  }
}
