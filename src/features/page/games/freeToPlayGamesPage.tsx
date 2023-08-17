import React, { memo, useEffect, useState } from "react"
import { v4 as uuid } from "uuid"
import { MobileView } from "react-device-detect"
import dynamic from "next/dynamic"
import Box from "@mui/material/Box"
import { F2PHeaderMenu } from "@constants/gameSlide"
import useGamePageListController from "@feature/game/containers/hooks/useGamePageListController"
import useGlobal from "@hooks/useGlobal"
import { IGame } from "@feature/game/interfaces/IGameService"

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
const CardGameSlider = dynamic(
  () => import("@mobile/components/organisms/CardGameSlider"),
  {
    suspense: true,
    ssr: true
  }
)
const BodyCategories = dynamic(
  () => import("@mobile/components/organisms/BodyCategories"),
  {
    suspense: true,
    ssr: true
  }
)

const FreeToPlayGamesPage = () => {
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
  } = useGamePageListController("free-to-play")
  const { getGameMode } = useGlobal()
  const [f2pGame, setF2PGame] = useState<IGame[]>()

  useEffect(() => {
    let load = false

    if (!load) {
      if (gameFilter && gameFilter.length > 0) {
        const _filterF2P = gameFilter.filter(
          (item) => item.game_mode === "free-to-play"
        )
        setF2PGame(_filterF2P)
      } else {
        setF2PGame([])
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
        <CardGameSlider games={gameFilter as unknown as IGame[]} />
        <div className="mt-4 w-full">
          <p className="uppercase text-white-default">POPULAR GAMES</p>
          <BodyCategories games={gameFilter} />
        </div>
      </MobileView>
      <div className="mx-2 mb-6 grid grid-cols-2 gap-x-2 gap-y-4 md:mx-0 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {loadingFilterGame
          ? [...Array(limit)].map(() => <SkeletonCard key={uuid()} />)
          : f2pGame &&
            f2pGame.map((game) => (
              <GameCard
                key={game.id}
                menu={F2PHeaderMenu}
                data={game}
                checkTimer
                staminaRecovery={staminaRecovery}
                cooldown={cooldown}
                setCooldown={setCooldown}
                href={gameLink(game)}
                gameType={getGameMode(game)}
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

export default memo(FreeToPlayGamesPage)
