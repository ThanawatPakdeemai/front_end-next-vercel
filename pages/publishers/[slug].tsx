import { ReactElement } from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { v4 as uuid } from "uuid"
import dynamic from "next/dynamic"
import useGlobal from "@hooks/useGlobal"

const GamePageLayout = dynamic(
  () => import("@components/templates/GamePageLayout"),
  {
    suspense: true
  }
)
const SkeletonPublisherCard = dynamic(
  () => import("@components/atoms/skeleton/SkeletonPublisherCard"),
  {
    suspense: true
  }
)

export default function PublisherDetails() {
  const { limit } = useGlobal()
  // const type: IGetType = "play-to-earn"
  // const [page, setPage] = useState<number>(1)
  // const fetchRef = useRef(false)
  // const [totalCount, setTotalCount] = useState<number>(0)
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

  return (
    <div className="flex flex-col">
      <div className="mb-6 grid grid-cols-4 gap-4">
        {[...Array(limit)].map(() => (
          <SkeletonPublisherCard key={uuid()} />
        ))}
        {/* {isLoading
          ? [...Array(limit)].map(() => <SkeletonCard key={uuid()} />)
          : null}
        {gameData &&
          gameData.data &&
          gameData.data.map((game) => (
            <GameCard
              key={game.id}
              menu={P2EHeaderMenu}
              onHandleClick={() =>
                onHandleClick("partner-game", game.path, game)
              }
            />
          ))} */}
      </div>
      {/* <PaginationNaka
        totalCount={totalCount}
        limit={limit}
        page={page}
        setPage={setPage}
      /> */}
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
