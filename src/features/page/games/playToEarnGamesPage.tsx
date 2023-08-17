import React, { memo } from "react"
import { v4 as uuid } from "uuid"
import { MobileView } from "react-device-detect"
import dynamic from "next/dynamic"
import Box from "@mui/material/Box"
import useGamePageListController from "@feature/game/containers/hooks/useGamePageListController"
import { P2EHeaderMenu } from "@constants/gameSlide"

const BannerSlide = dynamic(
  () => import("@feature/slider/components/templates/BannerSlide")
)
const GameCard = dynamic(
  () => import("@feature/game/components/molecules/GameCard"),
  {
    suspense: true,
    ssr: false
  }
)
const DropdownLimit = dynamic(() => import("@components/atoms/DropdownLimit"), {
  suspense: true,
  ssr: false
})
const NoData = dynamic(() => import("@components/molecules/NoData"), {
  suspense: true,
  ssr: true
})
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
const BodyCategories = dynamic(
  () => import("@mobile/components/organisms/BodyCategories"),
  {
    suspense: true,
    ssr: true
  }
)

const PlayToEarnGamesPage = () => {
  const {
    loadingFilterGame,
    limit,
    gameFilter,
    totalCount,
    page,
    setPage,
    pager,
    setLimit,
    onSetGameStore
  } = useGamePageListController("play-to-earn")

  return (
    <div className="flex flex-col">
      <MobileView className="MobileSlider mb-4">
        <BannerSlide />
        <div className="mt-4 w-full">
          <p className="uppercase text-white-default">POPULAR GAMES</p>
          <BodyCategories games={gameFilter} />
        </div>
      </MobileView>
      <div className="mx-2 mb-6 grid grid-cols-2 gap-x-4 gap-y-4 md:mx-0 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {loadingFilterGame
          ? [...Array(limit)].map(() => <SkeletonCard key={uuid()} />)
          : gameFilter &&
            gameFilter.map((game) => (
              <GameCard
                key={game.id}
                menu={P2EHeaderMenu}
                data={game}
                href={`/${game.is_NFT ? "arcade-emporium" : "play-to-earn"}/${
                  game.path
                }`}
                classNameImage={
                  gameFilter.length > 3
                    ? "h-40 w-40"
                    : "h-[6.875rem] w-[6.875rem]"
                }
                onHandleClick={() => onSetGameStore(game)}
                gameType={game.is_NFT ? "arcade-emporium" : "play-to-earn"}
                room_available={game.game_room_available}
              />
            ))}
      </div>

      {totalCount === 0 && (
        <div className="d-flex justify-center text-center">
          <NoData />
        </div>
      )}

      <Box
        component="div"
        className="my-2 flex w-full justify-between md:my-5"
        sx={{
          ".MuiPagination-ul": {
            gap: "5px 0"
          }
        }}
      >
        <PaginationNaka
          totalCount={totalCount}
          limit={limit}
          page={page}
          setPage={setPage}
        />
        <DropdownLimit
          className="m-0 w-[160px] flex-row"
          defaultValue={30}
          list={pager}
          onChangeSelect={setLimit}
        />
      </Box>
    </div>
  )
}

export default memo(PlayToEarnGamesPage)
