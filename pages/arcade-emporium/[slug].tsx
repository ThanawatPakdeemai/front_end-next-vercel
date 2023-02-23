import { ReactElement } from "react"
import { useRouter } from "next/router"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import dynamic from "next/dynamic"
import { TabProvider } from "@feature/tab/contexts/TabProvider"

const GameTabs = dynamic(
  () => import("@feature/game/components/templates/lobby/GameTabs")
)
const GameReviews = dynamic(
  () => import("@feature/game/components/molecules/GameReviews")
)
const GameContent = dynamic(
  () => import("@feature/game/components/templates/lobby/GameContent")
)
const OverviewContent = dynamic(
  () => import("@components/organisms/OverviewContent")
)
const GamePageDefault = dynamic(
  () => import("@components/templates/GamePageDefault")
)
const RightSidebarContentEffect = dynamic(
  () => import("@components/templates/contents/RightSidebarContentEffect")
)
const RightSidebarContent = dynamic(
  () => import("@components/templates/contents/RightSidebarContent")
)

export default function ArcadeEmporiumGameDetails() {
  const router = useRouter()
  const { id } = router.query
  const gameId = id ? id.toString() : ""
  // const { gameData } = useGlobal()
  // return <>{!gameData && <SkeletonGamePartner />}</>
  return (
    <GamePageDefault
      component={
        <RightSidebarContentEffect
          className="mb-24"
          content={
            <GameContent
              gameId={gameId}
              gameType="arcade-emporium"
            />
          }
          aside={
            <OverviewContent
              gameId={gameId}
              gameType="arcade-emporium"
            />
          }
        />
      }
      component2={
        <RightSidebarContent
          content={
            <TabProvider>
              <GameTabs
                gameId={gameId}
                gameType="arcade-emporium"
              />
            </TabProvider>
          }
          aside={
            <GameReviews
              gameType="arcade-emporium"
              gameId={gameId}
            />
          }
        />
      }
    />
  )
}

ArcadeEmporiumGameDetails.getLayout = function getLayout(page: ReactElement) {
  return page
}

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"]))
    }
  }
}
