import React, { memo } from "react"
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
  } = useGamePageListController()
  const { getTypeGamePathFolder } = useGlobal()

  // const [gameFilter, setGameFilter] = useState<IGame[]>()
  // const [page, setPage] = useState<number>(1)

  // const [totalCount, setTotalCount] = useState<number>(0)
  // const { getTypeGamePathFolder, onHandleSetGameStore, isRedirectRoomlist } =
  //   useGlobal(limit, 1)
  // const {
  //   category: categoryDropdown,
  //   gameItem: gameItemDropdown,
  //   device: deviceDropdown,
  //   search: searchDropdown,
  //   clearCategory,
  //   clearDevice,
  //   clearGameItem,
  //   clearSearch
  // } = useFilterStore()

  // useEffect(() => {
  //   let load = false
  //   if (!load) {
  //     clearCategory()
  //     clearDevice()
  //     clearGameItem()
  //     clearSearch()
  //   }
  //   return () => {
  //     load = true
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  // const { mutateGetGamesByCategoryId, isLoading: loadingFilterGame } =
  //   useFilterGameList()

  // useEffect(() => {
  //   let load = false

  //   if (!load) {
  //     const filterData = {
  //       limit,
  //       skip: page,
  //       sort: "name",
  //       search: searchDropdown,
  //       category: categoryDropdown,
  //       item: gameItemDropdown,
  //       device: deviceDropdown,
  //       game_type: "free-to-play-games",
  //       tournament: false,
  //       nftgame: "all"
  //     }
  //     mutateGetGamesByCategoryId(filterData).then((res) => {
  //       if (res) {
  //         const { data, info } = res
  //         setGameFilter(data)
  //         setTotalCount(info ? info.totalCount : 1)
  //       }
  //     })
  //   }

  //   return () => {
  //     load = true
  //   }
  // }, [
  //   categoryDropdown,
  //   gameItemDropdown,
  //   deviceDropdown,
  //   searchDropdown,
  //   page,
  //   limit,
  //   mutateGetGamesByCategoryId
  // ])

  return (
    <div className="flex flex-col">
      <div className="mx-2 mb-6 grid grid-cols-2 gap-y-4 gap-x-2 md:mx-0 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {loadingFilterGame
          ? [...Array(limit)].map(() => <SkeletonCard key={uuid()} />)
          : gameFilter &&
            gameFilter.map((game) => (
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

export default memo(FreeToPlayGamesPage)
