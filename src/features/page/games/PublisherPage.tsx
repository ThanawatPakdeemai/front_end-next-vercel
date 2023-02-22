import React, { memo } from "react"
import { v4 as uuid } from "uuid"
import useGlobal from "@hooks/useGlobal"
import SkeletonPublisherCard from "@components/atoms/skeleton/SkeletonPublisherCard"

const PublisherPage = () => {
  const { limit } = useGlobal()
  // const search = ""
  // const limit = 10
  // const [page, setPage] = useState<number>(1)
  // const fetchRef = useRef(false)
  // const [totalCount, setTotalCount] = useState<number>(0)
  // const queryClient = useQueryClient()
  // const { clearGamePartnersData } = useGameStore()
  // const { onHandleClick } = useGlobal()

  // const {
  //   isLoading,
  //   isPreviousData,
  //   data: gameData
  // } = usePartnerGame({
  //   _search: search,
  //   _limit: limit,
  //   _page: page
  // })
  // useEffect(() => {
  //   if (!fetchRef.current && gameData?.info && gameData) {
  //     fetchRef.current = true
  //     setTotalCount(gameData.info?.totalCount)
  //   }
  // }, [gameData])

  // useEffect(() => {
  //   if (!isPreviousData && gameData) {
  //     queryClient.prefetchQuery({
  //       queryKey: ["partner-games", limit, search, page + 1],
  //       queryFn: () =>
  //         getAllPartnerGames({
  //           _search: search,
  //           _limit: limit,
  //           _page: page + 1
  //         })
  //     })
  //   }
  //   clearGamePartnersData()
  // }, [clearGamePartnersData, gameData, isPreviousData, page, queryClient])

  return (
    <div className="flex flex-col">
      <div className="mb-6 grid grid-cols-5 gap-y-4 gap-x-2">
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
              partnerdata={game}
              imgPartner={game.image_thumbnail}
              onHandleClick={() =>
                onHandleClick("partner-game", game.slug, game)
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
export default memo(PublisherPage)
