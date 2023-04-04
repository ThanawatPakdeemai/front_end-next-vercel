import { PaginationNaka } from "@components/atoms/pagination"
import SkeletonCard from "@components/atoms/skeleton/SkeletonCard"
import { P2EHeaderMenu } from "@constants/gameSlide"
import React, { memo } from "react"
import { v4 as uuid } from "uuid"
import GameCard from "@feature/game/components/molecules/GameCard"
import useGamePageListController from "@feature/game/containers/hooks/useGamePageListController"
import { Box } from "@mui/material"
import DropdownLimit from "@components/atoms/DropdownLimit"
import NoData from "@components/molecules/NoData"

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
    onSetGameStore,
    gameLink
  } = useGamePageListController()

  return (
    <div className="flex flex-col">
      <div className="mx-2 mb-6 grid grid-cols-2 gap-y-4 gap-x-2 md:mx-0 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {loadingFilterGame
          ? [...Array(limit)].map(() => <SkeletonCard key={uuid()} />)
          : gameFilter &&
            gameFilter.map((game) => (
              <GameCard
                key={game.id}
                menu={P2EHeaderMenu}
                data={game}
                href={gameLink(game)}
                onHandleClick={() => onSetGameStore(game)}
                gameType={game.is_NFT ? "arcade-emporium" : "play-to-earn"}
              />
            ))}
      </div>

      {totalCount === 0 && (
        <div className="d-flex  justify-center text-center">
          <NoData />
        </div>
      )}

      <Box
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
