import PaginationNaka from "@components/atoms/pagination/PaginationNaka"
import SkeletonCard from "@components/atoms/skeleton/SkeletonCard"
import { StoryModeHeaderMenu } from "@constants/gameSlide"
import GameCard from "@feature/game/components/molecules/GameCard"
import { memo, useState } from "react"
import { v4 as uuid } from "uuid"
import useGamePageListController from "@feature/game/containers/hooks/useGamePageListController"
import { Box } from "@mui/material"
import DropdownLimit from "@components/atoms/DropdownLimit"
import NoData from "@components/molecules/NoData"
import BodyCategories from "@mobile/components/organisms/BodyCategories"
import CardGameSlider from "@mobile/components/organisms/CardGameSlider"
import { MobileView } from "react-device-detect"
import { IGame } from "@feature/game/interfaces/IGameService"

const StoryModeGamesPage = () => {
  const staminaRecovery = new Date("2023-01-07T22:24:00.000Z")
  const [cooldown, setCooldown] = useState<boolean>(true)
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
    setLimit
  } = useGamePageListController("storymode")

  return (
    <div className="flex flex-col">
      <MobileView className="MobileSlider mb-4">
        <CardGameSlider games={gameFilter as unknown as IGame[]} />
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
          : gameFilter &&
            gameFilter.map((game) => (
              <GameCard
                key={game.id}
                menu={StoryModeHeaderMenu}
                data={game}
                checkTimer
                staminaRecovery={staminaRecovery}
                cooldown={cooldown}
                setCooldown={setCooldown}
                href={gameLink(game)}
                onHandleClick={() => onSetGameStore(game)}
                gameType="story-mode-games"
                play_total_count={game?.play_total_count}
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

export default memo(StoryModeGamesPage)
