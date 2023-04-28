import useGameSummaryRewardController from "@feature/game/containers/hooks/useGameSummaryRewardController"
import { TabProvider } from "@feature/tab/contexts/TabProvider"
import useGlobal from "@hooks/useGlobal"
import { Box } from "@mui/material"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import dynamic from "next/dynamic"
import React, { ReactElement } from "react"

const GameSummaryRewardPage = dynamic(
  () => import("@feature/page/games/gameSummaryRewardPage"),
  {
    suspense: true,
    ssr: false
  }
)
const SkeletonBanner = dynamic(
  () => import("@components/atoms/skeleton/SkeletonBanner"),
  {
    suspense: true,
    ssr: false
  }
)
const GamePageDefault = dynamic(
  () => import("@components/templates/GamePageDefault"),
  {
    suspense: true,
    ssr: false
  }
)
const RightSidebarContent = dynamic(
  () => import("@components/templates/contents/RightSidebarContent"),
  {
    suspense: true,
    ssr: false
  }
)
const FullWidthContent = dynamic(
  () => import("@components/templates/contents/FullWidthContent"),
  {
    suspense: true,
    ssr: false
  }
)

const OverviewContent = dynamic(
  () => import("@components/organisms/OverviewContent"),
  {
    suspense: true,
    ssr: false
  }
)

const GameTabsVertical = dynamic(
  () => import("@feature/game/components/templates/lobby/GameTabsVertical"),
  {
    suspense: true,
    ssr: false
  }
)
export default function Notification_id() {
  const { gameDataState } = useGameSummaryRewardController()
  const { getTypeGamePathFolder } = useGlobal()

  return gameDataState ? (
    <GamePageDefault
      component={
        <RightSidebarContent
          className="mb-24"
          content={<GameSummaryRewardPage />}
          aside={
            <Box
              component="div"
              className="aside-wrapper flex flex-col justify-between gap-4 lg:h-full"
              sx={{
                ".panel-content": {
                  maxHeight: "270px",
                  ".custom-scroll": {
                    overflow: "hidden"
                  }
                },
                ".like-no_score": {
                  margin: "0"
                }
              }}
            >
              <OverviewContent
                gameId={gameDataState.id}
                gameType={getTypeGamePathFolder(gameDataState)}
                gameIdNFT={gameDataState.NFT_Owner}
              />
            </Box>
          }
        />
      }
      component2={
        <FullWidthContent
          sxCustomStyled={{
            "&.container": {
              maxWidth: "100%!important",
              "&.container-fullWidth": {
                padding: "49px"
              }
            }
          }}
        >
          <TabProvider>
            <GameTabsVertical
              gameId={gameDataState.id}
              gameType="arcade-emporium"
            />
          </TabProvider>
        </FullWidthContent>
      }
    />
  ) : (
    <GamePageDefault component={<SkeletonBanner />} />
  )
}

Notification_id.getLayout = function getLayout(page: ReactElement) {
  return page
}

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"]))
    }
  }
}
