import dynamic from "next/dynamic"
import { F2PHeaderMenu } from "@constants/gameSlide"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { ReactElement } from "react"
import { v4 as uuid } from "uuid"
import useGlobal from "@hooks/useGlobal"
import useGamePageListController from "@feature/game/containers/hooks/useGamePageListController"
import { Box } from "@mui/material"

const PaginationNaka = dynamic(
  () => import("@components/atoms/pagination/PaginationNaka"),
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
  ssr: false
})
const SkeletonCard = dynamic(
  () => import("@components/atoms/skeleton/SkeletonCard"),
  {
    suspense: true,
    ssr: false
  }
)
const GamePageWithBreadcrumb = dynamic(
  () => import("@components/templates/GamePageWithBreadcrumb"),
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

export default function CatogoriesPageDetails() {
  const {
    loadingFilterGame,
    limit,
    gameFilter,
    totalCount,
    page,
    setPage,
    pager,
    setLimit
  } = useGamePageListController()
  const { getGameMode, isRedirectRoomlist, onHandleSetGameStore } = useGlobal()

  return (
    <div className="flex w-full flex-col">
      <div className="mx-2 mb-6 mt-6 grid w-full grid-cols-2 gap-x-2 gap-y-4 md:mx-0 md:mt-0 md:grid-cols-5">
        {loadingFilterGame
          ? [...Array(limit)].map(() => <SkeletonCard key={uuid()} />)
          : null}
        {gameFilter &&
          gameFilter.length > 0 &&
          !loadingFilterGame &&
          gameFilter.map((game) => (
            <GameCard
              key={game.id}
              menu={F2PHeaderMenu}
              href={`/${getGameMode(game)}/${game.path}${isRedirectRoomlist(
                game
              ).toString()}`}
              onHandleClick={() =>
                onHandleSetGameStore(getGameMode(game), game)
              }
              data={game}
              gameType={getGameMode(game)}
            />
          ))}
      </div>
      {gameFilter && gameFilter.length === 0 && !loadingFilterGame && (
        <NoData className="" />
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
