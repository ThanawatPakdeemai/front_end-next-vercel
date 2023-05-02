import CONFIGS from "@configs/index"
import useGetGameByPath from "@feature/game/containers/hooks/useFindGameByPath"
import { TabProvider } from "@feature/tab/contexts/TabProvider"
import useGlobal from "@hooks/useGlobal"
import { Box } from "@mui/material"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import React, { ReactElement } from "react"
import { BrowserView, MobileView } from "react-device-detect"

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

export default function SummaryDetails() {
  const { getTypeGamePathFolder } = useGlobal()
  const router = useRouter()
  const { GameHome } = router.query
  const { gameData } = useGetGameByPath(GameHome ? GameHome.toString() : "")

  return gameData ? (
    <GamePageDefault
      component={
        <>
          <BrowserView>
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
                    gameId={gameData.id}
                    gameType={getTypeGamePathFolder(gameData)}
                    gameIdNFT={gameData.NFT_Owner}
                  />
                </Box>
              }
            />
          </BrowserView>
          {CONFIGS.DISPLAY_MOBILE_MODE === "true" && (
            <MobileView>
              <RightSidebarContent
                content={<GameSummaryRewardPage />}
                aside={null}
              />
            </MobileView>
          )}
        </>
      }
      component2={
        <>
          <BrowserView>
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
                  gameId={gameData.id}
                  gameType={getTypeGamePathFolder(gameData)}
                />
              </TabProvider>
            </FullWidthContent>
          </BrowserView>
          <MobileView>
            {/* <FullWidthContent
                  sxCustomStyled={{
                    "&.container": {
                      maxWidth: "100%!important"
                    }
                  }}
                >
                  <TabProvider>
                    <GameTabs
                      gameId={gameData.id}
                      gameType={getTypeGamePathFolder(gameData)}
                    />
                  </TabProvider>
                </FullWidthContent> */}
          </MobileView>
        </>
      }
    />
  ) : (
    <GamePageDefault component={<SkeletonBanner />} />
  )
}

SummaryDetails.getLayout = function getLayout(page: ReactElement) {
  return page
}

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"]))
    }
  }
}
