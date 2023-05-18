import React, { memo, useEffect, useState } from "react"
import { PaginationNaka } from "@components/atoms/pagination"
import SkeletonCard from "@components/atoms/skeleton/SkeletonCard"
import { F2PHeaderMenu } from "@constants/gameSlide"
import useGamePageListController from "@feature/game/containers/hooks/useGamePageListController"
import { v4 as uuid } from "uuid"
import GameCard from "@feature/game/components/molecules/GameCard"
import { Box } from "@mui/material"
import DropdownLimit from "@components/atoms/DropdownLimit"
import useGlobal from "@hooks/useGlobal"
import NoData from "@components/molecules/NoData"
import BodyCategories from "@src/mobile/molecules/BodyCategories"
import CardGameSlider from "@src/mobile/molecules/CardGameSlider"
import { MobileView } from "react-device-detect"
import { IGame } from "@feature/game/interfaces/IGameService"

const FreeToEarnGamesPage = () => {
  const [limitFake] = useState(9999)
  const {
    loadingFilterGame,
    limit,
    gameFilter,
    totalCount,
    page,
    setPage,
    onSetGameStore,
    gameLink,
    pager,
    setLimit,
    staminaRecovery,
    cooldown,
    setCooldown
  } = useGamePageListController("free-to-play-games", limitFake) // TODO backend can't filter game free-to-earn
  const { getTypeGamePathFolder, isFreeToEarnGame } = useGlobal()

  const [f2eGame, setF2EGame] = useState<IGame[]>()

  useEffect(() => {
    let load = false

    if (!load) {
      if (gameFilter && gameFilter.length > 0) {
        const _filterF2E = gameFilter.filter((item) => isFreeToEarnGame(item))
        setF2EGame(_filterF2E)
      }
    }

    return () => {
      load = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameFilter])

  return (
    <div className="flex flex-col">
      <MobileView className="MobileSlider mb-4">
        <CardGameSlider games={gameFilter} />
        {!loadingFilterGame && (
          <div className="mt-4 w-full">
            <p className="uppercase text-white-default">POPULAR GAMES</p>
            <BodyCategories games={gameFilter} />
          </div>
        )}
      </MobileView>
      <div className="mx-2 mb-6 grid grid-cols-2 gap-x-2 gap-y-4 md:mx-0 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {loadingFilterGame
          ? [...Array(limit)].map(() => <SkeletonCard key={uuid()} />)
          : f2eGame &&
            f2eGame.map((game) => (
              <GameCard
                key={game.id}
                menu={F2PHeaderMenu}
                data={game}
                checkTimer
                staminaRecovery={staminaRecovery}
                cooldown={cooldown}
                setCooldown={setCooldown}
                href={gameLink(game)}
                gameType={getTypeGamePathFolder(game)}
                onHandleClick={() => onSetGameStore(game)}
                play_total_count={game?.play_total_count}
              />
            ))}
      </div>

      {totalCount === 0 && (
        <div className="d-flex  justify-center text-center">
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
          limit={limitFake}
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

export default memo(FreeToEarnGamesPage)
